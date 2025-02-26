from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from db import create_user, sign_user_in, get_db_connection
from dotenv import load_dotenv
import requests, pandas as pd, secrets, os, json

load_dotenv()

secret_key = secrets.token_hex(32)
API_KEY = os.environ.get("API_KEY")

app = Flask(__name__)
app.secret_key = secret_key

app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_SAMESITE='None'
)
CORS(app, supports_credentials=True)

def api_results(url):
    params = {
        "api_key" : API_KEY
    }

    response = requests.get(url, params=params)
    data = response.json()
    results = data.get("results", [])

    return results

def get_list(category, page_no):
    url = ""

    if category == "popular" or category =="upcoming":
        url = f"https://api.themoviedb.org/3/movie/{category}?language=en-US&page={page_no}"
    else:
        url = f"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page={page_no}"

    return api_results(url)

def aggregate_results(keyword):
    result = []

    for i in range(1, 21):
        result += get_list(keyword, i)
    
    return result

def aggregate_results_post(url):
    result = []
    url_list = list(url)

    for i in range(1, 21):
        url_list[-1] = str(i)
        result += api_results(''.join(url_list))
    
    return jsonify(result)

def get_top_movies():
    popular_movies = []

    for i in range(1, 40):
        results = get_list("popular", i)

        for movie in results:
            movie_info = extract_movie_info(movie)
            popular_movies.append(movie_info)

    return popular_movies

def extract_movie_info(movie):
    movie_title = movie.get("original_title")
    genre_ids = movie.get("genre_ids")
    plot = movie.get("overview")
    movie_info = f"{movie_title}{genre_ids} {plot}"

    return movie_info

def find_recommended_movies(top_recommendations):
    movie_set = set()
    data = {
        "results": []
    }

    for movie in top_recommendations:
        url = f"https://api.themoviedb.org/3/search/movie?query={movie}&include_adult=false&language=en-US&page=1"
        result = api_results(url)[0]
        movie_title = result.get("original_title")

        if movie_title in movie_set:
            pass
        else:
            data["results"].append(api_results(url)[0])
            movie_set.add(movie_title)
   
    return jsonify(data.get("results"))

def generate_recommendations(user_movies):
    top_movies = get_top_movies()

    df_top_movies = pd.DataFrame(top_movies)
    df_user_movies = pd.DataFrame(user_movies)
   
    df_top_movies[0] = df_top_movies[0].astype(str)
    df_user_movies[0] = df_user_movies[0].astype(str)
    
    tfidf = TfidfVectorizer(stop_words="english")
    tfidf_top_movies = tfidf.fit_transform(df_top_movies[0])
    tfidf_user_movies = tfidf.transform(df_user_movies[0])

    similarty_scores = cosine_similarity(tfidf_user_movies, tfidf_top_movies)
    aggregated_scores = similarty_scores.sum(axis=0)

    df_top_movies["similarity_score"] = aggregated_scores
    df_top_movies['title'] = df_top_movies[0].apply(lambda x: x.split('[', 1)[0])
    df_user_movies['title'] = df_user_movies[0].apply(lambda x: x.split('[', 1)[0])
    
    user_titles = df_user_movies['title'].tolist()
    recommendations = df_top_movies[~df_top_movies['title'].isin(user_titles)]
    sorted_reccs = recommendations.sort_values(by="similarity_score", ascending=False)
    sorted_reccs.drop_duplicates(inplace=True)

    sorted_reccs = sorted_reccs.head(80)
    final_results = list(sorted_reccs["title"])

    return find_recommended_movies(final_results)

@app.route("/tmdb/recc", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def get_recommendations():
    data = request.get_json()
    watchlist = data.get("watchlistMovies")
    completed_movies = data.get("completedMovies")

    n = len(watchlist)
    m = len(completed_movies)
    user_movies = []

    if n == 0 and m == 0:
        return []

    for i in range(n):
        user_movies.append(extract_movie_info(watchlist[i]))
    
    for i in range(m):
        user_movies.append(extract_movie_info(completed_movies[i]))
    
    return generate_recommendations(user_movies)
    
@app.route("/tmdb/toprated", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_top_rated():
    return aggregate_results("toprated")

@app.route("/tmdb/trending", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_trending():
    return aggregate_results("popular")

@app.route("/tmdb/upcoming", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_upcoming():
    return aggregate_results("upcoming")

@app.route("/tmdb/search", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def get_search():
    data = request.get_json()
    
    if data == "":
        return []

    url = f"https://api.themoviedb.org/3/search/movie?query={data}&include_adult=false&language=en-US&page=1"
    
    return aggregate_results_post(url)

@app.route("/tmdb/search/genre", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def get_search_genre():
    data = request.get_json()

    url = f"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&vote_average.gte=6.5&vote_count.gte=200&with_genres={data}&sort_by=popularity.desc&page=1"
    
    return aggregate_results_post(url)

@app.route("/tmdb/genres", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_genres():
    url = "https://api.themoviedb.org/3/genre/movie/list"
    params = {
        "api_key": API_KEY
    }

    response = requests.get(url, params=params)
    data = response.json()
    results = data.get("genres", [])

    return results

@app.route("/login", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    result = {
        "validated": False,
        "message": ""
    }

    response = sign_user_in(email, password)
    
    try:
        session["user_id"] = response.user.id
        result["validated"] = True
    except Exception as e:
        result["message"] = response.name

    return jsonify(result)

@app.route("/signup", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def signup():
    conn = get_db_connection()
    cur = conn.cursor()
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    result = {
        "validated": False,
        "message": ""
    }

    response = create_user(email, password)
    
    try:
        user_id = response.user.id
        session["user_id"] = user_id
        result["validated"] = True

        cur.execute(
            "INSERT INTO public.user_data (user_id, watch_list, completed_list) VALUES (%s, %s::jsonb, %s::jsonb)",
            (user_id, json.dumps([]), json.dumps([]))
        )
        conn.commit()
        cur.close()
    except Exception as e:
        result["message"] = response.name
    
    return jsonify(result)

@app.route("/logout", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def logout():
    session["user_id"] = None

    return '', 204

@app.route("/retrieve/data", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def retrieve_data():
    user_movies = {
        "movies": [],
        "completed": []
    }
    user_id = session.get("user_id")

    if user_id != None:
        cur = get_db_connection().cursor()

        cur.execute("SELECT watch_list FROM public.user_data WHERE user_id = %s", (user_id,))
        user_movies["movies"] = cur.fetchall()[0][0]

        cur.execute("SELECT completed_list FROM public.user_data WHERE user_id = %s", (user_id,))
        user_movies["completed"] = cur.fetchall()[0][0]

        cur.close()

    return user_movies

@app.route("/update/data", methods=["POST"])
@cross_origin(supports_credentials=True)
def update_data():
    user_id = session.get("user_id")
    
    if user_id != None:
        data = request.get_json()
        movie_list = json.dumps(data.get("user_movies"))
        completed_list = json.dumps(data.get("completed_list"))

        con = get_db_connection()
        cur = con.cursor()
        cur.execute("UPDATE public.user_data SET watch_list = %s::jsonb, completed_list = %s::jsonb WHERE user_id = %s", (movie_list, completed_list, user_id))
        con.commit()
        cur.close()

    return '', 204
    

if __name__ == "__main__":
    app.run(debug=True)
