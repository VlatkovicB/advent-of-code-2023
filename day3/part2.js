const fs = require("fs")

const input = fs
  .readFileSync("./day3/input.txt", {
    encoding: "utf8",
    flag: "r",
  })
  .split("\n")
  .map((line) => line.replace(/\r/, ""))

const checkLeft = (index, line) => {
  if (!isNaN(line[index])) return checkLeft(index - 1, line) + "" + line[index]
  return ""
}
const checkRight = (index, line) => {
  if (!isNaN(line[index])) return line[index] + "" + checkRight(index + 1, line)
  return ""
}

const checkSurrounding = (
  index = -1,
  previous = "",
  current = "",
  next = ""
) => {
  const lines = [previous, current, next]
  return lines
    .map((line) => {
      let numbers = new Set()
      for (let i = index - 1; i < index + 2; i++) {
        if (line[i]?.match(/\d/)) {
          const left = checkLeft(i - 1, line)
          const right = checkRight(i + 1, line)
          const number = +(left + line[i] + right)
          numbers.add(number)
        }
      }
      return numbers
    })
    .reduce((acc, curr) => [...acc, ...curr], [])
}

const findStars = (line) =>
  line.split("").reduce((acc, curr, index) => {
    if (curr === "*") acc.push(index)
    return acc
  }, [])

const findSolution = (lines) => {
  let result = 0
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    const stars = findStars(line)
    if (!stars.length) continue
    for (let j = 0; j < stars.length; j++) {
      const star = stars[j]
      const numbersSurroundingStar = checkSurrounding(
        star,
        lines[i - 1],
        line,
        lines[i + 1]
      )
      if (numbersSurroundingStar.length > 1) {
        result += numbersSurroundingStar.reduce((acc, curr) => curr * acc, 1)
      }
    }
  }

  return result
}

const result = findSolution(input)

console.log(result)
