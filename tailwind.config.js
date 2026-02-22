import tailwindcssAnimate from 'tailwindcss-animate';

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
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				border: 'hsl(var(--border) / <alpha-value>)',
				ring: 'hsl(var(--foreground) / <alpha-value>)',
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				},
				'batik-navy': 'hsl(var(--batik-navy) / <alpha-value>)',
				'paper-cream': 'hsl(var(--paper-cream) / <alpha-value>)',
				'gold': 'hsl(var(--batik-gold) / <alpha-value>)'
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
	plugins: [tailwindcssAnimate]
}