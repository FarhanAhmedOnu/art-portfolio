import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure the page is rendered
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    } else {
      // Scroll to top when no hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}