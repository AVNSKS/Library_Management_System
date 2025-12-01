const express=require('express');
const IssueBook=require('../models/IssueBook');
const Book=require('../models/Books');
const User=require('../models/User');

issueBook=async (req,res)=>{
    try{
        const {bookId,bookName,studentId,studentName,issueDate,returnDate}=req.body;
        const book=await User.findbyId(bookId);
        if(!book)
        {
            return res.send(404).json({message:'Book not found'});
        }
        const student=await User.findbyId(studentId);
        if(!student){
            return res.send(404).json({message:'Student not Found'});
        }
        if(book.quantity<1)
        {
            return res.send(404).json({message:'Book is not available'});
        }
        const newIssueBook={
            bookId,
            bookName,
            studentId,
            studentName,
            issueDate,
            returnDate,
            status:"ISSUED"
        };
        const issueBook=new IssueBook(newIssueBook);
        await issueBook.save();

        book.quantity=book.quality-1;
        responce.status(201).json({message:'book was issued',data:issueBook});
    }
    catch(Error){
        res.status(500).json({message:Error.message});

    }
};

returnbook=async (req,res)=>{
    try{
        const issueBook=await IssueBook.findById(req.params.id);
        if(!issueBook)
        {
            return res.status(404).json({message:'Issued Book not found'});
        }
        if(issueBook.status==="RETURNED")
        {
            return res.status(400).json({message:'Book already returned'});
        }
        issueBook.status="RETURNED";
        await issueBook.save();

        const book=await Book.findById(issueBook.bookId);
        book.quantity=book.quantity+1;
        await book.save();

        res.status(200).json({message:'Book returned successfully',data:issueBook});           
    }
    catch(Error){
        res.status(500).json({message:Error.message});
    }
};

module.exports={issueBook,returnbook};

