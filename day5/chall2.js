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
    var result = [];
    var seedsTemp = [];
    var location = 0;
    
    //Save the seeds in a seperate variable
    seedsTemp = data[0].split(' ');
    seedsTemp = seedsTemp.splice(1, seedsTemp.length - 1);
    seedsTemp = seedsTemp.map(function (x){ return parseInt(x); });
    data = data.splice(2, data.length - 1);
    
    //Turn the seed amounts into ranges
    for (let i = 0; i < seedsTemp.length; i = i + 2) {
        
        //Initialize the data set
        result['seeds'] = [];
        result['soil'] = [];
        result['fertilizer'] = [];
        result['water'] = [];
        result['light'] = [];
        result['temperature'] = [];
        result['humidity'] = [];
        result['location'] = [];

        //Start the counter for scrolling through the table index
        var indexScroll = 0;
        
        //Define start start seed and the seed range
        var start = seedsTemp[i];
        var range = seedsTemp[i + 1];

        //Loop through the numbers as many times as the range allows
        for (let j = 0; j < range; j++) {

            //Push the seed into the array and shed a tear with each and every new seed placed in there as the solution for part 1 already took 15 minutes to complete and this will have many many many more seeds now because of this shit im boutta cry man i cannot go on like this anymore
            result['seeds'].push(start + j);
        }
        
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
                for (let j = 0; j < range; j++) {
    
                    //Get all final numbers of the previous data set
                    var prev = result[navigation[indexScroll - 1]];
    
                    //Check if the currently looped number is contained in the previous data set
                    var index = prev.indexOf(+start + j);
    
                    //If the number was found
                    if (index != -1) {
                    
                        //Save the destination number in the same position of the current data set
                        result[navigation[indexScroll]][index] = goal + j;
                    }
               
                    //Loop through all numbers saved in the current data set
                    for (let j = 0; j < result[navigation[indexScroll - 1]].length; j++) {
    
                        //If one number was not defined in the loop
                        if (result[navigation[indexScroll]][j] === undefined) {
    
                            //Copy the number from the same position of the previous data set
                            result[navigation[indexScroll]][j] = result[navigation[indexScroll - 1]][j];
                        }
                    }
                }
        }

        //Find the lowest location number
        if (location === 0) {
            location = Math.min(...result['location']);
        }
        else {
            lowLoc = Math.min(...result['location']);
            if (location > lowLoc) {
                location = lowLoc;
            }
        }
    
        //Print the table
        console.table(result);
    }


    console.log(`The location which can go fuck itself is: ${location}`)
});