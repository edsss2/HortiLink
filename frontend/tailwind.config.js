/** @type {import('tailwindcss').Config} */
// Mude de 'module.exports' para 'export default'
export default { 
  content: [
    "./index.html", // Adicione o index.html por segurança
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

