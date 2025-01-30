// src/screens/HomePage.tsx

import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeatureSection from '../components/home/FeatureSection';
import PopularCourses from '../components/home/PopularCourses';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CallToAction from '../components/home/CallToAction';


const HomePage: React.FC = () => {
  return (
    <div>

      <section>
        <HeroSection />
      </section>

      <section>
        <FeatureSection />
      </section>

      <section>
        <PopularCourses />
      </section>

      <section>
        <TestimonialsSection />
      </section>

      <section>
        <CallToAction />
      </section>
      

    </div>
  );
};

export default HomePage;
