class TriFrac{

    
    rootCol = 0;
// 
//          C
//         / \
//        /   \
//       /     \
//      /       \
//     /         \
//    /           \          VERTEX LABELS, ALSO POSITION OF SUB TRIANGLES
//   /             \
//  /               \
// A --------------- B
//     
    
    colRand = [
        "#2454f2ff",
        "#7620c6ff",
        "#ebad10ff",
        "#ff0bf7ff",
        "#86a40bff",
        "#de3000ff"
    ]

    constructor(constructType ,input1 ,givenVert, input3, input4){

        this.hasColided = false
        this.hasChild = false
            //pointers to sub triangle
            this.subTriA = null;
            this.subTriB = null;
            this.subTriC = null;


        if(constructType === "root"){
            console.log("root create reached")
            //constructor for root triangle
            //arguments (side length of triangle, starting vertex a)
            
            
            this.colour = "#107065ff";
            //pointer to patrent, null bc root
            this.parent = null;
            //set display colour to temp starting colour
            this.displayColour = "#f2a624ff";

            this.sideLength = input1;
            //find the position of verticies relitive to vertex A & assign them
            // this.vertA[2] 
            this.vertA = givenVert

            this.vertB = [,]
            
                this.vertB[0] = givenVert[0] + this.sideLength;
                this.vertB[1] = givenVert[1];

            this.vertC = [,]
                this.vertC[0] = givenVert[0] + this.sideLength/2;
                // -1 for Vertical translate P5
                this.vertC[1] = givenVert[1] - (this.sideLength * Math.sqrt(3))/2;

            //display triangle with P5
            this.colisionCenterX = this.vertA[0] +(1/2 *this.sideLength)
            this.colisionCenterY = this.vertA[1] - ((this.sideLength / Math.sqrt(3))/2)
            this.colisionRadius = this.sideLength/3.4
            console.log("root created finished");


 
        }else if(constructType === "parentRef"){
            // console.log("Child Created reached")
            //constructor for creating sub triangles
            //inputs (parent triangle being split, Vertex A of the sub triangle)
          
            this.colour = this.colRand[floor(random(0, this.colRand.length))];
            //create vertex arrays

            //define things from parent class
            this.parent = input1;
            this.displayColour = input1.colour;
            this.sideLength = (input1.sideLength)/2;

            //find vertexes
            // this.vertA[2];
                //bottom left(A) is the same
                this.vertA = givenVert
            this.vertB = [,];
                //bottom right(B) translate right by side length
                this.vertB[0] = this.vertA[0] + this.sideLength
                this.vertB[1] = this.vertA[1] 
            this.vertC = [,];
                this.vertC[0] = this.vertA[0] + this.sideLength/2
                //minus to move up on P5 canvas
                this.vertC[1] = this.vertA[1] - (this.sideLength * Math.sqrt(3))/2;

            // this.triRef = this.displayAdd()

            this.colisionCenterX = this.vertA[0] + (1/2 *this.sideLength)
            this.colisionCenterY = this.vertA[1] - ((this.sideLength / Math.sqrt(3))/2)
            this.colisionRadius =  this.sideLength/3
            // console.log("Child Created finished")

        }else if (constructType == "fromdict"){
            // console.log("copy constructor from dict reached");

            //input1 == dict
            //input3 == sidelength
            //input4 == parent node
                
            if(input4 == null){ // traingle is root
                // console.log("from dict root created reached");
                this.colour = "#107065ff";
                //pointer to patrent, null bc root
                this.parent = null;
                //set display colour to temp starting colour
                this.displayColour = "#f2a624ff";

                this.sideLength = input3;
                //find the position of verticies relitive to vertex A & assign them
                // this.vertA[2] 
                this.vertA = givenVert

                this.vertB = [,]
                
                    this.vertB[0] = givenVert[0] + this.sideLength;
                    this.vertB[1] = givenVert[1];

                this.vertC = [,]
                    this.vertC[0] = givenVert[0] + this.sideLength/2;
                    // -1 for Vertical translate P5
                    this.vertC[1] = givenVert[1] - (this.sideLength * Math.sqrt(3))/2;

                //display triangle with P5
                this.colisionCenterX = this.vertA[0] +(1/2 *this.sideLength)
                this.colisionCenterY = this.vertA[1] - ((this.sideLength / Math.sqrt(3))/2)
                this.colisionRadius = this.sideLength/3.4
                // console.log("from dict root created finished");
            }else{// triangle is node
                    //find the position of other vertexes relative to vertA when called
                this.sideLength = input3;
                this.parent = input4;
                this.vertA = givenVert
                this.vertB = [,];
                //bottom right(B) translate right by side length
                this.vertB[0] = this.vertA[0] + this.sideLength
                this.vertB[1] = this.vertA[1] 
                this.vertC = [,];
                this.vertC[0] = this.vertA[0] + this.sideLength/2
                //minus to move up on P5 canvas
                this.vertC[1] = this.vertA[1] - (this.sideLength * Math.sqrt(3))/2;


                
                //assign parent and side length



                //set display colour
                // this.colour = input1["col"];
                // this.displayColour = input1["col"];

                this.colisionCenterX = this.vertA[0] +(1/2 *this.sideLength)
                this.colisionCenterY = this.vertA[1] - ((this.sideLength / Math.sqrt(3))/2)
                this.colisionRadius = this.sideLength/3.4

            }

            //check if children null(base case)
            //if one subT null, its given that all are null
            if(input1["subTriA"] == null){
                this.hasChild = false;
                this.colour = input1["col"];
                this.displayColour = input1["col"];
                //if null --> assign children to null draw triangle, return
                this.subTriA = null;
                this.subTriB = null;
                this.subTriC = null;
                
                //TODO: draw triangle
            }else{
                this.hasChild = true;
                this.colour = input1["col"];
                this.displayColour = input1["col"];
                //if not null, given that all three children have elements.
                //call recursivly down for each child, using their sub dictionaries as argument for dict
                this.subTriA = new TriFrac("fromdict", input1["subTriA"], this.vertA, this.sideLength/2, this);
                this.subTriB = new TriFrac("fromdict", input1["subTriB"], [(this.vertA[0] + this.sideLength/2) , (this.vertA[1])], this.sideLength/2, this);
                this.subTriC = new TriFrac("fromdict", input1["subTriC"], [this.vertA[0] + this.sideLength/4, this.vertA[1] - (this.sideLength * Math.sqrt(3))/4], this.sideLength/2, this);
            }

            
            // console.log("copy constructor from dict finished");
            return(this)
            // constructFromDict(input1, givenVert, 500, null)
            
        }
 
        // print ("colision center" + this.colisionCenter)

    }
    


    //create new triangles when mouse leaves
    //arguments, the hue selected when hovering
    triSplit(){
        if (this.underMaxDepth()){
            this.hasChild = true
            // this.colour = hueSelect;
            this.subTriA = new TriFrac("parentRef",this, this.vertA);

            //find new vertex A for sub triangle B based on partent triangle
            this.subTriB = new TriFrac("parentRef", this, [(this.vertA[0] + this.sideLength/2) , (this.vertA[1])]);

            //vert A for sub triangle C
            this.subTriC = new TriFrac("parentRef", this, [this.vertA[0] + this.sideLength/4, this.vertA[1] - (this.sideLength * Math.sqrt(3))/4]);

            return true;

        }else{
            //TODO: make the triangle stop listening for events
            // console.log("test, to many sub tri or triangle allready split, remove later when works")
            return false;
        }


        

    }


    static = [
        "#000000ff",
        "#361d16ff",
        "#2e2f28ff",
        "#380d37ff",
        "#0c240bff",
        "#2e2c1dff",
        "#9d8686ff",
        "#844534ff",
        "#747763ff",
        "#852284ff",
        "#287a25ff",
        "#6f4700ff",
        "#aea38fff",
        "#bdc1e3ff",
    ]


    //when using draw, have it be p1: A, p2:C, p3:B
    displayAdd(colMode){
        //enables display
        //draw triangle
        //manage the objects and colisions in sketch .js

        triangle(this.vertA[0],this.vertA[1],this.vertB[0],this.vertB[1],this.vertC[0],this.vertC[1]);
        noStroke();
        // 
        // have different colour modes
        if(colMode === "static"){
            fill(this.static[floor(random(0, this.colRand.length))])
            
        } else if (colMode === "adjust"){

        } else if(colMode === "") {
            fill(this.displayColour)
        }


    }



    displayUpdate(colMode){
        if(this.subTriA === null && this.subTriB === null && this.subTriC === null){
            //if no childred, display triangle
            this.displayAdd(colMode);
            return;
        }else if(this.subTriA !== null && this.subTriB !== null && this.subTriC !== null)
            //stop displaying triangle and stop listening for events
            this.subTriA.displayUpdate(colMode); 
            this.subTriB.displayUpdate(colMode);
            this.subTriC.displayUpdate(colMode);

            return;
    }

    
    colides(xval, yval){

            // M - mouse
            //  \
            //   \ -- distance
            //    \
            //     C - circle center

            //distance^2 = (mX - cX)^2 + (mY - cY)^2
            //a^2 + b^2 = c^2


        // print(this.colisionRadius)
        if(Math.sqrt(Math.pow((xval - this.colisionCenterX), 2) + Math.pow((yval - this.colisionCenterY), 2)) <= this.colisionRadius){
                this.hasColided = true;
                // print("colision")
                return true;  
        }
        return false;

    }




    //count how many ancestors 
    countAncestors() {
        let count = 0;
        let element = this;

        // Loop while there's a parent node and it's not the document itself
        while (element.parent !== null && element.parent !== document) {
            count++;
            element = element.parent;
        }
        return count;
    }


    // returns bool
    // weither new triangle can be added to current, also allows for universal setting of depth limit
    underMaxDepth(){
        if (this.countAncestors()<8){
            return true
        }
        return false
    }  


    //converts object to dictionary
        //recursive implementation
        //only pass node pointer as parameter
        //only save nesseisary structure needed to reconstruct

    toDict (){
        //check if node has children 
        //  && node.subTriB === null && node.subTriC === null)
        print("node depth: "+ this.countAncestors())
        try {
            if(this.subTriA === undefined || this.subTriA === null){  
                //BC: no children
                //create dict
                //set values to null
                // print("no children, reached")
                let newDict = {"subTriA": null, "subTriB": null, "subTriC":null, "col":this.displayColour};
                // print("no children, complete")
                //return dict
                return newDict;
            }else{
                //Not BC 
                //create dict
                //recursivly call while making sub dictionaries
                //save display colour
                // print("has children, dict: ")
                // print("has children, reached: ")
                let newDict = {"subTriA" : this.subTriA.toDict(), "subTriB" : this.subTriB.toDict(), "subTriC" : this.subTriC.toDict(), "col" : this.displayColour}
                // print("has children, complete: ")
                return newDict;
                //return dict
        
            }
        }catch (error) {
            print(error.message)
        }

    }


    //creates object from dictionary
    //recursive implementation (Vert A and side Length given for root)

    //data in dict stored as:
        //(subTriA, subTriB, subTriC, col)
        //**not display colour, but one selected if has childred**
    
    
    //
    // constructFromDict ( dict, vertA, sideLength, parentRef){
    //     //for root triangle, 
    //     // (dict)  vertA= [50,515] side = 500  parentRef= null
        
    //     //find the position of other vertexes relative to vertA when called
    //     this.vertA[2];
    //     this.vertA = vertA;
    //     this.vertB[2];
    //     this.vertC[2];
    //     //assign parent and side length
    //     this.sideLength = sideLength;
    //     this.parent = parentRef;
    //     //set display colour
    //     if(parentRef !== null){
    //         this.displayColour = parentRef.colour;
    //     }else if(dict["subTriA"]== null){
    //         this.displayColour = rootCol;
    //     }


    //     this.vertB[0] = vertA[0] + this.sideLength;
    //     this.vertB[1] = vertA[1]

    //     this.vertC[0] = vertA[0] + this.sideLength/2;
    //     // -1 for Vertical translate P5
    //     this.vertC[1] = vertA[1] - (this.sideLength * Math.sqrt(3))/2;

    //     this.colisionCenter = [this.vertA[0] +(1/2 *this.sideLength), this.vertA[1] - (1/2 *this.sideLength)]
    //     this.colisionRadius = [this.sideLength/2]

    //     //check if children null(base case)
    //     //if one subT null, its given that all are null
    //     if(dict["subTriA"] == null){
    //         this.hasChild = false;
    //         //if null --> assign children to null draw triangle, return
    //         this.subTriA = null;
    //         this.subTriB = null;
    //         this.subTriC = null;
    //         this.colour = 0;
    //         //TODO: draw triangle

            

    //         return(this);
    //     }else{
    //         this.hasChild = true;
    //         //if not null, given that all three children have elements.
    //         //call recursivly down for each child, using their sub dictionaries as argument for dict
    //         this.subTriA = constructFromDict ( dict["subTriA"], this.vertA, this.sideLength/2, this);
    //         this.subTriB = constructFromDict ( dict["subTriB"], this.vertB, this.sideLength/2, this);
    //         this.subTriC = constructFromDict ( dict["subTriC"], this.vertC, this.sideLength/2, this);
    //         return(this)



    //     }

    // }



}

// player.style.background =  "hwb("+val+" 0% 0%)"



    // displayRemove(){
    //     //disables display 
    //     erase();
    //     triangle(this.vertA[0],this.vertA[1],this.vertB[0],this.vertB[1],this.vertC[0],this.vertC[1])
    //     noErase();
    //     //event listeners
    //     //move to sketch???
    // }



    //p5 display call, call whenever new sub triangles created and when 
    //recursivly display everything
