exports.run = (client, message, args, Discord, sql) => {
  var react = require("../eos.js")
  var guild = message.guild
  var config = require("../config.json")

  const logchannel = message.guild.channels.get(config[guild.id].modlogchannelID)
  if(!logchannel || logchannel === "null"){
    logchannel = message.guild.channels.get(config[guild.id].logchannelID)
  }


  let mutedRole = guild.roles.find(role => role.name.toLowerCase() === config[guild.id].muteRoleName.toLowerCase());
  if(!mutedRole){
    mutedRole = guild.roles.find(role => role.name.toLowerCase() === "muted");
  }

  let user = message.mentions.users.first()
  if(user.id == client.user.id){
    return message.channel.send(":(");
  }

  let moderator = message.author.username

  const ms = require("ms")
  const time = args[1]

  if(!user){return message.reply("Please mention a user.")}
  if(!time){
    return message.reply("Please specify a time.")
  }else if(ms(time) >= 31557600000){
    return message.channel.send("`User Error` - That mute length is not sensibly long. If you want someone to shut up for a year (or longer), try banning them.")
  }

  if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()};
  if (args.length >= 2){
  function addmute(){
    guild.member(user).addRole(mutedRole)
  }
  setTimeout(addmute, 500)

  var muteMsg = require("../config.json")[guild.id].muteMessage
  if(!muteMsg || muteMsg === "null"){
    user.send(`You were muted in ${guild.name} for ${time} by ${moderator}. Please do not break the rules again as further punishment may be dealt.`)
  }else{
    user.send(muteMsg)
  }

  message.channel.send(`Shade \`Success\` - User muted for \`${ms(ms(time), {long: true})}.\`.`)
  .then(message=>message.react('✅'));

  setTimeout(function() {
    guild.member(user).removeRole(mutedRole)
    const unmuteEmbed = new Discord.RichEmbed()
      .addField(`${user.tag} was unmuted automatically.`, `They were muted for ${time}`)
      .setTimestamp(message.createdAt)
      .setColor(message.guild.member(client.user).highestRole.color)
      .setFooter("Automated Mod Logging");
    logchannel.send(`**Infraction for: **${user}`, {embed: unmuteEmbed});
  }, ms(time));
  var reason = args.slice(2).join(" ")
  if(!reason){
    reason = "No Reason"
  }

  const embed = new Discord.RichEmbed()
    .setAuthor(`Muted: ${user.username}`)
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("Muted By: ", moderator, true)
    .addField("Reason: ", reason, true)
    .addField("Time: ", time, true)
    .setFooter("Automated Mod Logging");

    logchannel.send(`**Infraction for: **${user}`, {embed}).catch(console.log)

  }else{
    message.reply("Shade \`Error`\ - You must add a reason!")
    .then(message=>message.react('❎'));
  }
}
