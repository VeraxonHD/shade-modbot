exports.run = (client, message, args, Discord) => {
  //The targeted channel (aka mod log channel)
  const tgtchannel = message.guild.channels.find('name', 'log-channel')
  //the user to be kicked
  var kickeduser = message.mentions.users.first()
  //saves the kick perms in a compact variable
  let kickPerms = message.channel.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")

  //if the bot doesn't have the permissions
  if(!kickPerms){
    message.channel.sendMessage("Eos `Error` - Permission KICK_MEMBERS missing.")
    .then(message=>message.react('❎'));
  }else{
      //if the user is kickable
      if (message.mentions.users.first().kickable = true){
        //send the confirmation message, add a react and kick the user
        if (args.length >= 2){
        message.guild.member(kickeduser).kick()
        .then(message.channel.sendMessage("Eos \`Success`\ - User kicked successfully.")
        .then(message=>message.react('✅')));
        //builds the embed for the log channelOh
        const embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setTimestamp(message.createdAt)
          .addField("User Kicked: ", kickeduser, true)
          .addField("Kicked By: ", message.author.username, true)
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
