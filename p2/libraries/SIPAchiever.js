const { header } = require("express-validator");
const asyncHandler = require('express-async-handler');
const { end } = require("pdfkit");

class SIPAchiever {

    constructor() {
        this.currentDate = new Date();
        //this.callBackYears = 10; //20 //Will update this in request data
        //Get Last 10 Years (Because 20 Years is much higher at beginning)


    }

    getUpcommingAchievements = asyncHandler(async (req, res) => {
        let callBackYears = req.body.callBackYear; //To Get data of last how many years
        let monthlyInvestment = req.body.amount;
        let interestRate = req.body.roi; //in percent
        let years = req.body.tenure;
        let stepupamount = req.body.stepup_amount;
        let stepup_in_month = req.body.stepup_in_month;
        let stepuppercent = req.body.stepup_percent;
        let startdate = req.body.start_date;
        let currentWealth = req.body.currentWealth;
        let data = [];
        

        let monthlyInvestmentArr = [500,1000, 2000,5000,10000,15000];
        let stepuppercentArr = [0, 5, 10, 15, 20];

        for(let i = 0; i < monthlyInvestmentArr.length; i++) {
            //For Loop for CallBackYears
            
            for(let j = 0; j < callBackYears; j++) {
                let newStartDate = new Date(startdate);    
                newStartDate.setFullYear(newStartDate.getFullYear() - j);

                //For Loop for Step Up Api Data
                for(let k = 0; k < stepuppercentArr.length; k++) {
                    monthlyInvestment = monthlyInvestmentArr[i];
                    stepuppercent = stepuppercentArr[k];
                    //data.push([monthlyInvestmentArr[i], newStartDate.toDateString(), stepuppercentArr[k]]);        
                    let response = this.calculateSIP(currentWealth, newStartDate, monthlyInvestment, interestRate, years, stepupamount, stepup_in_month, stepuppercent);
                    data.push(response);
                }
            }           
            
        }

        return data;
    });

    calculateSIP = (currentWealth, startdate, monthlyInvestment, interestRate, years, stepupamount = 0, stepup_in_month  = 12, stepuppercent = 0 ) => {
        let firstDate = new Date(startdate);
        startdate = new Date(startdate);
        startdate.setMonth(startdate.getMonth());
        

        let totalMonths = years * 12;
        let monthlyRate = interestRate / 12 / 100;

        let finalInvestedAmount = 0;
        let totalAmount = 0;
        let totalInterest = 0;
        let data = [];
        
        for (let i = 1; i <= totalMonths; i++) {
            //Step Up
            if (i % stepup_in_month === 0) {
                //console.log('amount updated');
                if (stepuppercent) {
                    monthlyInvestment = monthlyInvestment + (Math.round((monthlyInvestment * stepuppercent) / 100));
                } else {
                    monthlyInvestment = monthlyInvestment + stepupamount;
                }
            }

            //Normal
            finalInvestedAmount += monthlyInvestment;
            totalAmount += monthlyInvestment;
            let interest = totalAmount * monthlyRate;
            totalInterest = totalInterest + interest;
            totalAmount += interest;
            //console.log(`Month ${i}: Total amount = ${totalAmount.toFixed(2)}`);
            startdate.setMonth(startdate.getMonth() + 1);
            
            if(totalAmount >= currentWealth && (i%12 == 0)) {
                let diffBalance = (totalAmount - currentWealth+1).toFixed(0);
                let yearAchieved = i/12;
                let message = "Add "+ diffBalance + " amount to achieve " + yearAchieved + " years target Investement started on " + firstDate.toDateString();
                if(stepuppercent > 0) {
                    message = message + " with stepup percentage of "+ stepuppercent;
                }
                return {
                    'month': i,
                    'start_on' : firstDate.toDateString(),
                    'current_date': startdate.toDateString(),
                    'monthly_investment': monthlyInvestment,
                    'invested': finalInvestedAmount,
                    'total': totalAmount.toFixed(2),
                    'roi': interestRate,
                    'interest': interest.toFixed(2),
                    'total_interest': totalInterest.toFixed(2),
                    'stepup_percentage': stepuppercent,
                    'message' : message
                };
            }
            
        }

        return data;
    };
}

module.exports = new SIPAchiever();