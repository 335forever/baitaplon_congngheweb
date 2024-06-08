import './DropdownGrid.css';

import React, { useState } from 'react';

import icMobility from "../../assets/images/ic_mobility.svg";
import icComputer from "../../assets/images/ic_computer.svg";
import icFashion from "../../assets/images/ic_fashion.svg";
import icCamera from "../../assets/images/ic_camera.svg";
import icAccessory from "../../assets/images/ic_accessory.svg";
import icGame from "../../assets/images/ic_game.svg";

function DropdownGrid() {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState('Di động');

  const options = [
    { label: 'Tất cả' },
    { icon: icMobility, label: 'Di động' },
    { icon: icComputer, label: 'Computers' },
    { icon: icFashion, label: 'Thời trang' },
    { icon: icCamera, label: 'Camera' },
    { icon: icAccessory, label: 'Phụ kiện' },
    { icon: icGame, label: 'Giải trí' }
  ];

  return (
    <div className="dropdown-container">
      <button onClick={() => setIsOpen(!isOpen)}>Chọn Danh Mục</button>
      {isOpen && (
        <div className="grid-container">
          {options.map((option, index) => (
            <button>
              <div key={index} className="grid-item">
                {option.icon != null ? <span className="icon"><img src={option.icon} /></span> : <div />}
                <span className="label">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownGrid;
