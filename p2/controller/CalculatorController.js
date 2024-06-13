const express = require('express');
const asyncHandler = require('express-async-handler');
const Controller = require('./Controller');
const CalculatorUtility = require('./../libraries/CalculatorUtility');
const SIPAchiever = require('./../libraries/SIPAchiever');
// SIP Calculator

class Calculator extends Controller {
    constructor() {
        super();
    }

    calculateSIP = asyncHandler(async(req, res) => {

        let monthlyInvestment = req.body.amount;
        let interestRate = req.body.roi; //in percent
        let years = req.body.tenure;

        let totalMonths = years * 12;
        let monthlyRate = interestRate / 12 / 100;

        let finalInvestedAmount = 0;
        let totalAmount = 0;
        let data = [];
        for(let i = 1; i <= totalMonths; i++) {
            finalInvestedAmount += monthlyInvestment;
            totalAmount += monthlyInvestment;
            let interest = totalAmount * monthlyRate;
            totalAmount += interest;
            //console.log(`Month ${i}: Total amount = ${totalAmount.toFixed(2)}`);
            data.push({
                'month' : i,
                'invested' : finalInvestedAmount,
                'total' : totalAmount.toFixed(2),
                'roi' : interestRate,
                'interest' : interest
            });
        }
        return this.success_response(req, res, data);
    })

    calculateStepUpSIP = asyncHandler(async (req, res) => {
        let monthlyInvestment = req.body.amount;
        let interestRate = req.body.roi; //in percent
        let years = req.body.tenure;
        let stepupamount = req.body.stepup_amount;
        let stepup_in_month = req.body.stepup_in_month;
        let stepuppercent = req.body.stepup_percent;
        let startdate = req.body.start_date;
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
            data.push({
                'month': i,
                'current_date': startdate.toDateString(),
                'monthly_investment': monthlyInvestment,
                'invested': finalInvestedAmount,
                'total': totalAmount.toFixed(2),
                'roi': interestRate,
                'interest': interest,
                'total_interest': totalInterest,
            });
        }
        return this.success_response(req, res, data);

    });
    get calculateStepUpSIP() {
        return this._calculateStepUpSIP;
    }
    set calculateStepUpSIP(value) {
        this._calculateStepUpSIP = value;
    }

    repaymentCalculator = asyncHandler(async(req, res) => {
        let data = await CalculatorUtility.calculateEmi();
        return this.success_response(req, res, data);
    });

    sipAchiever = asyncHandler(async(req, res) => {
        
        let validator = {
            'roi'               : 'required|integer',
            'tenure'            : 'required|integer',
            'stepup_percent'    : 'required|integer',
            'stepup_in_month'   : 'required|integer',
            'start_date'        : 'required',
            'currentWealth'     : 'required|integer',
            'callBackYear'      : 'required|integer',
        }

        this.Validator.make(req, res, validator);
        if (this.Validator.fail()) {
            res.status(400);
            throw new Error(this.Validator.message);
		}
        let data = await SIPAchiever.getUpcommingAchievements(req, res);
        return this.success_response(req, res, data);
    });

    sipAchieverAchieved = asyncHandler(async(req, res) => {
        
        let validator = {
            'roi'               : 'required|integer',
            'tenure'            : 'required|integer',
            'stepup_percent'    : 'required|integer',
            'stepup_in_month'   : 'required|integer',
            'start_date'        : 'required',
            'currentWealth'     : 'required|integer',
            'callBackYear'      : 'required|integer',
        }

        this.Validator.make(req, res, validator);
        if (this.Validator.fail()) {
            res.status(400);
            throw new Error(this.Validator.message);
		}
        let data = await SIPAchiever.getPreviousAchievements(req, res);
        return this.success_response(req, res, data);
    });
}

module.exports = new Calculator();