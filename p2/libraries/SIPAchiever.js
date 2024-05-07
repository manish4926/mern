const { header } = require("express-validator");

class SIPAchiever {

    constructor(startDate) {
        this.startDate = startDate;
        this.currentDate = new Date();

    }

    getUpcommingAchievements = async () => {
        return [];
    }
}

module.exports = new SIPAchiever();