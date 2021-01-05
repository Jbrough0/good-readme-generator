const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileASYNC=util.promisify(fs.writeFile);

const promptUser=()=>
inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        type: "input,",
        message: "What is your current email adress?",
        name: "userEmail",
    },
    {
        type: "input",
        message: "What is the title of your project",
        name: "projectTitle",
    },
    {
        type: "Input",
        message:"How would you describe what is in your project?",
    name: "projectDescription",
    },
    {
        type: "input",
        message: "How would you install your project?",
        name: "ProjectInstallation",
    },
    {
        type:"checkbox",
        message: "What license will you use for the project?",
        choices:["MIT" , "MPL" , "Apache"],
        name: "projectLicense",
    },
    {
        type: "input",
        message: "How would you run a test to make sure everything is working in your project?",
        name: "test",
    },
    {
        type: "input",
        message: "List everyone who contributed to this project",
        name: "contributers",
    },  
    {
        type: "input",
        message: "Does anyone have additional questions about the project?",
        name: "projectQuestions",
    }
]);

// function to write README file
const generateREADME=(answers)=>{
    const newreadme=`username:${answers.username}
    email:${answers.userEmail}
    title:${answers.projectTitle}
    Description:${answers.projectDescription}
    Install:${answers.ProjectInstallation}
    License:${answers.projectLicense}
    Test:${answers.test}
    Contributers:${answers.contributers}
    Questions:${answers.projectQuestions}
    `;
    return newreadme;
}
// function to initialize program
promptUser()
.then((answers)=>{
    writeFileASYNC("ReadmeGenerator.md" , generateREADME(answers));
    console.log("Success")
})
.catch((err)=>console.log(err));
