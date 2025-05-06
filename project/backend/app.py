from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import json
import os
from dotenv import load_dotenv
import random
import time
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'traffic_flow')
}

# Helper function to get database connection
def get_db_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to MySQL: {err}")
        return None

# AI-EBPL simulation function
def simulate_ai_prediction(location_id=None, time_window=2):
    """
    Simulate AI prediction for traffic flow
    
    Args:
        location_id: Optional specific location to predict
        time_window: Hours to predict ahead (default 2)
        
    Returns:
        Dictionary with prediction data
    """
    # In a real system, this would use actual AI models
    # For demo, we'll generate realistic looking data
    
    current_time = datetime.now()
    predictions = []
    
    # Generate time slots
    time_slots = []
    for i in range(time_window + 1):  # Include current time
        time_slots.append(current_time + timedelta(hours=i))
    
    # Common traffic patterns
    congestion_levels = ["Light", "Medium", "Heavy"]
    trend_types = ["Increasing", "Steady", "Decreasing"]
    
    # For each time slot, generate prediction
    for idx, time_slot in enumerate(time_slots):
        hour = time_slot.hour
        
        # Simulate rush hour patterns
        if 7 <= hour <= 9:  # Morning rush
            base_congestion = 2  # Heavy
            trend = "Increasing" if hour < 8 else "Decreasing"
        elif 16 <= hour <= 18:  # Evening rush
            base_congestion = 2  # Heavy
            trend = "Increasing" if hour < 17 else "Decreasing"
        elif 11 <= hour <= 13:  # Lunch time
            base_congestion = 1  # Medium
            trend = "Steady"
        elif 22 <= hour or hour <= 5:  # Night time
            base_congestion = 0  # Light
            trend = "Steady"
        else:  # Normal hours
            base_congestion = 1  # Medium
            trend = random.choice(trend_types)
        
        # Add some randomness
        congestion_index = min(2, max(0, base_congestion + random.randint(-1, 1)))
        congestion = congestion_levels[congestion_index]
        
        # Calculate simulated metrics
        avg_speed = 50 - (congestion_index * 15) + random.randint(-5, 5)
        avg_speed = max(10, min(60, avg_speed))  # Cap between 10-60 km/h
        
        delay_minutes = congestion_index * 10 + random.randint(0, 5)
        
        predictions.append({
            "time": time_slot.strftime("%H:%M"),
            "congestion": congestion,
            "congestion_index": congestion_index,
            "trend": trend,
            "avg_speed": avg_speed,
            "delay_minutes": delay_minutes
        })
    
    return {
        "current": predictions[0],
        "predictions": predictions[1:],
        "updated_at": current_time.strftime("%Y-%m-%d %H:%M:%S")
    }

# Routes
@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "active", "version": "1.0.0"})

@app.route('/api/traffic/current', methods=['GET'])
def current_traffic():
    # Get current traffic state
    traffic_data = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "overview": {
            "avg_speed": 32,
            "congestion_level": "Medium",
            "active_signals": 124,
            "optimized_routes": 18
        },
        "hotspots": [
            {
                "id": 1,
                "name": "Main St & 5th Ave",
                "congestion": "High",
                "delay": 12
            },
            {
                "id": 2,
                "name": "Highway 101 Northbound",
                "congestion": "High",
                "delay": 18
            },
            {
                "id": 3,
                "name": "Downtown Bridge",
                "congestion": "Medium",
                "delay": 15
            }
        ],
        "incidents": [
            {
                "id": 1,
                "type": "Accident",
                "location": "7th Avenue",
                "status": "Clearing",
                "estimated_clear_time": 20
            },
            {
                "id": 2,
                "type": "Construction",
                "location": "East Boulevard",
                "status": "Ongoing",
                "estimated_clear_time": 180
            }
        ]
    }
    return jsonify(traffic_data)

@app.route('/api/traffic/predict', methods=['GET'])
def predict_traffic():
    location_id = request.args.get('location_id')
    time_window = int(request.args.get('hours', 2))
    
    prediction = simulate_ai_prediction(location_id, time_window)
    return jsonify(prediction)

@app.route('/api/signals', methods=['GET'])
def get_signals():
    # Get list of traffic signals
    signals = [
        {
            "id": 1,
            "name": "Main & 5th Intersection",
            "location": "Downtown",
            "status": "Active",
            "congestion": "High",
            "optimized": False,
            "last_updated": "2023-06-10 15:30:45"
        },
        {
            "id": 2,
            "name": "Highway 101 Entrance",
            "location": "North District",
            "status": "Active",
            "congestion": "Medium",
            "optimized": True,
            "last_updated": "2023-06-10 15:45:12"
        },
        {
            "id": 3,
            "name": "Park Avenue & 3rd",
            "location": "East District",
            "status": "Maintenance",
            "congestion": "Low",
            "optimized": False,
            "last_updated": "2023-06-10 12:15:30"
        }
    ]
    return jsonify(signals)

@app.route('/api/signals/<int:signal_id>/optimize', methods=['POST'])
def optimize_signal(signal_id):
    # Simulate optimizing a signal timing
    # This would involve complex calculations in a real system
    
    data = request.json
    mode = data.get('mode', 'auto')
    
    # Simulate processing time
    time.sleep(1)
    
    return jsonify({
        "id": signal_id,
        "success": True,
        "message": f"Signal {signal_id} optimized successfully",
        "new_settings": {
            "green_duration": 45,
            "yellow_duration": 4,
            "red_duration": 60,
            "cycle_time": 109,
            "optimization_mode": mode,
            "optimized_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
    })

@app.route('/api/routes/optimize', methods=['POST'])
def optimize_route():
    # Simulate route optimization
    data = request.json
    origin = data.get('origin', '')
    destination = data.get('destination', '')
    depart_time = data.get('depart_time', 'now')
    
    # In a real system, this would use pathfinding algorithms and real-time traffic data
    
    # Simulate processing time
    time.sleep(1.5)
    
    routes = [
        {
            "id": 1,
            "name": "Main Route",
            "distance": 12.3,
            "duration": 24,
            "congestion": "Medium",
            "saved_time": 0
        },
        {
            "id": 2,
            "name": "Alternate Route 1",
            "distance": 14.1,
            "duration": 19,
            "congestion": "Low",
            "saved_time": 5
        },
        {
            "id": 3,
            "name": "Highway Route",
            "distance": 15.7,
            "duration": 18,
            "congestion": "Low",
            "saved_time": 6
        }
    ]
    
    return jsonify({
        "origin": origin,
        "destination": destination,
        "depart_time": depart_time,
        "routes": routes,
        "computed_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

@app.route('/api/analytics/summary', methods=['GET'])
def get_analytics_summary():
    time_period = request.args.get('period', 'week')
    
    # This would come from the database in a real system
    summary = {
        "period": time_period,
        "congestion_reduction": 18,
        "avg_commute_time": 24.5,
        "commute_time_reduction": 5.2,
        "optimized_routes_count": 247,
        "routes_increase": 14.8,
        "traffic_distribution": {
            "main_roads": 45,
            "highways": 35,
            "side_streets": 20
        },
        "impact": {
            "time_saved": 287450,
            "fuel_saved": 124500,
            "co2_reduction": 1120,
            "economic_benefit": 4200000
        }
    }
    
    return jsonify(summary)
@app.route('/')
def home():
    return {'message': 'Welcome to the Traffic Flow API!'}

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

    

