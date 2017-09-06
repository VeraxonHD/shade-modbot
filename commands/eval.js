exports.run = (client, message, params) => {

  if(message.author.id != "213040107278696450") return

  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }
  try {
    var code = params.join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.sendCode("xl", clean(evaled))
    .then(message=>message.react('✅'));
  } catch (err) {
    message.channel.sendMessage(`\`nope.exe\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    .then(message=>message.react('❎'));
}};
