exports.run = (client, message, args, Discord, sql) => {
const guild = message.guild;
const user = message.mentions.users.first();
const permission = message.channel.guild.member(message.author.id).hasPermission("MANAGE_ROLES");
const role = guild.roles.find(role => role.name.toLowerCase() === args[1].toLowerCase());
var member = guild.members.get(user.id);
const config = require ("../config.json")
const logchannel = message.guild.channels.get(config[guild.id].logchannelID)

  if(!user){
    message.channel.send("`User Error` - Could not find this user. Please mention a valid user.");
  }else if(!role){
    message.channel.send("`User Error` - Could not find this role. Remember that this argument does not require a role to be '@' mentioned.");
  }else if(!permission){
    message.channel.send("`User Error` - You do not haver permission to perform this command. Please contact a server administrator.");
  }else if(guild.member(user).roles.has(role.id) == true){
    message.channel.send(`\`Eos Error\` - ${guild.member(user).displayName} could not be given this role as they already have it.`)
  }else if(member.roles.size > 0 && member.highestRole.comparePositionTo(role) >= 0){
    return message.channel.send("`Eos Error` - That role cannot be applied to that user.");
  }else{
    guild.member(user).addRole(role).then(gm => {
      if(guild.member(user).roles.has(role.id) == true){
        message.channel.send(`\`Eos Success\` - ${gm.displayName} was given the specified role.`)
        const embed = new Discord.RichEmbed()
          .setColor(message.guild.member(client.user).highestRole.color)
          .setTimestamp(message.createdAt)
          .addField(`${user.tag}'s roles were updated'`, `New Role: ${role.name}`)
          .setFooter("Automated Mod Logging");

        logchannel.send(`**Role updated for: **${user}`).catch(console.log)
      }else{
        message.channel.send(`\`Eos Error\` - ${gm.displayName} could not be given this role. This is probably a permission error.`)
      }
    })
  }
}
