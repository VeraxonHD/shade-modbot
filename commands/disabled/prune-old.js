exports.run = (client, message, args) => {
      //gets the amount of messages to send
      let messagecount = parseInt(args[0]);
      //fetches the messages into an array
      message.channel.fetchMessages({limit: messagecount + 1})
      //then deletes them
          .then(messages => message.channel.bulkDelete(messages));
          //le confirmation message
      message.channel.send(`Eos \`Success\` - **${messagecount}** messages deleted successfuly!`)
      .then(message=>message.react('✅'));
 }
