# Title
Frontend Task – Simple Camera Test

## Objective
Build a small frontend app that verifies browser camera access, basic media stream handling, and clean UI state transitions using React (Vite) and plain CSS, following the given assignment specification.

## Live Demo

Link: 

## Tech Stack

- **React.js (Vite)** – Fast dev setup with modern React.
- **JavaScript (ES6+)** – Logic, state, and Web API integration.
- **Plain CSS** – Responsive layout with Flexbox and media queries.
- **Native Browser Web APIs** – `navigator.mediaDevices.getUserMedia` for camera access.[web:1]


## Features & Behavior

### Part A – Homepage (`/`)

- Static homepage with title **“Camera Test App”**.
- Primary button **“Start Camera Test”**.
- Clicking the button navigates to **`/camera-test`** using React Router v5.

### Part B – Camera Test Page (`/camera-test`)

#### 1. Request Camera Access (Mandatory)

- On **“Start Camera Test”** button click:
  - Calls `navigator.mediaDevices.getUserMedia({ video: true })` to request camera access.[web:1]
  - Shows **loading state**: “Requesting camera permission…”.
  - Disables the start button while the permission request is pending (better UX, avoids double clicks).

- Handles outcomes:
  - **Allowed**:
    - Updates state to **`cameraStatus = 'allowed'`**.
    - Shows success text: **“Camera is working ✅”** and **“Live camera preview active”**.
  - **Denied / Error**:
    - Updates state to **`cameraStatus = 'denied'`**.
    - Shows an error message based on error type:
      - `NotAllowedError`: permission denied by user / browser.
      - `NotFoundError`: no camera device available.
      - Fallback: generic `Camera error: {message}`.

#### 2. Live Camera Preview (Mandatory)

- After permission is granted:
  - Stores the returned `MediaStream` in component state and a ref for cleanup.
  - Attaches the stream to a `<video>` element via `videoRef.current.srcObject = stream`.[web:1]
  - Calls `video.play()` to start the live preview.
  - Renders a **black-framed video container** showing the real-time camera feed.
  - Displays text: **“Live camera preview active”** under the status area.


### Part C – Stop / Retry

- **Stop Camera** button:
  - Iterates over `stream.getTracks()` and calls `track.stop()` on each track to release the camera device.[web:1]
  - Clears the stored stream reference.
  - Updates state to **`cameraStatus = 'stopped'`** and shows **“Camera stopped”**.
- **Retry** button:
  - Resets state back to `idle`.
  - Clears any previous status message.
  - Allows the user to restart the test and request camera access again.

## Setup Instructions

1. Initialize Project:
    * create a folder: mkdir camera-test-app
    * navigate to that folder: cd camera-test-app
    * Create Vite React project: npm create vite@latest . -- --template react (the dot uses the current folder).

2. Install Dependencies:
    * npm install react-helmet react-router-dom ^5.3.4

3. Steps to run locally (npm install, npm run dev).
   
   
## push the code to Git using the following commands
* git init
* git remote add origin https://github.com/Haripriya866/Simple-Camera-Test.git
* git add -A
* git commit -m "initial commit"
* git branch -M main
* git push -u origin main

## Deployment
Choose a Platform: Select a deployment platform like Vercel

