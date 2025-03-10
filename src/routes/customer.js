const customerRouter = require('express').Router()
const customerController = require('../controller/customer')

// Routes
customerRouter.get('/', async (req, res) => {
  try {
    const { id } = req.query
    if (id) {
      const customer = await customerController.getOnceCustomerById(id)
      if (!customer) {
        return res.status(404).json({
          message: 'Customer not found',
          data: null
        })
      }

      return res.status(200).json({
        message: 'success',
        data: customer
      })
    }

    const customers = await customerController.getManyCustomer()
    return res.status(200).json({
      message: 'Success',
      data: customers
    })
  } catch (error) {
    res.status(500).json(error?.message || 'Internal server error')
  }
})

// post old
customerRouter.post('/', async (req, res) => {
  try {
    const { name, phone } = req.body
    if (!name || !phone) {
      return res.status(400).json({
        message: 'Name and phone are required',
        data: null
      })
    }

    const findCustomer = await customerController.getOnceCustomerByName(name)
    if (findCustomer) {
      return res.status(400).json({
        message: 'Customer already exist',
        data: null
      })
    } 
    
    await customerController.createCustomer(name, phone)
    res.status(200).json({
      message: 'Customer created',
      data: null
    })
  } catch (error) {
    res.status(500).json(error?.message || 'Internal server error')
  }
})

// new post

// register
customerRouter.post('/register', async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required', data: null });
    }

    // ตรวจสอบว่ามีทั้งชื่อและเบอร์ในระบบหรือยัง
    const findCustomer = await customerController.getOnceCustomerByName(name);
    if (findCustomer && findCustomer.customer_phone === phone) {
      return res.status(400).json({ message: 'Customer already exists', data: null });
    }

    await customerController.createCustomer(name, phone);
    res.status(200).json({ message: 'Customer created', data: null });
  } catch (error) {
    res.status(500).json({ message: error?.message || 'Internal server error' });
  }
});

// Login 
customerRouter.post('/login', async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required', data: null });
    }

    // ตรวจสอบว่ามีข้อมูลลูกค้าในระบบแล้งยัง
    const customer = await customerController.getOnceCustomerByName(name);
    if (!customer || customer.customer_phone !== phone) {
      return res.status(400).json({ message: 'Invalid name or phone', data: null });
    }

    res.status(200).json({ message: 'Login successful', data: customer });
  } catch (error) {
    res.status(500).json({ message: error?.message || 'Internal server error' });
  }
});


customerRouter.put('/', async (req, res) => {
  try {
    const { id } = req.query;  
    const { name, phone } = req.body;

    if (!id) {
      return res.status(400).json({
        message: 'ID is required to update the customer',
        data: null
      });
    }

    const customer = await customerController.getOnceCustomerById(id);
    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found',
        data: null
      });
    }

    if (!name && !phone) {
      return res.status(400).json({
        message: 'Name or Phone must be provided to update',
        data: null
      });
    }

    const updatedCustomer = await customerController.updateCustomer(id, { name, phone });

    return res.status(200).json({
      message: 'Customer updated successfully',
      data: updatedCustomer
    });
  } catch (error) {
    res.status(500).json(error?.message || 'Internal server error');
  }
});

customerRouter.delete('/', async (req, res) => {
  try {
    const { id } = req.query;  
    if (!id) {
      return res.status(400).json({
        message: 'ID is required to delete the customer',
        data: null
      });
    }
    const customer = await customerController.getOnceCustomerById(id);
    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found',
        data: null
      });
    }
    await customerController.deleteCustomer(id);

    return res.status(200).json({
      message: 'Customer deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json(error?.message || 'Internal server error');
  }
});

module.exports = customerRouter