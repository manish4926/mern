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
    this.updateROI(new Date(this.StartDate));
    this.CurrentEmiDate = new Date(this.StartDate);
    this.getInstallmentAmount();
    this.CurrentInterest = this.getInterestAmount();
    this.CurrentPrincipal = this.getPrincipalAmount(this.CurrentInterest);
    this.CurrentPrincipalOS = this.TotalLoanAmount;
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
      this.InstallmentAmount = this.calculateInstallmentAmount(
        this.TotalLoanAmount,
        this.LoanPercentage,
        this.TotalDuration
      );
    }
  };

  getPrincipalAmount = (interest) => {
    return this.InstallmentAmount - interest;
  };

  getInterestAmount = () => {
    return (this.PendingLoanAmount * this.LoanPercentage) / 100 / 12;
  };

  // getStandardDate = (date, format = "yyyy-mm-dd") => {
  //   let newDate = new Date(this.StartDate).toDateString();
  //   let year = date.getFullYear();
  //   let month = String(date.getMonth() + 1).padStart(2, "0");
  //   let day = String(date.getDate()).padStart(2, "0");
  //   let dateString = `${year}-${month}-${day}`;
  //   return dateString;
  // };

  addMonthToEmi = (date) => {
    return new Date(date.setMonth(date.getMonth() + 1));
  };

  updateROI = (date) => {
    let newDate = new Date(this.RoiArr[0].date);
    if (newDate >= date) {
      this.LoanPercentage = this.RoiArr[0].rate;
      this.RoiArr.splice(0, 1);
    }
  };

  preCalculateExec = () => {
    this.SNO++;
    this.CurrentMonth++;
    this.TotalInterestPaid = this.TotalInterestPaid + this.CurrentInterest;
    this.CurrentPrincipalOS = this.CurrentPrincipalOS - this.CurrentPrincipal;
  };

  postCalculateExec = () => {
    this.CurrentEmiDate = this.addMonthToEmi(this.CurrentEmiDate);
  };

  calculateEmi = async () => {
    let data = [];
    let recordType = "Installment";

    //let emiDate = this.getStandardDate(this.StartDate);
    while (this.CurrentMonth <= this.TotalDuration) {
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
        record_type: recordType,
      };

      this.postCalculateExec();

      
      data.push(singeEntry);

      //this.updateROI();
      //this.TotalLoanAmount = this.TotalLoanAmount - 100000;
    }
    //let response = this.Header.concat(data);
    return data;
  };
}

module.exports = new CalculatorUtility();
