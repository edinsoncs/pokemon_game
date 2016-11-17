"use strict";

var GLOBALBODY = document.getElementById("body");

//Pokemon Welcome
	var _idCharizar = document.createAttribute('id');
		_idCharizar.value = 'charizar';

	var _idAsh = document.createAttribute('id');
		_idAsh.value = 'ash';

	var _img = document.createElement('img');
	var _imgOther = document.createElement('img');

		//Set id in img
		_img.setAttributeNode(_idCharizar);
		_imgOther.setAttributeNode(_idAsh);

		_img.src = 'img/charizar.gif';
		_imgOther.src = 'img/ash.gif';

		//Stylesheets
			_img.style.position = 'absolute',
			_img.style.right = '0',
			_img.style.bottom = '0';

			_imgOther.style.position = 'absolute',
			_imgOther.style.left = '0',
			_imgOther.style.bottom = '20px',
			_imgOther.style.width = '120px';

		//Insert append in TAG BODY
			GLOBALBODY.appendChild(_img);
			GLOBALBODY.appendChild(_imgOther);


var show = document.getElementById("show");

//Btn style intiliaze
	show.style.position = 'absolute',
	show.style.top = '40%',
	show.style.left = '48%',
	show.style.padding = '20px',
	show.style.background = 'url("img/pokeball.png")',
	show.style.backgroundSize = 'cover',
	show.style.backgroundPosition = 'center',
	show.style.fontSize = '0px',
	show.style.border = 'none',
	show.style.width = '120px',
	show.style.height = '130px',
	show.style.outline = 'none',
	show.style.cursor = 'pointer';
	show.style.hover = ''

//Mouseover
	var hoverActive = document.createAttribute('onmouseover');
		hoverActive.value = 'active()';
//OutHover
	var hoverFalse = document.createAttribute('onmouseout');
		hoverFalse.value = 'defaultHover()';

	//Insert attribute in pokeball
		show.setAttributeNode(hoverActive);
		show.setAttributeNode(hoverFalse);


		//Function active()
			function active() {
				show.style.background = 'url("img/pokeballhover.png")';
				show.style.backgroundSize = 'cover';
				show.style.backgroundPosition = 'center';
			}

		//Function defaultHover()
			function defaultHover() {
				show.style.background = 'url("img/pokeball.png")';
				show.style.backgroundSize = 'cover';
				show.style.backgroundPosition = 'center';
			}

show.addEventListener('click', () => {
    var _link = document.createElement('h1');
    	var _text = document.createTextNode('POKEMON');
    var _header = document.createElement('div');
    	var _header_id = document.createAttribute('id');
    		_header_id.value = 'is_Header';
    		_header.setAttributeNode(_header_id);
    		_header.style.position = 'fixed';
    		_header.style.top = '0', _header.style.left = '0', _header.style.right = '0';

    _link.appendChild(_text);
    _link.href = 'http://facebook.com';
    _link.target = '_blank';

    var css = document.createAttribute('class');
    css.value = 'text';
    _link.setAttributeNode(css);

    var tag = _link



    //Definition Stylesheet
    styleToFn(_link);

    //Send Data
    appendToFn(tag, _header);

    //Remove Button
    var toRemove = show.parentElement.removeChild(show);


    bodyFn();

    removeFn();

    addScript();

});


function appendToFn(logo, header) {
    var body = document.getElementById("body");
    var isHeader = body.appendChild(header);
    var myHeader = document.getElementById("is_Header");
    	myHeader.style.background = 'url("img/bgheader.jpg")';
 		myHeader.appendChild(logo);

}

//Removing elements all img to gif

function removeFn(){
	//var removeElement = document.querySelectorAll('img');
	var rCharizar = document.getElementById('charizar');
		rCharizar.parentElement.removeChild(rCharizar);
	var rAsh = document.getElementById('ash');
		rAsh.parentElement.removeChild(rAsh);
}


function styleToFn(data) {
    data.style.background = 'url("img/pokemontext.png")';
    data.style.backgroundRepeat = 'no-repeat';
    data.style.width = '370px';
    data.style.height = '40px';
    data.style.backgroundSize = '160px';
    data.style.fontSize = '0px';
    data.style.padding = '5px 0';
    data.style.margin = '0';
    //data.style.border = '10px solid black';

}

function bodyFn() {
    var body = document.querySelectorAll('body')[0];

    var css = document.createAttribute('class');
    css.value = 'bodyJS';

    //var attr = document.createAttribute('onclick');
    //attr.value = 'alert("hola")';

    //Insert elements creat´s
    body.setAttributeNode(css);
    //body.setAttributeNode(attr);

    body.style.position = 'fixed', body.style.top = "0", body.style.bottom = "0", body.style.right = "0", body.style.left = "0";

    initializeHome(show);
}

 function initializeHome(btn) {
   var newcss = document.createAttribute('class');
    var newid = document.createAttribute('id');
    var area = document.getElementById('insertGame');
    //var second = document.createElement('h5');
    //var second_text = document.createTextNode(fnWelcome(second));

    //Area styles
    /*area.style.width = '100%', area.style.height = 'auto', area.style.background = 'url("img/bg.jpg")',
        area.style.position = 'fixed', area.style.top = '7.8%', area.style.left = '0'; */
}


/*function fnWelcome(t) {
    var svg = document.createElement('img');
    var span = document.createElement('span');
    var span_other = document.createElement('span');
    var src = document.createAttribute('src');
    src.value = '../img/bg.jpg';
    svg.setAttributeNode(src);
    var find = document.querySelectorAll(t[0]);
    find.textContent = 'PokeWeb';

    var result = find;
    return result.textContent
}*/

function addScript(){
	var script_one = document.createElement('script');
		script_one.src = 'js/game.js';
	
	var body = document.getElementById('body');
		body.appendChild(script_one);
}