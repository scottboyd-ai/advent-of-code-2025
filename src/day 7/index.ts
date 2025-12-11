// const input = '' +
//     '.......S.......\n' +
//     '...............\n' +
//     '.......^.......\n' +
//     '...............\n' +
//     '......^.^......\n' +
//     '...............\n' +
//     '.....^.^.^.....\n' +
//     '...............\n' +
//     '....^.^...^....\n' +
//     '...............\n' +
//     '...^.^...^.^...\n' +
//     '...............\n' +
//     '..^...^.....^..\n' +
//     '...............\n' +
//     '.^.^.^.^.^...^.\n' +
//     '...............'

import {input} from "./input";

const map: string[][] = []

const inputRows = input.split('\n')

inputRows.forEach((row, rowIndex) => {
    if (!map[rowIndex]) {
        map[rowIndex] = []
    }

    map[rowIndex] = row.split('')
})

const startCell = map[0].indexOf('S')
if (startCell < 0) {
    throw new Error('Invalid start position')
}

const tachyonCells: {[index: number]: boolean} = {}
if (Object.keys(tachyonCells).length === 0) {
    tachyonCells[startCell] = true
}

const timelineMap: {[columnIndex: number]: number} = {}
timelineMap[startCell] = 1

map.forEach((row, rowIndex) => {
    if (rowIndex === 0) {
        return
    }
    Object.keys(tachyonCells).forEach((tachyon, tachyonIndex) => {
        const tachyonNumber = parseInt(tachyon)
        if (row[tachyonNumber] === '^' && tachyonCells[tachyonNumber]) {
            tachyonCells[tachyonNumber] = false
            const previousColumnValue = timelineMap[tachyonNumber]
            timelineMap[tachyonNumber] = 0
            tachyonCells[tachyonNumber - 1] = true;
            if (!timelineMap[tachyonNumber - 1]) {
                timelineMap[tachyonNumber - 1] = 0
            }
            timelineMap[tachyonNumber - 1] +=  previousColumnValue;
            tachyonCells[tachyonNumber + 1] = true
            if (!timelineMap[tachyonNumber + 1]) {
                timelineMap[tachyonNumber + 1] = 0
            }
            timelineMap[tachyonNumber + 1] += previousColumnValue;
        }
    })
})

let sum = 0

Object.keys(timelineMap).forEach((columnIndex) => {
    sum += timelineMap[parseInt(columnIndex)]
})

console.log(sum)
