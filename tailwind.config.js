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
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
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
  			},
  			'slow-pan': {
  				'0%': { transform: 'scale(1) translate(0, 0)' },
  				'50%': { transform: 'scale(1.05) translate(-1%, -1%)' },
  				'100%': { transform: 'scale(1) translate(0, 0)' }
  			}
  		},
  		animation: {
  			'scan-line': 'scan-line 2s linear infinite',
  			'float': 'float 4s ease-in-out infinite',
  			'parallax': 'parallax 30s linear infinite',
  			'slow-pan': 'slow-pan 25s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}