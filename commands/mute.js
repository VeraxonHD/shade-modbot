exports.run = (client, message, args, Discord, sql) => {
  var guild = message.guild;
  var config = require("../config.json");
  var mutes = require("../mutes.json");
  var mutedRole = guild.roles.find(role => role.name.toLowerCase() === config[guild.id].muteRoleName.toLowerCase());
  var logchannel = message.guild.channels.get(config[guild.id].modlogchannelID);
  var user = message.mentions.users.first();
  var moderator = message.author.username;
  var ms = require("ms");
  var time = args[1];
  var jsonfile = require("jsonfile");
  var reason = args[2];
  var dateformat = require("dateformat");
  var timeFormatted = dateformat(Date.now() + ms(time), "dd/mm/yyyy HH:MM:ss");

  if(!logchannel || logchannel === "null"){
    logchannel = message.guild.channels.get(config[guild.id].logchannelID);
  }
  if(!mutedRole){
    mutedRole = guild.roles.find(role => role.name.toLowerCase() === "muted");
    if(!mutedRole){
      return message.channel.send("Please add a muted role to the config. You cannot mute someone without such a role. Consult the docs page for more info.");
    }
  }
  if(user.id == client.user.id){
    return message.channel.send(":(");
  }
  if(!reason){
    reason = "No Reason Supplied.";
  }

  guild.member(user).addRole(mutedRole);
  mutes[user.id] = {
    "guild" : guild.id,
    "time" : Date.now() + ms(time)
  }

  jsonfile.writeFile("./mutes.json", mutes, {spaces: 4}, err =>{
    if(!err){
      message.channel.send("`Eos Success` - User muted successfully.");
    }else{
      message.channel.send("`Eos Error` - User could not be muted.");
      console.log(err);
    }
  })

  const embed = new Discord.RichEmbed()
    .addField("User Muted", user.username)
    .addField("Estimated Unmute Time", timeFormatted)
    .addField("Reason", reason)
    .addField("Moderator", moderator)
    .setColor(message.guild.member(client.user).highestRole.color)
    .setFooter("Automated mod logging")
    .setTimestamp(message.createdAt);
  logchannel.send(`**Infraction for:** <@${user.id}>`, {embed});

  if(config[guild.id].muteMessage == "null"){
    user.send(`You have been muted in ${guild.name} for ${reason}. You will be umuted in ${time}.`);
  }else{
    user.send(config[guild.id].muteMessage);
  }
}
