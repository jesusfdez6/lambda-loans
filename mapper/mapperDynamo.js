const { v4: uuidv4 } = require('uuid');


exports.getRow = (dataLoans,data)=>{
    return {
      id: { S: uuidv4() },
      approved: { BOOL: data.approved },
      costumerDocument: { S: dataLoans.customerDocument },
      dateFinish: { S: dataLoans.loan.dateFinish },
      hasInsurance: { BOOL: dataLoans.loan.hasInsurance },
      insurance: { N:  `${dataLoans.loan.insurance}` },
      interaseCapital: { N: `${dataLoans.loan.interaseCapital}` },
      rate: { N: `${dataLoans.loan.rate}` },
      term: { N: `${dataLoans.loan.term}` },
      valueDisbursement: { N: `${dataLoans.loan.valueDisbursement}` },
      valueHousing: { N: `${dataLoans.loan.valueHousing}` },
      valueMonth: { N: `${data.valueMonth}` },
      };
}