import React from "react";
import '../assets/styles/components/CarouselItem.scss';

const CarouselItem = () => {
  return (
    <div className="carouselItem">
      <p>Combo 1</p>
      <ul>
        <li>1 Coco</li>
        <li>1 Coco</li>
        <li>1/4kg. Frutilla</li>
      </ul>
      <div className="d-flex justify-content-between align-items-center px-1">
        <button>VER</button>
        <p>$500</p>
      </div>
    </div>
  );
};

export default CarouselItem;
