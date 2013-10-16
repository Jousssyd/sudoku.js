(function(){
	"use strict";
	
	jarvis.setVoiceKey('814690c9d02c4c15be28146ee9f6ac27');
	jarvis.speak("Good morning... Please select an input file.");
	
	jarvis.learn([
		[":answer", function(ans){
			var a = (ans+"").trim();
			if(a.length == 3){
				$('#results:first-child td.td_' + a[0] + '_' + a[1] + ' input')[0].value = a[2];
			}
		}]
	]);
	
	jarvis.onrecognize = function(w){
		console.log(w);
	};
	
	jarvis.onerror = function(e){
		if(e.error == "not-allowed"){
			jarvis.speak("I was denied. Please allow me to use your speaker.");
			jarvis.start();
		}
		else if(e.error == "network"){
			jarvis.speak("Something is wrong with your network. Try refreshing the page.");
			jarvis.start();
		}
	};
	
	jarvis.onnomatch = function(){
		jarvis.speak('Sorry. I can\' understand you.');
	};
	
	jarvis.start();
})();
