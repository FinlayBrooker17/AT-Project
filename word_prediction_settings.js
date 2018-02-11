/*
    All settings for the js library on word prediction
*/


// Maximum number of predictions the library can suggest at once
var settings = {
    maxAmount : 10
};

// Initialize the library with the words and settings specified above
var tree = new jsT9(words, settings);