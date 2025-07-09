import React, { useEffect } from "react";

export const Starfield: React.FC = () => {
  // Mobile viewport height fix
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    function createStars(containerId: string, numStars: number, sizeRange: { min: number; max: number }) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = "";
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        const size = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.animationDelay = Math.random() * 3 + "s";
        container.appendChild(star);
      }
    }
    createStars("stars1", 200, { min: 1, max: 2 });
    createStars("stars2", 100, { min: 2, max: 3 });
    createStars("stars3", 50, { min: 1, max: 4 });
  }, []);

  return (
    <div className="starfield">
      <div className="stars star-layer-1" id="stars1"></div>
      <div className="stars star-layer-2" id="stars2"></div>
      <div className="stars star-layer-3" id="stars3"></div>
    </div>
  );
};
