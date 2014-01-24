$(function() {

	$('body').on('click', '.portfolio-item', function(evt) {
		var name = this.id;
		if(songData[name] != null) {
			playFile(songData[name], true);
		}
	});

	document.onmousemove =  function(e) {
		if(startDrag == true) {
      var p = $('#slider').offset(),
      x = e.pageX - p.left,
      y = e.pageY - p.top;

      var curPos = Math.floor(x/$('#slider').width()*100);

      
      if(x < $('#slider').width()) {
				$('#sliderhandle').css('left', curPos + "%");
			}
			if(x <= 0) {
				$('#sliderhandle').css('left', 0);
				curPos = 0;
			}

			if(curPos > 100) {curPos = 100;}

			if(SCSound) {
				var newPoint = SCSound.duration * (curPos/100);
				startPoint = newPoint;
				newPoint = Math.round(newPoint/1000);
				var duration = (Math.floor(newPoint/60)) + ':' + ((newPoint%60 < 10) ? ('0' + (newPoint%60)) : (newPoint%60));
			 	$("#time").text(duration);
			}
    }
	};

	document.onmouseup = function(e) {
		if(startDrag) {
			updateMusic();
		}
		startDrag = false;
	}

	$('#playBtn').click(function(evt) {
		if(bPlaying) {
			pauseFile();
		} else {
			resumeFile();
		}
	});

	$('#slider').mousedown(function(e) {
		startDrag = true;
		var p = $(this).offset(),
		x = e.pageX - p.left,
		y = e.pageY - p.top;
		e.preventDefault();
    var curPos = Math.floor(x/$(this).width()*100);

		if(x < $('#slider').width()) {
			$('#sliderhandle').css('left', curPos + "%");
		}
		if(x <= 0) {
			$('#sliderhandle').css('left', -($('#sliderhandle').width()/2));
		}

		if(SCSound) {
			var newPoint = SCSound.duration * (curPos/100);
			startPoint = newPoint;
			newPoint = Math.round(newPoint/1000);
			var duration = (Math.floor(newPoint/60)) + ':' + ((newPoint%60 < 10) ? ('0' + (newPoint%60)) : (newPoint%60));
		 	$("#time").text(duration);
		}
	});

	playFile(songData["lazer_jungle"], false);
});

var SCSound;
var bPlaying = false;
var startDrag = false;
var startPoint = 0;
var curFile;
function playFile(file, bAutoPlay) {
	curFile = file;
 	SC.stream("/tracks/" + file.id, function(sound){
 		SC.get("/tracks/" + file.id, function(info) {
			info.duration = Math.round(info.duration/1000);
 			var duration = (Math.round(info.duration/60)) + ':' + ((info.duration%60 < 10) ? ('0' + (info.duration%60)) : (info.duration%60));
 			$("#total_time").text(duration);
 		});
 		sound.load();
 		pauseFile();
 		if(SCSound) {
			SCSound.stop();
		}
 		SCSound = sound;
 		$("#track_title").text(file.artist + " - " + file.title);
 		$("#track_title").attr("href", "http://www.soundcloud.com/" + file.url);
 		if(bAutoPlay) {
 			resumeFile();
 		}
  });
}


function pauseFile() {
	if(SCSound) {
		SCSound.pause();
	}
  bPlaying = false;
	$("#playBtn").removeClass("fa-stop");
 	$("#playBtn").addClass("fa-play");
}

function resumeFile() {
	if(bPlaying) {return;}
	if(SCSound) {
		SCSound.play({
			whileplaying: whileplaying,
			onfinish: onfinish
		});
		$("#playBtn").removeClass("fa-play");
 		$("#playBtn").addClass("fa-stop");
  	bPlaying = true;
	}
}

var whileplaying = function() {
 	var percent = (this.position/this.duration) * 100;
 	$("#progressBar").css("width", percent + '%');
	this.position = Math.round(this.position/1000);
	var duration = (Math.floor(this.position/60)) + ':' + ((this.position%60 < 10) ? ('0' + (this.position%60)) : (this.position%60));
 	if(!startDrag) {
 		$("#sliderhandle").css("left", percent + '%');
 		$("#time").text(duration);
 	}
}

var onfinish = function() {
	playFile(curFile, false);

 	$("#progressBar").css("width", '0%');
 	if(!startDrag) {
 		$("#sliderhandle").css("left", '0%');
 		$("#time").text("0:00");
 	}
}

function updateMusic() {
	if(SCSound == null) {
		return;
	}	

	if(!bPlaying) {
		resumeFile();
	}
	SCSound.setPosition(startPoint);
}

var songData = {
	"lazer_jungle":{
		url: "fuckourordinarylives/f-o-o-l-lazer-jungle",
		id: "112274310",
		artist: "F.O.O.L",
		title: "Lazer Jungle"
	},
	"going_quantum":{
		url:"fuckourordinarylives/f-o-o-l-going-quantum-mix",
		id: "104956611",
		artist: "F.O.O.L",
		title: "Going Quantum Mixtape"
	},
	"feelings":{
		url:"fuckourordinarylives/sets/f-o-o-l-feelings-ep",
		id: "104096831",
		artist: "F.O.O.L",
		title: "Feelings EP Teaser"
	},
	"tutorials":{
		url:"fuckourordinarylives/f-o-o-l-tutorials-1",
		id: "101588478",
		artist: "F.O.O.L",
		title: "Tutorials"
	},
	"fuck_it":{
		url:"fuckourordinarylives/f-o-o-l-fuck-it-original-mix",
		id: "84289504",
		artist: "F.O.O.L",
		title: "Fuck It"
	},
	"destroyer_of_speakers":{
		url:"fuckourordinarylives/sets/destroyer-of-speakers-ep",
		id: "78266540",
		artist: "F.O.O.L",
		title: "Destroyer Of Speakers EP Teaser"
	},
	"the_game":{
		url:"fuckourordinarylives/the-game-ep-teaser-1",
		id: "61145520",
		artist: "F.O.O.L",
		title: "The Game EP Teaser"
	},
	"smoke_and_death":{
		url:"fuckourordinarylives/f-o-o-l-smoke-death-original-1",
		id: "59618941",
		artist: "F.O.O.L",
		title: "Smoke & Death"
	},
	"deaf":{
		url:"fuckourordinarylives/f-o-o-l-your-ol-lady-deaf-1",
		id: "57750645",
		artist: "F.O.O.L & Your Ol Lady",
		title: "Deaf"
	},
	"vision":{
		url:"tuffemup/f-o-o-l-vision-ep-teaser",
		id: "35595690",
		artist: "F.O.O.L",
		title: "Vision EP Teaser"
	},
	"comboe":{
		url:"fuckourordinarylives/f-o-o-l-comboe-original-mix-1",
		id: "42553860",
		artist: "F.O.O.L",
		title: "Lazer Jungle"
	},
	"melodies_of_ordinary":{
		url:"bonerizing-records/sets/f-o-o-l-melodies-of-the",
		id: "28791374",
		artist: "F.O.O.L",
		title: "Dark Side"
	},
	"call_to_krieg":{
		url:"fuckourordinarylives/call-to-krieg-ep-teaser",
		id: "21322250",
		artist: "F.O.O.L",
		title: "Call To Krieg EP Teaser"
	},
	"invasion":{
		url:"fuckourordinarylives/invasion-ep-teaser-omgitm-010",
		id: "14341726",
		artist: "F.O.O.L",
		title: "Invasion EP Teaser"
	},
	"japan":{
		url:"fuckourordinarylives/tjanb-free-ep-download",
		id: "9833168",
		artist: "F.O.O.L",
		title: "To Japan And Never Back EP"
	},
	"reborn":{
		url:"fuckourordinarylives/f-o-o-l-reborn-original-mix",
		id: "7717421",
		artist: "F.O.O.L",
		title: "Reborn"
	},
	"berskgang":{
		url:"owlvision/f-o-o-l-berserkergang-owl-vision-remix",
		id: "3894886",
		artist: "F.O.O.L",
		title: "Berserkergang (Owl Vision Remix)"
	},
	"we_are_not_french":{
		url:"fuckourordinarylives/we-are-not-french-ep-teaser",
		id: "4732255",
		artist: "F.O.O.L",
		title: "We Are Not French EP Teaser"
	}
}