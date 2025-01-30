import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExamHeader from '../components/examdetails/ExamHeader';
import TopicsAndPapers from '../components/examdetails/TopicsAndPapers';
import PracticeCTA from '../components/examdetails/PracticeCTA';

interface ExamDetails {
  name: string;
  description: string;
  topics: string[];
  previousPapers: string[];
}

const ExamDetailPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>(); // Get examId from URL
  const [examDetails, setExamDetails] = useState<ExamDetails | null>(null);

  useEffect(() => {
    if (!examId) return;

    const fetchExamDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/sf/get_exam/${examId}`);
        const data = await response.json();

        if (data.status === 'success' && data.response) {
          setExamDetails({
            name: data.response.name,
            description: data.response.description,
            topics: data.response.topics?.map((topic: { name: string }) => topic.name) || [],
            previousPapers: data.response.question_papers?.map((paper: { name: string }) => paper.name) || [],
          });
        }
      } catch (error) {
        console.error('Error fetching exam details:', error);
      }
    };

    fetchExamDetails();
  }, [examId]);

  if (!examDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Exam Header */}
      <ExamHeader name={examDetails.name} description={examDetails.description} />

      {/* Topics and Previous Question Papers */}
      <TopicsAndPapers 
        topics={examDetails.topics} 
        previousPapers={examDetails.previousPapers} 
        examId={Number(examId)} 
      />

      {/* Practice CTA */}
      <PracticeCTA examId={Number(examId)} />
    </div>
  );
};

export default ExamDetailPage;
