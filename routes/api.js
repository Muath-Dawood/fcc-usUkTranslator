'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      // Check for missing fields
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Check for empty text
      if (text.trim() === '') {
        return res.json({ error: 'No text to translate' });
      }

      // Validate locale
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      // Perform translation
      const { translated, highlighted } = translator.translate(text, locale);

      // Check if translation is required
      if (translated === text) {
        return res.json({
          text,
          translation: 'Everything looks good to me!'
        });
      }

      // Return translated text with highlighting
      return res.json({
        text,
        translation: highlighted
      });
    });
};
