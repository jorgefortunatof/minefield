import React from 'react';

import { Container, LeftSide, RightSide } from './styles';
import { useMinefield } from '../../hooks/minefield';

import { ReactComponent as WhiteMineIcon } from '../../assets/white-mine.svg';
import { ReactComponent as ResetIcon } from '../../assets/reset.svg';
import { ReactComponent as ClockIcon } from '../../assets/clock.svg';

const Header: React.FC = () => {
	const { timer, mines, difficulty, setDifficulty, resetGame } = useMinefield();

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

				<div>
					<span>{timer}</span>
					<ClockIcon />
				</div>
			</RightSide>
		</Container>
	);
};

export default Header;
