// const input = '987654321111111\n' +
//     '811111111111119\n' +
//     '234234234234278\n' +
//     '818181911112111'

import {input} from './input'

const banks = input.split('\n')

let bankTotal = 0

for (const bank of banks) {
    const numbers = bank.split('')

    const joltageValues = []

    let highestIndex = 0

    while (joltageValues.length < 12) {

        let highest = 0

        // Loop over numbers starting at index value and going to
        for (let x = highestIndex; x <= numbers.length - (12 - joltageValues.length); x++) {
            const numbersXNum = parseInt(numbers[x])
            if (numbersXNum > highest) {
                highest = numbersXNum
                highestIndex = x + 1
            }
        }

        joltageValues.push(highest)
    }

    let total = ''

    joltageValues.forEach(value => {
        total += value.toString()
    })
    const totalNum = parseInt(total)

    console.log(totalNum)

    bankTotal += totalNum
}

console.log(bankTotal)
