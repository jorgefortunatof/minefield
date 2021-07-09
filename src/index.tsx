import React from 'react';
import ReactDOM from 'react-dom';

import GlobalStyle from './styles';
import { MinefieldContextProvider } from './hooks/minefield';
import App from './pages';

ReactDOM.render(
	<MinefieldContextProvider>
		<GlobalStyle />
		<App />
	</MinefieldContextProvider>,
	document.getElementById('root'),
);
