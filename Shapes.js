/*This will hold the different shape classes*/
"use strict";

class Shape {
	constructor(start){
		this.type = this.constructor.name;
		this.start = start || [];
  	this.end = [];
  	this.drawing = true;
	}

  setEnd(end){    
    this.end = end;
    return this.end;
  }

//Not sure if we'll need this
  getTopCorner() {
    if (this.start['x'] < this.end['x']) {
      //we are moving to the right
      cornerX = this.start['x'];
    } else {
      cornerX = this.end['x'];
    }
    if (this.start['y'] < this.end['y']) {
      //we are moving down
      cornerY = this.start['y'];
    } else {
      cornerY = this.end['y'];
    }
    return {
      'x': cornerX,
      'y': cornerY
    };
  }

	draw(context){
		console.log("Draw has not been implemented for this shape!");
	}
}


class Circle extends Shape{
	constructor(start){
		super(start);
		this.mid = [0, 0];
  	this.rad = 0;		
	}

	draw(context){
    this.mid = this.getcenter();
    this.rad = this.getradius();
    context.beginPath();
    context.arc(this.mid['x'], this.mid['y'], this.rad, 0, 360);
    return context.stroke();
	}

/* Redundant (ended up being the same as draw)
  redraw(context) {
    this.mid = this.getcenter();
    this.rad = this.getradius();
    context.beginPath();
    context.arc(this.mid['x'], this.mid['y'], this.rad, 0, 360);
    return context.stroke();
  }
*/

  getcenter() {
    //TODO Check the start and end are set
    var centerX = (this.start['x'] + this.end['x']) / 2;
    var centerY = (this.start['y'] + this.end['y']) / 2;

    return {
      'x': centerX,
      'y': centerY
    };
  }

  getradius() {
    var distX = Math.abs(this.start['x'] - this.end['x']) / 2;
    var distY = Math.abs(this.start['y'] - this.end['y']) / 2;

    return Math.max(distX, distY);
  }

}

class Rectangle extends Shape{

  constructor(start){
    super(start);
    this.top = start['x'];
    this.left = start['y'];
    this.width = 0;
    this.height = 0;
  }

  draw(context){
    this.width = this.end['x'] - this.start['x'];
    this.height = this.end['y'] - this.start['y'];
    context.beginPath();
    context.rect(this.top, this.left, this.width, this.height);
    context.stroke();

  }


}


class Square extends Rectangle{

  constructor(start){

  }
}