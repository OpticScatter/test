var app = {
	//initial variables
	canvas  : null,
	context : null,
	p1Score : 0,
	p2Score : 0,

	//resizing
	width   : 800,
	height  : 400,

	//nodes
	nodes   : [],

	//timing
	timestamp  : 0,
	now        : 0,
	lastUpdate : 0,

	init : function(){
		this.canvas  = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');

		this.render();
		this.onInit();
	},
	drawScore : function(){
		this.context.font = "30px Courier";
		this.context.fillStyle = "white";
		this.context.textAlign = "right";
		this.context.fillText(this.p1Score, 370, 380);
		this.context.textAlign = "left";
		this.context.fillText(this.p2Score, 420, 380);
	},
	render : function(){
		this.clear();
		this.update();

		window.requestAnimationFrame(this.render.bind(this));
	},
	clear  : function(){
		this.context.clearRect(0, 0, this.width, this.height);
	},
	
	update : function(){
	    var dt = Date.now() - this.lastUpdate;

		this.onUpdate(dt);
		this.drawScore(); //Draw score text to screen

		for(var index in this.nodes){
			var node = this.nodes[index];
			//Draw a circle if id = 'ball'
			if(node.id == 'ball'){ 
				this.context.beginPath();
				this.context.arc(node.x, node.y, node.width, 0, Math.PI*2);
				this.context.fill();
			}
			//Otherwise draw a rectangle
			else{	
				this.context.fillStyle = node.color;
				this.context.fillRect(node.x, node.y, node.width, node.height);
			}
		}

		this.lastUpdate = Date.now();
		this.timestamp+=dt;
	},
	getNode : function(id){
		for(var index in this.nodes){
			var node = this.nodes[index];

			if(node.id == id){
				return node;
			}
		}

		return { x : null, y : null, width : null, height : null };
	},

	//events
	onInit   : function(){},
	onUpdate : function(){}
};

window.onload = function(){
	app.init();
};