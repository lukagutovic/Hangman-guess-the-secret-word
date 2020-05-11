const wordPrint = document.getElementById('print');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const wrongLettersId = document.getElementById('wrong-letters');

const wrongLetters = [];

function showWord() {

    var hangImg = document.querySelector('.js-hangman');
    hangImg.style.display = 'none';
    var randomNumber = Math.floor(Math.random() * capitalCities.length);
    console.log(capitalCities[randomNumber]);

    hangImg.style.display = 'block';

    currentWord = capitalCities[randomNumber].toLowerCase();
    displayWord = "";
    numberOfmisses = 0;
    guessedLetterByWord = [];

    for (var i = 0; i < currentWord.length; i++) {
        displayWord = displayWord + "X";
    }

    document.getElementById('print').innerText = displayWord;
    document.getElementById('number-of-misses').innerText = maxNumberOfTry;

}
window.onload = showWord;

function guessTheLetter(slovo) {
    console.log('Slovo ' + slovo);
    var letter = slovo;
    var brojSlika = 6;
    if (letter.length == 0) {
        alert("You have to enter one letter");

    } else { //else start
        if (letter.length > 1) {
            alert("You can only guess one letter");
        } else {
            if (!guessedLetterByWord.includes(letter)) {

                var signal = 0;
                for (var i = 0; i < currentWord.length; i++) {
                    if (currentWord[i] == letter) {
                        displayWord = replaceAt(displayWord, i, letter);
                        signal = 1;
                    }
                }
                if (signal == 0) {
                    guessedLetterByWord.push(letter);
                    var greska = document.getElementById('wrong-letters');
                    greska.innerText = guessedLetterByWord;
                }

                if (!displayWord.includes("X")) {
                    finalMessage.innerText = 'Congratulations! You won! 😃' + currentWord.toUpperCase();
                    popup.style.display = 'flex';
                    document.getElementById('print').style.display = 'none';
                }
                document.getElementById('print').innerText = displayWord;


                if (signal == 0) {
                    var images = document.querySelector('.js-hangman');
                    images.style.display = 'block';

                    if (hangmanImgs < 8) {
                        images.src = './images/img-' + hangmanImgs + '.jpg';
                    } else {
                        images.src = './images/img-' + brojSlika + '.jpg';
                    }

                    hangmanImgs++;
                    numberOfmisses++;

                    var attempts = maxNumberOfTry - numberOfmisses;

                    if (attempts > 0) {

                        document.getElementById('number-of-misses').innerText = attempts;
                    } else {
                        document.getElementById('number-of-misses').innerText = 0;
                    }
                }

                if (numberOfmisses == maxNumberOfTry) {
                    finalMessage.innerText = 'Unfortunately you lost. 😕 ' + currentWord.toUpperCase();
                    popup.style.display = 'flex';
                    document.getElementById('print').innertext = "";
                    document.getElementById('print').style.display = 'none';

                    var images = document.querySelector('.js-hangman');
                    images.src = './images/img-7.png';
                }
            } else {

                showNotification();
            }
        }
    }
}



function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

playAgainBtn.addEventListener('click', () => {

    randomNumber = Math.floor(Math.random() * capitalCities.length);
    var hangImg = document.querySelector('.js-hangman');
    hangImg.style.display = 'none';
    popup.style.display = 'none';
});

notification.style.display = 'none';

function showNotification() {
    notification.style.display = 'block';

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

window.addEventListener('keyup', e => {
    if (e.which <= 90 && e.which >= 48) {
        guessTheLetter(e.key);
    }

});

function reload() {
    location.reload();
}