const Illuminate = require('./../core/Illuminate');
const Constants = require('./../constants');
const Helpers = require('../core/Helpers');

class Module {

    constructor() {
        this.Illuminate = Illuminate;
        this.Constants = Constants;
        this.Helpers = Helpers;
    }

    error_response = (errorVal, errorCode = 500) =>  {
        let res = {
            status : errorCode,
            data : {message : errorVal}
        };
        return this.return_response(res);
    }

    success_response = (val) => {
        let res = {
            status : 200,
            data : {data : val}
        };
        return this.return_response(res);
    }

    return_response = (res) => {
        //console.log(res);
        return res;
    }

    currentDateTime() {
        let currentTimestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return currentTimestamp;
    }

    currentDateTime1() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
}

//ModuleObj = new Module();
module.exports = Module;