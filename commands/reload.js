exports.run = (client, message, args) => {
  // deletes the cache of the command and then re-loads the code.
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  //Sends the confirmation message and slaps a react on that a$$
  message.channel.sendMessage(`Eos \`Success\` - The command **${args[0]}** has been reloaded!`).catch(console.log)
  .then(message=>message.react('✅'));
};
