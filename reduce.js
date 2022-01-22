// reduce

// const arr = [1,2,3,4,5,6,7]

// // let result = 0;
// // for (let i = 0; i < arr.length; i++) {
// //     result = arr[i] + result;
// // }
// // console.log(result);

// const sum = arr.reduce((previous, current) => previous + current, 0);

// console.log(sum);

const users = [
    { name: "Alia", age: 17, gender: "Female"},
    { name: "Yagnesh", age: 30, gender: "Male"},
    { name: "Rohit", age: 32, gender: "Male"},
    { name: "Virat", age: 28, gender: "Male"},
    { name: "deepika", age: 24, gender: "Female"},
    { name: "Priyanka", age: 38, gender: "Female"},
]

// {
//     "10-19": [],
//     "20-29": [],
//     "30-39": []
// }

const age = Math.floor(17 / 10);
const key = `${age}0-${age}9`

const groupByAge = users.reduce((previous, current) => {
    const age = Math.floor(current.age / 10);
    const key = `${age}0-${age}9`
    if(previous[key] === undefined) {
        previous[key] = [];
    }
    previous[key].push(current)
    return previous;
}, {});

console.log(groupByAge);



const groupByGender = users.reduce((previous, current) => {
    const key = current.gender;
    console.log(previous[key]);
    if(previous[key] === undefined) {
        previous[key] = [];
    }
    previous[key].push(current)
    return previous;
}, {});

console.log(groupByGender);

// const obj = {
//     a: 1,
//     b: 2
// }

// const key = "d";

// console.log(obj[key]);

// obj[key] = 3;

// console.log(obj[key]);



// {
//     male: [],
//     female: []
// }

// const findIndex = users.reduce((p, c, index) => {
//     console.log(p);
//     console.log(c.name);
//     if(c.name === "Virat") {
//         return index;
//     }
//     return p;
// }, -1)

// const find = users.reduce((p, c) => {
//     console.log(p);
//     console.log(c.name);
//     if(c.name === "Virat") {
//         return c;
//     }
//     return p;
// }, undefined)

// const filter = users.reduce((p, c) => {
//     console.log(p);
//     console.log(c.name);
//     if(c.gender === "Male") {
//         return [...p, c]
//     }
//     return p;
// }, [])


// console.log(filter);

// findIndex
// find
// filter
// some
// every
// map

