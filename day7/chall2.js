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
    var compare = [];
    var result = 0;

    //Print status message
    console.log(`\nEvaluating hands in input`);

    //Loop through all input lines
    for (line of data) {

        //Seperate Cards from bets
        var hand = line.split(' ')[0].split('');
        var bet = line.split(' ')[1];
        var points = 0;

        //Convert cards to number equivalent
        for (let i = 0; i < hand.length; i++) {
            hand[i] = numify(hand[i]);
        }

        //Evaluate the cards, including joker alternatives
        points = evalCards(hand);

        //Push all results to the compare variable
        compare.push([hand, points, +bet]);
    }

    //Print status message
    console.log(`Ranking hands`)

    //Sort the entries in compare variable according to the strength of the hand
    compare.sort( function (a, b) {
        var aScore = a[1];
        var bScore = b[1];
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
                return (aCards[i] < bCards[i]) ? -1 : 1;
            }
        }
    })

    //Print status message
    console.log(`Calculating total winnings`)

    //Calculate the total winnings using the position in the ranking
    for (let i = 1; i <= compare.length; i++) {
        result += (compare[i - 1][2] * i);
    }

    //Print final result
    console.log(`\nThe total winnings are: ${result}`)
});



function numify (letter) {

    //Convert all cards to a number, equivalent to their strength starting at 1
    switch(letter) {
        case 'J':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
        case 'T':
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

function evalCards (hand) {

    //Declare basic variables
    const joker = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    var combos = [];
    
    //If the current hand includes a Joker, enter the replacement process
    if (hand.includes(1)) {
        
        //Loop through all cards
        for (let i = 0; i < hand.length; i++) {
            
            //If the current card is a Joker
            if (hand[i] === 1) {
                
                //Create a copy of the hand that we can manipulate without influencing the original
                var handJ = Object.create(hand);

                //Loop through all values a joker can be instead
                for (val of joker) {

                    
                    //Change the current card to the current looped value
                    handJ[i] = val;

                    //Recurse the function using the new hand
                    hypo = evalCards(handJ);

                    //Push the result to the array containing all results
                    combos.push(hypo);
                }
            }
        }
    }

    //If no Joker was found
    else {

        //Create variables for counting combos
        var index = [];
        var count = [];

        //Loop through all cards
        for (card of hand) {

            //If the current card has not appeared during counting before
            if (index.indexOf(card) === -1) {

                //Add it to the cards index
                index.push(card);
            }

            //Get the current cards position in the card index
            pos = index.indexOf(card);

            //If the cards count has not been set before
            if (count[pos] === undefined) {

                //Set it to 1
                count[pos] = 1;
            } else {

                //Else, increase it by 1
                count[pos]++;
            }
        }

        //Check the card counts and push the combo which was gotten to the array containing all results
        if (count.includes(5)) { combos.push(6); }
        else if (count.includes(4)) { combos.push(5); }
        else if (count.includes(3) && count.includes(2)) { combos.push(4); }
        else if (count.includes(3)) { combos.push(3); }
        else if (count.filter(x => x === 2).length === 2) { combos.push(2); }
        else if (count.includes(2)) { combos.push(1); }
        else if (count.includes(1)) { combos.push(0); }
    }

    //Return only the highest result from the entire array
    return Math.max(...combos);
}