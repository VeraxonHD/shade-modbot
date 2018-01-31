exports.run = (client, message, args, Discord, sql) => {
  const react = require("../eos.js")

  var guild = message.guild

  if(message.author.id !== "213040107278696450"){return react.noPermReact()
  }else{
  // deletes the cache of the command and then re-loads the code.
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  //Sends the confirmation message and slaps a react on that a$$
  let executor = message.author
  if(args.length < 1){
    message.channel.send("Shade \`Error`\ - You must define a command to reload")
      .then(message=>message.react('❎'));
  }
  message.channel.send(`Shade \`Success\` - The command **${args[0]}** has been reloaded!`).catch(console.log)
  .then(message=>message.react('✅'));

  const embed = new Discord.RichEmbed()
    .addField("Command Reloaded", `${executor.username} reloaded "${args[0]}"`)
    .setColor(message.guild.member(client.user).highestRole.color);

  const config = require ("../config.json")

  const logchannel = message.guild.channels.get(config[guild.id].logchannelID)
  logchannel.send({embed}).catch(console.log)
}};
