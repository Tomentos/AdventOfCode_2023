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
        
        //Define pass variable to control possibility of game
        var pass = true;

        //Loop through every pull of the game
        pull:
        for (pull of val[1]) {

            //Split the colors of the pull
            pull = pull.split(', ');

            //Loop through all the pulled colors
            color:
            for (color of pull) {

                //Check the red color
                if (color.includes('red')) {

                    //Parse the amount
                    let amount = parseInt(color);

                    //If the amount goes above the limit
                    if (amount > 12) {

                        //Set the pass variable and break the game loop
                        pass = false;
                        break pull;
                    }
                }

                //Check the green color
                else if (color.includes('green')) {

                    //Parse the amount
                    let amount = parseInt(color);

                    //If the amount goes above the limit
                    if (amount > 13) {

                        //Set the pass variable and break the game loop
                        pass = false;
                        break pull;
                    }
                }

                //Check the blue color
                else if (color.includes('blue')) {

                    //Parse the amount
                    let amount = parseInt(color);

                    //If the amount goes above the limit
                    if (amount > 14) {

                        //Set the pass variable and break the game loop
                        pass = false;
                        break pull;
                    }
                }
            }

            //Break the forEach if the pass variable is already set to false
            if (pass === false) { break pull; }
        }

        //Add the game number to the result if the pass variable is set to true
        if (pass === true) { result += +val[0][1]; }
    }

    //Print the result
    console.log(result);
});