$(document).ready(function () {
    //$('#loading').hide();
    $('#next').hide();
    $('#prev').hide();

    $('#loading').addFloating({
        centerX :true,
        centerY :true
    });    

    $('#next').addFloating({
        targetTop : 10,
        targetRight : 10
    });
    $('#prev').addFloating({
        targetTop : 10,
        targetLeft : 10
    });
    $('#file').addFloating({
		targetBottom : 10,
		targetRight : 10
	});



	$('#file').addClass('fileUnhover').fadeTo(400, .2);

	$('#file').mouseenter(function () {
		$(this).fadeTo(100, 1,function () { });
	});

	$('#file').mouseleave(function () {
		$(this).fadeTo(100, .2, function () { });
	});

  $('#select').click(function () {
    $('#fileinput').click();
  });

  $('#fileinput').change(function (click) {
    if(this.value !== '')
      $('#select').text('Selected: ' + this.value.split("\\").reverse()[0]);
  });

     $('#file').on({
    dragover: function(evt){
        evt.stopPropagation();
        evt.preventDefault();
    },
    drop: function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        var input = evt.originalEvent.dataTransfer.files[0];
        $('#select').text('Selected: ' + input.name);
        
         fr = new FileReader();

        fr.onload = function (){
            
            var contents = fr.result;
            $('#hiddenDiv').append(contents);
            writeContent(contents);
        };
        var str = fr.readAsText(input);
        
    }
  });

  $('#solve').click(function () {
    $('#loading').show();
    $('#results').empty();

    var io = document.getElementById('fileinput');
    file = io.files[0];
    fr = new FileReader();

    fr.onload = function (){
        
        var contents = fr.result;
        $('#hiddenDiv').append(contents);
        writeContent(contents);
    };
    var str = fr.readAsText(file);
     
    /**/
  });
});

function writeContent(content){
    var sol = [],
        solX = [],
        solY = [];
    contents = content;
   var data = new Object();
     contents = contents.split('\n');

        var instances = contents.splice(0,1)[0];

        data.instances = instances;
        data.data = new Array();

        for(var i=0;i<instances;i++){
            b = new Object();
        
            var dimension = contents.splice(0,1)[0];
        
            b.dimension = dimension;
        
            var configrow;

            var puzzle = []; 
            for(var mary=0;mary<Math.pow(dimension,2);mary++){
                configrow = (contents.splice(0,1) + '').split(' ');
                puzzle.push(configrow);
            }
            b.matrix = puzzle;
            data["data"][i] = b;
        }
        $('#hiddenDiv').innerText;
        
        var d = [];
       
        for(var i=0;i<data['data'].length; i++){
            d.push(data['data'][i].matrix);
        }

        var array = d.splice(0);

      for(var i=0;i< array.length;i++) {
            var len = array[i].length;
            sol.push(Sudoku({
                'puzzle' : array[i],
                'time' : true,
            }));
            solX.push(Sudoku({
                'puzzle' : array[i],
                'time' : true,
                'checkX' : true
            }));
            solY.push(Sudoku({
                'puzzle' : array[i],
                'time' : true,
                'checkY' : true
            }));

            var mFlip = true;
            var flip = false;
            var rcur = 0, rprev = 0;
            var ccur = 0, cprev = 0;
            var table = '<div class="qHolder" id="qNumber'+i+'"><table class="q" border=1>';
            var sqrt = Math.sqrt(len);
            for(var j=0;j<len;j++){
                table += '<tr>';
                rprev = rcur;
                rcur = (Math.floor(j/sqrt) * sqrt) +''+ (Math.floor(k/sqrt) * sqrt);
                if(rcur != rprev) mFlip = !mFlip;
                flip = mFlip;

                for(var k=0;k<len;k++){
                    cprev = ccur;
                    ccur = (Math.floor(j/sqrt) * sqrt) +''+ (Math.floor(k/sqrt) * sqrt);
                    if(ccur != cprev) flip = !flip;

                    table+='<td class="td_'+(j+1)+'_'+(k+1)+' ';
                    if(array[i][j][k] == 0)
                        table+='empty';
                    else
                        table+='filled';          
                    if(flip) table+=' odd ';
                    else table += ' even ';

                    if(array[i][j][k] == 0)
                        table+='"><input type="text"/></span>';
                    else table+='">'+array[i][j][k];

                    table += '</td>';
                }
					
				table+='<td class="number">'+(j+1)+'</td>';
            }
			table+='<tr>';
			for(var z = 0;z<len;z++)
				table+='<td class="number">'+(z+1)+'</td>';
			table+='<td class="number">&nbsp</td>';
			table+='</tr>';
            table += '</table></div>';
            $('#results').append(table);
        }



        $('#loading').fadeOut(1000).end();

        $('#next').show();
        $('#prev').show();
        $("#results").carouFredSel({
            circular: true,
            infinite: true,
            auto : false,
            next : {
                button : "#next",
                key : "right"
            },
            prev : {
                button : "#prev",
                key : "left"
            },
            align: "left"
        });

        //console.log(sol,solX,solY);
        var inst = sol.length;
        for(var i=0;i<inst;i++){
            var trgt = "#qNumber"+i;
            
            if(sol[i].length > 0){
                var solArr = [];
                var toApp = '<div class="sol"><p>Has '+sol[i].length+' solution(s)<br/>';

                var arr = sol[i][0].replace("[[","").replace("]]","").replace("\\r","").split("],[");

                for(var v=0;v<arr.length;v++){
                    solArr.push(arr[v].replace("\\r","").replace('"','').split(','));
                }
                l = solArr[0].length;
                for(var p=0;p<l;p++){
                    for(var q=0;q<l;q++){
                        toApp = toApp + parseInt(solArr[p][q].replace('"','')) + '&nbsp;&nbsp;';
                    }
                    toApp +='<br>';
                }
                toApp +='</p></div>';

                $(trgt).append(toApp);
            } else {
                $(trgt).append('<div class="noSol">No Solution</div>');
            }

            // X - SOLUTIONs
             if(solX[i].length > 0){
                var solArr = [];
                var toApp = '<div class="solX"><p>Has '+solX[i].length+' X solution(s)<br/>';

                console.log(solX[i][0].replace("\r",""));
                var arr = solX[i][0].replace("[[","").replace("]]","").split("],[");

                for(var v=0;v<arr.length;v++){
                    solArr.push(arr[v].split(','));
                }
                var l = solArr[0].length;
                for(var p=0;p<l;p++){
                    for(var q=0;q<l;q++){
                        toApp = toApp + solArr[p][q] + '&nbsp;&nbsp;';
                    }
                    toApp +='<br>';
                }
                toApp +='</p></div>';

                $(trgt).append(toApp);
            } else {
                $(trgt).append('<div class="noSolX">No X Solution</div>');
            }

            // Y - SOLUTIONS
            if(solY[i].length > 0){
                var solArr = [];
                var toApp = '<div class="solY"><p>Has '+solY[i].length+' Y solution(s)<br/>';

                console.log(solY[i][0].replace("\r",""));

                var arr = solY[i][0].replace("[[","").replace("]]","").split("],[");


                for(var v=0;v<arr.length;v++){
                    solArr.push(arr[v].split(','));
                }
                var l = solArr[0].length;
                for(var p=0;p<l;p++){
                    for(var q=0;q<l;q++){
                        toApp = toApp + solArr[p][q] + '&nbsp;&nbsp;';
                    }
                    toApp +='<br>';
                }
                toApp +='</p></div>';
                $(trgt).append(toApp);
            } else {
                $(trgt).append('<div class="noSolY">No Y Solution</div>');
            }
        }  
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

/*
var holder = document.getElementById('file'),
    state = document.getElementById('statusText');

if (typeof window.FileReader === 'undefined') {
  state.className = 'fail';
} else {
  state.className = 'success';
 // state.innerHTML = 'File API & FileReader available';
}
 
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
  this.className = '';
  e.preventDefault();

  var file = e.dataTransfer.files{0],
      reader = new FileReader();
  reader.onload = function (event) {
    console.log(event.target);
    holder.style.background = 'url(' + event.target.result + ') no-repeat center';
  };
  console.log(file);
  reader.readAsDataURL(file);

  return false;
};*/