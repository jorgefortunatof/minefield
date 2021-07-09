import React from 'react';

import { Container, Minefield } from './styles';

import Square from '../Square';
import Header from '../Header';
import { useMinefield } from '../../hooks/minefield';

const Board: React.FC = () => {
	const { board } = useMinefield();
	const boardSize = board.length;

	return (
		<Container>
			<Header />
			<Minefield boardSize={boardSize}>
				{board.map((item, index) => (
					<Square
						key={`key-${Math.random()}`}
						index={index}
						boardSize={boardSize}
						value={item}
					/>
				))}
			</Minefield>
		</Container>
	);
};

export default Board;
