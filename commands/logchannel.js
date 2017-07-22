exports.run = (client, message, args, Discord, sql) => {
  var guild = message.guild
  var serverid = guild.id
  const react = require("../eos.js")

  if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()}
  if(args[0] == "get"){
        sql.get(`SELECT * FROM channels WHERE serverid = "${serverid}"`).then(row => {
          if(!row){
            message.channel.send("Eos `Error` - No log channel found. Try setting it first!")
          }else{
            const tgtchannel = message.guild.channels.get(row.channelid)
            tgtchannel.send("this is the log channel")
        }
      }).catch(err => {console.error(err)})

  }else if(args[0] == "set"){
    sql.get(`SELECT * FROM channels WHERE serverid = "${serverid}"`).then(row => {
      sql.run(`DELETE FROM channels WHERE serverid = "${serverid}"`).catch(console.log("delete"))
      sql.run('INSERT INTO channels (serverid, channelid) VALUES (?, ?)', [serverid, args[1]]).catch(console.log("insert"))
    }).catch(err => {
      console.error(err)
      sql.run('INSERT INTO channels (serverid, channelid) VALUES (?, ?)', [serverid, args[1]]).catch(console.log("in catch"))
    })
  }else{
    message.channel.send("Eos `Error` - Please define if you wish to set or get the log channel.")
  }
}
