console.log("START");

getMember((member) => {
    console.log(member);
    getArticles(member, (articles) => {
        console.log(articles);
    })
})

console.log('ENDS!');

function getMember(callback) {
    setTimeout(() => {
        callback('Member 1')
    }, 1500)
}

function getArticles(member, callback) {
    setTimeout(() => {
        console.log(`This member is inside : ${member}`);
        callback(['FirstOne', 'SecondOne', 'ThirdOne'])
    }, 1500)
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