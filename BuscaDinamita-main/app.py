from flask import Flask, render_template, request, jsonify
from entities.winner import Winner

# Inicialización de un constructor
app = Flask(__name__)

# Esta será la ruta index (de la página principal)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/winner', methods =['POST'])
def save_winner():
    data = request.get_json()

    winner = Winner(id= 0, name=data['name'], email=data['email'], phrase=data['phrase'])

    winner.save()

    if winner.id != 0:
        return jsonify ({"success": True, "id": winner.id}), 201
    else:
        return jsonify({"seccess": False}), 500

@app.route('/winners', methods=['GET'])
def get_winners():
    return render_template('winners.html', winners = Winner.get_all())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004)