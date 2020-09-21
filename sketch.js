var hypnoticBall,position,database;

function setup(){
    //Create the database and store it r 
    database = firebase.database();
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    //ref == used to refer to a location in the database 
    var hypnoticBallPosition = database.ref('ball/position');
    //on == create a listner,which keeps on listening to the changes in the value of ballPosition
    //If there is a change in the value,call readPosition function,if problem in reading position then call showError
    hypnoticBallPosition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    //Draw the ball or write to the database only when the position is defined 
    if(position !== undefined){
          if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();   
    }
   
}
//write the new position of the ball in the database 
function writePosition(x,y){
    //set == sets a new value for the first time in the database 
    database.ref('ball/position').set({
        'x':position.x + x,
        'y':position.y + y

    })
}
//Reads the position from the database and assigns it to the ball
function readPosition(data){
    //val == gets the value from the data 
    position = data.val();
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;

}
//displays the error if problem in reading values 
function showError(){
    console.log("Error in reading the values from the database")    
}