# Server Priority Finder

A project to find the online server with the lowest priority.

## Table of Contents

- [Server Priority Finder](#server-priority-finder)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
- [Testing](#testing)
- [Example Response](#example-response)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/server-priority-finder.git

   ```

2. Navigate to the project directory:
   cd server-priority-finder
3. Install the dependencies:

npm install

## Project Structure

4. Project Structure:

- ├── src/
- │ ├── findServer.ts
- │ ├── findServer.test.ts
- │ └── server.ts
- ├── tsconfig.json
- ├── package.json
- ├── README.md
- └── ...

- src/: Contains the source code.
- findServer.ts: The main function to find the server with the lowest priority.
- findServer.test.ts: Unit tests for the findServer function.
- server.ts: Express server to simulate server responses and test the findServer function.

5. Scripts:

- build: Compiles the TypeScript files to JavaScript.

- test: Runs the tests using Jest.

- test: Runs Jest in watch mode.

- start: Compiles the TypeScript files and starts the application.

- dev: Watches for changes in TypeScript files, automatically recompiles them, and restarts the application.

6. Endpoints:

   - GET /server1: Simulates an online server.

   - GET /server2: Simulates an offline server.

   - GET /server3: Simulates an online server.

   - GET /findServer: Calls the findServer function and returns the server with the lowest priority that is online.

# Testing

Run the tests using Jest:

- npm test

Run the tests in watch mode:

- npm run test:watch

# Example Response

- When hitting the /findServer endpoint, you should see a response with the server that has the lowest priority and is online:

{
"url": "http://localhost:3000/server1",
"priority": 1
}
