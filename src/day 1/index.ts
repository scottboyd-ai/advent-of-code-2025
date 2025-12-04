import {input} from "./input";

// const test0 = [
//     'L68',
//     'L30',
//     'R48',
//     'L5',
//     'R60',
//     'L55',
//     'L1',
//     'L99',
//     'R14',
//     'L82',
// ]
//
// const test1 = ['L50', 'R50']
// const test2 = ['L50', 'L50']
// const test3 = ['R50', 'L50']
// const test4 = ['R50', 'R50']
//
// const test5 = ['L150', 'L50']
// const test6 = ['L150', 'R50']
// const test7 = ['R150', 'L50']
// const test8 = ['R150', 'R50']
//
// const test9 = ['R1000']
// const test10 = ['L249']
// const test11 = ['L250']
// const test12 = ['L251']
// const test13 = ['R50', 'L200']
//
// const test14 = [
//     'L89',
//     'L16',
//     'L39',
//     'R31',
//     'R8',
//     'L682',
//     'R359',
//     'R138',
//     'R63',
// ]
//
// const test15 = ['L49', 'R101']
// const test16 = ['R75', 'L20']
// const test17 = ['L50', 'R50']
// const test18 = ['L50', 'L50']
// const test19 = ['R50', 'R50']
// const test20 = ['R50', 'L50']
// const test21 = ['L200']
// const test22 = ['R200']
// const test23 = ['L150', 'L50']
// const test24 = ['L150', 'R50']
// const test25 = ['R150', 'L50']
// const test26 = ['R150', 'R50']


// const tests = [test0]
// const tests = [test1, test2, test3, test4]
// const tests = [test5, test6, test7, test8]
// const tests = [test9, test10, test11, test12, test13]
// const tests = [
//     test15,
//     // test16,
//     // test17,
//     // test18,
//     // test19,
//     // test20,
//     // test21,
//     // test22,
//     // test23,
//     // test24,
//     // test25,
//     // test26
// ]


const test1 = ['R1'];
const test2 = ['L1'];
const test3 = ['R50'];
const test4 = ['L50'];

const test5 = ['R49'];        // no hit, ends on 99
const test6 = ['R50'];        // lands exactly on 0 once
const test7 = ['R51'];        // passes 0 once
const test8 = ['R149'];       // hits 0 once + full rotation once → 2
const test9 = ['R150'];       // hits 0 and immediately again after 100 → 2
const test10 = ['R249'];      // (249 - (100 - 50)) = (249 - 50) = 199 → 1 + floor(199/100)= 1+1 = 2

const test11 = ['L50'];       // lands on 0 exactly
const test12 = ['L51'];       // passes 0 once
const test13 = ['L149'];      // hits 0 once + 1 full cycle
const test14 = ['L150'];      // 2 hits
const test15 = ['L249'];      // 2 hits (same logic as R249 mirrored)

const test16 = ['R100'];      // only hits 0 once, NOT two
const test17 = ['L100'];      // same
const test18 = ['R101'];      // hits exactly once (tests off-by-one)
const test19 = ['L101'];      // same

const test20 = ['R200'];      // hits twice (k0=50 → hits at 50 and 150)
const test21 = ['L200'];      // same

// Start-on-zero cases
// These reveal implementations that incorrectly count the starting position.
const test22 = ['R50','R50']; // 50→100→0, then 0→50
const test23 = ['L50','L50']; // 50→0, then 0→50
const test24 = ['R100','R100']; // should hit exactly once per 100
const test25 = ['L100','L100']; // same

// Large stress tests
const test26 = ['R1000'];   // hits 10 times (1000/100)
const test27 = ['L1000'];   // hits 10 times
const test28 = ['R1050'];   // hits 11 (first at k0=50 → then every 100)
const test29 = ['L1050'];   // hits 11

// Multi-step direction changes (detects accumulation bugs)
const test30 = ['R30', 'L60', 'R70'];   // several crossings
const test31 = ['L80', 'R160', 'L40'];  // zig-zag with multiple wraparounds
const test32 = ['R250', 'R250'];        // both rotations test repeated cycles
const test33 = ['L250', 'L250'];        // same in negative direction

// Edge-case tiny moves
const test34 = ['R0'];               // 0 moves → 0 hits
const test35 = ['L0'];               // 0 moves
const test36 = ['R99'];              // from 50 → 149 → 49 (no hit)
const test37 = ['L99'];              // from 50 → -49 → 51 (no hit)

// Compound mixed-sign moves
const test38 = ['R75', 'L175'];      // hits once then hits again
const test39 = ['L75', 'R175'];      // mirror
const test40 = ['R125', 'R125'];     // each gives 1 hit (k0=50 then k0=25 after move)


// const tests = [
//     test1,  test2,  test3,  test4,
//     test5,  test6,  test7,  test8,  test9,  test10,
//     test11, test12, test13, test14, test15,
//     test16, test17, test18, test19,
//     test20, test21,
//     test22, test23, test24, test25,
//     test26, test27, test28, test29,
//     test30, test31, test32, test33,
//     test34, test35, test36, test37,
//     test38, test39, test40
// ];

const expectted = [
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    2,
    2,
    1,
    1,
    1,
    2,
    2,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    1,
    2,
    2,
    10,
    10,
    11,
    11,
    0,
    4,
    5,
    5,
    0,
    0,
    1,
    1,
    3,
    3,
    3,
]

// const tests = [test32]



const tests = [input]

let testNum = 1

for (const test of tests) {
    let zeroCount = 0
    let dialPos = 50;

    for (const instruction of test) {
        const direction = instruction.charAt(0);
        const directionNum = direction === 'L' ? -1 : 1
        const amount = parseInt(instruction.slice(1, instruction.length));
        const oldPos = dialPos

        const wasZero = dialPos === 0;

        if (directionNum === -1) {
            dialPos -= amount
        } else if (directionNum === 1) {
            dialPos += amount
        }

        // Need to know how many times we hit 0
        // If rotation would go past 0 (|dialPos - amount| > 100 || < 0)
        // Create new temp dialPos and adjust the amount to be equal to the diff
        // Convert to degrees and calc remaining rotations

        if ((dialPos > 100 || dialPos < 0)) {
            if (!wasZero) {
                // We have made it to 0
                zeroCount++;
            }

            // Need to set it to 0 in the direction it's going
            let tempRemaining = 0
            if (directionNum === -1) {
                tempRemaining = Math.abs(oldPos - amount);
            } else if (!wasZero) {
                tempRemaining = Math.abs((100 - oldPos) - amount);
            } else {
                tempRemaining = amount
            }

            // How many rotations in tempRemaining
            const tempRemainingRotations = tempRemaining / 100

            zeroCount += Math.floor(tempRemainingRotations)
        } else if ((dialPos === 0 || dialPos === 100) && amount !== 0) {
            zeroCount++
        }
        dialPos = dialPos - (100 * Math.floor(dialPos / 100));
    }

    console.log(`${testNum} ${zeroCount}`)
    console.assert(zeroCount === expectted[testNum - 1])
    testNum++
}

