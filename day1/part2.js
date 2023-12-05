const { log } = require("console")
const fs = require("fs")

const input = fs.readFileSync("./day1/input.txt", {
  encoding: "utf8",
  flag: "r",
})

const mapping = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
]

const findResult = (input) =>
  input
    .split("\n")
    .map((line) => {
      const indexes = numbers
        .map((n) => {
          const occurences = [...line.matchAll(new RegExp(n, "gi"))].map(
            (a) => a.index
          )
          const number = mapping[n] || n

          return occurences.length > 0 && { number, occurences }
        })
        .filter(Boolean)
        .reduce((acc, curr) => {
          const { number, occurences } = curr
          acc[number] = acc[number] ?? []
          acc[number].push(...acc[number], ...occurences)

          return acc
        }, {})

      return Object.entries(indexes).map(([k, v]) => ({
        [k]: Array.from(new Set(v)),
      }))
    })
    .reduce((acc, curr) => {
      let lowestIndex = Number.MAX_VALUE
      let Lnumber = null
      let biggestIndexNumber = -1
      let Bnumber = null
      for (let number of curr) {
        for (let [k, v] of Object.entries(number)) {
          for (let i of v) {
            if (i < lowestIndex) {
              Lnumber = k
              lowestIndex = i
            }
            if (i > biggestIndexNumber) {
              Bnumber = k
              biggestIndexNumber = i
            }
          }
        }
      }

      return acc + Number("" + Lnumber + Bnumber)
    }, 0)

const result = findResult(input)

console.log(result)
