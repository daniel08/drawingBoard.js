"use strict";

class DrawingBoard {

  constructor(canvasId){
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.width = 1000; //make this configurable
    this.height = 500; //make this configurable
    this.prepareCanvas();
    this.shapes = {'circles':[]};
  }
  
  clear() {
    this.erase();
    this.circles = [];
  }  
  
  erase() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw(shape){
    if( shape.draw(this.context) ){
      this.addShape(shape);
    }
  }

  redraw() {
    var that = this;
    this.erase();
    /*
    TODO this needs to loop through the shape object
     then each array of shape types
    */
    this.shapes.circles.forEach(function(circle) {
      circle.redraw(that.context);
    });
  }

  addShape(shape){
    switch (shape.type){
      case 'Circle':
        this.addCircle(shape);
        break;
    }
    shape.draw(this.context);
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
    var circle;
    var offset = {'x': this.canvas.offsetLeft, 'y' : this.canvas.offsetTop};
    /*
    * Maybe this should be done differently ???
    * TODO, handle different kinds of shapes
    */
    this.canvas.onmousedown = function(e){
      var start = {
        'x' : e.pageX - offset['x'],
        'y' : e.pageY - offset['y']
      };
      circle = new Circle(start);
    };

    this.canvas.onmousemove = function(e){
      if( circle && circle.drawing ){
        circle.setEnd(e, offset);
        that.redraw();
        that.draw(circle);
      }
    };


    this.canvas.onmouseup = function(e) {
      circle.drawing = false;
      circle.setEnd(e, offset);
      that.addShape(circle);
      that.redraw();
    };

    this.canvas.ondblclick = function(e) {
      var x = e.pageX - offset['x'];
      var y = e.pageY - offset['y'];
      var C = that.selectCircle(x,y);
      that.removeCircle(C);
      that.redraw();
    };

  }

} //End Drawing Board Class

