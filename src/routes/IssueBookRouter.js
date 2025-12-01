const express=require('express');
const {issueBook,returnbook}=require('../controllers/issueBookController');

const router=express.Router();

router.post('/',issueBook);
router.put('/:id',returnbook);

module.exports=router;