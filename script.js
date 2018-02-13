var wordDisplay = document.getElementById('word_display');

var capsLock = false;

// holds all the prediction and keyboard letter buttons
var keyLetters = document.getElementsByClassName('letter');
var predictionLetters = document.getElementsByClassName('prediction');
var predictionNumbers = document.getElementsByClassName('prediction-button');


var sentence = [];
var currentWordIndex = 0;

var currentBlinker = undefined;


// Clears and then draws the sentence array with spaces in between
function DrawSentence(){
  wordDisplay.innerHTML = '';
  currentWordIndex = 0;

  if (sentence.length === 0){
    ClearPredictionSpaces();
  }

  for (var i = 0; i < sentence.length; i++) {
    //console.log("drawing sentence word at index " + i);
    wordDisplay.innerHTML += sentence[i];
    if(i !== -1 + sentence.length)
    {
      //console.log("not the end of the sentence so adding a space index: " + i);
      wordDisplay.innerHTML += ' ';
      currentWordIndex ++;
    }
  }
}

// called when a letter has been pressed on the keyboard
function AlphabetKey(key){
  if(sentence.length <= 0){
    sentence.push('');
  }
  
  sentence[currentWordIndex] += key.innerHTML;

  DrawSentence();
}

// called when any keyboard button is pressed
var btnClick = function(key){
  switch(key.id) {
    case 'spacebar':
      SpaceKey();
      break;
    case 'backspace':
      Backspace();
      break;
    default:
      AlphabetKey(key);
  }

  WordUpdate();
};

function RemoveSpacesFromString(word){
  return word.replace(/\s/g, '');
}

// finds a prediction based on the current word in the sentence array
function WordUpdate(){

  let word = sentence[currentWordIndex];

  // return if the word doesn't exist
  if (word === ' ' || word === undefined) return;

  // make sure the word doesn't have any spaces in it
  word = RemoveSpacesFromString(word);

  // this gets an array of the actual prediction based on the current sentence typed
  let predictions = tree.predict(word, 5);
  let prediction = predictions[0];

  console.log('current Word: ' + word);
  console.log(predictions);

  // checks if a prediction is actually a string of characters
  if(predictions.length > 0)
  {

    for(var i=0;i<predictions.length;i++){
      console.log(predictions[i]);
      if(predictions[i].length === word.length){
        prediction = predictions[(1+i)];
        console.log('picking string: ' + prediction);
      }
    }

    //ClearPredictionSpaces();
      ClearPredictions();
      ShowPredictionAboveBoard(predictions);
      var longest = predictions[0];
      var index = 0;
      for(var i=0;i<predictions.length;i++){
          if(predictions[i].length > longest.length){
              longest = predictions[i];
              index = i;
          }
      }
      if(currentBlinker != undefined){
          clearInterval(currentBlinker);
          for(var i=0;i<predictions.length;i++){
              document.getElementById("predictionNum-"+i).style.color = 'black';
              document.getElementById("predictionNum-"+i).style.backgroundColor = 'grey';
          }

      }

      BlinkObject(document.getElementById("predictionNum-"+index),500);
    //ShowPredictionAboveKey(prediction);
    
    //show multiple predictions above multiple keys?
    //ShowPredictionAboveKey(predictions[1]);
    //ShowPredictionAboveKey(predictions[2]);
  }
  
}



function ShowPredictionAboveBoard(predictions){
    for(var i=0;i<predictions.length;i++){
        console.log(predictions[i]);
        var predictionSpace = document.getElementById("predictionNum-"+i);
        predictionSpace.innerHTML = predictions[i];
    }
}

function BlinkObject(object, inter){

    var interval = window.setInterval(function () {
        object.style.color = (object.style.color == 'black' ? 'white' : 'black');
        object.style.backgroundColor = (object.style.backgroundColor == 'grey' ? 'red' : 'grey');
    }, inter);
    currentBlinker = interval;
}

// takes a string and displays it above the next character in the current sentence
function ShowPredictionAboveKey(prediction){
  var currentWord = sentence[currentWordIndex];
  var predictionLetter = prediction.charAt(currentWord.length);

  SetPredictionZIndex(predictionLetter);

  console.log('current word: ' + currentWord);

  var predictionSpace = document.getElementById('prediction-' + predictionLetter);

  if(prediction.length === currentWord.length) return;

  predictionSpace.innerHTML = prediction;
}

function ClearPredictions(){

    for(var i=0;i<predictionNumbers.length;i++){
        predictionNumbers[i].innerHTML = '';
    }

    if(currentBlinker != undefined){
        clearInterval(currentBlinker);
        for(var i=0;i<predictionNumbers.length;i++){
            predictionNumbers[i].style.color = 'black';
            predictionNumbers[i].style.backgroundColor = 'grey';
        }

    }
}

// clears all strings from each prediction element
function ClearPredictionSpaces(){
  for(var i=0;i<predictionLetters.length;i++){
    predictionLetters[i].innerHTML = '';
  }
}

function predictionClick(key){
  var content = key.innerHTML;

  console.log(content);

  if (content === undefined) return;

  if (content !== null && content !== ''){
    sentence[currentWordIndex] = content;
    DrawSentence();
    ClearPredictionSpaces();
  }
  
}

function SetPredictionZIndex(letter){
  for(var i=0;i<predictionLetters.length;i++){
    predictionLetters[i].setAttribute("style", "position:initial");
    if(predictionLetters[i].id === 'prediction-' + letter){
      predictionLetters[i].setAttribute("style", "position:relative");
    }
  }
}

// draw the sentence when the page first loads
DrawSentence();