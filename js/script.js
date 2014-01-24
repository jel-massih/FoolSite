$(function() {

	$('body').on('click', '.portfolio-item', function(evt) {
		var name = this.id;
		if(songData[name] != null) {
			playFile(songData[name].id);
		}
	});
});

var SCSound;
var bPlaying = false;
function playFile(file) {
	if(SCSound) {
		SCSound.stop();
	}
  bPlaying = true;
	console.log(file);
 	SC.stream("/tracks/" + file, function(sound){
 		SCSound = sound;
    sound.play();
  });
}

var songData = {
	"lazer_jungle":{
		url: "fuckourordinarylives/f-o-o-l-lazer-jungle",
		id: "112274310"
	},
	"going_quantum":{
		url:"fuckourordinarylives/f-o-o-l-going-quantum-mix",
		id: "104956611"
	},
	"feelings":{
		url:"fuckourordinarylives/sets/f-o-o-l-feelings-ep",
		id: "104096831"
	},
	"tutorials":{
		url:"fuckourordinarylives/f-o-o-l-tutorials-1",
		id: "101588478"
	},
	"fuck_it":{
		url:"fuckourordinarylives/f-o-o-l-fuck-it-original-mix",
		id: "84289504"
	},
	"destroyer_of_speakers":{
		url:"fuckourordinarylives/sets/destroyer-of-speakers-ep",
		id: "72749208"
	},
	"the_game":{
		url:"fuckourordinarylives/the-game-ep-teaser-1",
		id: "61145520"
	},
	"smoke_and_death":{
		url:"fuckourordinarylives/f-o-o-l-smoke-death-original-1",
		id: "59618941"
	},
	"deaf":{
		url:"fuckourordinarylives/f-o-o-l-your-ol-lady-deaf-1",
		id: "57750645"
	},
	"vision":{
		url:"tuffemup/f-o-o-l-vision-ep-teaser",
		id: "35595690"
	},
	"comboe":{
		url:"fuckourordinarylives/f-o-o-l-comboe-original-mix-1",
		id: "42553860"
	},
	"melodies_of_ordinary":{
		url:"fuckourordinarylives",
		id: "28791374"
	},
	"call_to_krieg":{
		url:"fuckourordinarylives/call-to-krieg-ep-teaser",
		id: "21322250"
	},
	"invasion":{
		url:"fuckourordinarylives/invasion-ep-teaser-omgitm-010",
		id: "14341726"
	},
	"japan":{
		url:"fuckourordinarylives/tjanb-free-ep-download",
		id: "9833168"
	},
	"reborn":{
		url:"fuckourordinarylives/f-o-o-l-reborn-original-mix",
		id: "7717421"
	},
	"berskgang":{
		url:"",
		id: "3894886"
	},
	"we_are_not_french":{
		url:"fuckourordinarylives/we-are-not-french-ep-teaser",
		id: "4732255"
	}
}