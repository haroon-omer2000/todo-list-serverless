const dynamoDb = require('../lib/dynamodb');

module.exports.handler = async (event) => {
  try {
    const id = event.pathParameters.id;
    
    const todo = await dynamoDb.getById(id);
    
    if (!todo) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ message: 'Todo not found' })
      };
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(todo)
    };
  } catch (error) {
    console.log('Error fetching todo:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Could not retrieve the todo item.' })
    };
  }
};