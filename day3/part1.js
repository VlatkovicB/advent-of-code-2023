const fs = require("fs")

// The engine schematic (your puzzle input) consists of a visual representation of the engine.
// There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol,
// even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

// In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

const input = fs.readFileSync("./day3/input.txt", {
  encoding: "utf8",
  flag: "r",
})

const symbolRegex = /[*/\-+&=@$%#]/

const checkSurrounding = (
  number = -1,
  previous = "",
  current = "",
  next = ""
) => {
  const index = current.indexOf(number)
  const lines = [previous, current, next]
  return lines
    .map((line) => {
      for (
        let i = index - 1 >= 0 ? index - 1 : index;
        i < index + number.length + 1;
        i++
      ) {
        if (line[i]?.match(symbolRegex)) {
          console.log(number, line)
          return true
        }
      }
    })
    .some((a) => a)
}

const findSolution = (input) => {
  const lines = input.split("\n")
  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/\r/, "")
    const numbers = line.match(/\d+/g)

    if (!numbers) continue
    for (let j = 0; j < numbers.length; j++) {
      const number = numbers[j]

      const hasSymbol = checkSurrounding(
        number,
        lines[i - 1]?.replace(/\r/, ""),
        line.replace(/\r/, ""),
        lines[i + 1]?.replace(/\r/, "")
      )
      line = line.replace(number, new Array(number.length).fill(".").join(""))
      if (hasSymbol) {
        sum += +number
      }
    }
  }

  return sum
}

const r = findSolution(input)

console.log(r)

4361
58
4419
4477
58
