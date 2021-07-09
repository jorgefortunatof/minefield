import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from 'react';
import { generateBoard, minesAndBoardSize } from '../utils';

type MinefieldContextData = {
	board: number[];
	toggledPositions: boolean[];
	mines: number;
	timer: number;
	gameOver: boolean;
	exploded: boolean;
	difficulty: string;

	toggleSquare: (index: number, value: number) => void;
	setDifficulty: (difficulty: string) => void;
	setGameOver: (gameOver: boolean) => void;
	resetGame: () => void;
};

const MinefieldContext = createContext<MinefieldContextData>(
	{} as MinefieldContextData,
);

export const MinefieldContextProvider: React.FC = ({ children }) => {
	const [timer, setTimer] = useState(0);

	const [difficulty, setDifficulty] = useState('easy');
	const [exploded, setExploded] = useState(false);
	const [gameOver, setGameOver] = useState(false);

	const [mines, setMines] = useState<number>(0);
	const [board, setBoard] = useState<number[]>([]);
	const [toggledPositions, setToggledPositions] = useState<boolean[]>([]);

	const startGame = useCallback(() => {
		const [minesSize, boardSize] = minesAndBoardSize(difficulty);
		const generatedBoard = generateBoard(minesSize, boardSize);

		setToggledPositions(Array(boardSize).fill(false));
		setBoard(generatedBoard);
		setMines(minesSize);
		setGameOver(false);
		setExploded(false);
	}, [difficulty]);

	const resetGame = useCallback(() => {
		startGame();
	}, [startGame]);

	const toggleSquare = useCallback(
		(index: number, value: number) => {
			const updateToggledPositions = [...toggledPositions];
			updateToggledPositions[index] = true;

			if (
				updateToggledPositions.filter((x) => x).length ===
				board.length - mines
			) {
				setGameOver(true);
			}

			if (value === -1) {
				setExploded(true);
				setGameOver(true);
			}

			setToggledPositions(updateToggledPositions);
		},
		[toggledPositions, board, mines],
	);

	useEffect(() => {
		startGame();
	}, [difficulty, startGame]);

	return (
		<MinefieldContext.Provider
			value={{
				board,
				mines,
				timer,
				difficulty,
				gameOver,
				exploded,
				setDifficulty,
				setGameOver,
				resetGame,
				toggleSquare,
				toggledPositions,
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
