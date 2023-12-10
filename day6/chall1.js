//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day6/input.txt', 'utf8', (err, data) => {

    //Error event for readFile function
    if (err) {
        console.log('Error when reading input.txt File.\nMake sure the file exists and contains the correct contents.\n' + err);
        return;
    }

    //Seperate the input into lines
    data = data.split('\n');

    var result = 1;
    const re = RegExp(/\d{1,4}/g);

    time = data[0].match(re);
    distance = data[1].match(re);
    races = time.length;

    for (let i = 0; i < races; i++) {

        var beat = 0;

        for (let j = 0; j < time[i]; j++) {
            if (distance[i] < (time[i] - j) * j) {
                beat++;
            }
        }
        console.log(`Found ${beat} ways to beat race ${i}`)
        result = result * beat;
    }

    //Print the result
    console.log(`\nTotal multiplied result: ${result}`);
});