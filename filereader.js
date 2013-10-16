function readSingleFile(evt) {
			window.z = 0;
			var f = evt.target.files[0]; 			
			if (f) {
			  var r = new FileReader();
			  console.log(r);
			  r.onload = function(e) { 

			  	var data = new Object();
				  var contents = e.target.result;
				  contents = contents.split('\n');
					var instances = contents.splice(0,1)[0];
					data.instances = instances;
					data.data = new Array();
					for(var i=0;i<instances;i++){
						b = new Object();
						var dimension = contents.splice(0,1)[0];
						b.dimension = dimension;
						var configrow;

						var puzzle = []; //eto yung isang config
						for(var mary=0;mary<Math.pow(dimension,2);mary++){
							configrow = contents.splice(0,1);
							puzzle.push(configrow);
						}
						b.matrix = puzzle;
						data["data"][i] = b;
					}

				return data;
			  }
			  r.readAsText(f);
			  return r.Object;
			} else { 
			  alert("Failed to load file");o
			}
}