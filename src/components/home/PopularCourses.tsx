import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaExclamationCircle, FaArrowRight } from 'react-icons/fa';

import { apiRequest } from "../../utils/apiHelper"

// Define the type for the exams
interface Exam {
  id: number;
  name: string;
  description: string;
}

const PopularCourses: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiRequest<{ exams: Exam[] }>("/api/sf/get_popular_exams", "GET");

        if (data.status === "success" && data.response?.exams) {
          setExams(data.response.exams);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
        console.error('Error fetching exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="row">
      {[1, 2, 3].map((i) => (
        <div key={i} className="col-md-4">
          <div className="card shadow-sm p-3 mb-4" style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
            <div className="card-body">
              <div className="bg-light w-75 h-4 mb-3" style={{ height: '24px' }}></div>
              <div className="bg-light w-100 mb-3" style={{ height: '60px' }}></div>
              <div className="bg-light w-25" style={{ height: '38px' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <section className="w-100 my-5 py-5" style={{ backgroundColor: '#6cb2eb' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-white mb-3">Popular Courses</h2>
          <p className="text-white-50">Explore our most sought-after exam preparation courses</p>
        </div>

        {loading && <LoadingSkeleton />}

        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <FaExclamationCircle className="me-2" />
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="row">
            {exams.map((exam) => (
              <div key={exam.id} className="col-md-4">
                <div 
                  className="card shadow-sm p-3 mb-4 h-100 transition-all" 
                  style={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '10px',
                    transform: 'translateY(0)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <FaBook className="text-primary me-2" size={24} />
                      <h5 className="card-title text-primary mb-0">{exam.name}</h5>
                    </div>
                    <p className="card-text text-dark flex-grow-1">{exam.description}</p>
                    <Link 
                      to={`/exam/${exam.id}`} 
                      className="btn btn-success d-flex align-items-center justify-content-center"
                      style={{ gap: '8px' }}
                    >
                      Learn More
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
