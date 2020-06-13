from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

#use Pymongo to establish connection with MongoDB
#app.config["MONGO_URI"]="mongodb://localhost:27017/Retirement_homes"
retirement_home_db = PyMongo(app, uri="mongodb://localhost:27017/Retirement_homes")
#CORS(app)

#app.config["MONGO_URI"]="mongodb://localhost:27017/Places_of_attractions"
places_of_attractions_db = PyMongo(app, uri="mongodb://localhost:27017/Places_of_attractions")
#CORS(app)

@app.route("/")
def index():
    # return "<a href='retirement_home'>Retirement Home</a> <br> <a href='places_of_attraction'>PLaces of Interest</a>" #
    return render_template('index.html')

@app.route("/retirement_home")
def retirement_home():
    rh = retirement_home_db.db.retirement_homes.find()

    result_retirement_homes = []
    for i in rh:
        for key, value in i.items():
            i[key] = value.replace("u'","'").replace("(","[").replace(")","]")
        result_retirement_homes.append(i)

    return jsonify(result_retirement_homes)

@app.route("/places_of_attraction")
def places_of_attraction():
    pa = places_of_attractions_db.db.places_of_attractions.find()
    result_places_of_attractions = []
    for i in pa:
        for key, value in i.items():
            i[key] = value.replace("u'","'").replace("(","[").replace(")","]")
        result_places_of_attractions.append(i)

    return jsonify(result_places_of_attractions)

 
if __name__ == "__main__":
    app.run(debug=True)