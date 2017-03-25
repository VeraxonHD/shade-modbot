exports.run = (client, message, args) => {
  // deletes the cache of the command and then re-loads the code.
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  //Sends the confirmation message and slaps a react on that a$$
  let guild = message.guild
  let executor = message.author

  if(!guild.member(executor).hasPermission("MANAGE_MESSAGES")){
    message.reply("Eos \`Error`\ - You do not have permission to do that!")
      .then(message=>message.react('❎'));
    return;
  }

  if(args.length < 1){
    message.channel.sendMessage("Eos \`Error`\ - You must define a command to reload")
      .then(message=>message.react('❎'));
  }
  message.channel.sendMessage(`Eos \`Success\` - The command **${args[0]}** has been reloaded!`).catch(console.log)
  .then(message=>message.react('✅'));
};
