// const input = '987654321111111\n' +
//     '811111111111119\n' +
//     '234234234234278\n' +
//     '818181911112111'

import {input} from './input'

const banks = input.split('\n')




let bankTotal = 0

for (const bank of banks) {
    const numbers = bank.split('')
    let highest = 0
    let highestIndex = -1
    numbers.forEach((value, index) => {

        // Instead, now we need to stop when there are 11 digits left

        if (index < numbers.length - 1) {
            const valueNum = parseInt(value);
            if (valueNum > highest) {
                highest = valueNum
                highestIndex = index
            }
        } else {
            return
        }
    })

    let nextHighest = 0;
    for (let x = highestIndex + 1; x < numbers.length; x++) {
        const numbersXNum = parseInt(numbers[x])
        if (numbersXNum > nextHighest) {
            nextHighest = numbersXNum
        }
    }

    const total = highest.toString() + nextHighest.toString()
    const totalNum = parseInt(total)

    console.log(totalNum)

    bankTotal += totalNum
}

console.log(bankTotal)
