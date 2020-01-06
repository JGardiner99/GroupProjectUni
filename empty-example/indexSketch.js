var score = 0;
var miss = 10;

let timer = 120;
var inter = 60;
var minutes = Math.floor(timer / inter);
var seconds = timer % inter;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    ball = new Ball();
	document.body.style.overflow = 'hidden';
}

function draw() 
{

    background(0);
	
	fill(0, 255, 0);
	textSize(24);
	text("Score: " + score, 10, 25);
	text("Misses Left: " + miss, width -175, 24);
	if (seconds > 9)
	{
		text("Time Remaining: " + minutes + ":" + seconds, 10, 50);		
	}
	else
	{
		text("Time Remaining: " + minutes + ":0" + seconds, 10, 50);	
	}
	
	if(frameCount % 60 == 0 && timer > 0)
	{
		timer--;
		minutes = Math.floor(timer / inter);
		seconds = timer % inter;
	}

	
	if(timer == 0)
	{
		window.location.href = "index.html";
	}
    ball.update();
    ball.edges();
    ball.show();
}

function mousePressed()
{
	ball.clicked();	
}

//ball class
class Ball 
{
    constructor() 
	{
        this.x = width/2;
        this.y = height/2;
        this.xspeed = 0;
        this.yspeed = 0;
        this.xspeedbool = 0;
		this.yspeedbool = 0;
		this.r = 50
        
        this.reset();
    }
    
    update() 
	{
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
    
    reset() 
	{
        this.x = width/2;
        this.y = height/2;
        let angle = random(-PI/4, PI/4);
        this.xspeed = 5 * Math.cos(angle);
        this.yspeed = 5 * Math.sin(angle);
        
        if (random(1) < 0.5) 
		{
            this.xspeed *= -1;
        }
    }
    
    edges() 
	{
        if (this.y < 15 || this.y < 14 || this.y > height) 
		{
			
            this.yspeed *= -1;
        }
		
		
		if(this.y > height - 15)
		{
			this.yspeed *= -1;
		}
		
		
        
		if (this.x < 15 || this.x < 14 || this.x > width) 
		{
            this.xspeed *= -1;
        }
		
		
		
		if(this.x > width - 15)
		{
			this.xspeed *= -1;
		}
		
		
    }
    
    show() 
	{
        fill(255);
        ellipse(this.x, this.y, this.r * 2);
    }
	
	clicked()
	{
		//this variable "d" works out where the mouse and the ball is on the canvas
		let d = dist(mouseX, mouseY, this.x, this.y);
		//this if statement determiners if the users mouse is within the canvas
		//if they are outside of the canvas then any click wont be counted as a miss
		if (mouseX < width && mouseY < height)
		{
		//this if statement allows the system to see if the mouse is clicked within the radius of the ball
		if(d < this.r)
		{
			//this gives xspeed a random value 1 or 2
			this.xspeedbool = Math.floor(Math.random() * 2) + 1;
			if(this.xspeedbool == 1)
			{
				this.xspeed = random(-3, -10);
			}
			else
			{
				this.xspeed = random(3, 10);
			}
			//this gives yspeed a random value 1 or 2
			this.yspeedbool = Math.floor(Math.random() * 2) + 1;	
			/*
			this if statement determines what number was assigned to yspeed
			in order to work out what speed to give the ball
			if y speed is equal to 1 then it gives the ball a negative speed its movement is flipped
			if its equal to anything else (2) then its assigned a positive value
			*/
			if(this.yspeedbool == 1)
			{
				this.yspeed = random(-3, -10);
			}
			else
			{
				this.yspeed = random(3, 10);
			}
			//this gets the score then adds one to it every time the ball is clicked
			score = score + 1;
			
			if(score > 2)
			{
				this.r = random(25, 75);
				if(score > 4)
				{
					this.xspeed = this.xspeed * 1.5;
					this.yspeed = this.yspeed * 1.5;
				}
			}
		}
		else
		{
				// this is the same as the score but it takes one from the counter
				miss = miss - 1;
				
				// when the miss counter hits 0 then run the code
				if(miss == 0)
				{
					//this is a redirect to a page
					window.location.href = "index.html";
				}
			}
		}
	}
}
