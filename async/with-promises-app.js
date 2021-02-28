console.log("START");

/*getMember()
    .then((member) => {
        console.log(member);
        return getArticles(member)
    })
    .then((articles) => {
        console.log(articles);
    })*/

getMember()
    .then(member => getArticles(member))
    .then(articles => console.log(articles))
    .catch(err => console.log(err.message))


console.log('ENDS!');

function getMember() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(member);
            resolve('Member 1')
            //reject(new Error('Error during process...'))
        }, 1500)
    })
}

function getArticles(member, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`This member is inside : ${member}`);
            resolve(['FirstOne', 'SecondOne', 'ThirdOne'])
            //reject(new Error('Error during process...'))
        }, 1500)
    })
}


//Promises
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('All good !')
        //reject(new Error('Error during process...'))
    }, 1500)
})
.then(message => console.log(message))
.catch(err => console.log(err.message))