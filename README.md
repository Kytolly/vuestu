# vuestu(UESTC-复杂软件技术开发)

* Tech Stack: HTML5+JavaScript+Node+Vue+Express+MySQL+Axios
* This project is divided into three steps:

  * Frontend modifications for input validation:

    - [X] Student ID must be 5 digits, needs validation and prompts;
    - [X] Grades must be in range [0,100], needs validation and prompts;
    - [X] Gender changed to male/female selection;
    - [X] Without changing the insert and edit page content, add two data fields to display page: total score and average score, with automatic sorting by average score from high to low, test data to be input by users.
  * Backend database connection and basic business logic:

    - [X] Change gender data type to bit in database;
    - [X] Add two data fields in stuScore table: total score and average score;
    - [X] Complete student score add and modify functions;
  * Frontend-Backend Integration and Extensions:

    - [X] Axios Web access
    - [X] Resolve cross-origin issues
    - [X] Move the add button from each record to the top of page;
    - [X] Require user confirmation before deleting records;
    - [X] Add pagination functionality;
    - [X] Add query function to search specific student scores by name or student ID;
* Common Commands:

  * Install dependencies: Go to specified directory and run `npm install`
  * Start frontend (no restart needed after code changes): `cd front`+`npm run dev`
  * Start backend server (restart needed after code changes): `cd back`+`node express_index.js`
