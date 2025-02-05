# WatchEdit

## Overview

WatchEdit is a full-stack web application that allows users to explore movies, maintain watchlists, and receive personalized movie recommendations. The frontend is built using **React, HTML, and CSS**, while the backend is powered by **Python (Flask)**. The app utilizes **Supabase** for authentication and **The Movie Database (TMDb) API** for fetching movie data.

## Features

- **User Authentication**: Users can sign up and log in using Supabase authentication.
- **Movie Discovery**: Users can browse movies categorized as trending, top-rated, and upcoming.
- **Personalized Recommendations**: The app generates movie recommendations based on a user's watchlist and completed movies using **TF-IDF vectorization and cosine similarity**.
- **Search Functionality**: Users can search for movies by title or genre.
- **Watchlist Management**: Users can save movies they plan to watch and mark completed ones.
- **Data Synchronization**: User data is synchronized with the backend. (IN PROGRESS)

## Tech Stack

### Frontend:

- React.js
- HTML
- CSS

### Backend:

- Flask (Python)
- Flask-CORS (for handling cross-origin requests)
- Requests (for interacting with TMDb API)
- Scikit-learn (for recommendation system)
- Pandas (for data handling)
- Supabase (for user authentication)
- dotenv (for managing environment variables)

## Folder Structure

```
WATCHEDIT
│── public/                # Public assets (images, icons)
│── src/
│   ├── assets/            # Static assets
│   ├── Components/        # React components
│   ├── App.jsx            # Main React app entry point
│   ├── index.css          # Global CSS styles
│   ├── main.jsx           # Renders App component
│── .env                   # Environment variables
│── .gitignore             # Git ignore file
│── app.py                 # Flask backend
│── db.py                  # Database handling (Supabase authentication)
│── package.json           # Frontend dependencies
│── requirements.txt       # Backend dependencies
│── README.md              # Project documentation
│── vite.config.js         # Vite configuration for React
```

## Installation & Setup

### Prerequisites:

- Node.js (for frontend development)
- Python 3.8+ (for backend)
- Virtual environment setup for Python

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/watchedit.git
   cd watchedit
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On macOS/Linux
   venv\Scripts\activate      # On Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables in `.env`:
   ```env
   API_KEY=your_tmdb_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```
5. Run the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend folder and install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend server:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Authentication

- `POST /login` - Logs in a user
- `POST /signup` - Signs up a new user

### Movie Data

- `GET /tmdb/toprated` - Fetches top-rated movies
- `GET /tmdb/trending` - Fetches trending movies
- `GET /tmdb/upcoming` - Fetches upcoming movies
- `POST /tmdb/search` - Searches movies by title
- `POST /tmdb/search/genre` - Searches movies by genre
- `GET /tmdb/genres` - Fetches available movie genres

### Recommendations

- `POST /tmdb/recc` - Generates personalized recommendations

## Recommendation System

The recommendation system works as follows:

1. Retrieves a list of top popular movies.
2. Extracts **title, genres, and plot overview** for each movie.
3. Uses **TF-IDF Vectorization** to analyze textual similarity between movies.
4. Computes **cosine similarity** scores between user’s watched movies and top movies.
5. Recommends the top most similar movies, ensuring no duplicates.
