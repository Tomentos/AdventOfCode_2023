//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day5/input.txt', 'utf8', (err, data) => {

    //Error event for readFile function
    if (err) {
        console.log('Error when reading input.txt File.\nMake sure the file exists and contains the correct contents.\n' + err);
        return;
    }

    //Seperate the input into lines
    data = data.split('\n');

    //Create base variables
    var navigation = ['seeds', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location'];
    var indexScroll = 0;
    var result = [];
    result['seeds'] = [];
    result['soil'] = [];
    result['fertilizer'] = [];
    result['water'] = [];
    result['light'] = [];
    result['temperature'] = [];
    result['humidity'] = [];
    result['location'] = [];

    //Save the seeds in a seperate variable
    result['seeds'] = data[0].split(' ');
    result['seeds'] = result['seeds'].splice(1, result['seeds'].length - 1);
    result['seeds'] = result['seeds'].map(function (x) { return parseInt(x); });
    data = data.splice(2, data.length - 1);

    //Loop through every line of the input
    for (line of data) {

        //If the line contains a title / is the beginning of a new data set
        if (line.includes('-to-')) {

            //Increase the indexScroll and continue to the next loop
            indexScroll++;
            continue;
        }

        //If the line is empty
        else if (line === '') {

            //Continue to the next loop
            continue;
        }

         //Split the values and enter them into more managable variables
         line = line.split(' ');
         var start = +line[1];
         var goal = +line[0];
         var range = +line[2];

         //Loop through the numbers as many times as the range allows
         for (let i = 0; i < range; i++) {

             //Get all final numbers of the previous data set
             var prev = result[navigation[indexScroll - 1]];

             //Check if the currently looped number is contained in the previous data set
             var index = prev.indexOf(+start + i);

             //If the number was found
             if (index != -1) {

                 //Save the destination number in the same position of the current data set
                 result[navigation[indexScroll]][index] = goal + i;
             }
         }

        //Loop through all numbers saved in the current data set
        for (let i = 0; i < result[navigation[indexScroll - 1]].length; i++) {

            //If one number was not defined in the loop
            if (result[navigation[indexScroll]][i] === undefined) {

                //Copy the number from the same position of the previous data set
                result[navigation[indexScroll]][i] = result[navigation[indexScroll - 1]][i];
            }
        }
    }

    //Find the lowest location number
    const location = Math.min(...result['location']);

    //Print the full table and the final result
    console.table(result);
    console.log(`The location which can go fuck itself is: ${location}`)
});