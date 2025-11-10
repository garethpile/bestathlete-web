const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "eu-west-1" });
const docClient = DynamoDBDocumentClient.from(client);

const tableNameMap = {
  workout: "Workout-e5fiatrazzfp5nzvtthoff6gfq-prod",
  event: "Event-e5fiatrazzfp5nzvtthoff6gfq-prod",
  metric: "Metric-e5fiatrazzfp5nzvtthoff6gfq-prod",
  nontrainingday: "NonTrainingDays-e5fiatrazzfp5nzvtthoff6gfq-prod",
  nontrainingdays: "NonTrainingDays-e5fiatrazzfp5nzvtthoff6gfq-prod"
};

function resolveTablesFromArgs() {
  const args = process.argv.slice(2);
  if (!args.length) {
    return Array.from(new Set(Object.values(tableNameMap)));
  }

  const requested = new Set();

  const addTokens = (tokenString = "") => {
    tokenString
      .split(",")
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean)
      .forEach((token) => {
        const mapped = tableNameMap[token];
        if (mapped) {
          requested.add(mapped);
        } else {
          console.warn(
            `[Update_CustomerId] Ignoring unknown table identifier '${token}'. Valid options: workout,event,metric,nontrainingday.`
          );
        }
      });
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--tables" || arg === "-t") {
      addTokens(args[i + 1]);
      i += 1;
    } else if (arg.startsWith("--tables=")) {
      addTokens(arg.split("=")[1]);
    } else {
      addTokens(arg);
    }
  }

  if (!requested.size) {
    console.warn(
      "[Update_CustomerId] No valid tables requested, defaulting to all."
    );
    return Array.from(new Set(Object.values(tableNameMap)));
  }

  return Array.from(requested);
}

// Daryl
// const oldCustomerId = "ff5c35bd-2185-47f2-aac7-413ec1296658";
// const newCustomerId = "f488a498-6081-7087-6b48-3afa98a27368";

// Gareth
 const oldCustomerId = "8a1699a7-5183-4ada-8796-0319e0475431";
 const newCustomerId = "34182408-f041-704a-eb7c-8dd0b8466554";

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
  const selectedTables = resolveTablesFromArgs();

  console.log(
    `[Update_CustomerId] Processing tables: ${selectedTables.join(", ")}`
  );

  for (const tableName of selectedTables) {
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
