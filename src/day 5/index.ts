import {input} from "./input";

const puzzleParts = input.split('\n\n')

const freshIngredientsList = puzzleParts[0].split('\n')

const ranges: number[][] = []

const mergeRanges = (localRanges: number[][], low: number, high: number, outerIndex: number = -1, addNew = true) => {
    let addNewRange = false
    let deleteCurrent = false
    for (let i = 0; i < localRanges.length; i++){
        let range = localRanges[i];
        if (low === range[0] && high === range[1]) {
            addNewRange = false
            if (outerIndex !== -1 && outerIndex !== i) {
                deleteCurrent = true
            }
            break;
        }
        // Ingredients fall between existing range
        if (low >= range[0] && high <= range[1]) {
            // Early exit
            addNewRange = false
            deleteCurrent = true
            break
        }
        if (low <= range[0] && high >= range[1]) {
            range[0] = low
            range[1] = high
            addNewRange = false
            deleteCurrent = true
        }
        if (low === range[0] - 1) {
            range[0] = low;
            addNewRange = false;
            deleteCurrent = true;
        }
        if (high === range[1] + 1) {
            range[1] = high
            addNewRange = false
            deleteCurrent = true
        }
        if (low === range[1] + 1 && low > range[0]) {
            range[1] = low
            addNewRange = false
            deleteCurrent = true
        }
        if (high === range[0] - 1 && high > range[1]) {
            range[1] = high
            addNewRange = false
            deleteCurrent = true
        }
        if (low >= range[0] && low <= range[1] && high > range[1]) {
            // Increase range of current range
            range[1] = high;
            addNewRange = false;
            deleteCurrent = true;
            break;
        } else if (low < range[0] && high <= range[1] && high >= range[0]) {
            // Decrease range of current range
            range[0] = low;
            addNewRange = false;
            deleteCurrent = true;
            break;
        } else if (addNew && ((low < range[0] && high < range[0]) || low > range[1] && high > range[1])) {
            // New range is outside current range
            addNewRange = true;
        }
    }

    return {addNewRange, deleteCurrent}
}

freshIngredientsList.forEach(ingredient => {
    const ingredientRange = ingredient.split('-')
    let low = parseInt(ingredientRange[0])
    let high = parseInt(ingredientRange[1])
    if (low > high) {
        low = parseInt(ingredientRange[1])
        high = parseInt(ingredientRange[0])
    }


    if (!ranges.length){
        ranges.push([low, high]);
        return;
    }

    const {addNewRange} = mergeRanges(ranges, low, high);

    if (addNewRange) {
        ranges.push([low, high])
    }

})

let rangeCopy = [...ranges]
let stillDeleting = true

while (stillDeleting) {
    const indicesToDelete: number[] = []
    rangeCopy.forEach(([rangeLow, rangeHigh], index) => {
        const {deleteCurrent} = mergeRanges(rangeCopy, rangeLow, rangeHigh, index, false)
        if (deleteCurrent) {
            indicesToDelete.push(index)
        }
    })

    if (indicesToDelete.length === 0) {
        stillDeleting = false
    }

    for (let i = indicesToDelete.length - 1; i >= 0; i--) {
        rangeCopy.splice(indicesToDelete[i], 1)
    }
}

let rangeCount = 0
rangeCopy.forEach((range) => {
    rangeCount += range[1] - (range[0] - 1)
})

console.log(rangeCount)
