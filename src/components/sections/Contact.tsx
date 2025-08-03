import React from 'react';

const ContactCard = ({ icon, title, description, link, linkText }) => (
  <div className="flex-1 flex flex-col items-center gap-6 text-center">
    <div>{icon}</div>
    <div className="flex flex-col gap-6">
      <h3 className="text-[32px] font-bold text-black">{title}</h3>
      <p className="text-base text-black mt-4 mb-6 mx-0">{description}</p>
      <a href={link} className="text-base text-black underline hover:text-gray-600">
        {linkText}
      </a>
    </div>
  </div>
);

export const Contact = () => {
  return (
    <section className="bg-white px-16 py-28 max-md:px-8 max-md:py-16 max-sm:px-4 max-sm:py-12">
      <div className="flex gap-12 max-md:flex-col">
        <ContactCard
          icon={<div dangerouslySetInnerHTML={{ __html: "<svg class='contact-icon'></svg>" }} />}
          title="Email"
          description="For support and inquiries, reach out to us anytime!"
          link="mailto:support@pcbuilder.com"
          linkText="support@pcbuilder.com"
        />
        <ContactCard
          icon={<div dangerouslySetInnerHTML={{ __html: "<svg class='contact-icon'></svg>" }} />}
          title="Phone"
          description="Call us for immediate assistance with your PC building questions."
          link="tel:+15551234567"
          linkText="+1 (555) 123-4567"
        />
        <ContactCard
          icon={<div dangerouslySetInnerHTML={{ __html: "<svg class='contact-icon'></svg>" }} />}
          title="Office"
          description="Visit our location for in-person consultations."
          link="#"
          linkText={
            <>
              <span>123 Tech Street, Suite 100</span>
              <br />
              <span>Silicon Valley, CA 94025</span>
            </>
          }
        />
      </div>
    </section>
  );
};
