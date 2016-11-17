//Initialize game in framework Phaser @edinsoncs
"use strict"
	
	var gameWeb = new Phaser.Game(800, 600, Phaser.AUTO, '', 
					{ 
						preload: assets, 
						create: gamedev, 
						update: logica  
					});


	//Var Globals
		var platform, suelo, person, charizard, bandeja, pokeball;
		var txtPuntos;
		var txtVidas;
		var txtNivel;
		var sound;
		var bgsound;
		var gameover;
		var button;


	function assets(){
		//Load Assets
		
		gameWeb.load.image('backgroundGame', 'assets/bg.png');
		gameWeb.load.image('platformGame', 'assets/plataforma.jpg');
		gameWeb.load.image('charizardGame', 'assets/charizard.png');

		//Load Music
		gameWeb.load.audio('punto', 'assets/numkey.wav');

		//Load Music Complet
		gameWeb.load.audio('musicbg', 'assets/poke.mp3');

		//Load Sound Game Over
		gameWeb.load.audio('gameover', 'assets/gameover.mp3');
	
		//Load Sprite Person Ash
		gameWeb.load.spritesheet('personGame', 'assets/person.png', 32, 48);


		//Load Button Share
		//gameWeb.load.image('button', 'assets/share.png');
	
	}

	function gamedev(){
		//To Create

			//Set background game
			gameWeb.add.sprite(0,0, 'backgroundGame');

			//Add Platform
			platform = gameWeb.add.sprite(0, 100, 'platformGame');
			platform.width = 800;

			//Add Suelo Charizard
			suelo = gameWeb.add.sprite(0, gameWeb.world.height - 5, 'platformGame');
			suelo.width = 800;
			suelo.height = 5;

			//Add Charizard Pokeball
			bandeja = gameWeb.add.sprite(50, gameWeb.world.height -100, 'platformGame');
			bandeja.width = 50;

			//Add Person Game
			person = gameWeb.add.sprite(32, 0, 'personGame');




			//Active Fisic => add fisic
			gameWeb.physics.startSystem(Phaser.Physics.ARCADE);

			gameWeb.physics.arcade.enable(platform);
			gameWeb.physics.arcade.enable(suelo);
			gameWeb.physics.arcade.enable(bandeja);
			gameWeb.physics.arcade.enable(person);


			//Movimiento Person
			person.body.gravity.y = 300;
			platform.body.immovable = true;

			//Person Movim Active
			person.body.velocity.x = 250;


			person.animations.add('left', [0, 1, 2, 3], 10, true);
			person.animations.add('right', [5, 6, 7, 8], 10, true);
			person.animations.play('right');

			gameWeb.giro = 250;


			//Create Pokeball
			pokeball = gameWeb.add.group();
			gameWeb.gravedadPokeball = 150;

			//Pont recollection pokeball active
			gameWeb.puntaje = 0;

			txtPuntos = gameWeb.add.text(25, 16, 'Pokeballs: 0', {
				font: '24px Arial',
				fill: '#fff'
			});


			//Kill Lives
			gameWeb.vidas = 5;

			//Insert txt vidas
			txtVidas = gameWeb.add.text(625, 16, 'Vidas: 5', {
				font: '24px Arial',
				fill: '#000'
			});

			//Sum Lvl
			gameWeb.nivel = 1;

			gameWeb.subirNivel = gameWeb.time.events.loop(10000, subirNivel, this);

			txtNivel = gameWeb.add.text(325, 16, 'Nivel: 1', {
				font: '24px Arial',
				fill: '#000'
			});


			//Audio
			sound = gameWeb.add.audio('punto');

			//Music
			bgsound = gameWeb.add.audio('musicbg');

			//GameOver
			gameover = gameWeb.add.audio('gameover');
			
			//Play Music
			bgsound.play();

			
	}

	function logica(){

		

		//Listener
		gameWeb.physics.arcade.collide(person, platform);
		//Active pont collection all
		gameWeb.physics.arcade.overlap(bandeja, pokeball, recogerPokeball, null, this);

		//Call Lives
		gameWeb.physics.arcade.overlap(pokeball, suelo, perderVida, null, this);

		
		if(person.body.velocity.x > 0 && person.x > gameWeb.giro){
			person.body.velocity.x *= -1;
			gameWeb.giro = gameWeb.rnd.integerInRange(100, person.x-1);
			person.animations.play('left');
			charizard();
		}

		if(person.body.velocity.x < 0 && person.x < gameWeb.giro){
			person.body.velocity.x *= -1;
			gameWeb.giro = gameWeb.rnd.integerInRange(person.x+1, 688);
			person.animations.play('right');
			charizard();
		}

		//bandeja.body.x = gameWeb.input.mousePointer.x - bandeja.width / 2;

		bandeja.body.x = gameWeb.input.mousePointer.x - bandeja.width / 2;
	}


function charizard() {
	var charizard = pokeball.create(person.x, 100, 'charizardGame');
	gameWeb.physics.arcade.enable(charizard);
	charizard.body.gravity.y = gameWeb.gravedadPokeball;


	//active cursor
	bandeja.body.x = gameWeb.input.mousePointer.x - bandeja.width / 2;
}


//call function recogerPokeball
function recogerPokeball(bandeja, pokeball){
	pokeball.kill();
	gameWeb.puntaje += 10;

	//Aument puntaje
	txtPuntos.setText('Pokeballs: ' + gameWeb.puntaje);

	sound.play();
}

//call function perdervidas
function perderVida(suelo, pokeball){
	pokeball.kill();
	gameWeb.vidas -= 1;

	txtVidas.setText('Vidas: '+gameWeb.vidas);

	if(gameWeb.vidas == 0){
		suelo.kill();
		bandeja.kill();

		bgsound.stop();
		gameover.play();

		gameWeb.add.text(200, 250, 'Perdistes', {
			font: '80px Arial',
			fill: '#000'
		});

		gameWeb.add.text(200, 350, 'Nivel: '+gameWeb.nivel, {
			font: '30px Arial',
			fill: '#000'
		});

		gameWeb.add.text(200, 400, 'Puntaje: '+gameWeb.puntaje, {
			font: '30px Arial',
			fill: '#000'
		});


		//Button Shared Social Network
		//button = gameWeb.add.button(gameWeb.world.centerX -95, 450, 'button', sharedFacebook, this);


		//Write name in input to server

		sendInput(gameWeb.puntaje, gameWeb.nivel);

	}
}

//call function subir de nivel
function subirNivel(){
	gameWeb.gravedadPokeball *= 1.2;
	person.body.velocity.x *= 1.2;
	gameWeb.nivel += 1;
	txtNivel.setText('Nivel: ' + gameWeb.nivel);
}


//call function shared social network => Facebook
function sharedFacebook(){
	window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href)
}

function sendInput(puntaje, nivel){
	var form = document.createElement('form');
	 	var action = document.createAttribute('action');
	 		action.value = 'http://localhost:8083/';
	 		form.setAttributeNode(action);
	 	var method = document.createAttribute('method');
	 		method.value = 'POST';
	 		form.setAttributeNode(method);
	 	var idform = document.createAttribute('id');
	 		idform.value = 'formuser';
	 		form.setAttributeNode(idform);
	var input = document.createElement('input');
	var type = document.createAttribute('type');
		type.value = 'text';
		input.setAttributeNode(type);
	var name = document.createAttribute('name');
		name.value = "is_name_val";
		input.setAttributeNode(name);
	var placeholder = document.createAttribute('placeholder');
		placeholder.value = 'Ingresa tu nombre';
		input.setAttributeNode(placeholder);

	var submit = document.createElement('input');
	var typesubmit = document.createAttribute('type');
		typesubmit.value = 'submit';
		submit.setAttributeNode(typesubmit);
	var valuesubmit = document.createAttribute('value');
		valuesubmit.value = 'Cargar Nombre';
		submit.setAttributeNode(valuesubmit);

	
		

		//Stylesheets
		input.style.position = 'fixed';
		input.style.top = '80%';
		input.style.left = '40%';
		input.style.padding = '0.8em 1em';
		input.style.border = 'none';
		input.style.outline = 'none';
		input.style.fontSize = '20px';


		//Stylesheets
		submit.style.position = 'fixed';
		submit.style.top = '90.5%';
		submit.style.left = '46%';
		submit.style.padding = '0.8em 1em';
		submit.style.border = 'none';
		submit.style.outline = 'none';
		submit.style.fontSize = '13px';

	var body = document.getElementById('body');
		//Apend Form
		body.appendChild(form);
		body.appendChild(input);
		var formdetect = document.getElementById('formuser');
			formdetect.appendChild(input);
			formdetect.appendChild(submit);
		
}