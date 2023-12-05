const fs = require("fs")

const input = fs.readFileSync("./input.txt", { encoding: "utf8", flag: "r" })

const findResult = (input) =>
  input
    .split("\n")
    .map((e) => e.replace(/\D+/g, ""))
    .reduce((acc, curr) => {
      console.log(curr)

      return acc + +(curr.slice(0, 1) + curr.slice(-1))
    }, 0)

console.log(findResult(input))
