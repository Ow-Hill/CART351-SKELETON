//STEP 2.3

window.onload = runScript


let label = `Type your Name and then Press ENTER: \n `;
let nameToSave =""
let colourSelected = false

function runScript(){




    //create a block the player can move mouse over and listen for event
    let player = document.querySelector("#player")
    player.addEventListener("mousemove", callback_hoversquare)
    player.setAttribute("timeHovered",0)
    let promp = document.querySelector('#instructions')

    function callback_hoversquare(event){
        //if the colour hasnt been selected yet
        if(!colourSelected){
            let val = parseInt(this.getAttribute("timeHovered"))
            val = (val + 1)%360
            this.setAttribute("timeHovered", val)
            player.style.background =  "hwb("+val+" 0% 0%)"
        }
    }

    //callback for select colour function
    player.addEventListener("click", callback_select)

    function callback_select(event){ 
        // trigger boolean that locks colours and then starts listeneing to key presses
        colourSelected = true
        promp.innerHTML = ("NAME YOUR NEW PET COLOUR, type it out and input will be recorded, press enter to submit")
        promp.style.background = "hwb("+parseInt(player.getAttribute("timeHovered"))+" 0% 0%)"
        console.log("mewhen")
        
        //get user to input name (moved to seperate function to listen to keys)
        //send to senddata (name) (moved to seperate function to listen to keys)
        //re-route to list at end?
    }

    window.addEventListener("keydown", keyClickCallback)

    function keyClickCallback(event){
        //if the colour has been selected listen for keys
        if(colourSelected){
            console.log(event.keyCode)
            //code taken from nov 3rd class
            //get user to input name
            if (
                (event.keyCode >= 65 && event.keyCode <= 90) ||
                (event.keyCode >= 97 && event.keyCode <= 122)
            ){
                nameToSave += event.key;
                player.innerHTML = nameToSave
            }
            //user finished
            else if(event.keyCode === 13){
                console.log(nameToSave)
                //send to senddata with the hue
                hue = parseInt(player.getAttribute("timeHovered"))
                sendColorData(nameToSave, hue )
            }else if(event.keyCode === 8){
                nameToSave = nameToSave.substring(0, nameToSave.length-1)
                player.innerHTML = nameToSave
            }
        }
    }

//     function displayInfo(infoText, x, y) {
//         let h = HTMLFormElement
//     push();
//     fill("#181010ff");
//     textAlign(CENTER);
//     text(infoText.toUpperCase(), x, y);
//     pop();
// }


}




//STEP 2.4
//the function which holds the fetch request, which not only sends the json object of the colour to the server, but also returns whether that colour is already in the server txt file
function sendColorData(p1Name, p2Hue) {

    fetch("/postDataFetch", {method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify({name:p1Name, hue:p2Hue})})

    .then(response => response.json())
    .then(data => { console.log("server replied: ", data);

        const statusMessage = document.getElementById("statusMessage");

        statusMessage.innerText = data.message

    })

    .catch(error => console.error("Error: ", error));

}


async function sendColorData(p1Name, p2Hue) {
    // console.log("asnddasjnsadnjlasdjk")
    // const queryParams = new URLSearchParams(params).toString();
    
    // console.log("me when me when")
    // console.log(queryParams);
    //build the url -end point

    // fetch("/postDataFetch", {method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify({color:[[params]]})})
    // console.log(queryParams);

    

    const url = `/postDataFetch?`;
    try {

        let res = await fetch(url, {method: "POST", headers: {"Content-Type": "application/json"},body: JSON.stringify({name: p1Name, hue:p2Hue})});
        let resJSON = await res.json();
        console.log(resJSON);

        if (resJSON["data_received"] === 'yes'){
            const thing = document.getElementById("statusMessage")
            // let statusMessage = document.querySelector("#statusMessage");
            console.log(thing)
            thing.style.color = ("hwb("+parseInt(player.getAttribute("timeHovered"))+" 0% 0%)")
            thing.innerHTML = (resJSON["name"])
            console.log("worked")
        }

    } catch (err) {
        console.log(err);
    }

}
