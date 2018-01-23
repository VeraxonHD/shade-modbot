exports.run = (client, message, args, Discord) => {
  var guild = message.guild
  var config = require("../config.json")

  message.channel.delete().then(delchan => {
    var logchannel = guild.channels.get(config[guild.id].logchannelID)
    var embed = new Discord.RichEmbed()
      .addField("Thread Deleted", delchan.name, true)
      .addField("Deleted by: ", message.author.username, true)
      .setTimestamp(new Date());

    logchannel.send({embed})
  })
}
