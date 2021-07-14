import React from 'react';
import { Container } from './styles';

import Modal from '../components/Modal';
import Board from '../components/Board';

const App: React.FC = () => {
	return (
		<>
			<Container>
				<Board />
			</Container>
			<Modal />
		</>
	);
};

export default App;
