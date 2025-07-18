import React, { useState, useEffect } from 'react';
import { Accordion, Card, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ExamsPage.css';

// TypeScript interfaces for the data structure
interface Exam {
  id: number;
  name: string;
  description: string;
}

interface Subcategory {
  id: number;
  name: string;
  description: string;
  parent_id: number;
  level: number;
  children: any[]; // This array is empty in the provided data
  exams: Exam[];
}

interface Category {
  id: number;
  name: string;
  description: string;
  parent_id: null;
  level: number;
  children: Subcategory[];
}

// Provided category tree data
const categoryTreeData: Category[] = 
[
    {
        "id": 1,
        "name": "Engineering",
        "description": "All engineering-related exams",
        "parent_id": null,
        "level": 1,
        "children": [
            {
                "id": 5,
                "name": "GATE",
                "description": "Graduate Aptitude Test in Engineering",
                "parent_id": 1,
                "level": 2,
                "children": [],
                "exams": [
                    {
                        "id": 1,
                        "name": "GATE CSE",
                        "description": "Graduate Aptitude Test in Engineering for Computer Science and Engineering."
                    },
                    {
                        "id": 6,
                        "name": "GATE Mecha",
                        "description": "gate mechainal eng"
                    }
                ]
            },
            {
                "id": 6,
                "name": "JEE Main",
                "description": "Joint Entrance Examination Main",
                "parent_id": 1,
                "level": 2,
                "children": [],
                "exams": [
                    {
                        "id": 2,
                        "name": "JEE",
                        "description": "Joint Entrance Examination for undergraduate engineering courses."
                    }
                ]
            },
            {
                "id": 7,
                "name": "JEE Advanced",
                "description": "Joint Entrance Examination Advanced",
                "parent_id": 1,
                "level": 2,
                "children": [],
                "exams": [
                    {
                        "id": 2,
                        "name": "JEE",
                        "description": "Joint Entrance Examination for undergraduate engineering courses."
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "name": "Medical",
        "description": "All medical-related exams",
        "parent_id": null,
        "level": 1,
        "children": [
            {
                "id": 8,
                "name": "NEET UG",
                "description": "National Eligibility cum Entrance Test for UG",
                "parent_id": 2,
                "level": 2,
                "children": [],
                "exams": [
                    {
                        "id": 3,
                        "name": "NEET",
                        "description": "National Eligibility cum Entrance Test for medical courses."
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "name": "Management",
        "description": "All management-related exams",
        "parent_id": null,
        "level": 1,
        "children": [
            {
                "id": 9,
                "name": "CAT",
                "description": "Common Admission Test for management courses",
                "parent_id": 3,
                "level": 2,
                "children": [],
                "exams": [
                    {
                        "id": 5,
                        "name": "CAT",
                        "description": "Common Admission Test for management courses."
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "name": "Civil Services",
        "description": "Civil service and government exams",
        "parent_id": null,
        "level": 1,
        "children": [
            {
                "id": 10,
                "name": "UPSC CSE",
                "description": "Union Public Service Commission Civil Services Examination",
                "parent_id": 4,
                "level": 2,
                "children": [],
                "exams": [
                    {
                        "id": 4,
                        "name": "UPSC",
                        "description": "Union Public Service Commission Civil Services Examination."
                    }
                ]
            }
        ]
    }
];

const ExamsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Category[]>([]); // State to hold the data

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      try {
        // In a real app, you would fetch this data from an API
        if (categoryTreeData && Array.isArray(categoryTreeData)) {
          setData(categoryTreeData);
          setLoading(false);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error("Error processing exam categories:", err);
        setError('Failed to load exam categories. Please try again later.');
        setLoading(false);
      }
    }, 500); // Reduced timeout for quicker feedback
  }, []);

  if (loading) {
    return <div className="container mt-4 text-center loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-center text-danger error-container">Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="container mt-4 text-center">No exam categories found.</div>;
  }

  return (
    <div className="exams-page">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="mb-3">Explore Exams</h1>
            <p className="lead text-muted">Browse through our comprehensive collection of exam categories and preparations</p>
          </div>
        </div>
        
        <Accordion defaultActiveKey="1"> {/* Start with first category open */}
          {data.map((category) => (
            <Accordion.Item key={category.id} eventKey={category.id.toString()} className="mb-4 category-accordion">
              <Accordion.Header>
                <span className="category-name">{category.name}</span>
                <Badge bg="primary" pill className="ms-2">{category.children.length}</Badge>
              </Accordion.Header>
              <Accordion.Body>
                <p className="category-description mb-4">{category.description}</p>
                
                {category.children && category.children.length > 0 ? (
                  <div>
                    {category.children.map((subcategory) => (
                      <div key={subcategory.id} className="subcategory-section mb-5">
                        <h4 className="subcategory-heading mb-3">{subcategory.name}</h4>
                        <p className="text-muted mb-4">{subcategory.description}</p>
                        
                        {subcategory.exams && subcategory.exams.length > 0 ? (
                          <div className="row g-4">
                            {subcategory.exams.map((exam) => (
                              <div key={`${subcategory.id}-${exam.id}`} className="col-md-6 col-lg-4">
                                <Card className="h-100 exam-card">
                                  <Card.Body className="d-flex flex-column">
                                    <Card.Title className="exam-card-title mb-2">{exam.name}</Card.Title>
                                    <Card.Text className="exam-card-description text-muted small flex-grow-1">
                                      {exam.description}
                                    </Card.Text>
                                    <Link to={`/exam/${exam.id}`} className="btn btn-outline-primary btn-sm mt-3 align-self-start">
                                      View Details
                                    </Link>
                                  </Card.Body>
                                  <Card.Footer className="text-muted small">
                                    Exam ID: {exam.id}
                                  </Card.Footer>
                                </Card>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted">No exams listed under {subcategory.name}.</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-light">No subcategories found for {category.name}.</div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ExamsPage;
