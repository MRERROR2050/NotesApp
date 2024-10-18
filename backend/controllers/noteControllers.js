const jwt = require("jsonwebtoken");
const { Note } = require("../models/Note");



/**
 * 
 * 
 * 
 * 
 */
module.exports.createNoteCtrl =  async (req, res) => {

    try{
     const {token} = req.body
     const data = jwt.verify(token,"dsadsadh")
       

     
       const note = await Note.create({
         userID:data.id ,
           title: req.body.title,
           content: req.body.content,
         });
     console.log({note});
     
         res.status(200).json({ note: note, message: "success to Add note" });
       } catch (error) {
         res.status(500).json({ error });
         console.log(error);
         
       }
     }







     module.exports.callNotesCtrl = async (req, res) => {
        const token = req.headers.authorization.split(" ")[1]
        const data = jwt.verify(token,"dsadsadh")
   
        console.log(data);
        
        
          const notes = await Note.find({userID:data.id});
          console.log(notes);
          
          res.status(200).json({ notes });
        }




        module.exports.editNoteCtrl = async (req, res) => {
            const data = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(data, "dsadsadh");
          
            if (!user) {
              return res.status(401).json({ message: "error" });
            }
            const note = await Note.findById(req.params.id);
          
            if (note.userID.toString() !== user.id) {
              return res.status(403).json({ message: "not authorized" });
            }
          
            const updatedNote = await Note.findByIdAndUpdate(
              note._id,
              {
                title: req.body.title,
                content: req.body.content,
              },
              { new: true }
            );
          
            res.status(200).json({ success: true, message: "success", updatedNote });
          }


          module.exports.readNoteCtrl =  async (req, res) => {
            try{
              const data = req.headers.authorization.split(" ")[1];
              console.log(data);
              
              
              const user = jwt.verify(data, "dsadsadh");
              console.log(user);
              if (!user) {
                return res.status(401).json({ message: "user not authenticated" });
              }
              
          
            const note = await Note.findOne({ userID: user.id, _id: req.params.id });
          console.log(note);
          
            res.status(200).json({ note });
            }catch(error){
              res.json({error:true})
              console.log(error);
              
            }
            
          }



          module.exports.deleteNoteCtrl =  async (req, res) => {
            const data = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(data,"dsadsadh" );
            if (!user) {
              return res.status(401).json({ message: "error" });
            }
            const deletedNote = await Note.findOneAndDelete({
              userID: user.id,
              _id: req.params.id,
            });
          
            res.status(200).json({ success: true, message: "success", deletedNote });
          }