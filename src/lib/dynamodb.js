const AWS = require('aws-sdk');

// Initialize DynamoDB client
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const todosTable = process.env.TODOS_TABLE;

// DynamoDB helper functions
const dynamoDbClient = {
  // Create a new todo
  create: async (item) => {
    const params = {
      TableName: todosTable,
      Item: item
    };
    
    return dynamoDb.put(params).promise();
  },
  
  // Get all todos
  getAll: async () => {
    const params = {
      TableName: todosTable
    };
    
    const result = await dynamoDb.scan(params).promise();
    return result.Items || [];
  },
  
  // Get a specific todo by ID
  getById: async (id) => {
    const params = {
      TableName: todosTable,
      Key: { id }
    };
    
    const result = await dynamoDb.get(params).promise();
    return result.Item;
  },
  
  // Update a todo
  update: async (id, updateData) => {
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};
    let updateExpression = 'SET ';
    
    Object.keys(updateData).forEach((key, index) => {
      const nameKey = `#attr${index}`;
      const valueKey = `:val${index}`;
      
      expressionAttributeNames[nameKey] = key;
      expressionAttributeValues[valueKey] = updateData[key];
      
      updateExpression += `${index !== 0 ? ', ' : ''}${nameKey} = ${valueKey}`;
    });
    
    const params = {
      TableName: todosTable,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };
    
    const result = await dynamoDb.update(params).promise();
    return result.Attributes;
  },
  
  // Delete a todo
  delete: async (id) => {
    const params = {
      TableName: todosTable,
      Key: { id }
    };
    
    return dynamoDb.delete(params).promise();
  }
};

module.exports = dynamoDbClient;