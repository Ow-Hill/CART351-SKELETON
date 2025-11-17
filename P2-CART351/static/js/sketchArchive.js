
//create a canvas per element
gameState = "start"
const displayBox = document.getElementById("triDisplay")
let allTri = []
let allCanv = []
let canvLenght = 600;

window.onload = runScript


function runScript(){
    // console.log("Here"); 
    
     // Set a background color for the canvas
}

function preload() {}

function setup(){
    // console.log("there");
    getTri();
    // console.log("canv LEngth"+ canvLenght);
    
    
}
//
async function draw(){

    
    if (gameState === "start"){
        console.log("Here"); 
        gameState = "active"
        background("#fff1ceff")
        for (let i = 0; i< allTri.length ; i++){
            allTri[i]["tri"].displayUpdate(allTri[i]["disp"])
            console.log("rendering " + allTri[i]["name"]) + ",  " + allTri[i]["disp"];

            
            displayInfo(allTri[i]['name'], width / 2, 550 + 600*i);
                

            
        }

        // console.log(allTri[0]);
        // allTri[0]["tri"].displayUpdate(allTri[0]["disp"])
    }
    if (gameState === "active"){
        // console.log("done")
        
    }

    if (gameState === "end"){
    }

}

//helper fucntions
async function getTri(){
    const url = `/getTri?`;
    let res = await fetch(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({request: 'tri'})});
    let resJSON = await res.json();
    console.log("elements" + Object.keys(resJSON).length);

    canvLength = 600 * resJSON.length;
    console.log("Canvas length: " + canvLength);

    canvas = createCanvas(600, canvLength); 
    canvas.parent("p5Container");
    background("#fff1ceff");

    

    
    for(let i = 0; i <= Object.keys(resJSON).length-1 ; i++){
        
        tempElement = resJSON[i]
        console.log("temp: " + tempElement)
        tempName = tempElement["name"]
        tempDisplay = tempElement["displayType"]
        tempDict = tempElement["triDict"]
        console.log(`Triangle ${i}: name="${tempName}", displayType="${tempDisplay}"`);
        reconstruct(tempName, tempDisplay, tempDict, i);
    }


}

function reconstruct( name, display, triDict, index){

    // let div = document.createElement("div");
    // div.className = "p5Container";
    // div.id = "p5Container" + i;
    // canvas = createCanvas(600, 600); 
    // canvas.parent("p5Container" + i); 
    // allCanv.push(canvas)

    let yOffset = 600*index;


    // background("#fff1ceff"); 
    // (dict)  vertA= [50,515] side = 500  parentRef= null
    rootI = new TriFrac("fromdict", triDict, [50,515 + yOffset], 500, null)


    console.log("tri num: " + index );
    console.log(rootI);
    
     
    allTri.push({tri: rootI, disp: display, name: name})

    // displayBox.appendChild("")

}

function displayInfo(infoText, x, y) {
  push();
  fill("#03104bff");
  textAlign(CENTER);
  text(infoText.toUpperCase(), x, y);
  pop();
}