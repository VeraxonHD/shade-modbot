exports.run = (client, message, args, Discord, sql) => {
  var chan = message.channel;
  var guild = message.guild;
  var userid = message.author.id;
  var modname = guild.members.get(userid).displayName;

  var react = require("../eos.js");
  if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()};

  chan.overwritePermissions(guild.id, {
    "SEND_MESSAGES" : false
  });
  chan.send("Riot Mode was enabled. Regular users are no-longer able to chat here.");

  const embed = new Discord.RichEmbed()
    .setAuthor("LOCKDOWN INITIATED")
    .addField("Lockdown initiated by", modname, true)
    .addField("Lockdown channel", chan.name, true)
    .addField("Lockdown initiated at", new Date(), false)
    .setColor("#FF0000");

    const config = require ("../config.json")
    const logchannel = message.guild.channels.get(config[guild.id].logchannelID)
    logchannel.send({embed}).catch(console.log)
}
