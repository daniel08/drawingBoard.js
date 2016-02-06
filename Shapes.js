/*This will hold the different shape classes*/
"use strict";

class Shape {
	constructor(start){
		this.type = this.constructor.name;
		this.start = start || [];
  	this.end = [];
  	this.drawing = true;
	}

  setEnd(event,offset){    
    var end = {
          'x' : event.pageX - offset['x'],
          'y' : event.pageY - offset['y']
    }
    this.end = end;
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
    context.stroke();
	  return true;
	}

  redraw(context) {
    this.mid = this.getcenter();
    this.rad = this.getradius();
    context.beginPath();
    context.arc(this.mid['x'], this.mid['y'], this.rad, 0, 360);
    context.stroke();
  }

  gettopcorner() {
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
