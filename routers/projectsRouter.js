const express = require('express');

const Projects = require('../data/helpers/projectModel');
const router = express.Router();
router.get('/',(req,res)=>{
 Projects.get()
 .then(projects=>res.status(200).json(projects))
 .catch(err=>res.status(500).json({error:err.message}))
})

router.get('/:id',validateId,(req,res)=>{
res.status(200).json(req.project)
})

router.put('/:id',validateId,(req,res)=>{
    Projects.update(req.params.id,req.body)
    .then(project=>res.status(200).json(project))
    .catch(err=>res.status(500).json({error:err.message}))
})

router.post('/',validateProject(),(req,res)=>{
    Projects.insert(req.body)
    .then(project=>res.status(200).json(project))
    .catch(err=>res.status(500).json({error:err.message}))
})

router.delete('/:id',validateId,(req,res)=>{
    Projects.remove(req.params.id)
    .then(project=>res.status(200).json(project))
    .catch(err=>res.status(500).json({error:err.message}))
})
//custom middleware
function validateId(req,res,next){
    if(req.params.id){
        Projects.get(req.params.id)
        .then(project=>{
            if(project){
                req.project=project
                next()
            }else{
                res.status(400).json({
                    error:"need valid project ID"
                })
            }
        })
        .catch(err=>res.status(500).json(err.message))
    }
}

function validateProject() {
    return (req, res, next) => {
      if (!req.body.name || !req.body.description) {
        res.status(400).json({
          errorMessage: "Please provide a name and description..."
        })
      } else {
        next();
      }
    }
  }
module.exports = router;