import React from 'react';

export const ProductShowcase = () => {
  return (
    <section className="flex items-center gap-20 bg-white px-16 py-28 max-md:flex-col max-md:px-8 max-md:py-16 max-sm:px-4 max-sm:py-12">
      <div className="flex-1">
        <h2 className="text-[40px] font-bold text-black mb-6">
          Unlock Your Gaming Potential with Our Easy PC-Building Assistant
        </h2>
        <p className="text-lg text-black">
          Our PC-building assistant simplifies the process, making it accessible for everyone,
          especially beginners. Enjoy significant cost savings and ensure optimal gaming
          performance tailored to your favorite games.
        </p>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec2b025db6623a1e77e5481f1c88f7a43525a35a"
        alt="Gaming PC Build"
        className="flex-1 h-[640px] object-cover max-md:w-full"
      />
    </section>
  );
};
