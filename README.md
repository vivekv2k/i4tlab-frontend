Frontend (React + Vite)


cd frontend
npm install
npm run dev


The frontend runs at http://localhost:5173 by default.


🔧 API Endpoints
Method	Endpoint	Description
GET	/api/tasks	Get paginated task list
POST	/api/tasks	Create a task
PUT	/api/tasks/{id}	Update a task
DELETE	/api/tasks/{id}	Delete a task
GET	/api/users	Get list of users
GET	/api/tasks/filter	Filter tasks by user/status
📂 Folder Structure
Laravel

    app/Repositories – Task repository implementing interface

    app/Http/Controllers/Api/TaskController.php

    database/seeders/UserSeeder.php, TaskSeeder.php

React

    src/components/ – All UI components

    src/redux/ – Redux store and slices

    src/services/api.js – Axios config

    src/pages/TaskList.jsx – Main task listing page
