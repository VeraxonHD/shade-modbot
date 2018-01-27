exports.run = (client, message, args, Discord) => {
  var guild = message.guild
  var config = require("../config.json")
  var PastebinAPI = require('pastebin-js'),
      pastebin = new PastebinAPI({
      'api_dev_key' : 'acb37cf990dfdeb81006618f4d0ca1a9'
      });
  var logchannel = guild.channels.get(config[guild.id].logchannelID)

  message.channel.fetchMessages().then(messages =>{
    var mArray = messages.array()
    mArray.reverse();

    pastebin.createPaste({
        text: mArray.join("\n").toString(),
        title: message.channel.name.split("-").join("#"),
        format: null,
        privacy: 1,
        expiration: null
      })
      .then(function (data){
        message.channel.delete()
        .then(delchan => {
           var embed = new Discord.RichEmbed()
             .addField("Thread Deleted", delchan.name, true)
             .addField("Deleted by: ", message.author.username, true)
             .addField("Logs:", `<${data}>`)
             .setTimestamp(new Date());
           logchannel.send({embed})
         })
      })
      .catch(err =>{
        console.log(err)
      })
    })


}
