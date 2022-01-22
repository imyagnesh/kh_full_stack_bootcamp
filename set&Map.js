
// premitive types of data
const arr = [5, 5,3,6,4,7, 6,8,1];

const a = { a: 1 };
const b = { a: 1 };

const map = new Map();

map.set("Alia", { name: "Alia", age: 17, gender: "Female"});
map.set("Yagnesh", { name: "Yagnesh", age: 30, gender: "Male"});


console.log(map.get("Yagnesh"));

console.log(map.has("Yagnesh"));

map.delete("Yagnesh");

console.log(map.has("Yagnesh"));



// O(logN)

// let result = false;
// for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
//     if(element === 4) {
//         result = true;
//         break;
//     }
// }
// console.log(result);

// it removes all duplicate record
// only works with premitive type of data
// string, number, boolean, bigInt, symbol
// const set = new Set(arr);
// console.log(set);

// // O(1)
// console.log(set.has(4));
// set.delete(4);

// set.add(1)

// // length of unique records
// console.log(set.size);

// console.log(set);
