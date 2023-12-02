const notFound = (req,res) => {
    res.status(404).send('Url you entered might not exist or deleted');
}

module.exports = notFound;