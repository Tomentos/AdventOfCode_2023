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

    var final = 0;
    var result = [];
    var points = [];
    points['T'] = 9;
    points['J'] = 10;
    points['Q'] = 11;
    points['K'] = 12;
    points['A'] = 13;
    

    console.log(`\nEvaluating hands in input`);
    for (line of data) {
        var cards = [];
        var index = [];
        var combo = 0;

        line = line.split(' ');
        var hand = line[0].split('');
        var money = +line[1];

        for (card of hand) {
            if (index.indexOf(card) === -1 ){ index.push(card) }
            x = index.indexOf(card)

            if (cards[x] === undefined) {
                cards[x] = 1;
            }
            else {
                cards[x]++;
            }
        }

        if (cards.includes(5)) { combo = 6; }
        else if (cards.includes(4)) { combo = 5; }
        else if (cards.includes(3) && cards.includes(2)) { combo = 4; }
        else if (cards.includes(3)) { combo = 3; }
        else if (cards.filter(x => x === 2).length === 2) { combo = 2; }
        else if (cards.includes(2)) { combo = 1; }

        result.push([hand, money, combo]);
    }

    console.log(`Ranking hands`)
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

                console.log(aCardVal, bCardVal)

                return (aCardVal < bCardVal) ? -1 : 1;
            }
        }
    })

    
    console.log(`Calculating total winnings`)
    for (let i = 1; i <= result.length; i++) {
        final += (result[i - 1][1] * i);
        console.log(result[i - 1][1], i, result[i - 1][1] * i)
        //console.log(result[i-1])
    }

    //console.log(result)
    //console.log(`\nThe total winnings are: ${final}`)
});



function numify (letter) {

    switch(letter) {
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