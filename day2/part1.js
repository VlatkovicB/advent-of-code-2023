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

            if (maxBallNumber[ballColor] < +numberOfBalls) {
              sorted.valid = false
              return sorted
            }
          }

          return sorted
        },
        { id, valid: true }
      )

      return games
    })
    .filter((game) => game.valid)
    .reduce((acc, curr) => acc + curr.id, 0)

  return result
}

const result = findResult(input)

console.log(result)
