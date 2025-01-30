import React from 'react';
import ExamHeader from '../components/examdetails/ExamHeader';
import TopicsAndPapers from '../components/examdetails/TopicsAndPapers';
import PracticeCTA from '../components/examdetails/PracticeCTA';

const ExamDetailPage: React.FC = () => {
  const examDetails = {
    id: 1,
    name: 'GATE Exam',
    description: 'The GATE exam is one of the most popular exams for admissions to postgraduate programs in India.',
    topics: [
        'General Aptitude',
        'Engineering Mathematics',
        'Digital Logic',
        'Computer Organization and Architecture',
        'Programming and Data Structures',
        'Algorithms',
        'Theory of Computation',
        'Compiler Design',
        'Operating Systems',
        'Databases',
        'Computer Networks'
      ],
    previousPapers: [
      'GATE 2024 Paper 1',
      'GATE 2023 Paper 2',
      'GATE 2022 Paper 3'
    ]
  };

  return (
    <div>
      {/* Exam Header */}
      <ExamHeader name={examDetails.name} description={examDetails.description} />

      {/* Topics and Previous Question Papers */}
      <TopicsAndPapers 
        topics={examDetails.topics} 
        previousPapers={examDetails.previousPapers} 
        examId={examDetails.id} 
      />

      {/* Practice CTA */}
      <PracticeCTA examId={examDetails.id} />
    </div>
  );
};

export default ExamDetailPage;
