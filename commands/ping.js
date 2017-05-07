exports.run = (client, message, args) => {
  	let time = Date.now();
  	message.channel.send(`Pong! \`${Date.now() - time}ms\``).then(console.log())
  }
