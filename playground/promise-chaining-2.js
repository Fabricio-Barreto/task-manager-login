require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('61ba222d0a8fd823feec95d0').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })

    return count
}

deleteTaskAndCount('61b101dfb71be156338b28e7', false).then((count) =>{
    console.log(count)
}).catch((e) => {
    console.log(e)
})