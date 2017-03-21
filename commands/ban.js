exports.run = (client, message, args) => {
  //Requires the d.js module for d.js specific shizzle
  const Discord = require("discord.js");
  //The targeted channel (aka mod log channel)
  var tgtchannel = message.guild.channels.get("292956168316256256");
  //the user to be banned
  var banneduser = message.mentions.users.first()
  //saves the ban perms in a compact variable
  let banPerms = message.channel.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")

  //if the bot doesn't have the permissions
  if(!banPerms){
    message.channel.sendMessage("Eos `Error` - Permission banMembers missing.")
    .then(message=>message.react('❎'));
  }else{
      //if the user is bannable
      if (message.mentions.users.first().bannable = true){
        //send the confirmation message, add a react and ban the user
        message.channel.sendMessage("Eos \`Success`\ - User banned successfully.")
        .then(message=>message.react('✅'));
        message.channel.guild.ban(banneduser.id, 7)
        //builds the embed for the log channel
        const embed = new Discord.RichEmbed()
          .setAuthor((`Banned \`${banneduser.id.username}\``))
          .setColor(0x00AE86)
          .setTimestamp(message.createdAt)
          .addField("Banned By: ", message.author.username, true)
          .addField("Reason: ", args.join(" ").slice(21), true)
          .setFooter("Automated Mod Logging");
          //sends the embed
          tgtchannel.sendEmbed(
            embed,
            {disableEveryone: true })
    }else{
      //oddly unlikely not-able-to-ban message
      message.channel.sendMessage("This user could not be banned.")
    }
  }
}
