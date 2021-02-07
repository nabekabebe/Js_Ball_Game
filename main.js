var selectDiff = document.querySelector('.form-select');
var startGame = document.querySelector('.start');
var startStop = document.querySelector('.stop');
var compScore = document.querySelector('.comp-score');
var userScore = document.querySelector('.user-score');
var history_plate = document.querySelector('.sc');

var interval;
var gamePlay = false;
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var gameSpeed = 6;
var ballRadius = 10;
var y = canvas.height / 2;
var x = canvas.width - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 75;
var paddleWidth = 10;
var uPaddleX = canvas.width - paddleWidth;
var uPaddleY = (canvas.height - paddleHeight) / 2;
var cPaddleX = 0;
var cPaddleY = (canvas.height - paddleHeight) / 2;
var upPressed = false;
var downPressed = false;

let uP = new Paddel(paddleHeight, paddleWidth);
uP.posX = uPaddleX;
uP.posY = uPaddleY;

let cP = new Paddel(paddleHeight, paddleWidth);
cP.posX = cPaddleX;
cP.posY = cPaddleY;

var b = new Ball(ballRadius);
var score = new Score(3, interval);
dx = b.speed;
dy = b.speed;
loadScore();

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
selectDiff.addEventListener('change', difficulty);

startGame.addEventListener('click', function () {
  gamePlay = true;
});
startStop.addEventListener('click', function () {
  gamePlay = false;
});

function keyDownHandler(e) {
  if (e.key == 'up' || e.key == 'ArrowUp') {
    upPressed = true;
  } else if (e.key == 'down' || e.key == 'ArrowDown') {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == 'up' || e.key == 'ArrowUp') {
    upPressed = false;
  } else if (e.key == 'down' || e.key == 'ArrowDown') {
    downPressed = false;
  }
}
function loadScore() {
  let sc = JSON.parse(localStorage.getItem('score'));
  if (sc) {
    let sr = Array.from(sc);
    sr.forEach((s) => {
      let li = document.createElement('li');
      li.innerHTML = `You ${s.user} : ${s.computer} Computer`;
      history_plate.prepend(li);
    });
  }
}
function updateScore() {
  compScore.innerHTML = score.computer;
  userScore.innerHTML = score.user;

  if (score.computer >= score.max_score && score.computer > score.user) {
    alert(`You Lost!\nComputer: ${score.computer}  You: ${score.user}`);
    clearWindow();
  } else if (score.user >= score.max_score && score.computer < score.user) {
    alert(`You Won!\nComputer: ${score.computer}  You: ${score.user}`);
    clearWindow();
  } else if (score.user == score.max_score && score.computer == score.user) {
    alert(`Draw!\nComputer: ${score.computer}  You: ${score.user}`);
    clearWindow();
  }
}
function clearWindow() {
  storeScore();
  document.location.reload();
  gamePlay = false;
  clearInterval(interval);
}
function storeScore() {
  let sc_arr = JSON.parse(localStorage.getItem('score'));
  if (sc_arr) {
    localStorage.removeItem('score');
    sc_arr.push(score);
    localStorage.setItem('score', JSON.stringify(sc_arr));
  } else {
    sc_arr = [];
    sc_arr.push(score);
    localStorage.setItem('score', JSON.stringify(sc_arr));
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  b.drawBall(x, y);
  uP.drawPaddle();
  cP.drawPaddle();
  if (gamePlay) {
    if (y + dy > canvas.height - b.radius || y + dy < b.radius) {
      dy = -dy;
    }
    if (x + b.speed > canvas.width - b.radius / 2) {
      if (y + b.radius > uP.posY && y + b.radius < uP.posY + paddleHeight) {
        dx = -dx;
      } else {
        score.computer += 1;
        dx = -dx;
        canvas.style.borderRight = '10px solid red';
        setTimeout(() => {
          canvas.style.borderRight = '10px solid green';
        }, 200);
        // Needed for Chrome to end game
      }
    } else if (x + dx < b.radius / 2) {
      if (y + b.radius > cP.posY && y + b.radius < cP.posY + paddleHeight) {
        dx = -dx;
      } else {
        score.user += 1;
        dx = -dx;
        canvas.style.borderLeft = '10px solid red';
        setTimeout(() => {
          canvas.style.borderLeft = '10px solid green';
        }, 200);
        // Needed for Chrome to end game
      }
    }

    if (upPressed && uP.posY > 0) {
      uP.posY -= uP.speed;
    } else if (downPressed && uP.posY < canvas.height - paddleHeight) {
      uP.posY += uP.speed;
    }
    if (y > cP.posY && cP.posY < canvas.height - paddleHeight) {
      cP.posY += cP.speed;
    }
    if (y < cP.posY && cP.posY > 0) {
      cP.posY -= cP.speed;
    }

    x += dx;
    y += dy;
  }
  updateScore();
}
interval = setInterval(draw, gameSpeed);

function difficulty(e) {
  if (!gamePlay) {
    let val = Number(e.target.value);
    clearInterval(interval);

    if (val == 3) {
      gameSpeed = 3;
      cP.speed = 7;
      b.speed = 3;
    } else if (val == 1) {
      gameSpeed = 5;
      cP.speed = 1;
      b.speed = 2;
    } else if (val == 2) {
      gameSpeed = 4;
      cP.speed = 2;
      b.speed = 2;
    }
    dx = b.speed;
    dy = b.speed;
    interval = setInterval(draw, gameSpeed);
  }
}
