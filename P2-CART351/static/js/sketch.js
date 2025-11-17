//render each triangle each time by looping through elemenrs array each frame than calling entire tree?

let keyCode = 0;
let gameState = "start"; // state of the application
let triEdit = true
let canvas = null;
let elements = [];
let inCanvas = false;
let nameToSave = ""
let displayType = ""

function preload() {}

function setup() {
//  console.log("setup");  
    canvas = createCanvas(600, 600); // Create your canvas
    canvas.parent("p5Container"); // Attach the canvas to the div with id 'p5Container'
    background("#fff1ceff"); // Set a background color for the canvas
    textSize(22);

    // print("setup")
    triRoot = new TriFrac("root", 500,[50,515]); //create parent triangle
    elements.push(triRoot);

    canvas.mouseMoved(triColide)

    document.getElementById("displayType1").addEventListener("click", setDisplay1)
    document.getElementById("displayType2").addEventListener("click",setDisplay2)
    
    
}


function draw(){
     // Set a background color for the canvas
    background("#fff1ceff")
    if (gameState === "start"){
        gameState = "active";
    }


    if (gameState === "active"){
        
        //make thing to start drawing triangle
        // background("#fff1ceff")
        triRoot.displayUpdate(displayType);

        if(keyIsPressed){
            console.log(keyCode);
        }

    }



    if(gameState === "done"){
       
        triRoot.displayUpdate(displayType);
    } 
}   

//helper functions
//new triangle that adds to active elements array
function newTri(index){
        
        if(elements[i].triSplit()){
            elements.push(elements[i].subTriA)
            elements.push(elements[i].subTriB)
            elements.push(elements[i].subTriC)
            remEt(elements , elements[i])
        }
        return

}

//display type selector
function setDisplay1(){
    if (triEdit){
        displayType = "";
    }
    
}


function setDisplay2(){
    if (triEdit){
        displayType = "static";
    }
}



//finds if the mouse colides with any sub triangles
function triColide() {

    if(triEdit){
        for (i in elements){
            // distance = Math.sqrt(Math.pow((0.0 + mouseX - i.colisionCenterX), 2) + Math.pow((0.0 +mouseY - i.colisionCenterY), 2))
            if(!elements[i].hasChild && elements[i].underMaxDepth()){
                // print("colision")
                if(!elements[i].colides(mouseX, mouseY) && elements[i].hasColided){
                    newTri(i);
                }
            }
        }

    }
}

//check key press
function keyPressed(e) {
    // console.log("key");
    console.log(e);
    keyCode = e.keyCode;
    if (keyCode === 81 && gameState === "active") { // Q pressed
 
       
        gameState = "done";
        triEdit = false;
        outDict = triRoot.toDict()
        console.log(outDict)

        document.querySelector("#t2Display").innerHTML="Enter your name, press the button to save your triangle to be displayed" 
        displayForm(document.getElementById("t2Display"))
        document.getElementById("buttonSend").addEventListener("click",sendData)

    }
    if (gameState === "saveName") {
        //check if is lower /uppercase letter
        if (
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 97 && e.keyCode <= 122)
        ){
            nameToSave += key;

        }
        //user finished
        else if(e.keyCode ===13){
        gameState = "saveData"
        }
    }
}      

// https://www.geeksforgeeks.org/javascript/remove-elements-from-a-javascript-array/
// Function to remove specific element from a
function remEt(a, ele) {
    a.forEach((item, index) => {
        if (item === ele) {
            a.splice(index, 1);
        }
    });
    return a;
}


function displayForm(parent){
    // https://www.w3schools.com/html/html_forms.asp


    // <section class = "inputBox"></section>

    let form = document.createElement("form");
    form.id = "collectText";
    parent.appendChild(form);

    let subForm1 = document.createElement("label");
    subForm1.className = "inputField"
    subForm1.htmlFor = "triangleName";
    subForm1.innerHTML = "Name Your Triangle:";
    form.appendChild(subForm1);

    let subForm2 = document.createElement("input");
    subForm2.className = "inputField"
    subForm2.type = "text";
    subForm2.id = "triangleName"; 
    subForm2.name = "name";
    form.appendChild(subForm2);

    let button = document.createElement("button"); // Use a button element to send data
    button.className = "inputField"
    button.type = "button"
    button.id = "buttonSend"
    button.innerHTML = "Submit"
    
    parent.appendChild(button);




}



function sendData(e){
    e.preventDefault();
    nameToSave = document.querySelector("#triangleName").value;
    // console.log(nameToSave);
    document.querySelector("#t2Display").innerHTML="Saving data.. awaiting response" ;
    // console.log(JSON.stringify({name:nameToSave, displayType:displayType, triDict:triRoot.toDict()}));
    



   fetch("/postDataFetch", {method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify({name:nameToSave, displayType:displayType, triDict: triRoot.toDict() })})

    .then(response => response.json())
    .then(data => { console.log("server replied: ", data);

        document.querySelector("#t2Display").innerHTML="Data Saved!"

    })

    .catch(error => console.error("Error: ", error));

}






















//                  IN KEY PRESSED
  // save user name
//   if (gameState === "saveName") {
//     //check if is lower /uppercase letter
//     if (
//       (e.keyCode >= 65 && e.keyCode <= 90) ||
//       (e.keyCode >= 97 && e.keyCode <= 122)
//     ){
//         nameToSave += key;

//     }
//     //user finished
//     else if(e.keyCode ===13){
//       gameState = "saveData"
//     }

//   }  
     // let newEl = <div class="infotext" id="saveName"></div>
        // let newEl2 = <div class="infotext" id="sendDataButton"></div>
        // let newElRef = document.createElement(newEl)
        // let newElRef2 = document.createElement(newEl2)
        // document.appendChild(newElRef,document.getElementById("sendDataContainer"))
        // document.appendChild(newElRef2,document.getElementById("sendDataContainer"))