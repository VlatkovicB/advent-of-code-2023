// The Elf says they've stopped producing snow because they aren't getting any water! He isn't sure why the water stopped; however, he can show you how to get to the water source to check it out for yourself. It's just up ahead!

// As you continue your walk, the Elf poses a second question: in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?

// Again consider the example games from earlier:

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
// In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
// Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
// Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
// Game 4 required at least 14 red, 3 green, and 15 blue cubes.
// Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.
// The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five powers produces the sum 2286.

// For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?

const fs = require("fs")

const input = fs.readFileSync("./day2/input.txt", {
  encoding: "utf8",
  flag: "r",
})
//12 red cubes, 13 green cubes, and 14 blue cubes
const maxBallNumber = {
  blue: 14,
  red: 12,
  green: 13,
}
const findResult = (input) => {
  const result = input
    .split("\n")
    .map((line) => {
      const [idPart, gamePart] = line.split(/\:/)

      const id = +idPart.match(/\d+/)

      const games = gamePart.split(";").reduce(
        (sorted, current) => {
          const individualColors = current.split(",")
          for (const color of individualColors) {
            const [numberOfBalls, ballColor] = color
              .replace(/\r/, "")
              .trim()
              .split(" ")

            sorted[ballColor] = sorted[ballColor] || 0
            sorted[ballColor] =
              sorted[ballColor] < numberOfBalls
                ? +numberOfBalls
                : sorted[ballColor]
          }

          return sorted
        },
        { id }
      )
      return games
    })
    .reduce((acc, curr) => acc + curr.red * curr.blue * curr.green, 0)

  return result
}

const result = findResult(input)

console.log(result)