const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const dal = require('../services/m.auth_db.js');
const { getAllRecipes, getRecipeById } = require('../services/m.recipes.dal.js');


// GET - All Recipes
router.get('/all/', async (req, res) => {
  try {
    logger.info('Getting all recipes from the database.');  
    // Call getAllRecipes function with pagination parameters
    const { page, pageSize, theRecipes } = await getAllRecipes();
    if (!Array.isArray(theRecipes)) {
      console.error('theRecipes is not an array');
      return;
    }
    logger.info('All recipes retrieved successfully.');
    // logger.info(theRecipes);
    res.render('allRecipes.ejs', { page, pageSize, theRecipes, user: req.user});
  } catch (error) {
    logger.error('Error getting all recipes:', error);
    res.status(500).render('503');
  }
});

// GET - A Recipe
router.get('/:id/', async (req, res) => {
  const recipe_id = req.params.id;
  logger.info(`Getting the Recipe by ID: ${recipe_id}`);
  try {
    // Call getRecipeById function with the recipe_id
    const aRecipe = await getRecipeById(recipe_id);
    logger.info(`Recipe: ${JSON.stringify(aRecipe)}`);
    res.render('aRecipe.ejs', { aRecipe });
  } catch (error) {
    logger.error('Error getting recipe page', error);
    res.status(500).render('503');
  }
});

module.exports = router;
