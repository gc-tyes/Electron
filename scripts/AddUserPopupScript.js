const popup = document.getElementById("popupDiv");
const firstPrompt = document.getElementById("firstPrompt");
const secondPrompt = document.getElementById("generateCode");
const codeText = document.getElementById("codeText");

function showPopup() {
    popup.classList.remove("gone");
}

function removePopup() {
    popup.classList.add("gone");
    firstPrompt.classList.remove("gone");
    secondPrompt.classList.add("gone");
}

function generateCode() {
    var char = 'A';
    // Creates a randomized string of 8 characters, could be letters or numbers
    var code = "";
    for (var i = 0; i < 10; i++) {
        var numOrLetter = Math.random();
        if (numOrLetter > 0.75) {
            // Generate Number, 25% chance of happening
            var num = (parseInt(Math.random() * 9 + 1));
            code += num;
        } else {
            // Generate uppercase character, 75% chance of happening
            var char = 65;
            char += parseInt(Math.random() * 26);
            code += String.fromCharCode(char);
        }
    }
    codeText.innerHTML = ("Your code is: " + code);
    firstPrompt.classList.add("gone");
    secondPrompt.classList.remove("gone");
}