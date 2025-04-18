import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Define the type for the Topics and Previous Papers sections
interface TopicsAndPapersProps {
  topics: { id: number, name: string, solved_percentage: number }[]; // Include solved_percentage
  previousPapers: { id: number, name: string }[];
  examId: number;
}

const TopicsAndPapers: React.FC<TopicsAndPapersProps> = ({ topics, previousPapers, examId }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <section className="topics-papers-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">

        {/* Topics Section */}
        <h2 className="text-center mb-4">Topics to Cover</h2>
        <div className="row mb-5">
          {topics.map((topic, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div 
                className="card shadow-sm rounded-lg p-3" 
                style={{ transition: 'transform 0.3s', cursor: 'pointer', border: '1px solid #ddd' }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div className="card-header text-center" style={{ backgroundColor: '#e9ecef', padding: '15px' }}>
                  <img 
                    src={`https://img.icons8.com/ios-filled/100/open-book.png`} 
                    alt={topic.name} 
                    style={{ width: '50px', height: '50px' }} 
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title text-primary" style={{ fontWeight: 'bold' }}>{topic.name}</h5>
                  {/* Progress Bar */}
                  <div style={{ height: '5px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}> {/* Added borderRadius and overflow */}
                    <div 
                      style={{
                        height: '100%',
                        width: `${topic.solved_percentage}%`, // Update width dynamically
                        backgroundColor: '#28a745',
                        borderRadius: '5px', // Keep border radius for inner bar
                        transition: 'width 0.5s ease-in-out' // Optional: Add transition for visual effect
                      }}
                    ></div>
                  </div>
                  {accessToken ? (
                    <Link
                      to={`/questions/${topic.id}?examId=${examId}`} // Pass examId as query parameter
                      className="btn btn-outline-primary mt-3"
                      style={{ borderRadius: '20px', backgroundColor: '#28a745', color: '#fff' }}
                    >
                      Start Learning
                    </Link>
                  ) : (
                    <button
                      className="btn btn-outline-primary mt-3"
                      style={{ borderRadius: '20px', backgroundColor: '#28a745', color: '#fff' }}
                      onClick={handleLoginRedirect}
                    >
                      Login to Start Learning
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Question Papers Section */}
        <h3 className="text-center mb-4">Previous Question Papers</h3>
        <div className="row">
          {previousPapers.map((paper, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div 
                className="card shadow-sm rounded-lg p-3" 
                style={{ border: '1px solid #ddd', backgroundColor: '#fff' }}
              >
                <div className="card-header" style={{ backgroundColor: '#f7f7f7', padding: '15px' }}>
                  <h5 className="card-title text-primary">{paper.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text" style={{ fontSize: '14px', color: '#555' }}>
                    Previous question papers to help you practice. Click to view or attempt the paper.
                  </p>
                  <div className="d-flex justify-content-between">
                    {/* View Paper Button */}
                    <a href="#" className="btn btn-outline-secondary w-48" style={{ borderRadius: '20px' }}>
                      View Paper
                    </a>
                    {/* Attempt Paper Button */}
                    {accessToken ? (
                      <Link
                        to={`/question-paper/${paper.id}?examId=${examId}`} // Updated link for question papers
                        className="btn btn-outline-primary w-48"
                        style={{ borderRadius: '20px' }}
                      >
                        Attempt Paper
                      </Link>
                    ) : (
                      <button
                        className="btn btn-outline-primary w-48"
                        style={{ borderRadius: '20px' }}
                        onClick={handleLoginRedirect}
                      >
                        Login to Attempt
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsAndPapers;
