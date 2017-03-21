exports.run = (client, message, args) => {
  //Requires the d.js module for d.js specific shizzle
  const Discord = require("discord.js");
  //The targeted channel (aka mod log channel)
  var tgtchannel = message.guild.channels.get("292956168316256256");
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
        message.channel.sendMessage("Eos \`Success`\ - User kicked successfully.")
        .then(message=>message.react('✅'));
        message.channel.guild.kick(kickeduser.id, 7)
        //builds the embed for the log channel
        const embed = new Discord.RichEmbed()
          .setAuthor((`Kicked \`${kickeduser.id.username}\``))
          .setColor(0x00AE86)
          .setTimestamp(message.createdAt)
          .addField("Kicked By: ", message.author.username, true)
          .addField("Reason: ", args.join(" ").slice(21), true)
          .setFooter("Automated Mod Logging");
          //sends the embed
          tgtchannel.sendEmbed(
            embed,
            {disableEveryone: true })
    }else{
      //oddly unlikely not-able-to-kick message
      message.channel.sendMessage("This user could not be kicked.")
    }
  }
}
