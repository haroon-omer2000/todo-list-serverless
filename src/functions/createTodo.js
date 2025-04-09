const { v4: uuidv4 } = require('uuid');
const dynamoDb = require('../lib/dynamodb');

module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    
    // Validate input
    if (!data.title) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ message: 'Todo title is required' })
      };
    }
    
    const timestamp = new Date().toISOString();
    const todo = {
      id: uuidv4(),
      title: data.title,
      description: data.description || '',
      completed: data.completed || false,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    await dynamoDb.create(todo);
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(todo)
    };
  } catch (error) {
    console.log('Error creating todo:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Could not create the todo item.' })
    };
  }
};