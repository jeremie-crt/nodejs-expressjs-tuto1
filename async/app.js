console.log("START");

async function viewArticles() {
    let member = await getMember()
    let articles = await getArticles(member)
    console.log(articles);
}
viewArticles()

(async () => {
    try {
        let member = await getMember()
        let articles = await getArticles(member)
        console.log(articles);
    } catch (err) {
        console.log(err.message);
    }
})()


function getMember() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
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

console.log('ENDS!');
