const Constants = require("../constants");


const notFound = (req,res) => {

    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    res.status(Constants.NOT_FOUND_ERROR).json({title:"Request Not Found", url: url, message:'Invalid Url! Page you entered might not exist or deleted. Page not found'});
    
    //throw new Error('Url you entered might not exist or deleted');
    
}

module.exports = notFound;