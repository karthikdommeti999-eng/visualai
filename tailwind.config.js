/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    teal: '#00f0ff',     // Neon Teal/Cyan
                    cyan: '#00e5ff',     // Bright Cyan
                    dark: '#050505',     // Matte Black
                    accent: '#7000ff',   // Deep Purple/Blue for depth
                },
                dark: {
                    900: '#000000',      // Pure black
                    800: '#0a0a0a',      // Matte black surface
                    700: '#121212',      // Card bg
                    600: '#1a1a1a',      // Lighter card
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            animation: {
                'blob': 'blob 10s infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 15s linear infinite',
                'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '1', boxShadow: '0 0 20px #00f0ff' },
                    '50%': { opacity: '.5', boxShadow: '0 0 10px #00f0ff' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #00f0ff 0deg, #7000ff 180deg, #00f0ff 360deg)',
            }
        },
    },
    plugins: [],
}
