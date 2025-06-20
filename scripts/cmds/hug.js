const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "hug",
    version: "1.0",
    author: "SiAM",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Send a hug gif to one or two mentioned users.",
    },
    longDescription: {
      en: "This command sends a hug gif to one or two mentioned users.",
    },
    category: "Fun",
    guide: {
      en: "To use this command, type /hug followed by one or two user mentions.",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    // Parse mentioned users
    let uid1 = null, uid2 = null;
    const mentions = event.mentions;

    if (mentions && Object.keys(mentions).length === 2) {
      [uid1, uid2] = Object.keys(mentions);
    } else if (mentions && Object.keys(mentions).length === 1) {
      uid1 = event.senderID;
      uid2 = Object.keys(mentions)[0];
    } else {
      return message.reply("Please mention one or two users to send a hug gif.");
    }

    // Get user names
    const userInfo1 = await api.getUserInfo(uid1);
    const userInfo2 = await api.getUserInfo(uid2);
    const userName1 = userInfo1[uid1].name.split(" ").pop();
    const userName2 = userInfo2[uid2].name.split(" ").pop();

    // Fetch hug gif
    const apiUrl = "https://nekos.best/api/v2/hug?amount=1";
    try {
      const response = await axios.get(apiUrl);
      const gifUrl = response.data.results[0].url;

      const imageResponse = await axios.get(gifUrl, { responseType: "arraybuffer" });
      const outputBuffer = Buffer.from(imageResponse.data, "binary");
      const fileName = `${uid1}_${uid2}_hug.gif`;

      fs.writeFileSync(fileName, outputBuffer);

      message.reply(
        {
          body: `${userName1} 🤗 ${userName2}`,
          attachment: fs.createReadStream(fileName),
        },
        () => fs.unlinkSync(fileName)
      );
    } catch (error) {
      console.log(error);
      message.reply("❌ Failed to generate hug image. Please try again later.");
    }
  },
};
