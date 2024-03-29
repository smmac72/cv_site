const starButtons = document.querySelectorAll(".quest-star");
const menuButtons = document.querySelectorAll(".menu-item");
const modals = document.querySelectorAll(".modal")

const lennyfaces = ["( ͡° ͜ʖ ͡°)", "( ͡° ل͜ ͡°)", "( ° ͜ʖ °)", "(˵ ͡° ͜ʖ ͡°˵)", "( ͠° ͟ʖ ͠°)",
                    "( ͡° ͜ʖ ͡ – ✧)", "( ͠° ͟ ͜ʖ ͡ ͠°)", "(✿◠‿◠)", "(˵ ͡o ͜ʖ ͡o˵)", "( ͡~ ͜ʖ ͡°)",
                    "( ° ͜ʖ °)", "( ͡ᵔ ͜ʖ ͡ᵔ )", "( ͡ʘ ͜ʖ ͡ʘ)", "¯\_( ͡° ͜ʖ ͡°)_/¯", "(ง ͠° ͟ل͜ ͡°)ง"]

const changedList = ["menu-header", "menu-header-sub", "prof-link", "personal-link",
                   "socials-link", "game-warning-mobile", "game-warning-pc"];

var savedValues = [];
var textEnabled = false;

var enableText = function() {
    if (!textEnabled) {
        textEnabled = true;
        starButtons.forEach(star => {
            star.classList.toggle('off');
        })
        changedList.forEach(elem => {
            var element = document.getElementById(elem);
            if (element) {
                savedValues.push(element.innerHTML);
                element.style.fontFamily = "Impact,Charcoal,sans-serif";
                element.innerHTML = lennyfaces[Math.floor(Math.random() * lennyfaces.length)];
            }
            else {
                savedValues.push("that's a 404 :(");
            }
        })
    }
};

var disableText = function() {
    if (textEnabled) {
        textEnabled = false;
        starButtons.forEach(star => {
            star.classList.remove('off');
        })
        for (var i = 0; i < changedList.length; i++)
        {
            var element = document.getElementById(changedList[i]);
            element.style.fontFamily = "CyberFont";
            element.innerHTML = savedValues[i];
        }
    }
};

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('show.bs.modal', enableText, false);
    modals[i].addEventListener('hide.bs.modal', disableText, false);
}