const { DynamoDBClient,PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } =require("@aws-sdk/lib-dynamodb");
const {getParameters} = require('../parameters/parameters');


exports.createLoans = async (loans) => {
    
    console.log("createLoans dynamoDB:");
    const parameters = getParameters();
    

    return new Promise(async (resolve, reject) => {
    
        const client = new DynamoDBClient({ region: 'us-east-1' });
        const ddbDocClient = DynamoDBDocumentClient.from(client);

        const params = {
            TableName: parameters[process.env.TABLE_DYNAMO],
            Item: loans
        }

        console.log(params);

        try {
            await ddbDocClient.send(new PutItemCommand(params));
            resolve(true);

        } catch (error) {

            reject(error);
        }
    });
};




