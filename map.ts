const users = [
    { name: "Alia", age: 17, gender: "Female"},
    { name: "Yagnesh", age: 30, gender: "Male"},
    { name: "Rohit", age: 32, gender: "Male"},
    { name: "Virat", age: 28, gender: "Male"},
    { name: "deepika", age: 24, gender: "Female"},
    { name: "Priyanka", age: 38, gender: "Female"},
]

const updatedUsers = users.map(user => {
    console.log(user);
    
    if(user.gender === "Male") {
        return {...user, profession: "cricketer" }
    }
    if(user.gender === "Female") {
        return {...user, profession: "actor" }
    }
    return user;
})

console.log(updatedUsers);

// reduce




// map method is used for manipulate record
// cant add or remove any records

