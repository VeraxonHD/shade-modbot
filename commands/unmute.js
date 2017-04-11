exports.run = (client, message, args, Discord) => {
  var react = require("../eos.js")
  var guild = message.guild
  //The ID for the muted role
  let mutedRole = guild.roles.find(role => role.name.toLowerCase() === "muted");
  //the user's mentionable
  let user = message.mentions.users.first()
  //The moderator's username
  let moderator = message.author.username
  // The log channel
  const tgtchannel = message.guild.channels.find('name', 'log-channel')

  if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()};

  //Removes the muted role and replaces it with the normal role (temp)
  guild.member(user).removeRole(mutedRole)
  //guild.member(user).addRole("292955645513170944")

  //Notifies the user
  user.sendMessage(`Eos \`Info\` \nDear user: You have been un-muted in \`${guild.name}\` by \`${moderator}\`. Welcome back.`)
    .then(message=>message.react('ℹ️'));

  //Notifies the moderator
  message.channel.sendMessage("Eos \`Success`\ - User un-muted successfully.")
  .then(message=>message.react('✅'));

  //Sets up and sends the embed.
  const embed = new Discord.RichEmbed()
    .setAuthor(`Un-Muted:  ${user.username}`)
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("Un-Muted By: ", moderator, true)
    .setFooter("Automated Mod Logging");
  console.log(embed.fields)
  tgtchannel.sendEmbed(
  embed,
  {disableEveryone: true })
  }
