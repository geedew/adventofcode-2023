import * as fs from 'fs/promises';

const limits = {
    red: 12,
    green: 13,
    blue: 14,
}
async function part1() {
    const file = await fs.open('./day2.txt', 'r');

    let total = 0;
    for await (const line of file.readLines()) {
        // Split the game line
        const [gameText, bagGrabs] = line.split(':'); 
        const gameID = Number(gameText.match(/\d+/g)[0])

        // Split into groups
        const eachGrab = bagGrabs.split(';')
        const games = []
        let [totalRed, totalGreen, totalBlue] = [0,0,0]
        let cubeTooMuch = false
        for( const grab of eachGrab) {
            const cubes = grab.split(',')
            let [red, green, blue] = [0, 0, 0]
            for (const cube of cubes) {
                if(cube.includes("red")) {
                    red = Number(cube.match(/\d+/g)[0])
                    totalRed += red
                    if (red > limits.red) cubeTooMuch = true
                }
                if(cube.includes("blue")) {
                    blue = Number(cube.match(/\d+/g)[0])
                    totalBlue += blue
                    if (blue > limits.blue) cubeTooMuch = true
                }
                if(cube.includes("green")) {
                    green = Number(cube.match(/\d+/g)[0])
                    totalGreen += green
                    if (green > limits.green) cubeTooMuch = true
                }
            }
            games.push({ ID: gameID, Grab: grab, Cubes: {red, green, blue}})
        }
        if (!cubeTooMuch) {
            total += gameID
        }
        // console.log(games, { Totals: {totalRed, totalBlue, totalGreen}})

        // Add up the groups
        
        // console.log('game', gameID, eachGrab);
    }
    console.log('Part 1 total', total)
}
async function part2() {
    const file = await fs.open('./day2.txt', 'r');

    let total = 0;
    for await (const line of file.readLines()) {
        // Split the game line
        const [gameText, bagGrabs] = line.split(':'); 
        const gameID = Number(gameText.match(/\d+/g)[0])

        // Split into groups
        const eachGrab = bagGrabs.split(';')
        const games = []
        let [fewestRed, fewestBlue, fewestGreen] = [1,1,1]
        for( const grab of eachGrab) {
            const cubes = grab.split(',')
            let [red, green, blue] = [0, 0, 0]
            for (const cube of cubes) {
                if(cube.includes("red")) {
                    red = Number(cube.match(/\d+/g)[0])
                    if(red > fewestRed) fewestRed = red;
                }
                if(cube.includes("blue")) {
                    blue = Number(cube.match(/\d+/g)[0])
                    if(blue > fewestBlue) fewestBlue = blue;
                }
                if(cube.includes("green")) {
                    green = Number(cube.match(/\d+/g)[0])
                    if(green > fewestGreen) fewestGreen = green;
                }
            }
            games.push({ ID: gameID, Grab: grab, Cubes: {red, green, blue}})
        }
        // console.log(games, { Fewest: {fewestRed, fewestBlue, fewestGreen}, FewestTtl: fewestRed * fewestBlue * fewestGreen})
        total += (fewestRed * fewestGreen * fewestBlue)

        // Add up the groups
        
        // console.log('game', gameID, eachGrab);
    }
    console.log('Part 2 total', total)
}

part1(); // 2265, got it on first try
part2(); // 2224 first guess, too low... I was getting 'SMALLEST' but really should have been 'LARGEST' per game (duh).
// 64097 was the answer