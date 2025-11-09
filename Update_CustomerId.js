const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "eu-west-1" });
const docClient = DynamoDBDocumentClient.from(client);

const tableNames = [
  "Workout-e5fiatrazzfp5nzvtthoff6gfq-prod",
  "Event-e5fiatrazzfp5nzvtthoff6gfq-prod",
  "Metric-e5fiatrazzfp5nzvtthoff6gfq-prod",
  "NonTrainingDays-e5fiatrazzfp5nzvtthoff6gfq-prod"
];
const oldCustomerId = "ff5c35bd-2185-47f2-aac7-413ec1296658";
const newCustomerId = "f488a498-6081-7087-6b48-3afa98a27368";

async function updateCustomerIdsForTable(tableName) {
  let updatedCount = 0;
  let lastEvaluatedKey = null;
  
  do {
    // Step 1: Scan for items with the old customer ID
    const scanParams = {
      TableName: tableName,
      FilterExpression: "idCustomer = :oldCustomerId",
      ExpressionAttributeValues: {
        ":oldCustomerId": oldCustomerId
      }
    };
    
    if (lastEvaluatedKey) {
      scanParams.ExclusiveStartKey = lastEvaluatedKey;
    }
    
    try {
      const scanResult = await docClient.send(new ScanCommand(scanParams));
      
      // Step 2: Update each found item
      for (const item of scanResult.Items || []) {
        const updateParams = {
          TableName: tableName,
          Key: {
            // Assuming 'id' is your primary key - adjust as needed
            id: item.id
            // If you have a sort key, add it here too
          },
          UpdateExpression: "SET idCustomer = :newCustomerId",
          ConditionExpression: "idCustomer = :oldCustomerId", // Safety check
          ExpressionAttributeValues: {
            ":newCustomerId": newCustomerId,
            ":oldCustomerId": oldCustomerId
          },
          ReturnValues: "UPDATED_NEW"
        };
        
        try {
          const updateResult = await docClient.send(new UpdateCommand(updateParams));
          updatedCount++;
          console.log(`Updated item ${item.id}: ${JSON.stringify(updateResult.Attributes)}`);
        } catch (updateError) {
          if (updateError.name === "ConditionalCheckFailedException") {
            console.log(`Item ${item.id} was already updated by another process`);
          } else {
            console.error(`Error updating item ${item.id}:`, updateError);
          }
        }
      }
      
      lastEvaluatedKey = scanResult.LastEvaluatedKey;
      
    } catch (scanError) {
      console.error("Error scanning table:", scanError);
      break;
    }
    
  } while (lastEvaluatedKey);
  
  console.log(`Table ${tableName} - total items updated: ${updatedCount}`);
  return updatedCount;
}

async function updateCustomerIds() {
  let grandTotal = 0;

  for (const tableName of tableNames) {
    console.log(`\nProcessing table: ${tableName}`);
    try {
      const count = await updateCustomerIdsForTable(tableName);
      grandTotal += count;
    } catch (error) {
      console.error(`Error processing table ${tableName}:`, error);
    }
  }

  console.log(`\nGrand total items updated across all tables: ${grandTotal}`);
}

// Run the update
updateCustomerIds();
