import React, { useState, useEffect } from 'react';
import { Accordion, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiRequest } from '../utils/apiHelper';
import './ExamsPage.css';

// TypeScript interfaces for the API response structure
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
  children: Subcategory[];
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

const ExamsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Category[]>([]); // State to hold the data

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiData = await apiRequest<Category[]>('/api/sf/categories/tree', 'GET');
        
        if (apiData.status === 'success' && apiData.response) {
          setData(apiData.response);
        } else {
          throw new Error(apiData.message || 'Failed to fetch categories');
        }
      } catch (err) {
        console.error("Error fetching exam categories:", err);
        setError(err instanceof Error ? err.message : 'Failed to load exam categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading exam categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 text-center error-container">
        <div className="alert alert-danger" role="alert">
          <h5 className="alert-heading">Oops! Something went wrong</h5>
          <p>{error}</p>
          <button className="btn btn-outline-danger btn-sm" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <div className="alert alert-info" role="alert">
          <h5 className="alert-heading">No Exams Found</h5>
          <p>We couldn't find any exam categories at the moment. Please check back later.</p>
        </div>
      </div>
    );
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
        
        <Accordion 
          defaultActiveKey="1" 
          aria-label="Exam categories"
          className="accordion-container"
        >
          {data.map((category) => (
            <Accordion.Item 
              key={category.id} 
              eventKey={category.id.toString()} 
              className="mb-4 category-accordion"
            >
              <Accordion.Header
                onClick={(e) => {
                  // Prevent default scroll behavior
                  e.preventDefault();
                  // Use smooth scrolling
                  const header = e.currentTarget;
                  setTimeout(() => {
                    header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }, 100);
                }}
              >
                <span className="category-name">{category.name}</span>
                <Badge bg="primary" pill className="ms-2" aria-label={`${category.children.length} subcategories`}>
                  {category.children.length}
                </Badge>
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
                                    <Link 
                                      to={`/exam/${exam.id}`} 
                                      className="btn btn-primary btn-sm mt-3 align-self-start"
                                      aria-label={`View details for ${exam.name}`}
                                    >
                                      View Details
                                    </Link>
                                  </Card.Body>
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
import React, { useState, useEffect } from 'react';
// Removed NavBar import
// Removed Footer import
import './ExamsPage.css'; 
// Assuming apiHelper has a function like getCategoryTree
// import { getCategoryTree } from '../utils/apiHelper'; 

// Define an interface for the category structure based on your API response
interface Category {
    id: number;
    name: string;
    description: string | null;
    parent_id: number | null;
    level: number;
    created_at?: string; // Added optional created_at
    updated_at?: string; // Added optional updated_at
    children: Category[];
}

const ExamsPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Placeholder for fetching categories - will implement actual fetch later
        const fetchCategories = async () => {
            try {
                setLoading(true);
                // const data = await getCategoryTree(); // Replace with actual API call
                // Mock data for now based on your example
                const mockData: Category[] = [
                    {
                        "id": 1, "name": "Engineering", "description": "All engineering-related exams", "parent_id": null, "level": 1, "created_at": "2025-04-20T19:27:31.000000Z", "updated_at": "2025-04-20T19:27:31.000000Z",
                        "children": [ { "id": 5, "name": "Postgraduate Engineering", "description": "Exams for postgraduate engineering admissions", "parent_id": 1, "level": 2, "created_at": "2025-04-20T19:27:31.000000Z", "updated_at": "2025-04-20T19:27:31.000000Z", "children": [ { "id": 10, "name": "GATE", "description": "Graduate Aptitude Test in Engineering", "parent_id": 5, "level": 3, "created_at": "2025-04-20T19:27:31.000000Z", "updated_at": "2025-04-20T19:27:31.000000Z", "children": [] } ] }, { "id": 6, "name": "Undergraduate Engineering", "description": "Exams for undergraduate engineering admissions", "parent_id": 1, "level": 2, "created_at": "2025-04-20T19:27:31.000000Z", "updated_at": "2025-04-20T19:27:31.000000Z", "children": [ { "id": 11, "name": "JEE Main", "description": "Joint Entrance Examination Main", "parent_id": 6, "level": 3, "created_at": "2025-04-20T19:27:31.000000Z", "updated_at": "2025-04-20T19:27:31.000000Z", "children": [] }, { "id": 12, "name": "JEE Advanced", "description": "Joint Entrance Examination Advanced", "parent_id": 6, "level": 3, "created_at": "2025-04-20T19:27:31.000000Z", "updated_at": "2025-04-20T19:27:31.000000Z", "children": [] } ] } ]
                    },
                    // Add other top-level categories similarly...
                ];
                setCategories(mockData);
                setError(null);
            } catch (err) {
                setError('Failed to load categories.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Recursive function to render categories
    const renderCategories = (categoryList: Category[]) => {
        if (!categoryList || categoryList.length === 0) {
            return null;
        }
        return (
            <ul>
                {categoryList.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        {/* Recursively render children */}
                        {renderCategories(category.children)}
                    </li>
                ))}
            </ul>
        );
    };


    return (
        // Removed outer div and NavBar
        <main className="exams-content"> {/* Changed div to main and removed exams-page class */}
            <h1>Browse Exams by Category</h1>
            <div className="category-layout">
                    <aside className="category-sidebar">
                        <h2>Categories</h2>
                        {loading && <p>Loading categories...</p>}
                        {error && <p className="error-message">{error}</p>}
                        {!loading && !error && renderCategories(categories)}
                    </aside>
                    <section className="category-main-content">
                        {/* Content related to selected category will go here */}
                        <p>Select a category to see associated exams or content.</p>
                    </section>
                </div>
            </main>
            // Removed Footer
    );
};

export default ExamsPage;
