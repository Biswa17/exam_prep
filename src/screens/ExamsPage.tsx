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
