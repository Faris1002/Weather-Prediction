import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, linkText, linkTo }) => (
  <div className="flex flex-col items-center gap-6 text-center">
    <div>{icon}</div>
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-bold text-black">{title}</h3>
      <p className="text-base text-black">{description}</p>
    </div>
    <div>
      <Link
        to={linkTo}
        className="text-base text-black no-underline flex items-center gap-2 hover:text-gray-600"
      >
        <span>{linkText}</span>
        <i className="ti ti-chevron-right" />
      </Link>
    </div>
  </div>
);

export const Features = () => {
  return (
    <section className="bg-white px-16 py-28 max-md:px-8 max-md:py-16 max-sm:px-4 max-sm:py-12">
      <div className="flex justify-center gap-8 max-md:flex-col">
        <FeatureCard
          icon={<div dangerouslySetInnerHTML={{ __html: "<svg class='feature-icon'></svg>" }} />}
          title="Game-First Approach: Tailor Your Build to Your Favorite Titles"
          description="Our intuitive configurator guides you through every step of building your PC."
          linkText="Start"
          linkTo="/build"
        />
        <FeatureCard
          icon={<div dangerouslySetInnerHTML={{ __html: "<svg class='feature-icon'></svg>" }} />}
          title="Real-Time Price Optimization for Smart Shopping"
          description="Leverage AI to find the best prices from top retailers instantly."
          linkText="Compare"
          linkTo="/prices"
        />
        <FeatureCard
          icon={<div dangerouslySetInnerHTML={{ __html: "<svg class='feature-icon'></svg>" }} />}
          title="Ensure Compatibility with Our Comprehensive Report Tool"
          description="Avoid bottlenecks and mismatches with our detailed compatibility checks."
          linkText="Check"
          linkTo="/compatibility"
        />
      </div>
    </section>
  );
};
