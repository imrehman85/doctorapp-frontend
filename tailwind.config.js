/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./mohsss-oap/**/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'tab': {'min': '640px', 'max': '1024px'} // Styles will apply up to 767 pixels
      },
    },
  },
  plugins: [],
};
