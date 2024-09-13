from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/members')
def members():
    return {"members": ["member1", "member2", "member3"]}

@app.route('/signup', methods=['POST'])
def signup():
    return jsonify({
        "id": "1",
        "email": "myemil@gmail.com"
    })

if __name__ == '__main__':
    app.run(debug=True)