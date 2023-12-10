//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day6/input.txt', 'utf8', (err, data) => {

    //Error event for readFile function
    if (err) {
        console.log('Error when reading input.txt File.\nMake sure the file exists and contains the correct contents.\n' + err);
        return;
    }

    //Seperate the input into lines
    data = data.split('\n');

    var result = 0;
    const re = RegExp(/\d/g);

    time = data[0].match(re).join('');
    distance = data[1].match(re).join('');

    for (let j = 0; j < time; j++) {
        if (distance < (time - j) * j) {
            result++;
        }
    }

    //Print the result
    console.log(`Found ${result} ways to beat the race`)
});