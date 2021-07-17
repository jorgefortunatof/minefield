import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from 'react';

import { generateBoard, paramsByDifficulty } from '../utils';

type MinefieldContextData = {
	board: number[];
	toggledPositions: boolean[];
	mines: number;
	gameOver: boolean;
	gameDidStart: boolean;
	exploded: boolean;
	difficulty: string;
	timeToFinish: number;

	toggleSquare: (index: number, value: number) => void;
	setDifficulty: (difficulty: string) => void;
	setGameOver: (gameOver: boolean) => void;
	setExploded: (exploded: boolean) => void;
	resetGame: () => void;
};

const MinefieldContext = createContext<MinefieldContextData>(
	{} as MinefieldContextData,
);

export const MinefieldContextProvider: React.FC = ({ children }) => {
	const [timeToFinish, setTimeToFinish] = useState(0);
	const [difficulty, setDifficulty] = useState('easy');
	const [exploded, setExploded] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [gameDidStart, setGameDidStart] = useState(false);

	const [mines, setMines] = useState<number>(0);
	const [board, setBoard] = useState<number[]>([]);
	const [toggledPositions, setToggledPositions] = useState<boolean[]>([]);

	const toggleSquare = useCallback(
		(index: number, value: number) => {
			const updateToggledPositions = [...toggledPositions];
			updateToggledPositions[index] = true;

			if (
				updateToggledPositions.filter((x) => x).length ===
				board.length - mines
			) {
				setGameOver(true);
			} else if (!gameDidStart) {
				setGameDidStart(true);
			}

			if (value === -1) {
				setExploded(true);
				setGameOver(true);
			}

			setToggledPositions(updateToggledPositions);
		},
		[toggledPositions, board, mines, gameDidStart],
	);

	const startGame = useCallback(() => {
		const [minesSize, boardSize, time] = paramsByDifficulty(difficulty);
		const generatedBoard = generateBoard(minesSize, boardSize);

		setToggledPositions(Array(boardSize).fill(false));
		setBoard(generatedBoard);
		setMines(minesSize);

		setTimeToFinish(time);
		setGameOver(false);
		setGameDidStart(false);
		setExploded(false);
	}, [difficulty]);

	const resetGame = useCallback(() => {
		startGame();
	}, [startGame]);

	useEffect(() => {
		startGame();
	}, [difficulty, startGame]);

	return (
		<MinefieldContext.Provider
			value={{
				board,
				mines,
				difficulty,
				gameOver,
				gameDidStart,
				exploded,
				timeToFinish,
				toggledPositions,
				setDifficulty,
				setGameOver,
				setExploded,
				resetGame,
				toggleSquare,
			}}
		>
			{children}
		</MinefieldContext.Provider>
	);
};

export function useMinefield(): MinefieldContextData {
	const context = useContext<MinefieldContextData>(MinefieldContext);

	if (!context) {
		throw new Error('useMinefield deve ser usado com um provider');
	}

	return context;
}
