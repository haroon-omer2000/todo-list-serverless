const dynamoDb = require('../lib/dynamodb');

module.exports.handler = async (event) => {
  try {
    const todos = await dynamoDb.getAll();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(todos)
    };
  } catch (error) {
    console.log('Error fetching todos:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Could not retrieve todo items.' })
    };
  }
};