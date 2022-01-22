
// for ->
// while -> 
// do while ->
// foreach ->

const arr = [...Array(1000000).keys()];

console.time("for")
for (let i = 0; i < arr.length; i++) {
}
console.timeEnd("for")


console.time("while")
let j = 0;
while (j < arr.length) {
    j++
}
console.timeEnd("while")

console.time("doWhile")
let k = 0;
do {
    k++;
} while (k < arr.length);
console.timeEnd("doWhile")

console.time("forEach")
arr.forEach((element) => {
});
console.timeEnd("forEach")

const users = [
    { name: "Alia", age: 17, gender: "female"},
    { name: "Yagnesh", age: 30, gender: "Male"},
    { name: "Rohit", age: 32, gender: "Male"},
    { name: "Virat", age: 28, gender: "Male"},
    { name: "deepika", age: 24, gender: "Female"},
    { name: "Priyanka", age: 38, gender: "Female"},
]


// O(logN)
// if record found then return index
// else return -1
const index = users.findIndex((user) => user.name === "shikhar");
console.log(index);


// O(logN)
// if record found then return data
// else return undefined
const virat = users.find((user) => user.name === "V");
console.log(virat);

// O(N)
// if record found then return array of data
// else return []
const maleRecords = users.filter((user, index) => {
    console.log(index);
    return user.gender === "Other"
});

console.log(maleRecords);

// O(logN)
// if record exist then return true
// else return false
const isChildExist = users.some(user => user.age < 18);
console.log(isChildExist);


// O(logN)
// if record all records match condition then return true;
// else return false;
const isEveryAdult = users.every(user => user.age > 18);
console.log(isEveryAdult);

// find name whoes fist letter start with V






// Immutable methods


// findIndex
// find
// filter
// some
// every

// map
// reduce
