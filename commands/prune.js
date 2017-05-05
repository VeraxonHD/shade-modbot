exports.run = (client, message, args) => {
  const react = require("../eos.js")
  const guild = message.guild
  let messagecount = parseInt(args[0]);

  if (!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()}

  if(!args[0]){
    message.channel.sendMessage("Eos `Error` - Please define a number of channels to delete or a specific user's messages to delete.\n\`\`\`Usage: \n!prune <amount> or !prune <user> <amount> \`\`\`")
  }else if(messagecount >= 100){return message.channel.sendMessage("Eos `Error` - You cannot delete more than 100 messages at once!")
  }else if(args[1]){
    const target = message.mentions.users.first()

      message.channel.fetchMessages({limit: messagecount + 1})
        .then(messages => {
          var msgArray = messages.array()
          msgArray = msgArray.filter(m => m.author.id === target.id)
          msgArray.length = messagecount + 1
          msgArray.map(m => m.delete().catch(console.error))
        })
    message.channel.sendMessage(`Eos \`Success\` - **${messagecount}** messages from user **${target}** deleted successfuly!`)
      .then(message=>message.react('✅'))

    }else if(args[0]){
        message.channel.fetchMessages({limit: messagecount + 1})
        //then deletes them
            .then(messages => message.channel.bulkDelete(messages));
        //le confirmation message
        message.channel.sendMessage(`Eos \`Success\` - **${messagecount}** messages deleted successfuly!`)
          .then(message=>message.react('✅'));
 }
 }
