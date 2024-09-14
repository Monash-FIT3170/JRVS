/**
 * @file reportWebVitals.js
 * @description A utility function to measure and report web vitals for the application. It dynamically imports the 'web-vitals' library and provides metrics such as CLS, FID, FCP, LCP, and TTFB to a provided callback function.
 * @module WebVitals
 * @param {Function} onPerfEntry - Callback function to handle the performance entry results.
 * @requires web-vitals
 * @example
 * // Usage in the application
 * import reportWebVitals from './reportWebVitals';
 * reportWebVitals(console.log);
 * @returns {void}
 */


const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
