/**
 *
 * Copyright Raven Lagrimas 2013.
 */

/*jslint browser:true */
(function(root){
	'use strict';

	var solutions,
		terminate,
		max,
		size,
		X,
		Y;
	
	var validInRow = function (arr, i){
		var j,
			len;
			
		for(j = 0, len = arr.length; j < len; j += 1){
			if(arr[j] == i){
				return false;
			}
		}
		
		return true;
	};

	var validInColumn = function (arr, j, i){
		var l,
			len;
			
		for(l = 0, len = arr.length; l < len; l += 1){
			if(arr[l][j] == i){
				return false;
			}
		}
		
		return true;
	};

	var validInSmallBox = function (arr, i, j, k){
		var l,
			m,
			a,
			b,
			size = Math.sqrt(arr.length);
			
		for(l = Math.floor(i / size) * size, a = l + size; l < a; l += 1){
			for(m = Math.floor(j / size) * size, b = m + size; m < b; m += 1){
				if(arr[l][m] == k){
					return false;
				}
			}
		}
		
		return true;
	};
	
	
	/**
	 *
	 * @todo Refactor, there's a lot of repeated stuff here
	 */
	var checkX = function(arr, i, j, k){
		var l,
			m,
			len		= arr.length,
			crossed = false,
			existed = false;
			
		for(l = 0; l < len && X; l += 1){
			if(i == l && j == l){
				crossed = true;
			}
			if(arr[l][l] == k){
				existed = true;
			}
		}
		if(crossed && existed){
			return false;
		}
		
		crossed = false;
		existed = false;
		
		for(l = len - 1, m = 0; l >= 0 && X; l -= 1){
			if(i == m && j == l){
				crossed = true;
			}
			if(arr[m][l] == k){
				existed = true;
			}
			m += 1;
		}
		if(crossed && existed){
			return false;
		}
		
		return true;
	};
	
	var checkY = function(arr, i, j, k){
		var l,
			m,
			len			= arr.length,
			mid			= Math.floor(len / 2),
			crossed 	= false,
			midcrossed	= false,
			existed		= false;
		
		if(!len % 2){
			return true;
		}
		
		for(l = mid; l < len && Y; l+=1){
			if(l == i && mid == j){
				midcrossed = true;
			}
			if(arr[l][mid] == k){
				existed = true;
			}
		}
		if(midcrossed && existed){
			return false;
		}
		
		existed = false;
		
		for(l = 0; l < mid && Y; l+=1){
			if(l == i && l == j){
				crossed = true;
			}
			if(arr[l][l] == k){
				existed = true;
			}
		}
		if((midcrossed || crossed) && existed){
			return false;
		}
		
		crossed = false;
		existed = false;		
		
		for(l = len-1, m = 0; l > mid && Y; l-=1){
			if(m == i && l == j){
				crossed = true;
			}
			if(arr[m][l] == k){
				existed = true;
			}
			m += 1;
		}
		if((midcrossed || crossed) && existed){
			return false;
		}
		
		return true;
	};
	
	var valid = function(arr){
		var i,
			j,
			temp,
			len = arr.length;
			
		for(i = 0; i < len; i += 1){
			for(j = 0; j < len; j += 1){
				temp		= arr[i][j];
				arr[i][j]	= 0;
				if(!validInRow(arr[i], temp) || !validInColumn(arr, j, temp) || !validInSmallBox(arr, i, j, temp) || !checkX(arr, i, j, temp) || !checkY(arr, i, j, temp)){
					arr[i][j] = temp;
					return false;
				}
				arr[i][j] = temp;
			}
		}
		
		return true;
	};

	var output = function (arr){
		var i,
			j,
			len,
			output = "";
			
		for(len = arr.length, i = 0; i < len; i += 1){
			for(j = 0; j < len; j += 1){
				output += arr[i][j] + " ";
			}
			output += "\n";
		}
		console.log(output);
		
		return output;
	};
	
	var backtrack = Function.prototype;
	
	var tryCandidate = function(arr, i, j){
		for(var k=1; k <= arr.length && !terminate; k += 1){
			if(validInRow(arr[i], k) && validInColumn(arr, j, k) && validInSmallBox(arr, i, j, k) && checkX(arr, i, j, k) && checkY(arr, i, j, k)){
				arr[i][j] = k;
				backtrack(arr);
			}
			arr[i][j] = 0;
		}
	};
	
	backtrack = function (arr){
		var stop = false,
			i,
			j;
			
		for(i = 0; i < arr.length && !stop;i += 1){
			for(j = 0; j < arr.length && !stop;j += 1){
				if(arr[i][j] == 0){
					tryCandidate(arr, i, j);
					stop = true;
				}
			}
		}
		
		if(!stop && valid(arr)){
			solutions.push(JSON.stringify(arr));
			if(max > 0 && !--max){
				terminate = true;
			}
		}
	};
	
	var isArray = function (obj) {
		return Object.prototype.toString.call(obj) === "[object Array]";
	};
	
	var fixPuzzle = function(puzzle){
		var i,
			j,
			k,
			len,
			len2;
		
		size	= puzzle.length,
		len		= size;
			
		for(i = 0; i < size; i += 1){
			if(i >= len){
				puzzle[i] = Array.apply(null, new Array(size)).map(Number.prototype.valueOf,0);
				continue;
			}
			if(!isArray(puzzle[i])){
				output(puzzle);
				throw new Error('Puzzle ['+i+'] is not an array');
			}			
			len2 = puzzle[i].length;
			
			for(k = 0; k < len2; k += 1){
				if(isNaN(puzzle[i][k])){
					output(puzzle);
					throw new Error('Puzzle ['+i+']['+k+'] is not a number.');
				}
			}
			
			if(len2 > size){
				size = len2;
			}
			else if(len2 < size){
				for(j = puzzle[i].length; j < size; j += 1){
					puzzle[i][j] = 0;
				}
			}
		}
		
	};
	
	var solve = function(object){
		solutions	= [],
		terminate	= false,
		max			= false,
		size		= 0,
		X			= false,
		Y			= false;
		if(typeof object.puzzle == 'undefined'){
			throw new Error('Puzzle is missing.');
		}
		
		if(!isArray(object.puzzle)){
			throw new Error('Puzzle should be an array.');
		}
		
		fixPuzzle(object.puzzle);
		
		if(object.max_solutions && !isNaN(object.max_solutions)){
			max = object.max_solutions;
		}
		
		X = object.checkX;
		Y = object.checkY;
		
		console.log("Crunching numbers..");
		
		if(object.time){
			console.time("solve");
		}
		
		backtrack(object.puzzle);
		
		if(object.time){
			console.timeEnd("solve");
		}
		
		return solutions;
	};

	root.Sudoku = solve;
})(this);

