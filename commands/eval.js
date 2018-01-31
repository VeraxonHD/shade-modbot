exports.run = (client, message, params, command) => {
  const config = require("../config.json");
  const guild = message.guild;
  const tags = require("../tags.json");
  const warnings = require("../warnings.json");
  const commands = require("../commands.json");
  if(message.author.id != config.general.ownerID) return

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

    message.channel.send(clean(evaled))
    .then(message=>message.react('✅'));
  } catch (err) {
    message.channel.send(`\`Code execution failed.\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    .then(message=>message.react('❎'));
}};
