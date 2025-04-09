# Serverless Todo List API

A serverless REST API for a Todo List application built with AWS Lambda, API Gateway, and DynamoDB.

## Architecture

This project implements a serverless architecture using:
- AWS API Gateway for HTTP endpoints
- AWS Lambda for business logic
- DynamoDB for data storage
- Serverless Framework for Infrastructure as Code (IAC)
- GitHub Actions for CI/CD pipeline

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /todos   | Create a new todo |
| GET    | /todos   | List all todos |
| GET    | /todos/{id} | Get a specific todo |
| PUT    | /todos/{id} | Update a todo |
| DELETE | /todos/{id} | Delete a todo |

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- AWS account
- AWS CLI configured with appropriate credentials
- Serverless Framework

### Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Deploy to development:
   ```
   serverless deploy --stage dev
   ```

### CI/CD Pipeline

The project includes a GitHub Actions workflow that automatically deploys to both dev and prod environments when changes are pushed to the main branch.

To set up the CI/CD:

1. Add your AWS credentials as GitHub repository secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key

2. Push to the main branch and the workflow will automatically deploy

## Multi-environment Deployment

The application supports multiple deployment stages:

- Development (dev)
- Production (prod)

Each environment has its own isolated resources (API Gateway, Lambda functions, DynamoDB tables).

## Screenshots

### CI/CD Pipeline

![CI/CD Pipeline](https://example.com/cicd-screenshot.png)
*Note: Replace with actual screenshots of your GitHub Actions workflow runs*

## Testing the API

### Create a Todo
```bash
curl -X POST https://[api-id].execute-api.[region].amazonaws.com/dev/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

### List all Todos
```bash
curl https://[api-id].execute-api.[region].amazonaws.com/dev/todos
```

### Get a specific Todo
```bash
curl https://[api-id].execute-api.[region].amazonaws.com/dev/todos/[todo-id]
```

### Update a Todo
```bash
curl -X PUT https://[api-id].execute-api.[region].amazonaws.com/dev/todos/[todo-id] \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete a Todo
```bash
curl -X DELETE https://[api-id].execute-api.[region].amazonaws.com/dev/todos/[todo-id]
```