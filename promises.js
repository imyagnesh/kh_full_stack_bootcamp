
// 1. pending

// 2. resolve

// 3. reject



const login = () =>  {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("token")
        }, 3000)
    })
}

const user = (token) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!token) {
                reject("token is not available")
            }
            resolve("user info")

        }, 3000)
        
    })
}

const loadData = async () => {
    try {
        const loginRes = await login();
        const userInfo = await user();
        console.log(loginRes);
        console.log(userInfo);
    } catch (error) {
        console.log(error);
    }
}

loadData();

//  old javascript
// login()
// .then((token) => {
//     console.log(token);
//     user(token)
//     .then((value) => {
//         console.log(value);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })
// .catch(() => {

// })


