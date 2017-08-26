exports.run = (client, message, args, Discord, sql) => {
  var react = require("../eos.js")
  var guild = message.guild
  //The ID for the muted role
  let mutedRole = guild.roles.find(role => role.name.toLowerCase() === "muted");
  //the user's mentionable
  let user = message.mentions.users.first()
  //The moderator's username
  let moderator = message.author.username
  // The log channel
  //const tgtchannel = message.guild.channels.find('name', 'log-channel')
  const ms = require("ms")
  const time = args[1]

  if(!user){return message.reply("Please mention a user.")}
  if(!time){return message.reply("Please specify a time.")}

  if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()};
  if (args.length >= 2){
  function addmute(){
    guild.member(user).addRole(mutedRole)
  }
  setTimeout(addmute, 500)
  //Notifies the user
  user.send(`Eos \`Info\` \nDear user: You have been muted in \`${guild.name}\` by \`${moderator}\` for \`${ms(ms(time), {long: true})}.\` \nPlease read the rules and try not to break them again.`)

  //Notifies the moderator
  message.channel.send(`Eos \`Success\` - User muted for \`${ms(ms(time), {long: true})}.\`.`)
  .then(message=>message.react('✅'));

  setTimeout(function() {
    guild.member(user).removeRole(mutedRole)
  }, ms(time));

  //Sets up and sends the embed.
  const embed = new Discord.RichEmbed()
    .setAuthor(`Muted: ${user.username}`)
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("Muted By: ", moderator, true)
    .addField("Reason: ", args.slice(2).join(" "), true)
    .setFooter("Automated Mod Logging");

  sql.get(`SELECT * FROM channels WHERE serverid = "${guild.id}"`).then(row => {
      var tgtchannel = message.guild.channels.get(row.channelid)
      tgtchannel.send({embed})
  }).catch(err => {
    console.log(err)
  })

  }else{
    message.reply("Eos \`Error`\ - You must add a reason!")
    .then(message=>message.react('❎'));
  }
}
