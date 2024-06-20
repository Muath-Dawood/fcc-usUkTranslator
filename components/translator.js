/* const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  constructor() {
    this.americanToBritishTitles = americanToBritishTitles;
    this.americanToBritishSpelling = americanToBritishSpelling;
    this.britishOnly = britishOnly;
    this.americanOnly = americanOnly;
    this.britishToAmericanSpelling = this.swapKeyValue(americanToBritishSpelling);
    this.britishToAmericanTitles = this.swapKeyValue(americanToBritishTitles);
  }

  swapKeyValue(json) {
    const ret = {};
    for (const key in json) {
      ret[json[key]] = key;
    }
    return ret;
  }

  translate(text, locale) {
    let translated = text;
    let highlighted = text;
    const dictionary = locale === 'american-to-british' ? {...this.americanToBritishSpelling, ...this.americanOnly} : {...this.britishToAmericanSpelling, ...this.britishOnly};
    const titles = locale === 'american-to-british' ? this.americanToBritishTitles : this.britishToAmericanTitles;

    // Helper function to preserve case
    const replaceWithCase = (match, replacement) => {
      if (match.trim()[0] === match.trim()[0].toUpperCase()) {
        return replacement[0].toUpperCase() + replacement.slice(1);
      }
      return replacement;
    };

    // Translate titles
    const titleKeys = Object.keys(titles);
    titleKeys.forEach(title => {
      const regex = new RegExp(`(^${title.replace(/\./, '\\.')})|(\\s${title.replace(/\./, '\\.')}\\s)`, 'gi');
      translated = translated.replace(regex, (match) => !match[0].startsWith(' ') ? replaceWithCase(match, titles[title]) : ` ${replaceWithCase(match, titles[title])} `);
      highlighted = highlighted.replace(regex, (match) => `<span class="highlighted"> ${replaceWithCase(match, titles[title])} </span>`);
    });

    // Translate times
    const timeRegex = locale === 'american-to-british' ? /(\d{1,2}):(\d{2})/g : /(\d{1,2})\.(\d{2})/g;
    translated = translated.replace(timeRegex, (match, p1, p2) => `${p1}${locale === 'american-to-british' ? '.' : ':'}${p2}`);
    highlighted = highlighted.replace(timeRegex, (match, p1, p2) => `<span class="highlighted">${p1}${locale === 'american-to-british' ? '.' : ':'}${p2}</span>`);

    // Translate words/phrases
    const dictKeys = Object.keys(dictionary);
    dictKeys.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if(/-chip shop/.test(translated)) {
        return
      }
      translated = translated.replace(regex, (match) => replaceWithCase(match, dictionary[word]));
      highlighted = highlighted.replace(regex, (match) => `<span class="highlighted">${replaceWithCase(match, dictionary[word])}</span>`);
    });

    return { translated, highlighted };
  }
}

module.exports = Translator; */

const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  constructor() {
    this.americanToBritishTitles = americanToBritishTitles;
    this.americanToBritishSpelling = americanToBritishSpelling;
    this.britishOnly = britishOnly;
    this.americanOnly = americanOnly;
    this.britishToAmericanSpelling = this.swapKeyValue(americanToBritishSpelling);
    this.britishToAmericanTitles = this.swapKeyValue(americanToBritishTitles);
  }

  swapKeyValue(json) {
    const ret = {};
    for (const key in json) {
      ret[json[key]] = key;
    }
    return ret;
  }

  translate(text, locale) {
    let translated = text;
    let highlighted = text;
    const dictionary = locale === 'american-to-british' ? {...this.americanToBritishSpelling, ...this.americanOnly} : {...this.britishToAmericanSpelling, ...this.britishOnly};
    const titles = locale === 'american-to-british' ? this.americanToBritishTitles : this.britishToAmericanTitles;

    // Helper function to preserve case
    const replaceWithCase = (match, replacement) => {
      if (match.trim()[0] === match.trim()[0].toUpperCase()) {
        return replacement[0].toUpperCase() + replacement.slice(1);
      }
      return replacement;
    };

    // Translate titles
    const titleKeys = Object.keys(titles);
    titleKeys.forEach(title => {
      const regex = new RegExp(`(^${title.replace(/\./, '\\.')})|(\\s${title.replace(/\./, '\\.')}\\s)`, 'gi');
      translated = translated.replace(regex, (match) => !match[0].startsWith(' ') ? replaceWithCase(match, titles[title]) : ` ${replaceWithCase(match, titles[title])} `);
      highlighted = highlighted.replace(regex, (match) => `<span class="highlight">${replaceWithCase(match, titles[title])}</span>`);
    });

    // Translate times
    const timeRegex = locale === 'american-to-british' ? /(\d{1,2}):(\d{2})/g : /(\d{1,2})\.(\d{2})/g;
    translated = translated.replace(timeRegex, (match, p1, p2) => `${p1}${locale === 'american-to-british' ? '.' : ':'}${p2}`);
    highlighted = highlighted.replace(timeRegex, (match, p1, p2) => `<span class="highlight">${p1}${locale === 'american-to-british' ? '.' : ':'}${p2}</span>`);

    // Translate words/phrases
    const dictKeys = Object.keys(dictionary);
    dictKeys.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if(/-chip shop/.test(translated)) {
        return
      }
      translated = translated.replace(regex, (match) => replaceWithCase(match, dictionary[word]));
      highlighted = highlighted.replace(regex, (match) => `<span class="highlight">${replaceWithCase(match, dictionary[word])}</span>`);
    });

    return { translated, highlighted };
  }
}

module.exports = Translator;
