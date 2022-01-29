import greetings, { b, c } from './app'
import xyz from './test'

const a = 1;

console.log("a from index.js", a);

function sum(a, b) {
    return  a + b;
}

console.log(xyz(5,4));

console.log("sum from index.js", sum(b, c));

console.log(greetings("Yagnesh"));

class Animal {
    constructor(type) {
        this.type = type;
    }

    printType() {
        console.log(this.type);
    }
}

const dog = new Animal("dog");

console.log(dog.printType());