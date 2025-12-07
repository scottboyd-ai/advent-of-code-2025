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

const values: string[][][] = []

const columnMaxLengthArray: number[] = []

const columnTotals: number[] = []

lines.forEach((line, lineIndex) => {
    // Ignore the operators
    if (lineIndex === lines.length - 1) {
        return
    }

    const lineValues = line.trim().split(/\s+/)

    lineValues?.forEach((lineValue, lineValueIndex) => {

        const valueChars = lineValue.split('')
        if (!columnMaxLengthArray[lineValueIndex] || columnMaxLengthArray[lineValueIndex] < valueChars.length) {
            columnMaxLengthArray[lineValueIndex] = valueChars.length
        }
        if (!values[lineValueIndex]) {
            values[lineValueIndex] = []
        }

        values[lineValueIndex].push(valueChars);
    })
})


// Need to fill in values elements with 0s
lines.forEach((line, lineIndex) => {
    // Skip operators again
    if (lineIndex === lines.length - 1) {
        return
    }

    let spaceOffset = 0
    for (const columnMaxLengthIndex in columnMaxLengthArray) {
        const columnMaxLengthIndexNum = parseInt(columnMaxLengthIndex)
        const columnMaxLength = columnMaxLengthArray[columnMaxLengthIndex]
        const valueWithSpaces = line.substring(spaceOffset, spaceOffset + columnMaxLength)
        values[columnMaxLengthIndexNum][lineIndex] = valueWithSpaces.replace(/\s/g, '!').split('')
        spaceOffset += columnMaxLength + 1
    }

})

values.forEach((column, columnIndex) => {

    const correctedColumnValue: string[][] = []

    column.forEach((columnRow, columnRowIndex) => {

        for (const columnRowValueIndex in columnRow) {
            const columnRowValueIndexNum = parseInt(columnRowValueIndex)
            if (!correctedColumnValue[columnRowValueIndexNum]) {
                correctedColumnValue[columnRowValueIndexNum] = []
            }
            correctedColumnValue[columnRowValueIndexNum][columnRowIndex] = columnRow[columnRowValueIndexNum]
        }
    })

    let columnCombinedValue: number = 0
    correctedColumnValue.forEach(correctedColumn => {
        const combined = correctedColumn.join('').replace(/!/g, '')
        const num = parseInt(combined)
        if (columnCombinedValue === 0) {
            columnCombinedValue = num
        } else if (operations[columnIndex] === '+') {
            columnCombinedValue += num
        } else if (operations[columnIndex] === '*') {
            columnCombinedValue *= num
        }
    })

    columnTotals.push(columnCombinedValue)
})


const sum = columnTotals.reduce((acc, x) => acc + x, 0);
console.log(sum)
