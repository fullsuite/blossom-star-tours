import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
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
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
	  container: {
		padding: {
		  DEFAULT: '1rem',
		  sm: '2rem',
		  lg: '4rem',
		  xl: '5rem',
		  '2xl': '6rem',
		},
		center: true
	  },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
