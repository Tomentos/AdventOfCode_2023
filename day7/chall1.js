//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day7/input.txt', 'utf8', (err, data) => {

    //Error event for readFile function
    if (err) {
        console.log('Error when reading input.txt File.\nMake sure the file exists and contains the correct contents.\n' + err);
        return;
    }

    //Seperate the input into lines
    data = data.split('\n');

    //Create variables used to store results
    var final = 0;
    var result = [];

    //Print status message
    console.log(`\nEvaluating hands in input`);

    //Loop through all input lines
    for (line of data) {

        //Create variables for counting combos
        var cards = [];
        var index = [];
        var combo = 0;

        //Seperate Cards from bets
        line = line.split(' ');
        var hand = line[0].split('');
        var money = +line[1];

        //Loop through all cards
        for (card of hand) {

            //If the current card has not appeared during counting before
            if (index.indexOf(card) === -1 ){

                //Add it to the cards index
                index.push(card)
            }

            //Get the current cards position in the card index
            x = index.indexOf(card)

            //If the cards count has not been set before
            if (cards[x] === undefined) {

                //Set it to 1
                cards[x] = 1;
            } else {

                //Else, increase it by 1
                cards[x]++;
            }
        }

        //Check the card counts and push the combo which was gotten to the array containing all results
        if (cards.includes(5)) { combo = 6; }
        else if (cards.includes(4)) { combo = 5; }
        else if (cards.includes(3) && cards.includes(2)) { combo = 4; }
        else if (cards.includes(3)) { combo = 3; }
        else if (cards.filter(x => x === 2).length === 2) { combo = 2; }
        else if (cards.includes(2)) { combo = 1; }

        //Push all results to the compare variable
        result.push([hand, money, combo]);
    }

    //Print status message
    console.log(`Ranking hands`)

    //Sort the entries in compare variable according to the strength of the hand
    result.sort( function (a, b) {
        var aScore = a[2];
        var bScore = b[2];
        var aCards = a[0];
        var bCards = b[0];

        if (aScore != bScore) {
            return (aScore < bScore) ? -1 : 1;
        }

        else {
            for (let i = 0; i < aCards.length; i++) {
                if (aCards[i] == bCards[i]) {
                    continue;
                }

                aCardVal = numify(aCards[i])
                bCardVal = numify(bCards[i])

                //console.log(aCardVal, bCardVal)

                return (aCardVal < bCardVal) ? -1 : 1;
            }
        }
    })

    //Print status message
    console.log(`Calculating total winnings`);

    //Calculate the total winnings using the position in the ranking
    for (let i = 1; i <= result.length; i++) {
        final += (result[i - 1][1] * i);
    }

    //Print final result
    console.log(`\nThe total winnings are: ${final}`);
});



function numify (letter) {

    //Convert all cards to a number, equivalent to their strength starting at 1
    switch(letter) {
        case '2':
            return 1;
        case '3':
            return 2;
        case '4':
            return 3;
        case '5':
            return 4;
        case '6':
            return 5;
        case '7':
            return 6;
        case '8':
            return 7;
        case '9':
            return 8;
        case 'T':
            return 9;
        case 'J':
            return 10;
        case 'Q':
            return 11;
        case 'K':
            return 12;
        case 'A':
            return 13;
        default:
            return parseInt(letter);
    }
}