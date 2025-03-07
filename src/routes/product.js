const productRouter = require('express').Router()
const productController = require('../controller/product')

// Routes
productRouter.get('/', async (req, res) => {
    try {
      const { id } = req.query
      if (id) {
        const product = await productController.getOnceProductById(id)
        if (!product) {
          return res.status(404).json({
            message: 'Product not found',
            data: null
          })
        }
  
        return res.status(200).json({
          message: 'Success',
          data: product
        })
      }
  
      const products = await productController.getManyProducts() 
      return res.status(200).json({
        message: 'Success',
        data: products
      })
    } catch (error) {
      res.status(500).json(error?.message || 'Internal server error')
    }
  })
  

productRouter.post('/', async (req, res) => {
  try {
    const {type, price } = req.body
    if (!type || !price) {
      return res.status(400).json({
        message: 'Type and Price are required',
        data: null
      })
    }

    const findproduct = await productController.getOnceProductByType(type) 
    if (findproduct) {
      return res.status(400).json({
        message: 'Product already exist',
        data: null
      })
    } 
    
    await productController.createProduct(type, price) 
    res.status(200).json({
      message: 'Product  created',
      data: null
    })
  } catch (error) {
    res.status(500).json(error?.message || 'Internal server error')
  }
})

productRouter.put('/', async (req, res) => {
    try {
      const { id } = req.query;  
      const { type, price } = req.body;
  
      if (!id) {
        return res.status(400).json({
          message: 'ID is required to update the product',
          data: null
        });
      }
  
      const product = await productController.getOnceProductById(id);
      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
          data: null
        });
      }
  
      if (!type && !price) {
        return res.status(400).json({
          message: 'Type or Price must be provided to update',
          data: null
        });
      }
  
      const updatedProduct = await productController.updateProduct(id, { type, price });
  
      return res.status(200).json({
        message: 'Product updated successfully',
        data: updatedProduct
      });
    } catch (error) {
      res.status(500).json(error?.message || 'Internal server error');
    }
  });
  
  productRouter.delete('/', async (req, res) => {
    try {
      const { id } = req.query;  
      if (!id) {
        return res.status(400).json({
          message: 'ID is required to delete the product',
          data: null
        });
      }
      const product = await productController.getOnceProductById(id);
      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
          data: null
        });
      }
      await productController.deleteProduct(id);
  
      return res.status(200).json({
        message: 'Product deleted successfully',
        data: null
      });
    } catch (error) {
      res.status(500).json(error?.message || 'Internal server error');
    }
  });
  

module.exports = productRouter