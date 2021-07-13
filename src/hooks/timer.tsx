import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useMinefield } from './minefield';

type TimerContextData = {
	time: number;
	timeIsOver: boolean;

	startTimer: (initialTime: number) => void;
	setTimeIsOver: (timeIsOver: boolean) => void;
};

const TimerContext = createContext<TimerContextData>({} as TimerContextData);

export const TimerContextProvider: React.FC = ({ children }) => {
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
		console.log('timeIsOver');

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
		<TimerContext.Provider
			value={{ time, timeIsOver, startTimer, setTimeIsOver }}
		>
			{children}
		</TimerContext.Provider>
	);
};

export function useTimer(): TimerContextData {
	const context = useContext(TimerContext);

	if (!context) {
		throw new Error('useTimer deve ser usado com um provider.');
	}

	return context;
}
