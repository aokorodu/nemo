class Nemo{

    constructor(x, y, maxX, maxY, group){
        this.points = [];
        this.lines = [];
        this.x = x;
        this.y= y;
        this.radius = 15;
        this.radiusDecrement = .35;
        this.maxX = maxX;
        this.maxY = maxY;

        this.group = group;
        this.element = null;
        this.maxPoints = 10;
        this.maxWeight = 20;
        this.segments = 50;

        this.eye = null;

        this.defaultXVelocity = Math.random() > .5 ? .3 + Math.random()/2 : -.3 - Math.random()/2
        this.xVelocity =  this.defaultXVelocity;
        this.yVelocity = 0;

        // target
        this.targetX = 0;
        this.targetY = 0;
    }

    initProps(){
        this.points = Array(this.segments).fill({x:this.x, y:this.y});

        let newR = this.radius;
        let R = Math.round(Math.random() * 200);
        let G = 255;//Math.round(Math.random() * 255);
        let B = 255;//Math.round(Math.random() * 255);
        for(let i = 0; i < this.segments; i++){

            if(newR < 1) newR = 1;
            if(i === this.segments-1) newR = 3;
            const circ = document.createElementNS(ns, 'circle');
            circ.setAttribute('cx', String(this.x));
            circ.setAttribute('cy', String(this.y));
            circ.setAttribute('r', String(newR));
            circ.setAttribute('fill', `rgb(${R}, ${G}, ${B})`);
            if(i===0) {
                circ.setAttribute('stroke', "rgba(255, 255, 255, .2)");
                circ.setAttribute('stroke-width', "10");
            }
            this.group.appendChild(circ);
            this.lines.push(circ);
            newR -= this.radiusDecrement;
        }

            this.eye = document.createElementNS(ns, 'circle');
            this.eye.setAttribute('cx', String(this.x));
            this.eye.setAttribute('cy', String(this.y));
            this.eye.setAttribute('r', String(this.radius/5));
            this.eye.setAttribute('fill', `rgba(255,255,255, .9)`);
            this.group.appendChild(this.eye);
    }

    update(delta) {
        this.noiseMotion(delta);
        this.draw();
    }

    noiseMotion(delta){
        let yPos = ((noise(this.y, delta) * 300) - 50) + this.y;
        this.x += this.xVelocity;

        if(this.x < 0)
        {
            this.x = 0;
            this.xVelocity = -this.xVelocity;
        } else if(this.x > this.maxX){
            this.x = this.maxX;
            this.xVelocity = -this.xVelocity;
        }

        const point = {x:this.x, y:yPos}
        this.points.unshift(point);
        if(this.points.length > this.segments - 1) this.points.pop();
    }

    draw(){
        for(let i = 0; i < this.segments; i++){
            const circ = this.lines[i];
            circ.setAttribute('cx', String(this.points[i].x));
            circ.setAttribute('cy', String(this.points[i].y));
        }

        this.eye.setAttribute('cx', String(this.points[0].x));
        this.eye.setAttribute('cy', String(this.points[0].y));
    }
}
