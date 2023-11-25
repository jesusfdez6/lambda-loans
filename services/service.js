const dynamoDB = require("../dynamoDB/dynamo");
const mapperResponse = require("../mapper/mapperResponse");
const mapperRequestDynamo = require("../mapper/mapperDynamo");

exports.createLoans = async (event)=>{
    console.log("createLoans services");
    try {

        const dataStatusApproved = getStatusApproved(event.body);
        console.log(dataStatusApproved);
        const loan = mapperRequestDynamo.getRow(event.body,dataStatusApproved);
        
        await dynamoDB.createLoans(loan);

        if(!dataStatusApproved.approved){
            const data = {message:"credito no aprobado",codeError:1001}; 
            return mapperResponse.responseBusinessError(data);
        }

        return mapperResponse.responseCreated();
      
    } catch (error) {
        console.error("Error createLoans services:");
        console.log(error);
        return mapperResponse.responseTecnicalError();
    }
}

const getStatusApproved = (data)=>{
    console.log("data",data)
    const res = {
        approved:true
    };
    const insurance = data.loan.hasInsurance?data.loan.insurance:0;
    console.log("insurance",insurance)
    const valueFuture =  (data.loan.valueDisbursement*data.loan.rate*data.loan.term)+(insurance*data.loan.term);
    console.log("valueFuture",valueFuture)

    const valueMonth = valueFuture / data.loan.term;
    console.log("valueFuture",valueFuture)

    res.valueMonth = valueMonth;
    console.log("valueMonth",valueMonth)

    const thirtyPercentOfIncome = data.customerIncome * 0.3;
    if (valueMonth > thirtyPercentOfIncome) {
       
        res.approved = false;
    }

    return res;

}
