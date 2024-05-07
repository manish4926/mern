const { header } = require("express-validator");

class CalculatorUtility {
  TotalLoanAmount = 1800000;
  StartDate = "2019-11-05";
  TotalDuration = 240;
  EmiInstallmentUpdatedDate = null;
  InstallmentAmount = null;
  LoanPercentage = 0;
  TotalInterestPaid = 0;
  SNO = 0;
  CurrentMonth = 0;
  CurrentEmiDate = null;
  CurrentInterest = 0;
  CurrentPrincipal = 0;
  CurrentPrincipalOS = 0;
  CurrentExcessAmount = 0;
  CurrentRecordType = null;

  RECORD_TYPE_INSTALLMENT = "INSTALLMENT";
  RECORD_TYPE_PREPAYMENT = "PREPAYMENT";

  Header = [
    {
      sno: "SNO.",
      month: "MONTH",
      date: "DATE",
      installment: "INSTALLMENT",
      principal: "PRINCIPAL",
      interest: "INTEREST",
      interest_perc: "INTEREST PERCENTAGE",
      excess_amount: "EXCESS AMOUNT",
      int_paid: "INT. PAID",
      pm_os: "Pm O/S",
      record_type: "RECORD_TYPE",
    },
  ];

  PrePayments = [
    {
      date: "",
      amount: "",
      deduction_type: "",
    },
  ];

  RoiArr = [
    {
      date: this.StartDate,
      rate: 11,
    },
    {
      date: "2020-01-01",
      rate: 6.5,
    },
  ];

  constructor() {
    this.PendingLoanAmount = this.TotalLoanAmount;
    this.CurrentPrincipalOS = this.TotalLoanAmount;
    this.LoanPercentage = this.calculateROI(new Date(this.StartDate));
    this.CurrentEmiDate = new Date(this.StartDate);
  }

  calculateInstallmentAmount = (principal, rate, durationInMonth) => {
    let roi = rate / 12 / 100;
    //[P x R x (1+R) ^N]/ [(1+R) ^N-1]
    let finalInstallment =
      [principal * roi * Math.pow(1 + roi, durationInMonth)] /
      [Math.pow(1 + roi, durationInMonth) - 1];
    return finalInstallment.toFixed();
  };

  getInstallmentAmount = () => {
    if (this.EmiInstallmentUpdatedDate === null) {
      return this.calculateInstallmentAmount(
        this.TotalLoanAmount,
        this.LoanPercentage,
        this.TotalDuration
      );
    }
    return this.InstallmentAmount;
  };

  getPrincipalAmount = (interest) => {
    let principalAmount = this.InstallmentAmount - interest;
    this.PendingLoanAmount = this.PendingLoanAmount - principalAmount;
    return principalAmount;
  };

  getInterestAmount = () => {
    let interestAmount = ((this.PendingLoanAmount * this.LoanPercentage) / 100 / 12).toFixed(); 
    this.TotalInterestPaid = parseInt(this.TotalInterestPaid) + parseInt(interestAmount);
    return interestAmount;
  };

  addMonthToEmi = (date) => {
    return new Date(date.setMonth(date.getMonth() + 1));
  };

  calculateROI = (date) => {
    if(this.RoiArr.length > 0) {
      let newDate = new Date(this.RoiArr[0].date);
      if (date >= newDate) {
        let newRate = this.RoiArr[0].rate;
        this.RoiArr.splice(0, 1);
        return newRate;
      }
    }  
    return this.LoanPercentage;
  };

  preCalculateExec = () => {
    this.SNO++;
    this.CurrentMonth++;
    this.LoanPercentage = this.calculateROI(new Date(this.CurrentEmiDate));
    this.InstallmentAmount = this.getInstallmentAmount();
    this.CurrentInterest = this.getInterestAmount();
    this.CurrentPrincipal = this.getPrincipalAmount(this.CurrentInterest);
    this.CurrentRecordType = this.RECORD_TYPE_INSTALLMENT;

    
    this.CurrentPrincipalOS = this.CurrentPrincipalOS - this.CurrentPrincipal;
  };

  postCalculateExec = () => {
    this.CurrentEmiDate = this.addMonthToEmi(this.CurrentEmiDate);
  };

  calculateEmi = async () => {
    let data = []; 
    while (this.CurrentMonth <= this.TotalDuration -1 ) {
      this.preCalculateExec();

      let singeEntry = {
        sno: this.SNO,
        month: this.CurrentMonth,
        date: this.CurrentEmiDate.toDateString(),
        installment: this.InstallmentAmount,
        principal: this.CurrentPrincipal,
        interest: this.CurrentInterest,
        interest_perc: this.LoanPercentage,
        excess_amount: this.CurrentExcessAmount,
        int_paid: this.TotalInterestPaid,
        pm_os: this.CurrentPrincipalOS,
        record_type: this.CurrentRecordType,
      };

      this.postCalculateExec();      
      data.push(singeEntry);
    }
    //let response = this.Header.concat(data);
    return data;
  };
}

module.exports = new CalculatorUtility();
