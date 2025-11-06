
window.onload = runScript


function runScript(){
    getPets()


}

async function getPets() {
    

    const url = `/getPets?`;
    try {

        let res = await fetch(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({request: 'pets'})});
        //name: p1Name, hue:p2Hue
        let resJSON = await res.json();
        console.log(resJSON);


        //OBJECT??????????? B R U H
        // console.log(typeof resJSON);


        // if (resJSON["data_received"] === 'yes'){
        const display = document.getElementById("pets")
        

        //have to deal with resJSON length as an ADT
        for(i = 1; i <= Object.keys(resJSON).length ; i++){
            tempElement = resJSON[i]
            tempHue = tempElement["hue"]
            tempName = tempElement["name"]
            addPet(display, tempName, tempHue)
        }



        console.log("thing")
            
        // }

    } catch (err) {
        console.log(err);
    }
}

function addPet(parent, text, colour){
    let pTag = document.createElement("p")
    pTag.textContent = text
    pTag.style.color = ("hwb("+colour+" 0% 0%)")
    parent.appendChild(pTag)
    pTag.classList.add("newP")
 

    return pTag
}