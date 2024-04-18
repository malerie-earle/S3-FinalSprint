// Import required modules
const express = require('express');
const router = express.Router();
const { logger } = require('../logEvents.js');
const dal = require('../services/m.auth_db.js');
const { getAllRecipes, getRecipeById } = require('../services/m.recipes.dal.js');
const isAuthentic = require('../middleware/authMiddleware.js');  

// List of All Available Routes
logger.info('Route: /recipe/all/ - GET/READ - All Recipes');
logger.info('Route: /recipe/id/:id/ - GET/READ - Single Recipe by ID');

// GET - All Recipes
router.get('/all/', isAuthentic, async (req, res) => {
  logger.info('Getting all recipes from the database.');  
  try {
    // Call getAllRecipes function with pagination parameters
    const { page, pageSize, theRecipes } = await getAllRecipes();
    // If no recipes are found, log an error
    if (!Array.isArray(theRecipes)) {
      console.error('theRecipes is not an array');
      return;
    }
    logger.info('All recipes retrieved successfully.');
    res.render('allRecipes.ejs', { page, pageSize, theRecipes, user: req.user });

  // Handle errors
  } catch (error) {
    logger.error('Error getting all recipes:', error);
    res.status(500).render('503');
  }
});

// GET - A Recipe
router.get('/id/:id/', isAuthentic, async (req, res) => {
  const recipe_id = req.params.id;
  logger.info(`Getting the Recipe by ID: ${recipe_id}`);
  try {
    // Call getRecipeById function with the recipe_id
    const aRecipe = await getRecipeById(recipe_id);
    logger.info(`Recipe: ${JSON.stringify(aRecipe)}`);
    res.render('aRecipe.ejs', { aRecipe });

  // Handle errors  
  } catch (error) {
    logger.error('Error getting recipe page', error);
    res.status(500).render('503');
  }
});

// Export the router
module.exports = router;
