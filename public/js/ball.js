var ball = {

    //Set random start angle for ball
	seedBall : function(){
        let ballStartSeed = Math.random() * 100;
        if(ballStartSeed < 25){			
            return 0.78;
        } 
        else if(ballStartSeed < 50){	
            return 2.35;
        } 
        else if(ballStartSeed < 75){	
            return 3.92;
        } 
        else{						
            return 5.49;
        }
    },
    //Reset ball on score
    resetBall : function (whichBall){
    if(app.getNode(whichBall).x > 800){ 
            app.p1Score ++;
        }
        if(app.getNode(whichBall).x < -20){ 
            app.p2Score ++;
        }
        console.log("score: Player 1 - " + app.p1Score + "     Player 2 - " + app.p2Score); 	
        app.getNode(whichBall).x = 400;
        app.getNode(whichBall).y = 200;
        app.getNode(whichBall).speed = 3;
    },
    
    //Spawn extra ball function
    spawnExtraBall : function(){
        app.nodes.push({
            id : 'ball2',
            x : 400,
            y : 20,
            width  : 10,
            height : 20,
            color  : 'white',
            speed : 3,
            direction : 0,
        });
    },

    //Add speed value to direction that ball is travelling
    moveBall : function(whichBall){
        app.getNode(whichBall).x += Math.cos(app.getNode(whichBall).direction) * app.getNode(whichBall).speed;
        app.getNode(whichBall).y += Math.sin(app.getNode(whichBall).direction) * app.getNode(whichBall).speed;
    },

    //Check the location of the ball for collision
    locationCheck : function(whichBall){
        //Reset ball and update score when ball reaches sides
        if(app.getNode(whichBall).x < -20 || app.getNode(whichBall).x > 800)
			{
				this.resetBall(whichBall);
				app.getNode(whichBall).direction = ball.seedBall();
                //Spawn extra ball once score is high enough
                if(app.p1Score + app.p2Score > 3 && app.ballCount == 1){
                    this.spawnExtraBall();
                    app.ballCount ++;
                }
			}
			//Invert direction when ball hits top and bottom
			if(app.getNode(whichBall).y < 0 || app.getNode(whichBall).y > 380)
			{
				app.getNode(whichBall).direction *= -1;
			}	

            //Bounce off Paddles
			//Player 1
			if(	app.getNode(whichBall).x > 35 &&
                app.getNode(whichBall).x < 55 && 	
                (app.getNode(whichBall).y - (app.getNode('player1').y+50)) < 50 &&
                (app.getNode(whichBall).y - (app.getNode('player1').y+50)) > -50){
                    
                    app.getNode(whichBall).direction -= 1.57;
                    app.getNode(whichBall).speed += 0.1; //Speed up ball every hit
            }
            //Player 2
            if(	app.getNode(whichBall).x > 750 && 	
                 app.getNode(whichBall).x < 770 && 	
                (app.getNode(whichBall).y - (app.getNode('player2').y+50)) < 50 &&
                (app.getNode(whichBall).y - (app.getNode('player2').y+50)) > -50){
                    app.getNode(whichBall).direction -= 1.57;
                    app.getNode(whichBall).speed += 0.1; //Speed up ball every hit
            }       
        },    
};