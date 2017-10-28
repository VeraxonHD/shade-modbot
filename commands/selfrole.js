exports.run = (client, message, args) => {

  const config = require("../config.json")
  const guild = message.guild;

  if(config[guild.id].selfRoles === ""){return message.reply("There are no selfroles available. Please get the server owner to change the values.")}
  const user = message.author.id;
  const role = guild.roles.find("name", args[0]);

  if(!role){
    return message.reply("That role has not been created. Please contact a server administrator!")
  }

  if(config[guild.id].selfRoles.indexOf(role) !== 0){
    if(guild.member(user).roles.has(role.id)){
      guild.member(user).removeRole(role)
      message.reply("You have removed the " + role.name + " role!")
    }else{
      guild.member(user).addRole(role)
      message.reply("You have been given the " + role.name + " role!")
    }
  }else{
    message.reply("That is not one of the SelfRoles available for use in this server. Sorry!")
  }
}
