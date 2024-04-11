const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const dal = require('../services/m.auth_db.js');
const { getAllRecipes } = require('../services/m.recipes.dal.js');

// GET - All Recipes
router.get('/all/', async (req, res) => {
  try {
    logger.info('Getting all recipes from the database.');
    
    // Call getAllRecipes function with pagination parameters
    const { page, pageSize, theRecipes } = await getAllRecipes();
    
    logger.info('All recipes retrieved successfully.');
    
    // Pass pagination information to the EJS template
    res.render('allRecipes.ejs', { theRecipes, page, pageSize });
  } catch (error) {
    logger.error('Error getting all recipes:', error);
    res.status(500).render('503');
  }
});

module.exports = router;
