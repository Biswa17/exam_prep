import React from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'GATE CSE 2023',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    content: 'The practice questions on Exam Prep were incredibly similar to what I encountered in GATE. The detailed explanations helped me understand complex concepts better. I improved my score from 45 to 65 in just two months!',
    rating: 5
  },
  {
    id: 2,
    name: 'Rahul Patel',
    role: 'IES 2023 Qualifier',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    content: 'What sets Exam Prep apart is their comprehensive coverage of previous year questions and topic-wise practice sets. The performance analytics helped me identify and improve my weak areas. Secured AIR 235!',
    rating: 5
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'UPSC ESE 2023',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    content: 'The mock tests on Exam Prep are well-designed and match the actual exam pattern perfectly. The timed practice helped me manage my speed during the real exam. Their study material is pure gold!',
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">Success Stories</h2>
        <p className="section-subtitle">Hear from our toppers who cracked their exams with Exam Prep</p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-meta">
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <span className="testimonial-role">{testimonial.role}</span>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="testimonial-content">
                "{testimonial.content}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
