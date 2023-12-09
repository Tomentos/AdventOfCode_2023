//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day8/input.txt', 'utf8', (err, data) => {

    //Error event for readFile function
    if (err) {
        console.log('Error when reading input.txt File.\nMake sure the file exists and contains the correct contents.\n' + err);
        return;
    }

    //Seperate the input into lines
    data = data.split('\r\n');
    
    //Prepare directions variable
    var instructions = [];
    
    //Convert directions to binary input easier array use later
    console.log(`Converting directions to binary`);
    for (direction of data[0].split('')) {
        switch(direction) {
            case 'L':
                instructions.push('0');
                break;
            case 'R':
                instructions.push('1');
                break;
        }
    }

    //Delete directions from data array
    data = data.splice(2, data.length - 1);

    //Declare varialbes for later use
    var map = [];
    var result = 0;
    var current = 'AAA';
    var re = RegExp(/[a-z][a-z][a-z]/gi);

    //Loop through every navigation point
    console.log(`Parsing map into array`)
    for (point of data) {

        //Find the three coordinates using regex
        point = point.match(re);

        //Save coordinates in map array
        map[point[0]] = [point[1], point[2]];
    }

    //Loop as long as current point is not ZZZ
    console.log(`Starting navigation`)
    for (let i = 0; current !== 'ZZZ'; i++) {

        //Reset the iterator if it reached the max vakze if the instructions
        if (i === instructions.length) {
            console.log(`Final instruction reached, resetting loop`)
            i = 0;
        }

        //Save the new location in the current variable
        current = map[current][instructions[i]];

        //Increase steps taken by 1
        result++;

        //Print new location
        console.log(`Moving to ${current}`);
    }

    //Print result
    console.log(`\nLocation ZZZ reached, steps taken: ${result}`);
});