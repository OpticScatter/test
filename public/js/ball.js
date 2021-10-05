var ball = {

    //Set random start angle for ball
	seedBall : function(){
        let ballStartSeed = Math.random()*100;
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
    resetBall : function (){
    if(app.getNode('ball').x > 800){ 
            app.p1Score ++;
        }
        if(app.getNode('ball').x < -20){ 
            app.p2Score ++;
        }
        console.log("score: Player 1 - " + app.p1Score + "     Player 2 - " + app.p2Score); 	
        app.getNode('ball').x = 400;
        app.getNode('ball').y = 200;
        app.getNode('ball').speed = 3;
    }	
}