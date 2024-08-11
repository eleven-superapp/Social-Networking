const { wellness } = require("./data");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyD1--HkIV2HqaR2rwa3TOkScfCmPK6Zt0k');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({

    history: [
        {
            role: "user",
            parts: [
                {
                    text: "You are going to act as an assistant in my app.And your name for the time being is Eleven Assistant if someone ask you.Use emojies and a fun tone.Here are furtur details the user may ask " + wellness
                }
            ]
        },
        {
            role: "model",
            parts: [
                {
                    text: "Response message here"
                }
            ]
        }
    ],
    generationConfig: {
        maxOutputTokens: 1000,
    },
});
module.exports = { chat }