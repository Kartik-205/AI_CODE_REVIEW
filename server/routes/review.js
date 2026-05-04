// const express = require('express');
// const rateLimit = require('express-rate-limit');
// const { reviewWithGemini } = require('../services/gemini');
// const { reviewWithOpenRouter } = require('../services/openrouter');
// const Review = require('../models/Review');

// const router = express.Router();

// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 10,
//   message: { error: 'Too many requests. Please wait a minute.' },
// });

// router.post('/', limiter, async (req, res) => {
//   const { code, language, provider = 'gemini', model } = req.body;

//   if (!code || !code.trim()) {
//     return res.status(400).json({ error: 'Code is required' });
//   }
//   if (!language) {
//     return res.status(400).json({ error: 'Language is required' });
//   }

//   try {
//     let reviewText;

//     if (provider === 'gemini') {
//       reviewText = await reviewWithGemini(code, language);
//     } else if (provider === 'openrouter') {
//       reviewText = await reviewWithOpenRouter(code, language, model);
//     } else {
//       return res.status(400).json({ error: 'Invalid provider' });
//     }

//     const bugsCount = (reviewText.match(/line \d+/gi) || []).length;

//     const saved = await Review.create({
//       code,
//       language,
//       provider,
//       model: model || '',
//       review: reviewText,
//       bugsCount,
//     });

//     res.json({ review: reviewText, id: saved._id, bugsCount });
//   } catch (err) {
//     console.error('Review error:', err.message);
//     if (err.response?.status === 401) {
//       return res.status(401).json({ error: 'Invalid API key. Check your .env file.' });
//     }
//     if (err.response?.status === 429) {
//       return res.status(429).json({ error: 'API rate limit reached. Try again later.' });
//     }
//     res.status(500).json({ error: 'AI review failed: ' + err.message });
//   }
// });

// module.exports = router;




const express = require('express');
const rateLimit = require('express-rate-limit');
const { reviewWithGemini } = require('../services/gemini');
const { reviewWithOpenRouter } = require('../services/openrouter');
const Review = require('../models/Review');

const router = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests. Please wait a minute.' },
});

router.post('/', limiter, async (req, res) => {
  const { code, language, provider = 'gemini', model } = req.body;

  // DEBUG — terminal mein dikhega
  console.log('=== REQUEST AAYA ===');
  console.log('Provider:', provider);
  console.log('Language:', language);
  console.log('Code length:', code?.length);
  console.log('GEMINI KEY set hai?:', !!process.env.GEMINI_API_KEY);
  console.log('KEY first 10 chars:', process.env.GEMINI_API_KEY?.substring(0, 10));

  if (!code || !code.trim()) {
    return res.status(400).json({ error: 'Code is required' });
  }
  if (!language) {
    return res.status(400).json({ error: 'Language is required' });
  }

  try {
    let reviewText;

    if (provider === 'gemini') {
      reviewText = await reviewWithGemini(code, language);
    } else if (provider === 'openrouter') {
      reviewText = await reviewWithOpenRouter(code, language, model);
    } else {
      return res.status(400).json({ error: 'Invalid provider' });
    }

    const bugsCount = (reviewText.match(/line \d+/gi) || []).length;

    const saved = await Review.create({
      code,
      language,
      provider,
      model: model || '',
      review: reviewText,
      bugsCount,
    });

    res.json({ review: reviewText, id: saved._id, bugsCount });

  } catch (err) {
    // EXACT ERROR terminal mein dikhega
    console.log('=== ERROR AAYA ===');
    console.log('Message:', err.message);
    console.log('Status:', err.response?.status);
    console.log('Data:', JSON.stringify(err.response?.data));

    res.status(500).json({ 
      error: err.message,
      detail: err.response?.data 
    });
  }
});

module.exports = router;