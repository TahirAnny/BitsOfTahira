import React from 'react';

const IconLoader = () => (
  <svg id="logo" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hexagon outline */}
    <path d="M40 10 L68 25 L68 55 L40 70 L12 55 L12 25 Z" stroke="#38bdf8" strokeWidth="4" fill="none" />
    {/* Stylized T as a path, grouped for fade-in */}
    <g id="B">
      <path d="M30 32 H50 M40 32 V55" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
    </g>
  </svg>
);

export default IconLoader; 