const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Note } = require("../models/Note");
const {createNoteCtrl,callNotesCtrl,editNoteCtrl,deleteNoteCtrl,readNoteCtrl} = require('../controllers/noteControllers')


router.post('/',createNoteCtrl);



     router.get("/",callNotesCtrl);


     router.put("/:id", editNoteCtrl);


     router.get("/:id",readNoteCtrl);
    

     router.delete("/:id",deleteNoteCtrl);




     module.exports = router;
