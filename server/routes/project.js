let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
// connect to our project model
let Project = require('../model/project');

// GET route for displaying the data from DB --> Read Operation
router.get('/',async(req,res,next)=>{
    try{
        const ProjectList = await Project.find();
        console.log("ProjectList length:", ProjectList.length); // TEST
        res.render('Project/list',{
            title:'Project',
            ProjectList:ProjectList,
        })
        console.log(ProjectList);
    }
    catch(err)
    {
        console.log(err);
        res.render('Project/list',
            {
                error:'Error on the Server'
            }
        )
    }
});
// GET route for displaying the Add Page --> Create Operation
router.get('/add',async(req,res,next)=>{
    try
    {
        res.render('Project/add',{
            title:'Add a Project',
        });
    }
    catch(err)
    {
        console.log(err);
        res.render('Project/list',
            {
                error:'Error on the Server'
            }
        )
    }
})
// POST route for processing the Add Page --> Create Operation
router.post('/add',async(req,res,next)=>{
    try
    {
        let newProject = Project({
            "title":req.body.title,
            "department":req.body.department,
            "dueDate":req.body.dueDate,
            "peopleNeeded":req.body.peopleNeeded,
            "description":req.body.description
        })
        Project.create(newProject).then(()=>{
            res.redirect('/projects')
        });
    }
     catch(err)
    {
        console.log(err);
        res.render('Project/list',
            {
                error:'Error on the Server'
            }
        )
    }
})
// GET route for displaying the Edit Page --> Update Operation
router.get('/edit/:id',async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const ProjectToEdit = await Project.findById(id);
        res.render("Project/edit",
            {
                title: 'Edit Project',
                Project: ProjectToEdit,
                displayName: req.user?req.user.displayName:""
            }
        )
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})
// POST route for processing the Edit Page --> Update Operation
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        let updateProject = Project({
            "_id":id,
            "title":req.body.title,
            "department":req.body.department,
            "dueDate":req.body.dueDate,
            "peopleNeeded":req.body.peopleNeeded,
            "description":req.body.description
        })
        Project.findByIdAndUpdate(id,updateProject).then(()=>{
            res.redirect("/projects")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }

})
// GET route to perform Delete Operation
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        Project.deleteOne({_id:id}).then(()=>{
            res.redirect("/projects")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
    
})
module.exports = router;