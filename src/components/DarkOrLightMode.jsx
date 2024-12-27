import { useEffect } from 'react';

const DarkOrLightMode = () => {
  useEffect(() => {
    const updateFavicons = (theme) => {
      const basePath = `/favicons/${theme}faviconsfolder/`;

      // Update favicon links dynamically
      document.getElementById("favicon-96").href = `${basePath}favicon-96x96.png`;
      document.getElementById("favicon-svg").href = `${basePath}favicon.svg`;
      document.getElementById("favicon-ico").href = `${basePath}favicon.ico`;
      document.getElementById("apple-touch-icon").href = `${basePath}apple-touch-icon.png`;
      document.getElementById("manifest").href = `${basePath}site.webmanifest`;
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => updateFavicons(mediaQuery.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', applyTheme); // Listen for system theme changes
    applyTheme(); // Set initial theme

    // Cleanup event listener on unmount
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, []);

  return (
    <>
      {/* Default favicon links for React rendering */}
      <link id="favicon-96" rel="icon" type="image/png" href="/favicons/lightfaviconsfolder/favicon-96x96.png" sizes="96x96" />
      <link id="favicon-svg" rel="icon" type="image/svg+xml" href="/favicons/lightfaviconsfolder/favicon.svg" />
      <link id="favicon-ico" rel="shortcut icon" href="/favicons/lightfaviconsfolder/favicon.ico" />
      <link id="apple-touch-icon" rel="apple-touch-icon" sizes="180x180" href="/favicons/lightfaviconsfolder/apple-touch-icon.png" />
      <link id="manifest" rel="manifest" href="/favicons/lightfaviconsfolder/site.webmanifest" />
    </>
  );
};

export default DarkOrLightMode;
