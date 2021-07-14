import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
		--primary: #FD5757;
		--secondary: #007EC4;

		--square-even: #595959;
		--square-odd: #494949;

		--clicked-square-even: #EFE1E1;
		--clicked-square-odd: #E6D8D8;

		--black: #232323;
		--white: #fff;

		--mine-1: #1E14FD;
		--mine-2: #047E05;
		--mine-3: #FA0200;
		--mine-4: #0C0682;
		--mine-5: #7D0404;
		--mine-6: #0A8282;
		--mine-7: #151515;
		--mine-8: #838383;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}
`;

export default GlobalStyle;
