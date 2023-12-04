//Import required libraries
const fs = require('fs');

//Read input data
fs.readFile('./day3/input.txt', 'utf8', (err, data) => {

    //Error event for readFile function
    if (err) {
        console.log('Error when reading input.txt File.\nMake sure the file exists and contains the correct contents.\n' + err);
        return;
    }

    //Create 2D matrix from input data
    data = data.split('\n');
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split('');
    }

    //Initialize result variable
    var result = 0;

    //Define Regex formula for filtering numbers
    const re = new RegExp(/\d/g);
    const res = new RegExp(/[^0-9.]+/g);

    //Loop through every line
    for (let i = 0; i < data.length; i++) {

        //Loop through every symbol
        for (let j = 0; j < data[i].length; j++) {

            //Match the current symbol to the number regex
            let cur = data[i][j].match(re);

            //Skip the symbol if it is not a number
            if (cur === null) { continue; }

            //Declare all required variables
            var size = 1;
            var num = []
            var pass = false;

            //Push first number to num array
            num.push(cur);

            //Loop through the next few symbols to determine the length of the found number
            for (let k = true; k === true; size++) {

                //Predeclare variable storing the next symbol
                var next = null;

                //If the next symbol doesn't overflow the array
                if (!(j + size > data[i].length- 1)) {

                    //Run regex formula to save the number in next variable
                    var next = data[i][j + size].match(re);
                }

                //If no number was found
                if (next === null) {

                    //Set the flag to end for loop
                    k = false;

                    //Subtract 1 from size variable to correct for loop
                    size--;
                }

                //If a number was found, push it to num array
                else { num.push(next); }
            }

            //Define which index of the array needs to be searched for a non-number character
            var height = [i - 1, i + 1];
            var width = [j - 1, j + size];

            //Correct the indexes in case number is at an outer edge of the matrix
            if (i === 0) { height[0]++; }
            else if (i === data.length - 1) { height[1]--; }
            if (j === 0) { width[0]++; }
            if (j + size - 1 === data[i].length - 1) { width[1]--; }

            //Loop through index lines to be searched for non-number character
            for (let k = height[0]; k <= height[1]; k++) {

                //Loop through symbols to be searched for non-number character
                for (let l = width[0]; l <= width[1]; l++) {

                    //Run regex formula to save any non-number character in sym variable
                    let sym = data[k][l].match(res);

                    //If non-number character was found, set pass variable to true
                    if (sym !== null) { pass = true; }
                }
            }

            //If pass variable was set to true
            if (pass) {

                //Add number to result variable
                result += +(num.join(''));
            }

            //Correct character index variable so number isn't scanned a second time
            j = j + size - 1;
        }
    }

    //Print the result
    console.log(result)
});