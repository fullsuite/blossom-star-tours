import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
		screens: {
			'xxs': '375px',
			'xs': '480px',
			'2xs': '576px',
			'sm': '640px',
			'md': '768px',
			'lg': '992px',
			'2lg': '1064px',
			'xl': '1200px',
			'2xl': '1320px',
			'3xl': '1440px',
			'4xl': '1600px',
			'5xl': '1920px',
			'6xl': '2560px',
		},
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
				transparent: 'transparent',
				current: 'currentColor',
				'white': '#ffffff',
				'black': '#000000',
				'primary': '#22875D',
				'body': "#3B3B3B",
				'body-secondary': "#808285",
				'body-light': "#AEAEAE",
				'accent-pink': "#ED768B",
				'eucalyptus': {
					'50': '#effaf4',
					'100': '#d8f3e2',
					'200': '#b5e5ca',
					'300': '#84d1ab',
					'400': '#51b687',
					'500': '#2f9a6d',
					'600': '#22875e',
					'700': '#196347',
					'800': '#164f3a',
					'900': '#134131',
					'950': '#0a241c',
					},	
				'wild-sand': {
					'50': '#f6f6f6',
					'100': '#efefef',
					'200': '#dcdcdc',
					'300': '#bdbdbd',
					'400': '#989898',
					'500': '#7c7c7c',
					'600': '#656565',
					'700': '#525252',
					'800': '#464646',
					'900': '#3d3d3d',
					'950': '#292929',
				},    
  		},
      boxShadow: {
        'md': '0 4px 9.7px 0 rgba(0, 0, 0, 0.06)',
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
			height: {
        'custom-225': '225px',
        'custom-275': '275px'
      }
  	},
	  container: {
		padding: {
		  DEFAULT: '1rem',
		  sm: '1.5rem',
		  md: '2rem',
		  lg: '3rem',
		  xl: '5rem',
		  '2xl': '7.5rem',
		},
		center: true
	  },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
