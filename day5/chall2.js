//Import required libraries
const fs = require('fs');

//Start the timer
console.time('Execution Time');

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
    var seedData = [];
    var seeds = [];
    var location = 0;

    //Save the seeds in a seperate variable
    seeds = data[0].split(' ');
    seeds = seeds.splice(1, seeds.length - 1);
    seeds = seeds.map(function (x){ return parseInt(x); });
    data = data.splice(2, data.length - 1);
    
    //Turn the seed amounts into ranges
    for (let i = 0; i < seeds.length; i = i + 2) {

        console.log(`Seed range: ${i / 2 + 1} of ${seeds.length / 2}`);

        //Save the starting seed and it's range
        var start = seeds[i];
        var range = seeds[i + 1];
        
        //Loop as many times as the range allows
        for (let j = 0; j < range; j++) {

            if ((j + 1) % 100000 === 0 || (j + 1) === range || j === 0) {
                console.log(`Position in seed range: ${j + 1} of ${range}`);
            }
            
            //Prepare variables needed to find seeds details
            var nav = 0;
            var done = false;
            seedData = [];
            seedData.push(start + j);

            //Loop through the lines of the data set
            for (set of data) {

                //console.log(`Log: ${nav + 1}`);

                //If the next category was found
                if (set.includes('-to-')) {

                    //Copy previous seed details if last one remained unfound
                    if (seedData[nav] === undefined) { seedData[nav] = seedData[nav - 1]; }

                    //Increase the navigation counter
                    nav++;

                    //Mark category as not done
                    done = false;

                    //Continue in next loop
                    continue;
                }

                //If category is already done or line is empty, continue to next loop
                else if (done === true || set === '') { continue; }

                //Split this lines data and save it in variables
                set = set.split(' ');
                let exit = +set[1];
                let dest = +set[0];
                let max = +set[2];

                //If current range includes the previous categories number
                if (seedData[nav - 1] >= exit && seedData[nav - 1] <= exit + max) {
                    
                    // console.log([
                    //     `exit: ${exit}`,
                    //     `dest: ${dest}`,
                    //     `max: ${max}`,
                    //     `prev: ${seedData[nav - 1]}`
                    // ]);

                    //Calculate the new number and save it in current category
                    seedData[nav] = dest + (seedData[nav - 1] - exit);

                    //Mark category as done
                    done = true;
                }
            }

            //Save location if it is the smallest number yet recorded
            if (location === 0 || location > seedData[seedData.length - 1] ) {
                location = seedData[seedData.length - 1];
                console.log(`New lowest location is ${location}`);
            }
        }
    }

    //Print this shit ass number
    console.log(`\nThe location which can go fuck itself is: ${location}`);

    //Stop the timer
    console.timeEnd('Execution Time');
});
