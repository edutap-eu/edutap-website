/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        `./src/pages/**/*.{js,jsx,ts,tsx}`,
        `./src/components/**/*.{js,jsx,ts,tsx}`,
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {

                    "primary": "#165793",
                    "secondary": "#3E99C0",
                    "accent": "#d86626",
                    "neutral": "#24343D",
                    "base-100": "#FFFFFF",
                    "info": "#A4D1E5",
                    "success": "#12684A",
                    "warning": "#EBC505",
                    "error": "#E84330",
                },
            },
        ],
    },
    plugins: [
        require('daisyui')
    ],
}
