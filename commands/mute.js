exports.run = (client, message, args, Discord) => {
  //The ID for the guild (temp)
  let guild = message.guild
  //The ID for the muted role
  let mutedRole = guild.roles.find(role => role.name.toLowerCase() === "muted");
  //the user's mentionable
  let user = message.mentions.users.first()
  //The moderator's username
  let moderator = message.author.username
  // The log channel
  const tgtchannel = message.guild.channels.find('name', 'log-channel')

  //Removes the default role (temp) and replaces it with the muted role
  guild.member(user).setRoles([])
  guild.member(user).addRole(mutedRole)

  //Notifies the user
  user.sendMessage(`Eos \`Info\` Dear user: You have been muted in \`${guild.name}\` by \`${moderator}\`. Please read the rules and try not to break them again.`)

  //Notifies the moderator
  message.channel.sendMessage("Eos \`Success`\ - User muted successfully.")
  .then(message=>message.react('✅'));

  //Sets up and sends the embed.
  const embed = new Discord.RichEmbed()
    .setAuthor(`Muted: ${user.username}`)
    .setColor(0x00AE86)
    .setTimestamp(message.createdAt)
    .addField("Muted By: ", moderator, true)
    .addField("Reason: ", args.slice(1).join(" "), true)
    .setFooter("Automated Mod Logging");
  console.log(embed.fields)
  tgtchannel.sendEmbed(
    embed,
  {disableEveryone: true })//.catch(console.error)
  }
