# Willinn Technical Test
♟
## Table of Contents

- [Introduction](#introduction)
- [Required Tools](#required-tools)
- [Usage](#usage)
- [Features](#features)
- [Contact](#contact)

## Introduction

In this technical test, I have developed an API using .NET 8 to manage user data in a database. To facilitate testing of the API's logic, I created a frontend application using the Next.js framework. Additionally, I utilized a Jupyter Notebook, based on the Google Colab environment, to locally run the LLaMA 2 model and set up a Flask application accessible via ngrok. This integration allows for streamlined user management and testing of AI capabilities in a seamless environment.

## Required Tools

- Docker
- Google Account

## Usage

To get started with the project, follow these steps:

### First part:

1. **Fork the Repository**: Create your own copy of the repository to make changes.
   
2. **Build and Launch the Application**: Navigate to the project directory in your terminal and run the following command to build and launch the API, SQL Server, and the Next.js frontend:
. 
```
docker-compose up --build
```
3. **Create the First User**: Access the Swagger interface to create a user by navigating to http://localhost:8090 in your web browser. Follow the prompts to set up your first user account.
 
4. **Login to the Frontend**: Once the user has been created, you can log in to the frontend application by going to http://localhost:3000.

### Second part:

5. **Go to Google Colab**: Open [Google Colab](https://colab.research.google.com/) in your web browser.

6. **Login with Your Google Account**: Sign in with your Google account if you haven’t already.

7. **Upload the Notebook**: Upload the Jupyter Notebook file you created for the LLaMA 2 model.

8. **Upload the PDFs**: Ensure you upload the relevant PDF files that contain the papers about birds.

9. **Create an ngrok Account**: Navigate to [ngrok Sign Up](https://dashboard.ngrok.com/signup) to create a new account.

10. **Save Your API Key**: Once registered, save your ngrok API key.

11. **Add Your API Key to the Notebook**: Open the notebook file and insert your ngrok API key in the designated area.

12. **Execute All Cells**: Run all the cells in the notebook to ensure everything is set up correctly.

13. **Open the Printed Route**: After executing the cells, take note of the printed route provided in the output.

14. **Use Swagger UI**: Navigate to the printed route in your web browser to access the Swagger UI and interact with the API.


## Features

 - [x] [Migrations (database and tables set up from the start)](https://github.com/SchneiderSix/willinn-technical-test/blob/main/API/Program.cs#L33)
 - [x] [Rate limiter for the .NET 8 API](https://github.com/SchneiderSix/willinn-technical-test/blob/main/API/Program.cs#L40)
 - [x] [CORS handled specifically for frontend requests](https://github.com/SchneiderSix/willinn-technical-test/blob/main/API/Program.cs#L67)
 - [x] [List of users shows only activated users](https://github.com/SchneiderSix/willinn-technical-test/blob/main/API/Controllers/UserController.cs#25)
 - [x] [Authorization handled with sessionStorage](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/frontend/src/app/components/LoginForm/index.tsx#L57)
 - [x] [Users can only edit name or email (can be changed by adding another form)](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/frontend/src/app/components/TableRow/index.tsx#L134)
 - [x] [Ability to create activated or deactivated users](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/frontend/src/app/components/UserForm/index.tsx#L51)
 - [x] [Debounce search functionality](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/frontend/src/app/components/UserTable/index.tsx#L15)
 - [x] [Redirect for non-logged users](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/frontend/src/app/page.tsx#L13)
 - [x] [Specify prompt](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/AI/llama2_7b-rag-flask.ipynb#L291)
 - [x] [Use chat history](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/AI/llama2_7b-rag-flask.ipynb#L349)
 - [x] [Answer based on context](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/AI/llama2_7b-rag-flask.ipynb#L321)
 - [x] [Rate limiter for Flask](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/AI/llama2_7b-rag-flask.ipynb#L550)
 - [x] [Implement Swagger UI for Flask routes](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/AI/llama2_7b-rag-flask.ipynb#L541)
 - [x] [Save vector store](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/AI/llama2_7b-rag-flask.ipynb#L261)
 - [x] [Use Llama-2-7b-chat-hf model](https://github.com/SchneiderSix/willinn-technical-test/blob/cd750a63919a620683e2c03accd95c0aa23db9c6/AI/llama2_7b-rag-flask.ipynb#L132)

## Contact

Ask me anything, regards

[Juan Matias Rossi](https://www.linkedin.com/in/jmrossi6/)
