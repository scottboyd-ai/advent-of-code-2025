// const input = '3-5\n' +
//     '10-14\n' +
//     '16-20\n' +
//     '12-18\n' +
//     '\n' +
//     '1\n' +
//     '5\n' +
//     '8\n' +
//     '11\n' +
//     '17\n' +
//     '32'

import {input} from "./input";

const puzzleParts = input.split('\n\n')

const freshIngredientsList = puzzleParts[0].split('\n')
const ingredientsToCheck = puzzleParts[1].split('\n')

const freshMap: {high: number, low: number}[]  = []

freshIngredientsList.forEach(ingredient => {
    const range = ingredient.split('-')
    const low = parseInt(range[0])
    const high = parseInt(range[1])

    freshMap.push({high, low})
})

let freshCount = 0

ingredientsToCheck.forEach(ingredient => {
    const ingredientId = parseInt(ingredient)
    const isFresh = !!freshMap.find((ingredientRange) => {
        return ingredientId >= ingredientRange.low && ingredientId <= ingredientRange.high
    })
    if (isFresh) {
        freshCount++
    }
})

console.log(freshCount)
