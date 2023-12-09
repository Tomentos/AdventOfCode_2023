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
    data = data.split('\n');
    
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
    var lcm = [];
    var current = [];
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
        }
    }

    console.log(`Starting navigation`);

    //Loop through all starting positions
    for (curr of current) {

        result = 0;
        finish = false

        //Loop as long as final point has not been found
        for (let i = 0; finish == false; i++) {

            //Reset the iterator if it reached the max vakze if the instructions
            if (i === instructions.length) {
                i = 0;
            }

            curr = map[curr][instructions[i]];

            //Increase steps taken by 1
            result++;

            if (curr.endsWith('Z')) { finish = true; }

        }

        //Push this positions distance to the lcm variable to calculate the total steps later
        lcm.push(result);

        console.log(`Found position ${result}`);
    }

    //Get lcm of all positions
    result = LCM(lcm);

    //Print result
    console.log(`\nAll Z locations reached, steps taken: ${result}`);
});


//Function I copy pasted from geeksforgeeks.org to calculate the lcm of all positions
function LCM(arr) {

    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }

    let res = arr[0];

    for (let i = 1; i < arr.length; i++) {
        res = (res * arr[i]) / gcd(res, arr[i]);
    }

    return res;
}