Sudoku.js
======

A JavaScript implementation of Sudoku puzzle solver using recursive backtracking. A part of our project in CMSC 142 (Design and Analysis of Algorithms) in University of the Philippines Los Banos.

Features
--------------------
1. Puzzle padding; puzzle auto-complete
2. Check X and Y patters of the puzzle
3. Control number of solutions to find


How To
--------------------
1. Include the javascript file into your html
2. Self-explanatory :
<tt>
	var solutions = Sudoku(
		{
			'puzzle'		:[
								[9,0,0,0,0,0,0,0,6],
								[0,8,0,0,0,0,0,9],
								[0,0,7,0,0,0,8],
								[0,0,0,6,0,7],
								[0,0,0,0,5],
								[0,0,0,0,4],
								[0,0,0,0,3],
								[0,0,0,0,2],
								[0,0,0,0,1]
							], // required
			'time'			: true, // logs time, optional
			'checkX'		: true, // optional
			'checkY'		: true, // optional
			'max_solutions' : 1	// optional defaults to max, 0 is also max
		}
	);	//returns an array of stringified arrays
</tt>


Todos
--------------------
1. Demonstration, a serious one.
2. Generate a puzzle from a string.
3. Process Optimization.
4. Documentation.

Groupmates
--------------------
Edrian Roque
Sherwin Jet Ferrer