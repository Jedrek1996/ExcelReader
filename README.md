# CSV Reader/Viewer 📄 (MVP)

Live demo of the application [here](https://excel-reader-wqmc.onrender.com/signin).

Additionally, it may take some time to speed up the server hosted on Render's free tier. 

To test out the older version with working test cases please download [(V1.0.0)](https://github.com/Jedrek1996/ExcelReader/releases/tag/v1.0.0) and startup the application with the steps below.



## To Do (In progress)

-  Update auth routes and add relevant CRUD Operations for the files associated with each user with Mongodb. (V1.0.0 runs locally.)
-  Update test cases, most test cases fails as of now. Will update once the application is stable.

## About❔

This mini project is a web application that allows users to upload CSV files, view the uploaded data with pagination, and search through the data. Please note that this project is intended for local use only. Data is not stored permanently; users can only upload files to view their content.

## Technologies Used ⚙️

- **Frontend:** 
  - React Vite (with TypeScript)
  - Tailwind (CSS)
  - Toastify (Notifications)

- **Backend:** 
  - Node.js (with TypeScript)
  - Nodemon for active updates on the backend.
  - Mutler for file uploads.

- **Testing Framework:** 
  - Jest for unit testing for both ends.

- **Configs:** 
  - Concurrently to run both ends in development as well as test files.
  - Proxy in vite config to ensure both ends are connected.

## Features 🔎

- **CSV File Upload:** Users can upload CSV files with progress feedback from Toastify.
- **Data Listing:** Uploaded data is displayed with page filter and pagination for easy navigation.
- **Search Functionality:** Users can search through the uploaded data.

## Folder Structure 📂

- **Frontend:** Located in the root directory under `client`. The entry point for the frontend is `index.html`, which is linked to `main.tsx`.
The structure of the folder includes:
  - **public:** Contains the favicon and other potential assets.
  - **src:** Houses the components, tests and entry points for the components (main.tsx).
  - **build (dist):** Contains the production-ready code.

- **Backend:** Also located in the root directory. The entry point for the server is found in `src/server.ts`. The structure includes:
  - **controllers, models, routes, tests,** and **utils.**


## Setup and Installation 💿
### Prerequisites

- Node.js (version 14 or later) Recommend to use the latest version of node.
- npm (Node package manager)

### Steps to Run the Project Locally 🖥️

1. Run this command: **`npm run setup-project`** in the root directory.
2. Run **`npm run dev`** to start the project.
3. Run **`npm run test`** in the root directory to execute test files.

### Steps for deployment 👨🏻‍💻

1. From the root directory, **cd** to the **client** directory.
2. Run **`npm run build`** to compile the TypeScript code for production.
3. Once the **`dist`** folder is created, rename it to **`build`**.
4. Update the GitHub repository.
5. Render will automatically pick up the changes and redeploy.
