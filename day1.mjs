import * as fs from 'fs/promises';

const file = await fs.open('./day1.txt', 'r');

let total = 0;

for await (const line of file.readLines() ) {

    // list each digit in line
    // OR removae all non-digits in line
    const digitsInLineArray = line.match(/^\d+|\d+\b|\d+(?=\w)/g) || [];
    const digitsInLine = digitsInLineArray.join('');
    const firstDigit = digitsInLine[0];
    const lastDigit = digitsInLine[digitsInLine.length -1];
    total += Number(`${firstDigit}${lastDigit}`)
}

console.log(total)