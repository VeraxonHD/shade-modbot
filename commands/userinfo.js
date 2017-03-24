exports.run = (client, message, args) => {
  const Discord = require("discord.js")
  var username = message.mentions.users.first().username
  //currently shows undefined
  var nickname = message.mentions.users.first().nickname
  var userid = message.mentions.users.first().id
  var discrim = message.mentions.users.first().discriminator
  if(args.length < 1){
    message.reply("Eos \`Error`\ - You must identify a user to list.")
    .then(message=>message.react('❎'));
  }else{
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp(message.createdAt)
    .addField("User info for", username, true)
    .addField("Current Nickname", nickname, true)
    .addField("User ID", userid, true)
    .addField("Discriminator", discrim, true)
    .setFooter(`Info on ${username} requested by ${message.author.username}`);
    //sends the embed
    message.channel.sendEmbed(
      embed,
    {disableEveryone: true })
  }
}
