exports.run = (client, message, args) => {
  const react = require("../eos.js")
  const guild = message.guild
  let messagecount = parseInt(args[0]);

  if (!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()}

  if(!args[0]){
    message.channel.send("Shade `Error` - Please define a number of channels to delete or a specific user's messages to delete.")
  }else if(messagecount >= 100){
    return message.channel.send("Shade `Error` - You cannot delete 100 or more messages at once!")
  }else if(args[1]){
    const target = message.mentions.users.first()

      message.channel.fetchMessages({limit: messagecount + 1})
        .then(messages => {
          var msgArray = messages.array()
          msgArray = msgArray.filter(m => m.author.id === target.id)
          message.channel.bulkDelete(msgArray, true)
        })

    message.channel.send(`Shade \`Success\` - **${messagecount}** messages from user **${target}** deleted successfuly!`)
      .then(message=>message.react('✅'))

    }else if(args[0]){
        message.channel.fetchMessages({limit: messagecount + 1})
        //then deletes them
            .then(messages => message.channel.bulkDelete(messages, true))
        //le confirmation message
        message.channel.send(`Shade \`Success\` - **${messagecount}** messages deleted successfuly!`)
          .then(message=>message.react('✅'));
    }
 }
