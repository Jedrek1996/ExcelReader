# CSV File Uploader and Viewer 📄

Live demo of the application [here](https://excel-reader-wqmc.onrender.com/).

## Problem Statement ❔

This mini project is a web application that allows users to upload CSV files, view the uploaded data with pagination, and search through the data. It features a responsive design and provides feedback on the upload progress.

## Technologies Used ⚙️

- **Frontend:** 
  - React Vite (with TypeScript)
  - Tailwind (CSS)
  - Toastify (Notifications)

- **Backend:** 
  - Node.js (with TypeScript)
  - Nodemon for active updates on the backend.

- **Testing Framework:** 
  - Jest for unit testing for both ends.

- **Configs:** 
  - Concurrently to run both ends in development as well as test files.
  - Proxy in vite config to ensure both ends are connected.

## Features 🔎

- **CSV File Upload:** Users can upload CSV files with progress feedback from Toastify.
- **Data Listing:** Uploaded data is displayed with page filter and pagination for easy navigation.
- **Search Functionality:** Users can search through the uploaded data.

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
