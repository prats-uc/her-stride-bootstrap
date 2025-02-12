const express = require('express');
const Router = express();
const { UCServiceDML } = require('./models');
const _ = require('lodash')

Router.post('/getCategories', async (req, res) => {
  try {
    const categories = await UCServiceDML.getAllCategories();
    
    return res.json({
      categories: categories.map(category => ({
        key: category.key,
        name: category.name
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.post('/getCategoriesDetails', async (req, res) => {
  try {
    const { categoryKey } = req.body;
    
    const categoryDetails = await UCServiceDML.getCategoryDetails(categoryKey);
    const providers = await UCServiceDML.getProvidersByCategoryKey(categoryKey);
    
    return res.json({
      category: {
        key: categoryDetails.key,
        name: categoryDetails.name
      },
      providers: providers.map(provider => ({
        id: provider._id,
        name: provider.name,
        rating: provider.rating
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.post('/addCategory', async (req, res) => {
  try {
    const { categoryKey, categoryName } = req.body;
    await UCServiceDML.createCategory(categoryKey, categoryName);
    
    return res.json({
      status: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.post('/addProvider', async (req, res) => {
  try {
    const { categoryKey, providerName, providerRating } = req.body;
    await UCServiceDML.createProvider(providerName, providerRating, categoryKey);
    
    return res.json({
      status: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

module.exports = Router;