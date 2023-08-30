const Discord = require("discord.js"),
  os = require('os');

exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setTimestamp()
    .addField(`:map: Sunucu Sayısı:`, `${client.guilds.cache.size}`, true)
    .addField(`:bust_in_silhouette: Kullanıcı Sayısı:`, `${client.users.cache.size}`, true)
    .addField(`:speech_balloon:  Kanal Sayısı`, `${client.channels.cache.size}`, true)
    .addField(`:desktop: Sistem:`, `${os.platform()}`, true)
    .addField(`:gear: Mimari`, `${os.arch()}`, true)
    .addField(`:rocket:  İşlemci`, `${os.cpus().map(i => `${i.model}`)[0]}`, true)
    .addField(`:pager: RAM`, `${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(os.totalmem() / 1024 / 1024)) * 100)}%)`, true)
    .addField(`:dividers: Lib`, `Discord.js ${Discord.version}`, true)
    .addField(`:alarm_clock: Uptime`, "" + (Math.round(client.uptime / (1000 * 60 * 60))) + " Heure(s), " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minute(s) et " + (Math.round(client.uptime / 1000) % 60) + " seconde(s)" + "")
    .setFooter(client.footer)

  message.channel.send(embed);
};

exports.help = {
  name: "stats",
  description: "Give stats of the bot.",
  usage: "stats",
  example: "stats"
};

exports.conf = {
  aliases: [],
  cooldown: 5
};