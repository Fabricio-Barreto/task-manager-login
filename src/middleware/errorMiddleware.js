const errorMiddleware = (req, res, next) => {
    throw new Error('From my middleware')
}


module.exports = errorMiddleware;