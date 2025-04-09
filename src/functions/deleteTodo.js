const dynamoDb = require('../lib/dynamodb');

module.exports.handler = async (event) => {
  try {
    const id = event.pathParameters.id;
    const data = JSON.parse(event.body);
    
    // Check if todo exists
    const existingTodo = await dynamoDb.getById(id);
    if (!existingTodo) {
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
    
    // Filter out undefined values and prepare update data
    const updateData = {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.completed !== undefined ? { completed: data.completed } : {}),
      updatedAt: new Date().toISOString()
    };
    
    // Update todo
    const updatedTodo = await dynamoDb.update(id, updateData);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(updatedTodo)
    };
  } catch (error) {
    console.log('Error updating todo:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Could not update the todo item.' })
    };
  }
};