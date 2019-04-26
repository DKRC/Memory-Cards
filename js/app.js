
var typesCards = [
    "fa-diamond", 
    "fa-paper-plane-o", 
    "fa-anchor", 
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb",
    "fa-diamond", 
    "fa-paper-plane-o", 
    "fa-anchor", 
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb", 
  ]

// Shuffle function from http://stackoverflow.com/a/2450976


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

// this function create all the cards

function createElements() {
  
    var board = document.getElementById("main-deck")
     
    for (let index = 0; index < typesCards.length; index++) {
        var lista = document.createElement("li");
        var item = document.createElement("i");
        lista.setAttribute("class","card");
        item.setAttribute("class"," ");
        lista.appendChild(item); 
        board.appendChild(lista); 
    }
    
}

createElements();
var element = document.querySelectorAll(".card")
runGame ();



function runGame(){
    var deck = shuffle(typesCards)
    for (let index = 0; index < element.length; index++) {
        element[index].querySelector("i").classList.add("fa", deck[index]);
        element[index].addEventListener("click", showCard);         
    }
    startTimer();
}

var match = []
var movestimes = 0;
var allElements = []

function showCard() {
    this.classList.add("show", "open",);
    match.push(this.querySelector("i").className);
    this.removeEventListener("click", showCard);
    tryArray ();
    
    
    
}

// the following functions verifies if the cards are equals

function tryArray () {
    if (match.length === 2) {       
        movesCounter ();
        tryMatch ();
    } 
}

function tryMatch () {
    if (match[0] === match[1]) { 
        allElements.push(match[0],match[1]);     
        itWorks ();
        removeStars ();
    } else { 
        removeExtraClick ();      
        setTimeout(dontWork,1000); 
        removeStars ();
    }
}

function itWorks (){
    for (let index = 0; index < element.length; index++) {
        if (element[index].className === "card show open") {
            element[index].classList.add("match");                     
        }        
    }
    if (allElements.length === 16) {
        resetTimer();
        setTimeout(openModal ,500);        
    }
    match.length = 0; 

}

function dontWork (){
    for (let index = 0; index < element.length; index++){
        if (element[index].className === "card show open") {
            element[index].classList.remove("show", "open");           
            setTimeout(addClick, 100);      
        }
    }
    match.length = 0; 
}

// this function reset the board

var restart = document.querySelector(".restart");
restart.addEventListener("click", resetBoard);

function resetBoard (){
    for (let index = 0; index < element.length; index++){
        element[index].classList.remove("show", "open", "match");
        element[index].querySelector("i").className = '';            
    }
    match.length = 0;
    allElements = [];
    movestimes = 0;
    document.getElementById("moves").innerHTML = 0;
    document.getElementById("moves2").innerHTML = 0;
    resetTimer(); 
    runGame();
}

// this function count the number of tries to get matches

function movesCounter () {
    movestimes++;
    document.getElementById("moves").innerHTML = movestimes;
    document.getElementById("moves2").innerHTML = movestimes;        
}

// the following two functions prevent the user to select more than two cards

function removeExtraClick (){
    for (let index = 0; index < element.length; index++){
        if (element[index].className === "card") {
            element[index].removeEventListener("click", showCard)          
        }
    }
}

function addClick (){
    for (let index = 0; index < element.length; index++){
        if (element[index].className === "card") {
            element[index].addEventListener("click", showCard)          
        }
    }
}


// Timer function inspired from https://www.codingforums.com/javascript-programming/159873-displaying-elapsed-time.html

function startTimer( )
{
    seconds = -1;
    ticker = setInterval("timer()", 1000);
    timer();
}

function timer() {
    ++seconds;
    var secs = seconds;
    var mns = Math.floor( secs / 60 );
    secs %= 60;
    var tempo = 
               ( mns < 10 ? "0" : "" ) + mns
               + ":" + ( secs < 10 ? "0" : "" ) + secs;
    document.getElementById("tempo").innerHTML = tempo;
    document.getElementById("tempo2").innerHTML = tempo;
    
}

function resetTimer() {
    clearInterval(ticker);
  }


// Modal functions inspired from https://www.w3schools.com/howto/howto_css_modals.asp

var modal = document.getElementById('myModal');

function openModal () {
    modal.style.display = "block";
}

var modalFooter = document.querySelector(".modal-footer");
modalFooter.addEventListener("click", closeModal);

function closeModal() {
    resetBoard ();
    modal.style.display = "none";
}


var starElement = document.getElementById('stars-board');
var starElementModal = document.getElementById('stars-modal');

var star1 = document.getElementById('star1');
var star2 = document.getElementById('star2');
var star3 = document.getElementById('star3');

var starModal1 = document.getElementById('star-modal1');
var starModal2 = document.getElementById('star-modal2');
var starModal3 = document.getElementById('star-modal3');


function removeStars (){
    if (movestimes === 15 ) {
        starElement.removeChild(star1); 
        starElementModal.removeChild(starModal1);   
    }
    if (movestimes === 20 ) {
        starElement.removeChild(star2); 
        starElementModal.removeChild(starModal2);     
    }
    if (movestimes === 25 ) {
        starElement.removeChild(star3);   
        starElementModal.removeChild(starModal3);   
    }
}