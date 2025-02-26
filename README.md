# WatchedIT

A personalized movie recommendation web application that helps users discover films based on their preferences and viewing history. Built with Flask, React, and The Movie Database (TMDB) API.

## Features

- **Smart Recommendations**: Discover new movies based on your watchlist and viewing history using a content-based recommendation algorithm
- **Dynamic Browsing**: Explore movies by different categories:
  - Top-rated films
  - Currently trending titles
  - Upcoming releases
  - Popular movies by genre
- **Search Functionality**: Find specific movies by title
- **User Authentication**: Create an account to save your preferences
- **Personalized Lists**: 
  - Add movies to your watchlist
  - Mark movies as completed
  - Reorder your watchlist with drag functionality
- **Responsive Design**: Enjoy a seamless experience across devices

## Technology Stack

### Frontend
- **React**: Component-based UI with hooks for state management
- **JavaScript/JSX**: Core programming language
- **CSS**: Custom styling for components

### Backend
- **Flask**: Python-based web framework serving as the API
- **scikit-learn**: Machine learning library for the recommendation algorithm
  - TF-IDF vectorization for text processing
  - Cosine similarity for content matching
- **pandas**: Data manipulation and analysis
- **PostgreSQL**: Database for user data persistence
- **Supabase**: Authentication services

### External Services
- **TMDB API**: The Movie Database API for movie information and images

## How It Works

### Recommendation Engine

The application implements a sophisticated content-based recommendation system:

1. **Data Collection**: Aggregates film details including titles, genres, and plot summaries
2. **Text Processing**: 
   - Converts text data to numerical vectors using TF-IDF
   - Removes common English stop words to improve relevance
3. **Similarity Analysis**: 
   - Computes cosine similarity between user-saved movies and the database
   - Ranks potential recommendations by similarity score
4. **Filtering**: Excludes movies already in user's watchlist or completed list

### User Flow

1. Sign up or log in to create a personalized experience
2. Discover movies through various browsing options or search
3. Build your watchlist with films you want to watch
4. Mark movies as completed after watching
5. Receive tailored recommendations based on your preferences
6. Manage and prioritize your watchlist

## Installation and Setup

### Prerequisites
- Python 3.7+
- Node.js and npm
- PostgreSQL database
- Supabase account
- TMDB API key

### Environment Variables
Create a `.env` file with the following variables:
```
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:password@localhost:5432/movie_app
API_KEY=f2f5a41c73e4f24a343c36c1d63d5bb0
```

### Backend Setup
1. Clone the repository
   ```
   git clone https://github.com/RubP04/WatchedIT.git
   cd WatchedIT
   ```

2. Create and activate a virtual environment
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install backend dependencies
   ```
   pip install -r requirements.txt
   ```

4. Set up the database
   ```
   psql -U postgres -c "CREATE DATABASE movie_app"
   ```

5. Run the Flask server
   ```
   python app.py
   ```
   The server will start on http://127.0.0.1:5000

### Frontend Setup
1. Navigate to the frontend directory
   ```
   cd frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```
   The application will be available at http://localhost:3000

## Future Development

- **Advanced Filtering**: Add options to filter by release year, runtime, etc.
- **Enhanced Recommendations**: Implement collaborative filtering to supplement content-based recommendations
- **Social Features**: Allow users to share recommendations and follow friends
- **Streaming Availability**: Integrate with streaming service APIs to show where movies can be watched
- **Performance Optimization**: Implement caching to improve load times

## Contributions

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [TMDB](https://www.themoviedb.org/) for their comprehensive movie database and API
- [Supabase](https://supabase.io/) for authentication services
- All the open source libraries and frameworks that made this project possible