const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const dal = require('../services/m.auth_db.js');
const { getAllRecipes } = require('../services/m.recipes.dal.js');

// GET - All Recipes
router.get('/all/', async (req, res) => {
  try {
    logger.info('Getting all recipes from the database.');
    const theRecipes = await getAllRecipes();
    logger.info('All recipes retrieved successfully.');
    res.render('allRecipes.ejs', { theRecipes: theRecipes });
    logger.info(`All recipes: ${JSON.stringify(theRecipes)}`);
  } catch (error) {
    logger.error('Error getting all recipes:', error);
    res.status(500).render('503');
  }
});

module.exports = router;