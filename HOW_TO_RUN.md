# How to Run CineParty

## Quick Start

The CineParty application is now running!

### Access the Application

**Local Development URL:** [http://localhost:3000](http://localhost:3000)

## What is CineParty?

CineParty is a watch party application that allows you to watch videos together with friends in sync. It uses Socket.IO for real-time communication.

## Running the Application

If the server is not running, you can start it with:

```bash
npm install  # Install dependencies (first time only)
npm start    # Start the development server
```

The application will automatically open in your browser at `http://localhost:3000`.

## Features

- Real-time synchronized video playback
- Video chat integration with PeerJS
- Socket.IO for live communication
- React Router for navigation

## Notes

- The development server runs on port 3000
- Socket.IO connects to `http://localhost:4000` in development mode
- In production, it connects to `https://cineparty.onrender.com`

## Troubleshooting

If you encounter any issues:

1. Make sure port 3000 is not already in use
2. Clear your browser cache and try again
3. Restart the development server with `npm start`
