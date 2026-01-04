/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',

                // Theme Semantic Colors (Switch automatically)
                page: 'var(--bg-primary)',   // Page background
                card: 'var(--bg-secondary)', // Card background
                input: 'var(--bg-tertiary)', // Input/setup background

                // Text
                main: 'var(--text-primary)',
                sub: 'var(--text-secondary)',
                muted: 'var(--text-tertiary)',
                inverse: 'var(--text-inverse)',

                // Borders
                border: 'var(--border-light)',
            },
            fontFamily: {
                sans: ['"Segoe UI"', 'Roboto', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
