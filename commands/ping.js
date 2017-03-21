exports.run = (client, message, args) => {
  //foobar?
  message.channel.sendMessage("pong!").catch(console.error)
}
