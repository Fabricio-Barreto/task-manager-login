require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('61b9bb3ea715cd2ad8a4dd52', { age: 22}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 22})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount('61b9bb3ea715cd2ad8a4dd52', 35).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

// /programacao/mongodb/bin/mongod.exe --dbpath=/programacao/mongodb-data *//