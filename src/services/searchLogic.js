const { Index } = require('flexsearch');
const logger = require('../logEvents.js');

// Create a new instance of the Index class with options
const index = new Index({
  encode: query => query.toLowerCase().replace(/[^a-z0-9]/g, ''),
  tokenize: query => query.split(/\s-\//g),
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
    let results = await index.searchAsync(query);
    
    // Ensure results is an array
    if (!Array.isArray(results)) {
      results = [results];
    }

    logger.info('Search Results:', results);
    return results;
  } catch (error) {
    logger.error('Error occurred while searching:', error);
    throw error;
  }
}

// Define a function to handle search results
async function showResults(req, res) {
  try {
    const query = req.body.query; 
    const theResults = await search(query);
    logger.info('Displaying search results:', theResults);
    res.render('searchResults', { theResults });
  } catch (error) {
    logger.error('Error displaying search results:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  search, showResults
};
