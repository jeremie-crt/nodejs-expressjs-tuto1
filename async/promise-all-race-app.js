console.log("START");

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 1')
        //reject(new Error('Error during process...'))
    }, 1500) })

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise 2')
        //reject(new Error('Error during process...'))
    }, 3500) })


/*Promise.all([p1, p2])
    .then(result => console.log(result))
*/

Promise.race([p1, p2])
    .then(result => console.log(result))

console.log('ENDS!');
