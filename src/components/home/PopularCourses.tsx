import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Define the type for the exams
interface Exam {
  id: number;
  name: string;
  description: string;
}

const PopularCourses: React.FC = () => {
  // State to store exams fetched from API
  const [exams, setExams] = useState<Exam[]>([]);

  // Fetch the data when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/sf/get_popular_exams') // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success" && data.response?.exams) {
          setExams(data.response.exams); // Extract exams array correctly
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch((error) => console.error('Error fetching exams:', error)); // Log any errors
  }, []);
  return (
    <section className="w-100 my-5" style={{ backgroundColor: '#6cb2eb', padding: '40px 0' }}>
      <div className="container">
        <h2 className="text-center mb-4 text-white">Popular Courses</h2>
        <div className="row">
          {exams.map((exam) => (
            <div key={exam.id} className="col-md-4">
              <div className="card shadow-sm p-3 mb-4" style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
                <div className="card-body">
                  <h5 className="card-title text-primary">{exam.name}</h5>
                  <p className="card-text text-dark">{exam.description}</p>
                  <Link to={`/exam/${exam.id}`} className="btn" style={{ backgroundColor: '#28a745', color: '#fff' }}>
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
