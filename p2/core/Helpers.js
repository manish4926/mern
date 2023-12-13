
class Helpers {
    
    isObjectEmpty = (objectName) => {
        return Object.keys(objectName).length === 0
    }

    getIpAddress = () => {
        return request.socket.remoteAddress
    }


//     const dateObj = new Date();
// const formattedDate = dateObj.toISOString().split('T')[0]; 
}

const HelpersLib = new Helpers();

module.exports = HelpersLib;


