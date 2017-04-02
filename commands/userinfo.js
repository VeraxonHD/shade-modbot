exports.run = (client, message, args, Discord) => {
  var username = message.mentions.users.first().username
  var userid = message.mentions.users.first().id
  var guild = message.guild
  var nickname = guild.members.get(userid).nickname
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
