// const input = '123 328  51 64 \n' +
//     ' 45 64  387 23 \n' +
//     '  6 98  215 314\n' +
//     '*   +   *   +  '

import {input} from "./input";

const lines = input.split('\n')

const operations = lines[lines.length - 1].match(/\S/g)

if (!operations){
    console.log('whoops')
    throw new Error('Whoops')
}

const values: number[] = []

lines.forEach((line, lineIndex) => {
    // Ignore the operators
    if (lineIndex === lines.length - 1) {
        return
    }

    const lineValues = line.trim().split(/\s+/)

    lineValues?.forEach((lineValue, lineValueIndex) => {
        const lineValueNum = parseInt(lineValue, 10)
        if (!values[lineValueIndex]) {
            values.push(lineValueNum)
            return
        }
        if (operations[lineValueIndex] === '+') {
            values[lineValueIndex] += lineValueNum
        } else if (operations[lineValueIndex] === '*') {
            values[lineValueIndex] *= lineValueNum
        }
    })
})

const sum = values.reduce((acc, x) => acc + x, 0);
console.log(sum)
