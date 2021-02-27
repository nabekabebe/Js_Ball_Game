class GameObject {
  posX;
  posY;
  constructor(speed = 1) {
    this.speed = speed;
  }
}
class Ball extends GameObject {
  color = '#0095DD';
  speed = 2;
  constructor(radius) {
    super();
    this.radius = radius;
  }
  drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Paddel extends GameObject {
  posX;
  posY;
  speed = 2;
  color = '#0095DD';
  constructor(height, width) {
    super();
    this.height = height;
    this.width = width;
  }

  drawPaddle() {
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Score {
  computer = 0;
  user = 0;
  player;
  constructor(max_score, interval) {
    this.max_score = max_score;
    this.interval = interval;
  }
}
