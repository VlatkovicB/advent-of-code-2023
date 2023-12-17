const fs = require("fs")

const input = fs
  .readFileSync("./day4/input.txt", {
    encoding: "utf8",
    flag: "r",
  })
  .split("\n")
  .map((line) => line.replace(/\r/, ""))

const calculateScore = (numbers) => numbers.reduce((a, c) => a * 2, 1 / 2)

const findSolution = (lines) =>
  lines.reduce((acc, line) => {
    const [card, entry] = line.split(":")
    let [winning, mine] = entry.split("|")
    mine = mine.trim().split(" ")
    winning = winning
      .trim()
      .split(" ")
      .filter((n) => n.length > 0)

    const intersection = winning.filter((number) => mine.includes(number))
    if (intersection.length > 0) {
      acc += calculateScore(intersection)
    }
    return acc
  }, 0)

const result = findSolution(input)

console.log(result)
