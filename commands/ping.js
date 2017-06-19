exports.run = (client, message, args) => {
  	let time = Date.now();
  	message.channel.send(`Pong!`).then(msg =>{
        msg.edit(`Pong! Time taken: \`${Date.now() - time}ms\``)
      })
}
