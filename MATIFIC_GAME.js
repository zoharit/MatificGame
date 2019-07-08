//CANVAS 
var canvas = document.getElementById("canvas");
canvas_width=canvas.width;
canvas_height=canvas.height;
//CONTEXT
var context = canvas.getContext("2d");

var lives=3;
var score=0;
var GAME_OVER=false;

//Direction moving 
var Keys = {
        left: false,
        right: false
    };

//BOAT
var boat=new Object('resources/boat.png', canvas_width - 243,canvas_height - 152,243,152,8);

//PLANE

var plane=new Object('resources/plane.png', canvas_width,0,243,152,4);

//SEA
var sea=new Object('resources/sea.png',0,canvas_height*0.75,0,0,0);

//BACKGROUND
var background=new Object('resources/background.png',0,0,0,0,0);

//PARACHUTISTS
var parachutists=[];

//Draw object 
function Draw_Object(obj){
	image = new Image();
	image.src = obj.path;
	context.drawImage(image,obj.x, obj.y);
}

function PressKey(){
//Keys press and release
window.addEventListener('keydown', function (e) {
      if(e.key == "ArrowLeft"){
      	Keys.left=true;
      }
      else if(e.key == "ArrowRight"){
      	Keys.right=true;
      }
    },false);

    window.addEventListener('keyup', function (e) {
      if(e.key == "ArrowLeft"){
      	Keys.left=false;
      }
      else if(e.key == "ArrowRight"){
      	Keys.right=false;
      }
    },false);
}
//Moving boat accoring to the direction
function boat_sail(){
	if(Keys.left==true) boat.x-=boat.velocity;
	else if(Keys.right==true) boat.x+=boat.velocity;
}

//Moving plane accoring to the direction
function plan_flight(){
	if(plane.x>=0) plane.x-=plane.velocity;	
	else plane.x= canvas_width;
}

//Insert the paracutists Queue every 3000ms
function new_parachutist(){
		console.log("make new para");
		parachutists.push(new Object('resources/parachutist.png',plane.x,plane.y,77,112,3));
}

//Draw paracutists and drop them from the plane
function parachutists_draw_and_move(){
	for(var i=0;i<parachutists.length;i++){
		var obj = {
			path:parachutists[i].path,
	        x: parachutists[i].x,
	        y: parachutists[i].y
	    };
		Draw_Object(obj);
		parachutists[i].y+=parachutists[i].velocity;
	}
}

//GAME OVER menu
function game_over_menu(){
	document.body.style.backgroundColor = "lightpink";
	context.textAlign = "center";
	context.font = "50px Georgia";
	context.fillStyle = "black";
	context.fillText("Score = "+score, canvas_width/2, canvas_height/2);
	if(score>=0 && score<=30){
		context.fillText(":(", canvas_width/2, canvas_height*(3/4));
	}
	else{
		context.fillText(":)", canvas_width/2, canvas_height*(3/4));		
	}
	context.font = "70px Verdana";
	// Create gradient
	var gradient = context.createLinearGradient(0, 0, canvas_width, 0);
	gradient.addColorStop("0"," magenta");
	gradient.addColorStop("0.25", "blue");
	gradient.addColorStop("0.5", "red");
	// Fill with gradient
	context.fillStyle = gradient;
	context.fillText("GAME OVER!!",canvas_width/2, canvas_height/4);
}
//Score and Alive menu
function menu(){
	context.font = "20px Georgia";
	context.fillStyle = "black";
	context.fillText("Score: "+score,10, 20);
	context.fillText("Lives: "+lives,10, 40);

}

function Draw(){
	Draw_Object(background);
	Draw_Object(sea);
	Draw_Object(boat);
	Draw_Object(plane);	
}
function moveObject(){
	plan_flight();
	boat_sail();
	parachutists_draw_and_move();
	if(parachutists.length!=0){
if(boat.x < parachutists[0].x + parachutists[0].width && boat.x + boat.width > parachutists[0].x &&
		boat.y < parachutists[0].y + parachutists[0].height){
		score += 10
	 	parachutists.shift();
	 	parachutists.shift();	}
	else if(canvas_height<parachutists[0].y + parachutists[0].height ){
		lives-=1;
		parachutists.shift();
		if(lives == 0){
			GAME_OVER = true;
		}
	 }
	}
}
//Game
function GAME(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	if(!GAME_OVER){
		PressKey();
		Draw();
		menu();
		moveObject();
	}
	else{
		game_over_menu();
	}
	requestAnimationFrame(GAME);
}
//setInterval(new_parachutist, Math.random()*4000);
setInterval(new_parachutist, 3000);
//Sound
var audio = new Audio('resources/sound.mp3');
audio.play();

GAME();


