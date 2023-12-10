
class Helpers {
    
    isObjectEmpty = (objectName) => {
        return Object.keys(objectName).length === 0
    }


}

const HelpersLib = new Helpers();

module.exports = HelpersLib;


