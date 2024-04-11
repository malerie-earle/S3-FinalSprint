const { Index } = require('flexsearch');
const logger = require('../logEvents.js');

// Create a new instance of the Index class with options
logger.info('Creating a new instance of the Index class');
const index = new Index({
  encode: query => query.toLowerCase().replace(/[^a-z0-9]/g, ''),
  tokenize: function(query) {
    return query.split(/\s-\//g);
  },
  stemmer: {
    "ational": "ate",
    "tional": "tion",
    "enci": "ence",
    "anci": "ance",
    "izer": "ize",
    "bli": "ble",
    "alli": "al",
    "entli": "ent",
    "eli": "e",
    "ing": ""
  },
  filter: [
    "a",
    "and",
    "the",
    "to",
    "in",
    "into",
    "on",
    "at",
    "for",
    "is",
    "are",
    "was",
    "it",
    "of",
    "its"
  ]
});

// Define a search function
async function search(query) {
  try {
    logger.info('Searching for:', query);
    const results = await index.searchAsync(query);
    logger.info('Search Results:', results);
    return results;
  } catch (error) {
    logger.error('Error occurred while searching:', error);
  }
}

// Define a displayResults function
async function displayResults(req, res) {
  try {
    const query = req.body.query; 
    const results = await search(query);
    logger.info('Displaying search results:', results);
    res.render('searchEngine', { results });
  } catch (error) {
    console.error('Error displaying search results:', error);
    res.status(500).send('Internal Server Error');
  }
}
