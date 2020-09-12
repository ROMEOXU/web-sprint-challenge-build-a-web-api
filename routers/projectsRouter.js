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
module.exports = router;