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

class GraphNode {
    value: number = -1
    leftNode: GraphNode | null = null
    rightNode: GraphNode | null = null
}

const rootNode = new GraphNode()
rootNode.value = startCell

map.forEach((row, rowIndex) => {
    if (rowIndex === 0) {
        return
    }

    // Create a tree that will handle all tachyons hitting splitters
    // If a tachyon hits a splitter, add the tachyon's left and right position as children to the tree
    // At leaf nodes, if node's value === splitterIndex, add splitterIndex +/- 1 as children

    row.forEach((cell, cellIndex) => {
        if (cell === '^') {
            // Traverse tree (depth first)
            // If leaf node, check if value === cellIndex
            // If so, add +/- 1 values as children to node

            const stack: GraphNode[] = [rootNode]

            while (stack.length > 0) {
                const currentNode = stack.pop()!

                if (currentNode.leftNode === null && currentNode.value === cellIndex) {
                    // Insert new nodes and move to the next one
                    currentNode.leftNode = new GraphNode()
                    currentNode.leftNode.value = cellIndex - 1
                    currentNode.rightNode = new GraphNode()
                    currentNode.rightNode.value = cellIndex + 1
                }
                else if (currentNode.leftNode !== null && currentNode.rightNode !== null) {
                    stack.push(currentNode.leftNode)
                    stack.push(currentNode.rightNode)
                }
            }
        }
    })
})

const stack: GraphNode[] = [rootNode]
let leafCount = 0

while (stack.length > 0) {
    const currentNode = stack.pop()!

    if (currentNode.leftNode === null) {
       leafCount++
    }
    else if (currentNode.rightNode !== null) {
        stack.push(currentNode.leftNode)
        stack.push(currentNode.rightNode)
    }
}

console.log(leafCount)

