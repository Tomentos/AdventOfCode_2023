//Import required libraries
const fs = require('fs')

//Read input data
fs.readFile('./day1/input.txt', 'utf8', (err, data) => {

    //Error event for readFile function
    if (err) {
        console.log('Error when reading input.txt File.\nMake sure the file exists and contains the correct contents.\n' + err)
        return;
    }

    //Split the input into it's seperate lines
    data = data.split('\n');

    //Prepare the result variable
    var result = 0;

    //Loop through every single line
    for (val of data) {

        //Create regex variable
        const re = new RegExp(/one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9/g)

        //Match line with regex value
        var numbers = val.match(re);

        //Loop through every single regex result
        for (let i = 0; i < numbers.length; i++) {
            
            //Convert the strings into their proper number
            switch(numbers[i]) {
                case 'one':
                    numbers[i] = '1';
                    break;
                case 'two':
                    numbers[i] = '2';
                    break;
                case 'three':
                    numbers[i] = '3';
                    break;
                case 'four':
                    numbers[i] = '4';
                    break;
                case 'five':
                    numbers[i] = '5';
                    break;
                case 'six':
                    numbers[i] = '6';
                    break;
                case 'seven':
                    numbers[i] = '7';
                    break;
                case 'eight':
                    numbers[i] = '8';
                    break;
                case 'nine':
                    numbers[i] = '9';
                    break;
            }
        }

        //Add the first and last number together
        var sum = numbers[0] + numbers[numbers.length - 1];

        //Sum the resulting number into the result variable
        result += +sum;
    }

    //Print the final result
    console.log(result);
});
