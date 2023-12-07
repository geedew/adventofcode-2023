import * as fs from 'fs/promises';



async function part1() {
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

    console.log(`Part 1: ${total}`)
}

async function part2() {
    const file = await fs.open('./day1.txt', 'r');
    let total = 0;

    for await (const line of file.readLines() ) {

        // Turn words into digits...
        // This will fail as they are some very edge cases in the list that really were not clear... but basically if you have a string at the end that is a word that matches a number and another number as a string
        // directly in front of it sharing a character, you end up breaking the final number and getting the wrong value.
        // IE 8blsrrqrjlckv7xszllqddzn5oneightfg -> 88, NOT 81.
        // Also, JS Replace ALL is unable to deal with this without some complicated understanding of Regex; if that is even possible. So doing it number by number is simpler
        // const convertedWordsToDigits = line.replaceAll(/one|two|three|four|five|six|seven|eight|nine/ig, (val, offset, entireString) => {
        //     let rtnVal = '';
        //     switch (val) {
        //       case "one":
        //         return '1';
        //     case "two":
        //         rtnVal =  '2';
        //     case "three":
        //         rtnVal =  '3';
        //     case "four":
        //         rtnVal =  '4';
        //     case "five":
        //         rtnVal =  '5';
        //     case "six":
        //         rtnVal =  '6';
        //     case "seven":
        //         rtnVal =  '7';
        //     case "eight":
        //         rtnVal =  '8';
        //     case "nine":
        //         rtnVal =  '9';
        //     default:
        //         rtnVal =  val;
        //     }
        //     return rtnVal;
        // })

        // Replacing one after another leaving the word intact in case it creates another further number.
        // This will not work if the ordering of the numbers is not orderde, but in fact it does produce the right number.
        const replace1 = line.replaceAll(/one/ig, 'one1one');
        const replace2 = replace1.replaceAll(/two/ig, 'two2two');
        const replace3 = replace2.replaceAll(/three/ig, 'three3three');
        const replace4 = replace3.replaceAll(/four/ig, 'four4four');
        const replace5 = replace4.replaceAll(/five/ig, 'five5five');
        const replace6 = replace5.replaceAll(/six/ig, 'six6six');
        const replace7 = replace6.replaceAll(/seven/ig, 'seven7seven');
        const replace8 = replace7.replaceAll(/eight/ig, 'eight8eight');
        const replace9 = replace8.replaceAll(/nine/ig, 'nine9nine');

        const digitsInLineArray = replace9.match(/^\d+|\d+\b|\d+(?=\w)/g) || [];
        const digitsInLine = digitsInLineArray.join('');
        const firstDigit = digitsInLine[0];
        const lastDigit = digitsInLine[digitsInLine.length -1];
        total += Number(`${firstDigit}${lastDigit}`)
        // console.log(`${line} -> ${digitsInLine} -> ${Number(`${firstDigit}${lastDigit}`)}`)
    }

    console.log(`Part 2: ${total}`)
}

await part1();
await part2();
// Too High 53519
// Too Low 52417
// Correct 53515
