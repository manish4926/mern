const bcrypt = require('bcrypt');

/**
 * Desc: Core Library Functions
 */
class Illuminate {

    
    generatePassword = async (password) => {
        let hashedPassword = await bcrypt.hash(password, 10);
    }

    comparePassword = async(dbpassword1, password2) => {
        return await bcrypt.compare(password1, password2);
    }
}

module.exports = new Illuminate();