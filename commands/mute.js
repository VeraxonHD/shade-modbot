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
  if (args.length >= 2){
  //Removes all roles and replaces them with the muted role
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
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("Muted By: ", moderator, true)
    .addField("Reason: ", args.slice(1).join(" "), true)
    .setFooter("Automated Mod Logging");
  console.log(embed.fields)
  tgtchannel.sendEmbed(
    embed,
  {disableEveryone: true })//.catch(console.error)
  }else{
    message.reply("Eos \`Error`\ - You must add a reason!")
    .then(message=>message.react('❎'));
  }
}
