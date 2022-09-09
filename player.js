class Player {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxSpeed = 6;
		this.maxForce = 0.4;
		this.r = 16;
    	this.wanderTheta = PI / 2;
	}

	seek(target, arrival = false) {
		let force = p5.Vector.sub(target.pos, this.pos);
		let desiredSpeed = this.maxSpeed;
		if (arrival) {
			let slowRadius = 150;
			let distance = force.mag();
			if (distance < slowRadius) {
				desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
			}
		}
		force.setMag(desiredSpeed);
		force.sub(this.vel);
		force.limit(this.maxForce);
		return force;
	}

	wander() {
    	let wanderPoint = this.vel.copy();
    	wanderPoint.setMag(100);
    	wanderPoint.add(this.pos);

    	let wanderRadius = 50;

    	let theta = this.wanderTheta + this.vel.heading();

    	let x = wanderRadius * cos(theta);
    	let y = wanderRadius * sin(theta);
    	wanderPoint.add(x, y);

    	let steer = wanderPoint.sub(this.pos);
    	steer.setMag(this.maxForce);
    	this.applyForce(steer);

    	let displaceRange = 0.5;
    	this.wanderTheta += random(-displaceRange, displaceRange);
  	}

	flee(target) {
		return this.seek(target, true).mult(-1);
	}

	arrive(target) {
		return this.seek(target, true);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	edges() {
    	if (this.pos.x > width) {
      	this.pos.x = 1;
    	} else if (this.pos.x < 0) {
      	this.pos.x = width - 1;
    	}
    	if (this.pos.y > height) {
      	this.pos.y = 1;
    	} else if (this.pos.y < 0) {
      	this.pos.y = height - 1;
    	}
  	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.set(0, 0);
	}

	show() {
		fill(255, 0, 0);
		stroke(0);
		strokeWeight(1);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();
	}
}

class Player1 extends Player {
	constructor(x, y) {
		super(x, y);
	}

	show() {
		fill(255, 0, 0);
		stroke(0);
		strokeWeight(1);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();
	}
}

class Player2 extends Player {
	constructor(x, y) {
		super(x, y);
	}

	show() {
		fill(0, 0, 255);
		stroke(0);
		strokeWeight(1);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();
	}
}

class Player3 extends Player {
	constructor(x, y) {
		super(x, y);
	}

	show() {
		fill(255, 153, 0);
		stroke(0);
		strokeWeight(1);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();
	}
}

class Player4 extends Player {
	constructor(x, y) {
		super(x, y);
	}

	show() {
		fill(0, 230, 0);
		stroke(0);
		strokeWeight(1);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0);
		pop();
	}
}