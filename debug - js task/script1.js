let secretNumber = Math.trunc(20 * Math.random()) + 1; 
let highscore = 0;
let time = [0, 0];
let timer; 

document.querySelector('.again').addEventListener('click', function () { //click it should be lowercase
    clearInterval(timer); // as after pressing again it should clear the time
    time = [0, 0];
    secretNumber = Math.trunc(20 * Math.random()) + 1; // secret number should be changed again
    document.querySelector('.score').textContent = '20';
    document.querySelector('.guess').value = '';
    document.getElementById('timer').innerHTML = '';
    document.querySelector('.check').style.backgroundColor = '#f1356d';
    document.querySelector('body').style.backgroundColor = 'white';// again changing color
});

document.querySelector('.check').addEventListener('click', function () { 
    this.style.backgroundColor = 'black';// as it is in video
    let guess = Number(document.querySelector('.guess').value); 

    if (!guess || guess < 1 || guess > 20) { // as this was boundary constraint
        document.querySelector('.message').textContent = 'Not a valid input';
        return; 
    }

    clearInterval(timer); 
    timer = setInterval(() => {
        time[1]++;
        if (time[1] % 60 === 0) {
            time[0]++;
        }
        document.getElementById('timer').innerHTML = ` ${time[0]} : ${time[1]} `;
    }, 1000);

    this.style.backgroundColor = 'black';

    if (guess === secretNumber) {
        clearInterval(timer); 
        document.querySelector('.message').textContent = 'You guessed it right';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('body').style.backgroundColor = 'green';
        document.querySelector('.number').textContent = secretNumber;
        if (highscore < Number(document.querySelector('.score').textContent)) {
            highscore = Number(document.querySelector('.score').textContent);
            document.querySelector('.highscore').textContent = highscore;
        }
        
        document.querySelector('.highscore').textContent = `(${time[0]} : ${time[1]})`; // Display timer and highscore
    } else if (guess > secretNumber) {
        document.querySelector('.message').textContent = 'Too high';
        document.querySelector('.score').textContent--;
    } else {
        document.querySelector('.message').textContent = 'Too low';
        document.querySelector('.score').textContent--;
    }

    if (Number(document.querySelector('.score').textContent) <= 0) {
        clearInterval(timer); 
        document.querySelector('.message').textContent = 'You lost the game';
        document.getElementById('timer').innerHTML = '';
        document.getElementById('hiddenresult').textContent = secretNumber;
        this.style.backgroundColor = '#f1356d';
    }
});
