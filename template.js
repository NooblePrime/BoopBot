var Discord = require('discord.js');
module.exports = {
    name: 'name',
    function: function(msg) {
        if (msg.channel.type === "dm") {
            msg.channel.send("You can't use commands in DMs.")
          }
          else {






          }
        }
    }