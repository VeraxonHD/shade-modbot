exports.run = (client, message, args, Discord) => {
  const react = require("../eos.js")
  const tgtchannel = message.guild.channels.find('name', 'log-channel')
  if(!message.author.id== "213040107278696450"){return react.noPermReact()}
  }else{
  // deletes the cache of the command and then re-loads the code.
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  //Sends the confirmation message and slaps a react on that a$$
  let executor = message.author
  if(args.length < 1){
    message.channel.sendMessage("Eos \`Error`\ - You must define a command to reload")
      .then(message=>message.react('❎'));
  }
  message.channel.sendMessage(`Eos \`Success\` - The command **${args[0]}** has been reloaded!`).catch(console.log)
  .then(message=>message.react('✅'));

  const embed = new Discord.RichEmbed()
    .addField("Command Reloaded", `${executor.username} reloaded "${args[0]}"`)
    .setColor(0x00AE86);

  tgtchannel.sendEmbed(
    embed,
  {disableEveryone: true })
}};
