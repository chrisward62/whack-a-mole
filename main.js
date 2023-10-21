const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const startBtn = document.querySelector('#startButton');
const endScreen = document.querySelector('#endScreen');
const restartBtn = document.querySelector('#restartButton');
let score = 0;
let gameRunning = false;

const sound = new Audio("assets/smash.mp3");
const missSound = new Audio("assets/missSound.mp3");

function run() {
    if (!gameRunning) return;  // Stop running when the game isn't running

    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'assets/mole.png';

    img.addEventListener('click', () => {
        if (!gameRunning) return; 
    
        score += 10;
        if (score >= 200) {
            gameRunning = false;
    
            // play a sound when game ends
            const gameEndSound = new Audio("assets/gameEndSound.mp3");
            gameEndSound.play();
    
            endScreen.style.display = 'block';
        }
        sound.play();
        scoreEl.textContent = score;
        img.src = 'assets/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            if (gameRunning) run();
        }, 500);
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
        if (!gameRunning) {
            // Player missed, play the miss sound here
            missSound.play();

            // You can also deduct points from the score or perform other actions when a miss occurs
        }
        hole.removeChild(img);
        if (gameRunning) run();  // Run the next one only when the game is running
    }, 1500);
}

startBtn.addEventListener('click', () => {
    if (!gameRunning) {
        score = 0;
        scoreEl.textContent = score;
        gameRunning = true;
        startBtn.style.display = "none"; // This hides the start button
        cursor.style.display = "block";
        run();
    }
});

restartBtn.addEventListener('click', () => {
    endScreen.style.display = 'none';  // Hide end screen
    if(!gameRunning) {
        score = 0;
        scoreEl.textContent = score;
        gameRunning = true;
        run();
    }
});

// Your mouse event listeners here
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');

});

window.addEventListener('mousedown', (e) => {
    if (!gameRunning) return;  // Do nothing when the game isn't running
    let isMoleClicked = e.target.className === 'mole';
    if (!isMoleClicked) {
        missSound.play();
    }
});