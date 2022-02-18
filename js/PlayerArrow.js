class PlayerArrow {
  constructor(x, y, width, height, archerAngle) {
    var options = {
      isStatic: true,
      density: 0.1
    };
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    this.image = loadImage("./assets/arrow.png");
    this.archerAngle = archerAngle;
    this.velocity = p5.Vector.fromAngle(archerAngle);
    this.trajectory = [];
    World.add(world, this.body);
  }

  shoot(archerAngle) {
    this.velocity = p5.Vector.fromAngle(archerAngle + PI / 2);
    this.velocity.mult(55);

    Matter.Body.setVelocity(this.body, {
      x: this.velocity.x,
      y: this.velocity.y
    });

    Matter.Body.setStatic(this.body, false);
  }

  display() {
    var tmpAngle;
    if (this.body.velocity.y === 0) 
    {
      tmpAngle = this.archerAngle + PI / 2;
    } else 
    {
      tmpAngle = Math.atan(this.body.velocity.y / this.body.velocity.x);
    }

    Matter.Body.setAngle(this.body, tmpAngle);

    var pos = this.body.position;
    var angle = this.body.angle;

    if(this.body.velocity.x>0 && this.body.position.x>300)
    {
      var pos = [this.body.position.x,this.body.position.y]
      this.trajectory.push(pos);
    }
    //for(var j = 0;j<this.trajectory.length;j++)
    //{
    //  image(this.image,this.trajectory[j][0],this.trajectory[j][1],5,5)
    //}

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
