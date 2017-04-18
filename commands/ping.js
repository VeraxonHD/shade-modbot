exports.run = (client, message, args) => {
  	let time = Date.now();
  	message.channel.sendMessage(`Pong! \`${Date.now() - time}ms\``).then(console.log())
  }
