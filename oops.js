// oops

// -> encapsulation -> bind all related infomation together
// -> Abstraction -> hide sensitive infomation
// -> inheritance -> passing information to child class
// -> polymorphsm -> 

// const user1 = {
//     firstName: "Yagnesh",
//     lastName:  "Modh",
//     age: 30,
//     fullName: function() {
//         return `${this.firstName} ${this.lastName}`
//     },
//     isAdult: function() {
//         return this.age > 18
//     }
// }

// const user2 = {
//     firstName: "Virat",
//     lastName:  "Kohli",
//     age: 26,
//     fullName: function() {
//         return `${this.firstName} ${this.lastName}`
//     },
//     isAdult: function() {
//         return this.age > 18
//     }
// }

const isPermanent = true;



class Employee {
    // special method
    // calls only once
    // pass information out side of the class
    isPermanent = true;

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    set firstName(value) {
        console.log(value);
        this._firstName = Employee.capitalize(value);
    }

    get firstName() {
        return this._firstName;
    }

    set lastName(value) {
        console.log(value);
        this._lastName = Employee.capitalize(value);
    }

    get lastName() {
        return this._lastName;
    }

    static capitalize(str) {
        return `${str[0].toUpperCase()}${str.slice(1)}`
    }

    // method
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    #isAdult() {
        return this.age > 18
    }

    isUserPermanent() {
        if(this.#isAdult()) {
            return this.isPermanent;
        }
        return false;
    }

    changeName(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class CEO extends Employee {
    constructor () {
        super("yagnesh", "modh", 17)
    }

    hireEmployee(name) {
        return `${name} is hired...`
    }

    isUserPermanent() {
        console.log(super.isUserPermanent());
        return true;
    }

}

const ceo = new CEO();
console.log(ceo.firstName);
console.log(ceo.lastName);
console.log(ceo.fullName());
console.log(ceo.hireEmployee("rohit"));

console.log(ceo.isUserPermanent());

const name = "yagnesh";

console.log(Employee.capitalize(name));

const user1 = new Employee("yagnesh", "modh", 30);
const user2 = new Employee("virat", "kohli", 30);
const user3 = new Employee("Alia", "Bhatt", 17);
console.log(user1.age);

console.log(user1.changeName("yag", "modi"));

console.log(user1.isUserPermanent());
console.log(user1.fullName());
// console.log(user1.isAdult());
console.log(user1.firstName);
console.log(user2.fullName());
// console.log(user1.isAdult());
// console.log(user3.isAdult());
console.log(user3.isUserPermanent())
console.log(user3.fullName())




