var wordDisplay = document.getElementById('word_display');

var capsLock = false;

// holds all the prediction and keyboard letter buttons
var keyLetters = document.getElementsByClassName('letter');
var predictionLetters = document.getElementsByClassName('prediction');


var sentence = [];
var currentWordIndex = 0;


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
  let predictions = tree.predict(word);
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

    ClearPredictionSpaces();
    ShowPredictionAboveKey(prediction);
    
    //show multiple predictions above multiple keys?
    //ShowPredictionAboveKey(predictions[1]);
    //ShowPredictionAboveKey(predictions[2]);
  }
  
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