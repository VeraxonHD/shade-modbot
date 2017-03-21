exports.run = (client, message, args) => {
  // Discord constant, as per.
  const Discord = require("discord.js")
  //The ID for the guild (temp)
  let guild = client.guilds.get('292941255976026114')
  //The ID for the muted role
  let mutedRole = guild.roles.find(role => role.name.toLowerCase() === "muted");
  //the user's mentionable
  let user = message.mentions.users.first()
  //The moderator's username
  let moderator = message.author.username
  // The log channel
  const tgtchannel = message.guild.channels.get("292956168316256256");

  //Removes the default role (temp) and replaces it with the muted role
  guild.member(user).removeRole("292955645513170944")
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
    .addField("Reason: ", args[1], true)
    .setFooter("Automated Mod Logging");
  console.log(embed.fields)
  tgtchannel.sendEmbed(
  embed,
  {disableEveryone: true })//.catch(console.error)
  }