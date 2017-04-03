exports.run = (client, message, args, Discord) => {

function embedsend(){
  message.channel.sendEmbed(
    embed,
  {disableEveryone: true })
}

  var username = message.mentions.users.first().username
  var userid = message.mentions.users.first().id
  var guild = message.guild
  var nickname = guild.members.get(userid).nickname
  var discrim = message.mentions.users.first().discriminator
  var joined = guild.members.get(userid).joinedAt

  var embed = new Discord.RichEmbed()
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("User info for", username, true)
    .addField("Current Nickname", nickname, true)
    .addField("User ID", userid, true)
    .addField("Discriminator", discrim, true)
    .addField("Joined", joined, true)
    .setFooter(`Info on ${username} requested by ${message.author.username}`);

  if(args.length < 1){
    message.reply("Eos \`Error`\ - You must identify a user to list.")
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
        embed.addField("Last Seen", lastseen.createdAt, true)
        embedsend()
      }).catch(console.log)
    }

}}
