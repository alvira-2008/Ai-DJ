song = "";

leftWristX = 0;
leftWristY = 0;
leftX = 0;
leftY = 0;

rightWristX = 0;
rightWristY = 0;
rightX = 0;
rightY = 0;


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    
    if(rightWristX>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }

    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause(){

    song.pause();
}

function modelLoaded(){
    console.log('PoseNet is Initialized!');
}

function gotPoses(results){
    if(results.length>0){
        
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        leftX = leftWristX.toFixed(3);
        leftY = leftWristY.toFixed(3);
        console.log("Left Wrist X = " + leftX + " Left Wrist Y = " + leftY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        rightX = rightWristX.toFixed(3);
        rightY = rightWristY.toFixed(3);
        console.log("Right Wrist X = " + rightX + " Right Wrist Y = " + rightY);
    }
}