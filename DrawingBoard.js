"use strict";

class DrawingBoard {

  constructor(canvasId){
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.width = 1000; //make this configurable
    this.height = 500; //make this configurable
    this.offset = {'x': this.canvas.offsetLeft, 'y' : this.canvas.offsetTop};
    this.prepareCanvas();
    this.shapes = {};
    this.shapeChoice = 'Circle';
  }
  
  clear() {
    this.erase();
    this.circles = [];
  }  
  
  erase() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  setShapeChoice(type){
    //TODO, check for valid type
    this.shapeChoice = type;
    return this.shapeChoice;
  }

  getMousePosition(event){
    var coordinates = {
      'x' : event.pageX - this.offset['x'],
      'y' : event.pageY - this.offset['y']
    }
    return coordinates;
  }

  draw(shape){
    if( shape.draw(this.context) ){
      this.addShape(shape);
    }
  }

  redraw() {
    var that = this;
    this.erase();

    for( var type in this.shapes ){
      this.shapes[type].forEach(function(shape) {
        shape.draw(that.context);
      });
    }
  }

  createShape(start){
    switch(this.shapeChoice){
      case 'Circle':
        return new Circle(start);
      case 'Rectangle':
        return new Rectangle(start);
    }
  }

  addShape(shape){
    if( !this.shapes.hasOwnProperty(shape.type) ){
      this.shapes[shape.type] = [];
    }
    this.shapes[shape.type].push(shape);
  }

  removeShape(){
    //Placeholder for now
    //maybe some common logic for removing different shape types
  }

  addCircle(objCircle){
  	if( objCircle.rad >= 10 ){
    	this.shapes.circles.push(objCircle);
  	}
  }
  
  removeCircle (objCircle) {
  	var result = this.shapes.circles.filter(function(c) {
    	return c.mid != objCircle.mid;
		});
    this.shapes.circles = result;
  } 
 
  /**
  * TODO this needs work
  */
  selectCircle(x, y) {
  	var foundCircle = false;
    var that = this;
    this.shapes.circles.forEach(function(circle) {
      if (that.inCircle(x, y, circle)) {
       	foundCircle = circle;
      }
    });
    return foundCircle;
  }
  
  inCircle(x, y, objC) {
    var diffx = Math.abs(x - objC.mid['x']) || 999999;
    var diffy = Math.abs(y - objC.mid['y']) || 999999;

    if (diffx <= objC.rad && diffy <= objC.rad) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Set up the event listeners for our canvas
  */
  prepareCanvas(){
    var that = this;
    this.canvas.className = "default-board";
    this.canvas.height = this.height
    this.canvas.width = this.width;
    var shape;
    
    /*
    * Maybe this should be done differently ???
    * TODO, handle different kinds of shapes
    */
    this.canvas.onmousedown = function(e){
      var start = that.getMousePosition(e);
      shape = that.createShape(start);
    };

    this.canvas.onmousemove = function(e){
      if( shape && shape.drawing ){
        var end = that.getMousePosition(e);
        shape.setEnd(end);
        that.redraw();
        that.draw(shape);
      }
    };


    this.canvas.onmouseup = function(e) {
      shape.drawing = false;
      var end = that.getMousePosition(e);
      shape.setEnd(end);
      that.addShape(shape);
      that.redraw();
    };

/* This doesn't work
    this.canvas.ondblclick = function(e) {
      var x = e.pageX - offset['x'];
      var y = e.pageY - offset['y'];
      var C = that.selectCircle(x,y);
      that.removeCircle(C);
      that.redraw();
    };
*/

  }

} //End Drawing Board Class

