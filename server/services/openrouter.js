// const axios = require('axios');
// const { buildPrompt } = require('./prompt');

// const reviewWithOpenRouter = async (code, language, model = 'openai/gpt-4o-mini') => {
//   const prompt = buildPrompt(code, language);

//   const response = await axios.post(
//     'https://openrouter.ai/api/v1/chat/completions',
//     {
//       model,
//       messages: [{ role: 'user', content: prompt }],
//       temperature: 0.3,
//       max_tokens: 4096,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         'Content-Type': 'application/json',
//         'HTTP-Referer': 'http://localhost:5173',
//         'X-Title': 'AI Code Reviewer',
//       },
//     }
//   );

//   const text = response.data?.choices?.[0]?.message?.content;
//   if (!text) throw new Error('Empty response from OpenRouter');
//   return text;
// };

// module.exports = { reviewWithOpenRouter };



const axios = require('axios');
const { buildPrompt } = require('./prompt');

const reviewWithOpenRouter = async (code, language, model = 'meta-llama/llama-3.1-8b-instruct:free') => {
  const prompt = buildPrompt(code, language);

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 4096,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'AI Code Reviewer',
      },
    }
  );

  const text = response.data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from OpenRouter');
  return text;
};

module.exports = { reviewWithOpenRouter };




// const axios = require('axios');
// const { buildPrompt } = require('./prompt');

// const reviewWithOpenRouter = async (code, language, model = 'meta-llama/llama-3.1-8b-instruct:free') => {
//   const prompt = buildPrompt(code, language);

//   const response = await axios.post(
//     'https://openrouter.ai/api/v1/chat/completions',
//     {
//       model,
//       messages: [{ role: 'user', content: prompt }],
//       temperature: 0.3,
//       max_tokens: 4096,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         'Content-Type': 'application/json',
//         'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:5173',
//         'X-Title': 'AI Code Reviewer',
//       },
//     }
//   );

//   const text = response.data?.choices?.[0]?.message?.content;
//   if (!text) throw new Error('Empty response from OpenRouter');
//   return text;
// };

// module.exports = { reviewWithOpenRouter };