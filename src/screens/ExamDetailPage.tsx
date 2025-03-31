import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExamHeader from '../components/examdetails/ExamHeader';
import TopicsAndPapers from '../components/examdetails/TopicsAndPapers';
import PracticeCTA from '../components/examdetails/PracticeCTA';
import { apiRequest } from "../utils/apiHelper"


interface ExamDetails {
  name: string;
  description: string;
  topics: { id: number, name: string, solved_percentage: number }[]; // Include topic ID and solved percentage
  previousPapers: { id: number, name: string }[];
}

const ExamDetailPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>(); // Get examId from URL
  const [examDetails, setExamDetails] = useState<ExamDetails | null>(null);

  useEffect(() => {
    if (!examId) return;

    const fetchExamDetails = async () => {
      try {
        // Update the expected type for the API response
        const data = await apiRequest<{ 
          name: string; 
          description: string; 
          topics: { id: number; name: string; solved_percentage: number }[]; 
          question_papers: { id: number; name: string }[] 
        }>(
          `/api/sf/get_exam/${examId}`,
          "GET"
        );
        if (data.status === 'success' && data.response) {
          setExamDetails({
            name: data.response.name,
            description: data.response.description,
            // Map solved_percentage along with id and name
            topics: data.response.topics?.map((topic: { id: number, name: string, solved_percentage: number }) => ({ 
              id: topic.id, 
              name: topic.name, 
              solved_percentage: topic.solved_percentage 
            })) || [],
            previousPapers: data.response.question_papers?.map((paper: { id: number, name: string }) => ({ id: paper.id, name: paper.name })) || [],
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
