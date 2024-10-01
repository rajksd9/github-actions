# Basic Todo Application with Github Actions (CI)

## Description
This is a simple todo application project  built using node js and express js. It basically allows you to create, view and delete todos. The todos are not globally stored. In this project, we are just maintaining an array to store the todos .

## Features
1. Create Todos
2. View All Todos
3. Delete Todos

## Prerequisities
Before cloning this repository make sure you have the following installed.
1. Node.js


## Getting Started
To setup and run this project locally, make sure to follow the below steps:
1. **CLone the repositoy**
    ```bash
    git clone https://github.com/rajksd01/github-actions.git
    ```

2. Navigate to the project directory.


3. Opent the terminal on the current working directory and install the required dependencies.
   ```bash
   npm install
   ```


4. To run the application and go through it, run the following command in the terminal.
   ```bash
   npm run start-project
   ```


5. To test the application run the following command.
   ```bash
   npm test
   ```

## How to use the Github Actions Pipeline in this repository

Firstly move to the .github/workflows folder where you will find ***main.yml*** file that contains all the commands used for creating the workflow.
This workflow is trigerred whenever their is a push request on the ***main*** branch of the repository. 

We are having two different jobs configured over here. 
1. Initial Setup and Code Build 
2. Test Phase

For both the jobs we are sticking to ubuntu as the operating system. 

####   Initial Setup and Code Build 
In the first job we are firstly loading the repository in the current workspace through the public actions repo. Then we are setting up the node environment. After the node environment setup we are looking for any cache (if exists) for the npm dependencies. After that on not having the caches we are fresh installing the packages and running the start script to ensure everything is working fine.


#### Test Phase
In the second job we are following the same approach as the first one for setting up the OS, node environment, and packages and as the last step of the job we are executing the test script .


## Getting Started with Github Actions Workflow

To start contributing to the actions workflow follow the given steps below after completing the get-started section.

1. Create a new branch.
2. Edit the main.yml file for that particular branch.
3. Test your changes locally.
4. Create a pull request.

