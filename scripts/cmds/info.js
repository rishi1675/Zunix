const moment = require('moment-timezone');
const axios = require('axios');

module.exports = {
  config: {
    name: "info",
    aliases: ["inf", "in4"],
    version: "2.0",
    author: "Eren",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Sends information about the bot and admin along with a video."
    },
    longDescription: {
      en: "Sends information about the bot and admin along with a video."
    },
    category: "Information",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {
    this.sendInfo(message);
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.sendInfo(message);
    }
  },

  sendInfo: async function (message) {
    const botName = "🕸️ 𝐒𝐩𝐢𝐝𝐞𝐘🕷️";
    const authorName = "Evaan";
    const authorFB = "fb.com/mahi68x";
    const authorInsta = "raadx102";
    const status = "𝗦𝗶𝗻𝗴𝗹𝗲";

    const now = moment().tz('Asia/Dhaka');
    const time = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

    const videoUrl = "https://files.catbox.moe/lphsv4.mp4";

    const body = `

┏━━━━━━━━━━━━━━━━┓
┃ 🧑 Admin Info
┃ ╰➤ Name: ${RISHI}
┃ ╰➤ Facebook: ${BOSS}
┃ ╰➤ Instagram: ${NAI}
┃ ╰➤ Status: ${status}
┃
┃ 🤖 Bot Details
┃ ╰➤ Name: ${HINTA}
┃ ╰➤ Time: ${time}
┃ ╰➤ Uptime: ${uptimeString}
┗━━━━━━━━━━━━━━━━┛

I may not be perfect,
   but I’ll always reply to you.`;

    const response = await axios.get(videoUrl, { responseType: 'stream' });

    message.reply({
      body,
      attachment: response.data
    });
  }
};
