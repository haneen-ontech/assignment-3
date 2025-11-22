let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our project model
let Project = require('../model/project');

// GET route for displaying the data from DB --> Read Operation
router.get('/',async(req,res,next)=>{
    try{
        const ProjectList = await Project.find(); // Fetches all projects from the database
        console.log("ProjectList length:", ProjectList.length); // TEST - checks how many project entries there currently are

        // Rendering the list file (database page) from Project folder
        res.render('Project/list',{
            title:'Project',
            ProjectList:ProjectList,
        })
        console.log(ProjectList); // render list view, log output of projectlist into console for devs
    }
    catch(err) // catch errors, if there is an error, print an error message
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
        // Rendering the add file in Project folder
        res.render('Project/add',{
            title:'Add a Project',
        });
    }
    catch(err)
    {
        console.log(err);
        res.render('Project/list',
            {
                error:'Error on the Server' // if there is an error, redirected back to list page (database page) with an error message
            }
        )
    }
})

// POST route for processing the Add Page --> Create Operation
router.post('/add',async(req,res,next)=>{
    try
    // try to create new project object using schema
    {
        let newProject = Project({
            "title":req.body.title,
            "department":req.body.department,
            "dueDate":req.body.dueDate,
            "peopleNeeded":req.body.peopleNeeded,
            "description":req.body.description
        })

        // saving the new project to the database and redirecting user back to list page, this allows user to see new project addition
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
        // grab the project id so that we can reference an already made object
        const id = req.params.id;

        // find the project to be edited in the database by searching for its id
        const ProjectToEdit = await Project.findById(id);
        res.render("Project/edit",
            {
                title: 'Edit Project',
                Project: ProjectToEdit,
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

        // create an updated project from previous one, post new creation --> process of an 'edit'
        let updateProject = Project({
            "_id":id,
            "title":req.body.title,
            "department":req.body.department,
            "dueDate":req.body.dueDate,
            "peopleNeeded":req.body.peopleNeeded,
            "description":req.body.description
        })

        // update the project in the database, then redirect user back to projects page
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

        // delete project from database and redirect back to projects page
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