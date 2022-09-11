let w = 800;
let h = 600;

let gamemode;
let player1, player2, player3, player4;
let p1Name, p2Name, p3Name, p4Name;
let snitch;

let score1 = 0;
let score2 = 0;

let fr = 60;
let timeElapsed = 0;
let maxTime = 30; // second

function setup() {
	createCanvas(w, h);
	frameRate(fr);

	gamemode = prompt("gamemode: input '2' or '4'");

	if (gamemode == "2") {
		p1Name = prompt("player 1 name:");
		p2Name = prompt("player 2 name:");
		player1 = new Player1(w/3, h/2);
		player2 = new Player2(2*w/3, h/2);
	}

	if (gamemode == "4") {
		p1Name = prompt("player 1 name:");
		p2Name = prompt("player 2 name:");
		p3Name = prompt("player 3 name:");
		p4Name = prompt("player 4 name:");
		player1 = new Player1(w/3, h/3);
		player2 = new Player2(2*w/3, h/3);
		player3 = new Player3(2*w/3, 2*h/3);
		player4 = new Player4(w/3, 2*h/3);
	}

	snitch = new Target(random(width), random(height));
}

function draw() {
	// DRAW THE FIELD
	background(50);
	removeElements();
	
	player1.applyForce(player1.seek(snitch));
	player2.applyForce(player2.seek(snitch));
	player1.wander();
	player2.wander();

	if (gamemode == "4") {	
		player3.applyForce(player3.seek(snitch));
		player4.applyForce(player4.seek(snitch));
		player3.wander();
		player4.wander();
	}

	snitch.wander();

	player1.edges();
	player2.edges();
	if (gamemode == "4") {
		player3.edges();
		player4.edges();
	}
	snitch.edges();

	/*snitch.applyForce(snitch.flee(player1));
	snitch.applyForce(snitch.flee(player2));
	if (gamemode == "4") {
		snitch.applyForce(snitch.flee(player3));
		snitch.applyForce(snitch.flee(player4));
	}*/

	if (gamemode == "4") {
		let d1 = p5.Vector.dist(player1.pos, snitch.pos);
		let d3 = p5.Vector.dist(player3.pos, snitch.pos);
  		if (d1 < player1.r + snitch.r || d3 < player3.r + snitch.r) {
    		snitch = new Target(random(width), random(height));
    		score1++;
  		}
  		let d2 = p5.Vector.dist(player2.pos, snitch.pos);
  		let d4 = p5.Vector.dist(player4.pos, snitch.pos);
  		if (d2 < player2.r + snitch.r || d4 < player4.r + snitch.r) {
    		snitch = new Target(random(width), random(height));
    		score2++;
  		}
  		/*if ((score2 == 4 && score1 == 4) || score2 == 5 || score1 == 5) {
			let scoreParagraph = p1Name + "🔴 " + "<br>" + p3Name + "🟠 " + score1 + "<br>" + p2Name + "🔵 " + "<br>" + p4Name + "🟢 " + score2;
			createP(scoreParagraph).style('font-size', '20px').position(w + 30, 250);
			noLoop();
		}*/

		if (frameCount > fr * maxTime) {
			let scoreParagraph = p1Name + "🔴 " + "<br>" + p3Name + "🟠 " + score1 + "<br>" + p2Name + "🔵 " + "<br>" + p4Name + "🟢 " + score2;
			createP(scoreParagraph).style('font-size', '20px').position(w + 30, 250);
			noLoop();
		}

  	} else {
  		let d1 = p5.Vector.dist(player1.pos, snitch.pos);
  		if (d1 < player1.r + snitch.r) {
    		snitch = new Target(random(width), random(height));
    		score1++;
  		}
  		let d2 = p5.Vector.dist(player2.pos, snitch.pos);
  		if (d2 < player2.r + snitch.r) {
    		snitch = new Target(random(width), random(height));
    		score2++;
  		}
  		/*if ((score2 == 2 && score1 == 2) || score2 == 3 || score1 == 3) {
			let scoreParagraph = p1Name + "🔴 " + score1 + "<br>" + p2Name + "🔵 " + score2;
			createP(scoreParagraph).style('font-size', '20px').position(w + 30, 250);
			noLoop();
		}*/

		if (frameCount > fr * maxTime) {
			let scoreParagraph = p1Name + "🔴 " + score1 + "<br>" + p2Name + "🔵 " + score2;
			createP(scoreParagraph).style('font-size', '20px').position(w + 30, 250);
			noLoop();
		}
  	}

	player1.update();
	player2.update();
	if (gamemode == "4") {
		player3.update();
		player4.update();
	}
	snitch.update();

	player1.show();
	player2.show();
	if (gamemode == "4") {
		player3.show();
		player4.show();
	}
	snitch.show();

	//let timeParagraph = "time: " + str(floor(frameCount / fr)) + "/" + str(maxTime);
	let timeParagraph = "time left: " + str(maxTime - floor(frameCount / fr));
	createP(timeParagraph).style('font-size', '20px').position(w + 30, 50);

	if (gamemode == "4") {
		let scoreParagraph = p1Name + "🔴 " + "<br>" + p3Name + "🟠 " + score1 + "<br>" + p2Name + "🔵 " + "<br>" + p4Name + "🟢 " + score2;
		createP(scoreParagraph).style('font-size', '20px').position(w + 30, 250);
	} else {
		let scoreParagraph = p1Name + "🔴 " + score1 + "<br>" + p2Name + "🔵 " + score2;
		createP(scoreParagraph).style('font-size', '20px').position(w + 30, 250);
	}
}
