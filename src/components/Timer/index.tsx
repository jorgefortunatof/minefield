import React, { useEffect, useState, useCallback } from 'react';

import { useMinefield } from '../../hooks/minefield';
import { formatTimer } from '../../utils';

import { ReactComponent as ClockIcon } from '../../assets/clock.svg';

const Timer: React.FC = () => {
	const { setGameOver, setExploded, timeToFinish, board, gameOver } =
		useMinefield();

	const [time, setTime] = useState(0);
	const [timeIsOver, setTimeIsOver] = useState(false);
	const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout>(
		{} as NodeJS.Timeout,
	);

	const startTimer = useCallback(
		(initialTime: number) => {
			clearInterval(timeInterval);
			setTime(initialTime);

			const interval = setInterval(() => {
				setTime((prev) => {
					const decreasedTime = prev - 1000;

					if (decreasedTime < 0) {
						clearInterval(timeInterval);
						setTimeIsOver(true);
						return 0;
					}

					return decreasedTime;
				});
			}, 1000);

			setTimeInterval(interval);
		},
		[timeInterval],
	);

	useEffect(() => {
		if (timeIsOver) {
			setGameOver(true);
			setExploded(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeIsOver]);

	useEffect(() => {
		if (timeToFinish) {
			startTimer(timeToFinish);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [board]);

	useEffect(() => {
		if (gameOver) {
			clearInterval(timeInterval);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameOver]);

	return (
		<div>
			<span>{formatTimer(time)}</span>
			<ClockIcon />
		</div>
	);
};

export default Timer;
