//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day4/input.txt', 'utf8', (err, data) => {

    //Error event for readFile function
    if (err) {
        console.log('Error when reading input.txt File.\nMake sure the file exists and contains the correct contents.\n' + err);
        return;
    }

    //Initialize result variable
    var result = 0;

    //Define Regex formula for filtering numbers
    const re = new RegExp(/[1-9][0-9]|\b[1-9]/g)

    //Seperate the input into lines
    data = data.split('\n');

    //Loop through all lines
    for (line of data) {

        //Reset the point value
        var points = 0;

        //Seperate the winning numbers from the gotten numbers
        line = line.split('|');

        //Save the raw numbers into their respective variables
        var win = line[0].split(':')[1];
        var got = line[1];

        //Filter the whole numbers using regex
        win = win.match(re);
        got = got.match(re);

        //Loop through all gotten numbers
        for (num of got) {

            //If the gotten number is included in the winning numbers
            if (win.includes(num)) {

                //Set the points to 1 if they are 0
                if (points === 0) { points = 1; }

                //Double the points if they already have a value
                else { points = points * 2; }
            }
        }

        //Add the points to the result
        result += points;
    }

    //Print the result
    console.log(result);
});
