# Websocket application to build online chat app

This project is a chat application that uses socket technology to carry out one-to-one chat between users. The backend is built with Node.js and Express, using Socket.IO to send and receive chat events. The frontend is built using ReactJS and uses the socket.io-client library to connect to the server.

## Setup

1. **Backend:**
     - ### Move into the `backend` folder:
            cd backend
     - ### Install dependencies:
            npm install
     - ### Launch the server:
            npm start

2. **Frontend:**
     - ### Move into the `frontend` folder: 
            cd frontend
     - ### Install dependencies: 
            npm install
     - ### Launch the application: 
            npm start

## Directory structure

### `backend/`

- `controllers/`: Contains files responsible for handling application logic. Each file can represent a specific controller, managing certain tasks in the application.
- `models/`: Contains definitions for data models. The model represents the data structure and business rules related to the data.
- `routes/`: Contains files that define and manage the application's routes. These files can contain routing handlers and call handlers from controllers.

### `frontend/`

- `src/`: Contains the source code of the frontend.
  - `components`: This folder can contain reusable React components, like icons, buttons, or other user interface elements.
  - `pages`: This directory can contain application pages, each page can contain components and logic related to a specific functionality.
  - `services`: Contains services related to interacting with the server or processing business logic. These services can provide communication with APIs, handle global state, and other tasks.
  - `utils`: Contains utilities and utility functions that you can use in many places in your source code. This may include general utility functions, data format handling, or other support functions.




## Use

1. Launch the backend by running the `npm start` command in the `backend` directory.
2. Launch the frontend by running the `npm start` command in the `frontend` directory.
3. Open a browser and access `http://localhost:3000` to use the application.

## Technology Used

- Backend: Node.js, Express, Socket.IO
- Frontend: ReactJS, socket.io-client

