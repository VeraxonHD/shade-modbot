exports.run = (client, message, args, Discord) => {

function embedsend(){
  message.channel.send({embed})
}

  var dateformat = require("dateformat")
  var username = message.mentions.users.first()
  var userid = username.id
  var guild = message.guild
  var nickname = guild.members.get(userid).displayName
  var joined = guild.members.get(userid).joinedAt

  var embed = new Discord.RichEmbed()
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("User info for", username.tag, true)
    .addField("User ID", userid, true)
    .addField("Joined", dateformat(joined, "dd/mm/yyyy \nhh:MM:ss") + " GMT", true)
    .setFooter(`Requested by ${message.author.username}`)
    .setThumbnail(username.avatarURL)

  if(args.length < 1){
    message.reply("Shade \`Error`\ - You must identify a user to list.")
    .then(message=>message.react('❎'));
  }else{
    let messageid = guild.members.get(userid).lastMessageID
    if(!messageid){
      let lastseen = "N/A"
      embed.addField("Last Seen", lastseen, true)
      embedsend()
    }else{
      message.channel.fetchMessage(messageid)
      .then((lastseen) => {
        embed.addField("Last Seen", "At: " + dateformat(lastseen.createdAt, "dd/mm/yyyy, hh:MM:ss") + " GMT\n" + `In: #${lastseen.channel.name}`, true)
        embedsend()
      }).catch(console.log)
    }

}}
