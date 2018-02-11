/*
  Function Keys on the Keyboard
*/

var ToggleCapsLock = function(){
  if(capsLock){
    for (var i = 0; i < keyLetters.length; ++i)
      keyLetters[i].innerHTML = keyLetters[i].innerHTML.toLowerCase();
  }
  else if (!capsLock){
    for (var i = 0; i < keyLetters.length; ++i)
      keyLetters[i].innerHTML = keyLetters[i].innerHTML.toUpperCase();
  }
  capsLock = !capsLock;
  console.log(capsLock);
}

function SpaceKey(){
  currentWordIndex ++;
  sentence.push('');
  console.log(sentence);
  ClearPredictionSpaces();
  DrawSentence();
};

function Backspace(){
  if(sentence.length <= 0)  return;

  var currentWord = sentence[currentWordIndex];

  if(currentWord.length > 1){
    currentWord = currentWord.slice(0, -1);
    sentence[currentWordIndex] = currentWord;
  }

  else if(currentWord.length === 1){
    sentence.splice(-1,1);
  }

  /*
    console.log(' ');
    console.log('current word       :' + currentWord);
    console.log('length of word     :' + currentWord.length);
    console.log('index of word      :' + currentWordIndex);
    console.log('the whole sentence:' + sentence);
    console.log(' ');
  */

  DrawSentence();
};