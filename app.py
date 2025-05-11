from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weekly_planner')
def weekly_planner():
    return render_template('weekly_planner.html')

@app.route('/pomodoro')
def pomodoro():
    return render_template('pomodoro.html')

@app.route('/games')
def games():
    return render_template('games.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    # This is used when running locally for development
    app.run(debug=True)
