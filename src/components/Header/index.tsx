import React from 'react';

import { Container, LeftSide, RightSide } from './styles';

import { useMinefield } from '../../hooks/minefield';
import { TimerContextProvider } from '../../hooks/timer';

import { ReactComponent as WhiteMineIcon } from '../../assets/white-mine.svg';
import { ReactComponent as ResetIcon } from '../../assets/reset.svg';

import Timer from '../Timer';

const Header: React.FC = () => {
	const { mines, difficulty, setDifficulty, resetGame } = useMinefield();

	return (
		<Container>
			<LeftSide>
				<button onClick={resetGame} type="button">
					<ResetIcon />
				</button>
				<select
					id="difficulty"
					value={difficulty}
					onChange={(event) => setDifficulty(event.target.value)}
				>
					<option value="easy">Fácil</option>
					<option value="normal">Normal</option>
					<option value="hard">Difícil</option>
					<option value="impossible">Impossível</option>
				</select>
			</LeftSide>

			<RightSide>
				<div>
					<span>{mines}</span>
					<WhiteMineIcon />
				</div>

				<TimerContextProvider>
					<Timer />
				</TimerContextProvider>
			</RightSide>
		</Container>
	);
};

export default Header;
