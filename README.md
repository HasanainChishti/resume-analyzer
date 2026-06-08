# AI Resume Analyzer

An AI-powered Resume Analyzer built with React, Node.js, Express, MongoDB, and Gemini API.

The application compares a user's resume with a job description, identifies missing skills, calculates a match score, and stores analysis history for future reference.

## Features

* Analyze resumes against job descriptions
* Extract required skills using Gemini AI
* Identify missing skills
* Calculate resume-job match score
* Store analysis history in MongoDB
* View previous analyses on the History page
* Responsive user interface

## Tech Stack

### Frontend

* React
* React Router DOM
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### AI Integration

* Gemini API

## Project Structure

ai-resume-analyzer/
├── frontend/
├── backend/
└── README.md

## Installation

### Clone Repository

```bash
git clone https://github.com/HasanainChisti/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

## How It Works

1. User enters resume content.
2. User pastes a job description.
3. Gemini AI extracts required skills from the job description.
4. The application compares resume skills with required skills.
5. Missing skills and match score are generated.
6. Results are stored in MongoDB.
7. Users can access previous analyses from the History page.

## Future Improvements

* PDF Resume Upload
* ATS Compatibility Score
* Resume Improvement Suggestions
* Authentication & User Accounts
* Dashboard Analytics
* Export Analysis Reports

## Author

Muhammad Hasanain
