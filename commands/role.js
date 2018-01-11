exports.run = (client, message, args, Discord, sql) => {
const guild = message.guild;
const user = message.mentions.users.first();
const permission = message.channel.guild.member(message.author.id).hasPermission("MANAGE_ROLES");
const role = guild.roles.find(role => role.name.toLowerCase() === args[1].toLowerCase());

  if(!user){
    message.channel.send("`User Error` - Could not find this user. Please mention a valid user.");
  }else if(!role){
    message.channel.send("`User Error` - Could not find this role. Remember that this argument does not require a role to be '@' mentioned.");
  }else if(!permission){
    message.channel.send("`User Error` - You do not haver permission to perform this command. Please contact a server administrator.");
  }else if(guild.member(user).roles.has(role.id) == true){
    message.channel.send(`\`Eos Error\` - ${guild.member(user).displayName} could not be given this role as they already have it.`)
  }else{
    guild.member(user).addRole(role).then(gm => {
      if(guild.member(user).roles.has(role.id) == true){
        message.channel.send(`\`Eos Success\` - ${gm.displayName} was given the specified role.`)
      }else{
        message.channel.send(`\`Eos Error\` - ${gm.displayName} could not be given this role. This is probably a permission error.`)
      }
    })
  }

  const embed = new Discord.RichEmbed()
   .setColor(message.guild.member(client.user).highestRole.color)
   .setTimestamp(message.createdAt)
   .addField(`${user.tag}'s roles were updated'`, `New Role: ${role.name}`)
   .setFooter("Automated Mod Logging");

  const config = require ("../config.json")
  const logchannel = message.guild.channels.get(config[guild.id].logchannelID)
  logchannel.send({embed}).catch(console.log)
}
