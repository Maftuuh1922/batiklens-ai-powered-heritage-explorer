/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
  			serif: ['Playfair Display', 'serif'],
  			display: ['Playfair Display', 'serif'],
  			mono: ['JetBrains Mono', 'monospace']
  		},
  		colors: {
  			background: '#0F1F17',
  			foreground: '#F5F5F5',
  			primary: {
  				DEFAULT: '#2E7D32',
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#C8A951',
  				foreground: '#0F1F17'
  			},
  			accent: {
  				DEFAULT: '#1B3B2B',
  				foreground: '#C8A951'
  			},
  			muted: {
  				DEFAULT: '#1A2E24',
  				foreground: '#A3B3AA'
  			},
  			border: '#2A3F34',
  			ring: '#C8A951',
  			card: {
  				DEFAULT: 'rgba(26, 46, 36, 0.6)',
  				foreground: '#F5F5F5'
  			}
  		},
  		keyframes: {
  			'scan-line': {
  				'0%': { top: '0%' },
  				'100%': { top: '100%' }
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-10px)' }
  			},
  			'parallax': {
  				'0%': { backgroundPosition: '0% 0%' },
  				'100%': { backgroundPosition: '100% 100%' }
  			}
  		},
  		animation: {
  			'scan-line': 'scan-line 2s linear infinite',
  			'float': 'float 4s ease-in-out infinite',
  			'parallax': 'parallax 20s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}