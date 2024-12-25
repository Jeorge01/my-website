import React, { useEffect } from "react";

const SectionObserver = ({ sectionRefs, firstPageActive, setFirstPageActive, setActiveSection }) => {
    useEffect(() => {
        const observerOptions = {
          root: null,
          rootMargin: "0px 0px -50% 0px",
          // Here we set a generic threshold, but we can adjust it within the observer callback
          threshold: [0.0005, 0.3], // You can keep both thresholds in the array
        };
      
        const observerCallback = (entries) => {
          entries.forEach((entry) => {
            const sectionId = entry.target.id;
      
            // Handle the firstpage visibility
            if (sectionId === "firstpage") {
              const isFirstPageVisible = entry.isIntersecting;
              setFirstPageActive(isFirstPageVisible);
      
              if (isFirstPageVisible) {
                setActiveSection("firstpage");
              }
            } else if (!firstPageActive) {
              // If firstpage is not active, check other sections
              const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      
              // Adjust the active section based on intersection ratio for the other sections
              if (visibleSections.length > 0 && entry.intersectionRatio >= 0.3) {
                setActiveSection(visibleSections[0].target.id);
              }
            }
          });
        };
      
        const observer = new IntersectionObserver(observerCallback, observerOptions);
      
        // Observe all sections
        Object.values(sectionRefs).forEach((ref) => {
          if (ref.current) observer.observe(ref.current);
        });
      
        // Cleanup observer on unmount
        return () => {
          Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) observer.unobserve(ref.current);
          });
        };
      }, [sectionRefs, firstPageActive, setFirstPageActive, setActiveSection]);
};

export default SectionObserver;