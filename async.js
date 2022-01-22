// javascript is single threaded sync language

// V8 engine(developed by google) for code execution 

// 1. callback

// 2. promise

// 3. generators


// async
setTimeout(() => {
    console.log("a1");
}, 50)

console.log("s1");

setTimeout(() => {
    console.log("a2");
}, 30)
console.log("s2");
console.log("s3");
setTimeout(() => {
    console.log("a3");
}, 80)


