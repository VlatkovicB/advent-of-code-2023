const fs = require("fs")

const input = fs
  .readFileSync("./day4/input.txt", {
    encoding: "utf8",
    flag: "r",
  })
  .split("\n")
  .map((line) => line.replace(/\r/, ""))

/**
 * Copies of scratchcards are scored like normal scratchcards and have the same card number as the card they copied.
 * So, if you win a copy of card 10 and it has 5 matching numbers,
 * it would then win a copy of the same cards that the original card 10 won: cards 11, 12, 13, 14, and 15.
 * This process repeats until none of the copies cause you to win any more cards.
 * (Cards will never make you copy a card past the end of the table.)
 *
 */

const findSolution = (lines) => {
  const r = lines.reduce(
    (acc, line) => {
      const [card, entry] = line.split(":")
      const cardNumber = +card.match(/\d+/)
      let [winning, mine] = entry.split("|")
      mine = mine.trim().split(" ")
      winning = winning
        .trim()
        .split(" ")
        .filter((n) => n.length > 0)

      const intersection = winning.filter((number) => mine.includes(number))
      for (let i = 1; i <= intersection.length; i++) {
        acc[cardNumber + i] += acc[cardNumber] || 1
      }
      return acc
    },
    lines.reduce((a, c, i) => {
      a[i + 1] = 1
      return a
    }, {})
  )

  return Object.values(r).reduce((a, c) => a + c, 0)
}

const result = findSolution(input)

console.log(result)
