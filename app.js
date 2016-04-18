var canvas = document.createElement("canvas");
canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);



var tree = new Branch(100);

animateMyTree();

function animateMyTree()
{
    ctx.save();
    ctx.clearRect(0,0, canvas.width -100, canvas.height -100);
    ctx.translate(canvas.width/2, canvas.height -100);
    
    tree.render();         
    ctx.restore();
    
    window.requestAnimationFrame(animateMyTree);
}


function random(min, max)
{
    return Math.random() * (max - min) + min;    
}

function Branch(size, rotation){
    this.children = [];
    this.sway  = 0
    this.swaySpeed = random(0.05, 0.4);
    
    if(size > 10)
    {
        this.children.push(new Branch(size * 0.8, random(10, 30)));
        this.children.push(new Branch(size * 0.8, random(-10, -30)));
    }
    
    this.render = function()
    {
        ctx.save();
        
        ctx.rotate( (rotation + Math.sin(this.sway)) * Math.PI/180);
        ctx.beginPath();
        
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = size * 0.1;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        ctx.stroke();
        ctx.translate(0, -size);
        
        for(var i = 0; i < this.children.length; i++){
            this.children[i].render();
        }
        
        this.sway += this.swaySpeed;
        ctx.restore();
    }   
}