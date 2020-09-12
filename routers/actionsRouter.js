const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/',(req,res)=>{
    Actions.get()
    .then(actions=>res.status(200).json(actions))
    .catch(err=>res.status(500).json({error:err.message}))
   })

router.get('/:id',validateId,(req,res)=>{
    res.status(200).json(req.action)
})

router.put('/:id',validateId,(req,res)=>{
    Actions.update(req.params.id,req.body)
    .then(project=>res.status(200).json(project))
    .catch(err=>res.status(500).json({error:err.message}))
})

router.post('/',validateAction(),(req,res)=>{
    Actions.insert(req.body)
    .then(project=>res.status(200).json(project))
    .catch(err=>res.status(500).json({error:err.message}))
})
router.delete('/:id',validateId,(req,res)=>{
    Actions.remove(req.params.id)
    .then(project=>res.status(200).json(project))
    .catch(err=>res.status(500).json({error:err.message}))
})
//middleware
function validateId(req,res,next){
    if(req.params.id){
    Actions.get(req.params.id)
        .then(action=>{
            if(action){
                req.action = action
                next()
            }else{
                res.status(400).json({
                    error:"need valid action ID"
                })
            }
        })
        .catch(err=>res.status(500).json(err.message))
    }
}

function validateAction() {
    return (req, res, next) => {
      if (!req.body.notes || !req.body.description || !req.body.project_id) {
        res.status(400).json({
          errorMessage: "Please provide notes and description and project id..."
        })
      } else {
        next();
      }
    }
  }
module.exports = router;