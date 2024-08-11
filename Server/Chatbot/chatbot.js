const { GoogleGenerativeAI } = require("@google/generative-ai");

const chatbot = async (res, req) => {
    const { prompt } = req.body;
    const genAI = new GoogleGenerativeAI('AIzaSyD1--HkIV2HqaR2rwa3TOkScfCmPK6Zt0k');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { "responseMimeType": "application/json" } });
    const result = await model.generateContent([prompt]
    );
    res.status(200).json({ output: JSON.parse(result.response.text()) })
}
module.exports = { chatbot };