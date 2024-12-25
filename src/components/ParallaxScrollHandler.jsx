import React, { useEffect } from "react";

const ParallaxScrollHandler = ({ sectionRefs, setActiveSection }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxHeading = document.querySelector(".parallax-heading");

      const parallaxSpeed = 0.35;

      if (parallaxHeading) {
        parallaxHeading.style.transform = `translate(-50%, calc(-85% + ${scrollPosition * parallaxSpeed}px))`;
      }

      // Determine the current active section based on scroll position
      Object.keys(sectionRefs).forEach((sectionKey) => {
        const section = sectionRefs[sectionKey].current;
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section is visible in the viewport
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            setActiveSection(sectionKey);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs, setActiveSection]);

  return null; // This component doesn't render anything visible
};

export default ParallaxScrollHandler;
