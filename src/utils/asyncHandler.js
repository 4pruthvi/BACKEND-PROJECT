//below is the second approach to implement asyncHandler function. It is a higher order function that takes a request handler function as an argument and returns a new function that wraps the request handler function in a promise. If the request handler function throws an error, the error is passed to the next middleware function in the chain.

const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch(error => next(error))
    }
}

export {asyncHandler}

// const asyncHandler = () => {}
// const asyncHandler = (func) => () =>{}
// const asyncHandler = (func) => async () => {}

//uses try catch block to handle errors in async functions. It is a higher order function that takes a request handler function as an argument and returns a new function that wraps the request handler function in a try-catch block. If the request handler function throws an error, the error is passed to the next middleware function in the chain.
// below is the first approach to implement asyncHandler function. It is a higher order function that takes a request handler function as an argument and returns a new function that wraps the request handler function in a try-catch block. If the request handler function throws an error, the error is passed to the next middleware function in the chain.
/*
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/