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
    var cards = [];

    //Define Regex formula for filtering numbers
    const re = new RegExp(/[1-9][0-9]|\b[1-9]/g)

    //Seperate the input into lines
    data = data.split('\n');

    //Loop through all lines
    for (let i = 0; i < data.length; i++) {

        //Set the current cards own counter to 1 if it doesn't exist yet
        if (cards[i] == undefined) { cards[i] = 1; }

        //Up the current cards cownter by 1 to account for the pre-owned card
        else { cards[i]++; }

        //Loop the current card the same amount of times that the counter implies
        for (let j = 0; j < cards[i]; j++) {

            //Reset the point value
            var points = 0;

            //Seperate the winning numbers from the gotten numbers
            const line = data[i].split('|');

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

                    //Increase the points counter by 1
                    points++;
                }
            }

            //Loop as many times as points got collected
            for (let k = 1; k < points + 1; k++) {

                //If the nextest card hasn't gotten a counter yet, create it and set it to 1
                if (cards[i + k] === undefined) { cards[i + k] = 1; }

                //If the nextest card has gotten a counter, increase it by 1
                else { cards[i + k]++; }
            }
        }
    }
    
    //Sum up all the card counters
    for (card of cards ) {
        result += card;
    }
    
    //Print the result
    console.log(result);
});
