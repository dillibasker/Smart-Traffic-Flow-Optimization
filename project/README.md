# Smart Traffic Flow Optimization System

A comprehensive traffic management solution that uses AI-EBPL (Artificial Intelligence-based Enhanced Bi-level Predictive Learning) to monitor traffic conditions, predict congestion zones, and suggest optimized routes or signal adjustments in real time.

## Features

- Real-time traffic monitoring dashboard with 3D city visualization
- AI-based congestion prediction with heatmap overlays
- Route optimization to avoid congestion
- Traffic signal timing management and optimization
- Historical traffic data analysis and reporting
- Admin panel for infrastructure management

## Technologies

### Frontend
- React (with TypeScript)
- Three.js for 3D visualization
- Chart.js for data visualization
- Tailwind CSS for styling

### Backend
- Python with Flask
- MySQL database
- Machine Learning models for traffic prediction

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- MySQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/traffic-flow-optimization.git
cd traffic-flow-optimization
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
```

4. Set up the database
```bash
mysql -u root -p < backend/database/schema.sql
```

5. Configure environment variables
   - Create a `.env` file in the backend directory with your MySQL credentials

### Running the application

1. Start the backend server
```bash
cd backend
python app.py
```

2. Start the frontend development server
```bash
npm run dev
```

## Project Structure

```
traffic-flow-optimization/
├── public/                  # Static assets
├── src/                     # Frontend source code
│   ├── components/          # Reusable UI components
│   ├── layouts/             # Page layouts
│   ├── pages/               # Page components
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── backend/                 # Python backend
│   ├── database/            # Database scripts
│   ├── app.py               # Main Flask application
│   └── requirements.txt     # Python dependencies
└── README.md                # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.