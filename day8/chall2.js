//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day8/test3.txt', 'utf8', (err, data) => {

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
    var current = [];
    var goal = [];
    var finish = false;
    var re = RegExp(/[0-9a-z][0-9a-z][0-9a-z]/gi);

    //Loop through every navigation point
    console.log(`Parsing map into array`);
    for (point of data) {

        //Find the three coordinates using regex
        point = point.match(re);

        //Save coordinates in map array
        map[point[0]] = [point[1], point[2]];

        if (point[0].endsWith('A')) {
            current.push(point[0]);

            let end = point[0].split('');
            end[2] = 'Z';
            goal.push(end.join(''))
        }
    }

    console.log(current, goal);

    //Loop as long as current point is not ZZZ
    console.log(`Starting navigation`)
    for (let i = 0; finish !== true; i++) {

        //Reset the iterator if it reached the max vakze if the instructions
        if (i === instructions.length) {
            console.log(`Final instruction reached, resetting loop`);
            i = 0;
        }

        let len = current.length;

        //Save the new location of every position in the current variable
        for (let j = 0; j < len; j++) {
            current[j] = map[current[j]][instructions[i]];
        }

        //Increase steps taken by 1
        result++;

        //Print new location
        console.log(`Moving to ${current}`);

        //If all positions are equal, set finish to true
        if (
            current[0] == goal[0] &&
            current[1] == goal[1] &&
            current[2] == goal[2] &&
            current[3] == goal[3] &&
            current[4] == goal[4] &&
            current[5] == goal[5]
        ) {
            finish = true;
        }
    }

    //Print result
    console.log(`\nAll Z locations reached, steps taken: ${result}`);
});