const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const daisyui = require('daisyui');
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			  }
		},
	},

	plugins: [forms, typography, daisyui],
	daisyui: {
		logs: false,
		darkTheme: 'duel-in-the-dark',
		themes: [
			{
				'duel-in-the-dark': {
					primary: '#f72585',

					secondary: '#42FFF7',

					accent: '#B5179E',

					neutral: '#3A0CA3',

					'base-100': '#03045e',
					'base-200': '#FFEEEE',
					'base-300': '#030415',

					info: '#4361EE',

					success: '#80ffdb',

					warning: '#ffbe0b',

					error: '#fb5607',

					'--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
					'--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
					'--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
					'--animation-btn': '0.25s', // duration of animation when you click on button
					'--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
					'--btn-text-case': 'uppercase', // set default text transform for buttons
					'--btn-focus-scale': '0.95', // scale transform of button when you focus on it
					'--border-btn': '1px', // border width of buttons
					'--tab-border': '1px', // border width of tabs
					'--tab-radius': '0.5rem', // border radius of tabs
				},
			},
			'light',
			'dark',
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter',
		],
	},
};

module.exports = config;
