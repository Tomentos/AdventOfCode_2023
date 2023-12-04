//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day2/input.txt', 'utf8', (err, data) => {

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

        //Split game number and pulls
        val = val.split(':');

        //Get pure number of game
        val[0] = val[0].split(' ');

        //Split pulls of the game
        val[1] = val[1].split(';');
        
        //Define object to keep track of minimum required numbers
        min = {
            'red': 0,
            'green': 0,
            'blue': 0
        }

        //Loop through every pull of the game
        for (pull of val[1]) {

            //Split the colors of the pull
            pull = pull.split(', ');

            //Loop through all the pulled colors
            for (color of pull) {

                //Check the red color
                if (color.includes('red')) {

                    //Parse the amount
                    var amount = parseInt(color);

                    //If the amount goes above the minimum
                    if (amount > min['red']) {

                        //Raise the minimum amount to the current amount
                        min['red'] = amount;
                    }
                }

                //Check the green color
                else if (color.includes('green')) {

                    //Parse the amount
                    let amount = parseInt(color);

                    //If the amount goes above the minimum
                    if (amount > min['green']) {

                        //Raise the minimum amount to the current amount
                        min['green'] = amount;
                    }
                }

                //Check the blue color
                else if (color.includes('blue')) {

                    //Parse the amount
                    let amount = parseInt(color);

                    //If the amount goes above the minimum
                    if (amount > min['blue']) {

                        //Raise the minimum amount to the current amount
                        min['blue'] = amount;
                    }
                }
            }
        }

        //Multiply all minimum amounts and add them to the result variable
        result += (+min['red'] * +min['green'] * +min['blue'])
    }

    //Print the result
    console.log(result);
});