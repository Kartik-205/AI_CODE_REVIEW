// const axios = require('axios');
// const { buildPrompt } = require('./prompt');

// const reviewWithGemini = async (code, language) => {
//   const prompt = buildPrompt(code, language);

//   const response = await axios.post(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     {
//       contents: [{ parts: [{ text: prompt }] }],
//       generationConfig: {
//         temperature: 0.3,
//         maxOutputTokens: 4096,
//       },
//     },
//     { headers: { 'Content-Type': 'application/json' } }
//   );

//   const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//   if (!text) throw new Error('Empty response from Gemini');
//   return text;
// };

// module.exports = { reviewWithGemini };

const axios = require("axios");
const { buildPrompt } = require("./prompt");

const reviewWithGemini = async (code, language) => {
  const prompt = buildPrompt(code, language);

  console.log("Gemini call ho raha hai...");

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    },
  );

  console.log("Gemini response aaya!");

  const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return text;
};

module.exports = { reviewWithGemini };
