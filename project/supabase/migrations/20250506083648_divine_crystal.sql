-- Traffic Flow Optimization System Database Schema

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS traffic_flow;
USE traffic_flow;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'operator', 'viewer') NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Regions/Areas
CREATE TABLE IF NOT EXISTS regions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    boundaries POLYGON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Intersections/Traffic Points
CREATE TABLE IF NOT EXISTS intersections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    region_id INT,
    importance ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE SET NULL
);

-- Roads
CREATE TABLE IF NOT EXISTS roads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    road_type ENUM('highway', 'main_road', 'street', 'avenue') NOT NULL,
    speed_limit INT NOT NULL,
    lanes INT NOT NULL DEFAULT 2,
    length_km DECIMAL(10, 2) NOT NULL,
    start_intersection_id INT,
    end_intersection_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (start_intersection_id) REFERENCES intersections(id) ON DELETE SET NULL,
    FOREIGN KEY (end_intersection_id) REFERENCES intersections(id) ON DELETE SET NULL
);

-- Traffic Signals
CREATE TABLE IF NOT EXISTS traffic_signals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    intersection_id INT NOT NULL,
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    signal_type ENUM('standard', 'smart', 'adaptive') DEFAULT 'standard',
    green_duration_sec INT NOT NULL DEFAULT 30,
    yellow_duration_sec INT NOT NULL DEFAULT 5,
    red_duration_sec INT NOT NULL DEFAULT 60,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (intersection_id) REFERENCES intersections(id) ON DELETE CASCADE
);

-- Traffic Data
CREATE TABLE IF NOT EXISTS traffic_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    road_id INT NOT NULL,
    timestamp DATETIME NOT NULL,
    vehicle_count INT NOT NULL,
    avg_speed DECIMAL(5, 2) NOT NULL,
    congestion_level ENUM('low', 'medium', 'high') NOT NULL,
    weather_condition VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (road_id) REFERENCES roads(id) ON DELETE CASCADE,
    INDEX (timestamp),
    INDEX (road_id, timestamp)
);

-- Traffic Incidents
CREATE TABLE IF NOT EXISTS traffic_incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    road_id INT,
    intersection_id INT,
    incident_type ENUM('accident', 'construction', 'event', 'weather', 'other') NOT NULL,
    status ENUM('active', 'clearing', 'resolved') NOT NULL DEFAULT 'active',
    severity ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
    start_time DATETIME NOT NULL,
    expected_end_time DATETIME,
    actual_end_time DATETIME,
    description TEXT,
    reported_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (road_id) REFERENCES roads(id) ON DELETE SET NULL,
    FOREIGN KEY (intersection_id) REFERENCES intersections(id) ON DELETE SET NULL,
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Optimized Traffic Signals
CREATE TABLE IF NOT EXISTS signal_optimizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    signal_id INT NOT NULL,
    previous_green_duration INT NOT NULL,
    new_green_duration INT NOT NULL,
    previous_cycle_time INT NOT NULL,
    new_cycle_time INT NOT NULL,
    optimization_reason TEXT,
    optimizer_id INT, -- user or NULL if AI
    applied BOOLEAN DEFAULT FALSE,
    optimization_time DATETIME NOT NULL,
    application_time DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (signal_id) REFERENCES traffic_signals(id) ON DELETE CASCADE,
    FOREIGN KEY (optimizer_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Route Optimizations
CREATE TABLE IF NOT EXISTS optimized_routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    origin_intersection_id INT,
    destination_intersection_id INT,
    distance_km DECIMAL(10, 2) NOT NULL,
    estimated_duration_min INT NOT NULL,
    actual_duration_min INT,
    congestion_avoided_percent DECIMAL(5, 2),
    time_saved_min INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (origin_intersection_id) REFERENCES intersections(id) ON DELETE SET NULL,
    FOREIGN KEY (destination_intersection_id) REFERENCES intersections(id) ON DELETE SET NULL
);

-- AI Prediction Logs
CREATE TABLE IF NOT EXISTS ai_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prediction_type ENUM('congestion', 'signal_timing', 'route', 'incident') NOT NULL,
    target_id INT NOT NULL, -- road_id, intersection_id, etc. depending on type
    prediction_time DATETIME NOT NULL,
    prediction_data JSON NOT NULL,
    accuracy_score DECIMAL(5, 2),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System Settings
CREATE TABLE IF NOT EXISTS system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed some initial data
INSERT INTO users (username, email, password_hash, role)
VALUES 
    ('admin', 'admin@trafficflow.ai', '$2y$10$example_hash_for_demo', 'admin'),
    ('operator', 'operator@trafficflow.ai', '$2y$10$example_hash_for_demo', 'operator'),
    ('viewer', 'viewer@trafficflow.ai', '$2y$10$example_hash_for_demo', 'viewer');

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, description)
VALUES
    ('refresh_interval', '60', 'Data refresh interval in seconds'),
    ('ai_prediction_frequency', '15', 'AI prediction frequency in minutes'),
    ('data_retention_days', '90', 'How long to keep traffic data in days'),
    ('enable_ai_automation', 'true', 'Whether to automatically apply AI recommendations');