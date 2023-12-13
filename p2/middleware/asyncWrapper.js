const asyncWrapper = (fn) => {
    //Note: Handle try catch block. currently using external library
    return async (req,res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = asyncWrapper;