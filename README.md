# REACT FEEDBACK FORM WITH NOTION API

This a simple feedback form that is built using React 18, node.js and Express and Notion API as the database

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)

## Prerequisites

To start, here are the following requirements your local machine should have. 

- Node.js and npm installed on your machine
- A notion account with an integration set up with access to the NOTION API
- A simple understanding of REACT, NODE.JS AND Express

## Getting Started

Explain how to set up the project on a local machine. Include step-by-step instructions and commands where necessary.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/tikoyy/final-form.git
2. Install front end dependecies
   ```powershell
   npm install react react-dom
   npm install axios
   npm install react-toastify
3. Install backend dependencies
    ```powershell
   npm install express
   npm install express-rate-limit
   npm install @notionhq/client
   npm install cors
   npm install body-parser
   npm install dotenv
### Configuration 

1. Create _**'.env'**_ file in the _**'express-server'**_ directory and set the following variables
   ```powershell
   NOTION_INTEGRATION_TOKEN = your_notion_api_key
   NOTION_DATABASE_ID = your_notion_id
Replace _**'your_notion_api_key'**_  _**'your_notion_id'**_ with your actual generated Notion API key and database ID.

### Running the Application 

1. For the backend server 
    ```powershell
        cd express-server
        npm start
2.  For the Frontend Server
    ```powershell
        cd client
        npm start
  Visit _**'http://localhost:3000'**_ in your browser to gain access of your application 

## Usage
- its simple application that submit information to a Notion database

## Dependencies 
- Front End:
  - axios: ^1.5.0
  - react: ^18.2.0
  - react-dom: ^18.2.0
  - react-toastify: ^9.1.3
  
- Backend:
  - express: ^4.18.2
  - @notionhq/client: ^2.2.13
  - cors: ^2.8.5
  - body-parser: ^1.20.2


## Contributing 

Contributions and suggestions are always welcome!. Please try this on your local machine and see what can be imporoved. 


## License

The project is hereby listed and licensed under [MIT](https://choosealicense.com/licenses/mit/). See [LICENSE](https://github.com/tikoyy/final-form/blob/main/LICENSE.md) for details. 




