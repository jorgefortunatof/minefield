import React, { useCallback } from 'react';

import { Container } from './styles';
import { ReactComponent as BlackMine } from '../../assets/black-mine.svg';
import { ReactComponent as ExplodingMine } from '../../assets/exploding-mine.svg';

import { useMinefield } from '../../hooks/minefield';

type Props = {
	value: number;
	index: number;
	boardSize: number;
};

const Square: React.FC<Props> = ({ index, value, boardSize }) => {
	const { gameOver, exploded, toggledPositions, toggleSquare } = useMinefield();
	const wasClicked = toggledPositions[index] || gameOver;

	const renderValue = useCallback(() => {
		if (value >= 0) {
			return value || ' ';
		}

		if (exploded) {
			return <ExplodingMine />;
		}
		return <BlackMine />;
	}, [value, exploded]);

	return (
		<Container
			onClick={() => toggleSquare(index, value)}
			index={index}
			boardSize={boardSize}
			wasClicked={wasClicked}
			value={value}
			disabled={gameOver || wasClicked}
		>
			{renderValue()}
		</Container>
	);
};

export default Square;
