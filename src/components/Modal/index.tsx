import React, { useState, useEffect, useCallback } from 'react';
import { useMinefield } from '../../hooks/minefield';

import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import winImage from '../../assets/img/win.png';
import loseImage from '../../assets/img/lose.png';

import { Container, Card, Button } from './styles';

const Modal: React.FC = () => {
	const { gameOver, exploded, resetGame } = useMinefield();

	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState('');

	const togglePlayAgain = useCallback(() => {
		resetGame();
		setVisible(false);
	}, [resetGame]);

	useEffect(() => {
		if (gameOver) {
			if (exploded) {
				setMessage('Você faleceu...');
			} else {
				setMessage('Brabo demais \nmandou bem!');
			}

			setVisible(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameOver]);

	return (
		<Container visible={visible}>
			<Card>
				<CloseIcon onClick={() => setVisible(false)} />
				<img src={exploded ? loseImage : winImage} alt="win" />
				<span>{message}</span>
				<Button onClick={togglePlayAgain}>Jogar Novamente</Button>
			</Card>
		</Container>
	);
};

export default Modal;
