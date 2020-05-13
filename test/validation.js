function emailVal (email) {
    return /\S+@\S+\.\S+/.test(email)
  }


  // Need to put this at the end of the questions!

  async function init() {
    console.log("ready")
    try {
        const answers = await promptUser();
  
        const html = generateHTML(answers);
      //writeFile will creat html page with the answers
        await writeFileAsync("team.html", html);
  
        console.log("Successfully wrote to team.html");
    } catch (err) {
        console.log(err);
    }
  }
  
  init();

  //Put this at the top of the of the questtion file.

  const generateHTML = require("./team.html")

  //writeFile will create html page
const writeFileAsync = util.promisify(fs.writeFile);


// function to validate names:

function allLetter(inputtxt)
  {
   var letters = /^[A-Za-z]+$/;
   if(inputtxt.value.match(letters))
     {
      return true;
     }
   else
     {
     alert("message");
     return false;
     }
  }