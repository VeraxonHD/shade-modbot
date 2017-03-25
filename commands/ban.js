exports.run = (client, message, args, Discord) => {
  //The targeted channel (aka mod log channel)
  const tgtchannel = message.guild.channels.find('name', 'log-channel')
  //the user to be banned
  var banneduser = message.mentions.users.first()
  //saves the ban perms in a compact variable
  let banPerms = message.channel.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")
  let guild = message.guild

  if(!guild.member(moderator).hasPermission("BAN_MEMBERS")){
    message.reply("Eos \`Error`\ - You do not have permission to do that!")
      .then(message=>message.react('❎'));
    return;
  }

  //if the bot doesn't have the permissions
  if(!banPerms){
    message.channel.sendMessage("Eos `Error` - Permission banMembers missing.")
    .then(message=>message.react('❎'));
  }else{
      //if the user is bannable
      if (message.mentions.users.first().bannable = true){
        //send the confirmation message, add a react and ban the user
        if (args.length >= 2){
        message.guild.member(banneduser).ban()
        .then(message.channel.sendMessage("Eos \`Success`\ - User banned successfully.")
        .then(message=>message.react('✅')));
        //builds the embed for the log channelOh
        const embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setTimestamp(message.createdAt)
          .addField("User Banned: ", banneduser, true)
          .addField("Banned By: ", message.author.username, true)
          .addField("Reason: ", args.slice(1).join(" "), true)
          .setFooter("Automated Mod Logging");
          //sends the embed
          tgtchannel.sendEmbed(
            embed,
          {disableEveryone: true })
        }else{
          message.reply("Eos \`Error`\ - You must add a reason!")
          .then(message=>message.react('❎'));
      }
    }
  }
}
