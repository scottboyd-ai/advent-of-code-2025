// const input = '..@@.@@@@.\n' +
//     '@@@.@.@.@@\n' +
//     '@@@@@.@.@@\n' +
//     '@.@@@@..@.\n' +
//     '@@.@@@@.@@\n' +
//     '.@@@@@@@.@\n' +
//     '.@.@.@.@@@\n' +
//     '@.@@@.@@@@\n' +
//     '.@@@@@@@@.\n' +
//     '@.@.@@@.@.'

import {input} from "./input";

const rows = input.split('\n')
let outerRollsArray: boolean[][] = []

let maxColumn = 0
rows.forEach((row, rowIndex) => {
    outerRollsArray[rowIndex] = []
    const cells = row.split('')
    maxColumn = cells.length - 1
    cells.forEach((cell, cellIndex) => {
        outerRollsArray[rowIndex].push((cell === '@'))
    })

})


const maxRow = outerRollsArray.length - 1

let removedRolls = 0

let stillLooping = true
let rollRemoved = false

const loop = (localRollArray: boolean[][]): [boolean[][], number] => {
    let loopRemovedCount = 0
    const removeArray: boolean[][] = []

    localRollArray.forEach((rollArrayRow, rollArrayRowIndex) => {
        removeArray[rollArrayRowIndex] = []
        rollArrayRow.forEach((rollArrayCell, rollArrayCellIndex) => {
            let rollCount = 0

            if (!rollArrayCell) {
                removeArray[rollArrayRowIndex].push(false)
                return
            }

            // Top left
            if (
                rollArrayRowIndex > 0 &&
                rollArrayCellIndex > 0 &&
                localRollArray[rollArrayRowIndex - 1][rollArrayCellIndex - 1]
            ) {
                rollCount++;
            }

            // Top center
            if (
                rollArrayRowIndex > 0 &&
                localRollArray[rollArrayRowIndex - 1][rollArrayCellIndex]
            ) {
                rollCount++;
            }

            // Top right
            if (
                rollArrayRowIndex > 0 &&
                rollArrayCellIndex < maxColumn &&
                localRollArray[rollArrayRowIndex - 1][rollArrayCellIndex + 1]
            ) {
                rollCount++;
            }

            // Left
            if (
                rollArrayCellIndex > 0 &&
                localRollArray[rollArrayRowIndex][rollArrayCellIndex - 1]
            ) {
                rollCount++;
            }

            // Right
            if (
                rollArrayCellIndex < maxColumn &&
                localRollArray[rollArrayRowIndex][rollArrayCellIndex + 1]
            ) {
                rollCount++;
            }

            // Bottom left
            if (
                rollArrayRowIndex < maxRow &&
                rollArrayCellIndex > 0 &&
                localRollArray[rollArrayRowIndex + 1][rollArrayCellIndex - 1]
            ) {
                rollCount++;
            }

            // Bottom center
            if (
                rollArrayRowIndex < maxRow &&
                localRollArray[rollArrayRowIndex + 1][rollArrayCellIndex]
            ) {
                rollCount++;
            }

            // Bottom right
            if (
                rollArrayRowIndex < maxRow &&
                rollArrayCellIndex < maxColumn &&
                localRollArray[rollArrayRowIndex + 1][rollArrayCellIndex + 1]
            ) {
                rollCount++;
            }

            if (rollCount < 4) {
                rollRemoved = true
                removeArray[rollArrayRowIndex].push(true)
            } else {
                removeArray[rollArrayRowIndex].push(false)
            }
        })
    })

    removeArray.forEach((removeArrayRow, removeArrayRowIndex) => {
        removeArrayRow.forEach((removeArrayCell, removeArrayCellIndex) => {
            if (removeArrayCell) {
                localRollArray[removeArrayRowIndex][removeArrayCellIndex] = false
                loopRemovedCount++
            }
        })
    })

    if (!rollRemoved) {
        stillLooping = false
    }

    return [localRollArray, loopRemovedCount]
}


let outerLoopRemovedCount = 1
while (stillLooping && outerLoopRemovedCount > 0) {
    const [rollsArray, loopRemovedCount] = loop(outerRollsArray)
    outerRollsArray = rollsArray
    outerLoopRemovedCount = loopRemovedCount
    removedRolls += loopRemovedCount
}


console.log(removedRolls);
