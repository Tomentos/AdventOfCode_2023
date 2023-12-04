//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day1/input.txt', 'utf8', (err, data) => {

    //Error event for readFile function
    if (err) {
        console.log('Error when reading input.txt File.\nMake sure the file exists and contains the correct contents.\n' + err);
        return;
    }

    //Split the input into it's seperate lines
    data = data.split('\n');

    //Prepare the result variable
    var result = 0;

    //Loop through every single line
    for (val of data) {

        //Create regex variable
        const re = /\d/g;

        //Match line with regex value
        var numbers = val.match(re);

        //Add the first and last number together
        var sum = parseInt(numbers[0] + numbers[numbers.length - 1]);

        //Sum the resulting number into the result variable
        result += sum;
    }

    //Print the final result
    console.log(result);
});
