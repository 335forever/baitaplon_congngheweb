import './DropdownGrid.css';

import React, { useState } from 'react';

function DropdownGrid({ categories, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState('Tất cả');

  return (
    <div className="dropdown-container">
      <button onClick={() => setIsOpen(!isOpen)}>{option}</button>
      {isOpen && (
        <div className="grid-container">
          <button onClick={(e) => { setIsOpen(false); setOption('Tất cả'); onChange(null); }}>
            <div key={0} className="grid-item">
              <span className="label">Tất cả</span>
            </div>
          </button>
          {categories.map((category, index) => (
            <button onClick={(e) => { setIsOpen(false); setOption(category.name); onChange(category.categoryID); }}>
              <div key={index} className="grid-item">
                <span className="label">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownGrid;
