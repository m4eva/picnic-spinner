from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect("picnic.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    db = get_db()
    db.execute("CREATE TABLE IF NOT EXISTS spins (name TEXT, result TEXT)")
    db.commit()
    db.close()

@app.route("/spin", methods=["POST"])
def spin():
    data = request.json
    name = data["name"]
    result = data["result"]
    db = get_db()
    db.execute("INSERT INTO spins (name, result) VALUES (?, ?)", (name, result))
    db.commit()
    db.close()
    return jsonify({"ok": True})

init_db()

if __name__ == "__main__":
    app.run(debug=True)