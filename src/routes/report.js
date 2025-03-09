const reportRouter = require('express').Router()
const reportController = require('../controller/report')

reportRouter.get('/', async (req, res) => {
    try {
      // ดึงข้อมูลจาก reportController
      const report = await reportController.getReport();
  
      // ส่งข้อมูลที่ได้จากฐานข้อมูลกลับมา
      res.status(200).json({ data: report });
    } catch (error) {
      // ส่งข้อผิดพลาดหากเกิดปัญหาในการดึงข้อมูล
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = reportRouter;