import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import HomePage from './screens/HomePage';
import FeaturesPage from './screens/FeaturesPage';
import ResourcesPage from './screens/ResourcesPage';
import AboutPage from './screens/AboutPage';
import ContactPage from './screens/ContactPage';
import ExamDetails from './screens/ExamDetailPage';
import QuestionPage from './screens/QuestionPage';
import QuestionPageForQuestionPaper from './screens/QuestionPageForQuestionPaper'; // Added import
import Login from './screens/Login';
import ProfilePage from './screens/ProfilePage';
import ExamsPage from './screens/ExamsPage'; // Import the ExamsPage component

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/exam/:examId" element={<ExamDetails />} />
            <Route path="/questions/:topicId" element={<QuestionPage />} />
            <Route path="/question-paper/:questionPaperId" element={<QuestionPageForQuestionPaper />} /> {/* Added route */}
            <Route path="/exams" element={<ExamsPage />} /> {/* Add route for ExamsPage */}
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
