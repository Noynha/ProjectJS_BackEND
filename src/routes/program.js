const programRouter = require('express').Router()
const programController = require('../controller/program')

// Routes
programRouter.get('/', async (req, res) => {
    try {
      const { id } = req.query
      if (id) {
        const program = await programController.getOnceProgram(id)
        if (!program) {
          return res.status(404).json({
            message: 'Program not found',
            data: null
          })
        }
  
        return res.status(200).json({
          message: 'Success',
          data: program
        })
      }
  
      const programs = await programController.getAllPrograms()
      return res.status(200).json({
        message: 'Success',
        programs: programs 
      })
    } catch (error) {
      res.status(500).json(error?.message || 'Internal server error')
    }
  })
  

programRouter.post('/', async (req, res) => {
  try {
    const { type, price } = req.body
    if (! type || !price) {
      return res.status(400).json({
        message: 'Type and Price are required',
        data: null
      })
    }

    const findprogram = await programController.getOnceProgramByType(type)
    if (findprogram) {
      return res.status(400).json({
        message: 'Program already exist',
        data: null
      })
    } 
    
    await programController.createProgram(type, price)
    res.status(200).json({
      message: 'program created',
      data: null
    })
  } catch (error) {
    res.status(500).json(error?.message || 'Internal server error')
  }
})

programRouter.put('/', async (req, res) => {
    try {
      const { id } = req.query
      const { type, price } = req.body
  
      if (!id) {
        return res.status(400).json({
          message: 'ID is required',
          data: null
        })
      }
  
      if (!type && !price) {
        return res.status(400).json({
          message: 'Type or Price is required to update',
          data: null
        })
      }
 
      const program = await programController.getOnceProgram(id)
      if (!program) {
        return res.status(404).json({
          message: 'Program not found',
          data: null
        })
      }
     
      const updatedProgram = await programController.updateProgram(id, { type, price })
      return res.status(200).json({
        message: 'Program updated successfully',
        data: updatedProgram
      })
    } catch (error) {
    
      res.status(500).json(error?.message || 'Internal server error')
    }
  })
  
  programRouter.delete('/', async (req, res) => {
    try {
      const { id, type } = req.query

      if (!id && !type) {
        return res.status(400).json({
          message: 'ID or Type is required to delete the program',
          data: null
        })
      }

      const program = await programController.getOnceProgram(id || type)
      if (!program) {
        return res.status(404).json({
          message: 'Program not found',
          data: null
        })
      }

      await programController.deleteProgram(id || type)

      res.status(200).json({
        message: 'Program deleted successfully',
        data: null
      })
    } catch (error) {
      res.status(500).json(error?.message || 'Internal server error')
    }
  })
  

module.exports = programRouter