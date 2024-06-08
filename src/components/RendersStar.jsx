import React from 'react';

const RendersStar = () => {
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className="w-4 h-4 text-yellow-300 me-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M11 0l3.09 6.26L21 7.27l-5 4.87L17.18 20 11 16.27 4.82 20l1.09-7.86L1 7.27l6.91-1.01L11 0z" />
      </svg>
    ));
  };

  return (
    <div className='flex'>
      {renderStars()}
    </div>
  );
};

export default RendersStar;
