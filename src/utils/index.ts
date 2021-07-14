/* eslint-disable no-param-reassign */

function increasePositionsAround(position: number, board: number[]): void {
	const lineSize = board.length ** 0.5;
	const positions = {
		topLeft: [position + 1, position + lineSize + 1, position + lineSize],
		topRight: [position - 1, position + lineSize, position + lineSize - 1],
		top: [
			position - 1,
			position + 1,
			position + lineSize,
			position + lineSize - 1,
			position + lineSize + 1,
		],

		leftBottom: [position - lineSize, position + 1, position - lineSize + 1],
		left: [
			position - lineSize,
			position - lineSize + 1,
			position + 1,
			position + lineSize,
			position + lineSize + 1,
		],

		bottomRight: [position - lineSize, position - lineSize - 1, position - 1],
		bottom: [
			position + 1,
			position - 1,
			position - lineSize,
			position - lineSize - 1,
			position - lineSize + 1,
		],

		right: [
			position + lineSize,
			position - lineSize,
			position + lineSize - 1,
			position - 1,
			position - lineSize - 1,
		],

		center: [
			position + lineSize,
			position + lineSize + 1,
			position + lineSize - 1,
			position - lineSize,
			position - lineSize - 1,
			position - lineSize + 1,
			position + 1,
			position - 1,
		],
	};

	// [X , X, X]
	// [0 , 0, 0]
	// [0 , 0, 0]
	if (position === 0) {
		positions.topLeft.forEach((topLeftPosition) => {
			const value = board[topLeftPosition];
			if (value >= 0) {
				board[topLeftPosition] = value + 1;
			}
		});
	} else if (position < lineSize - 1) {
		positions.top.forEach((topPosition) => {
			const value = board[topPosition];
			if (value >= 0) {
				board[topPosition] = value + 1;
			}
		});
	} else if (position === lineSize - 1) {
		positions.topRight.forEach((topRightPosition) => {
			const value = board[topRightPosition];
			if (value >= 0) {
				board[topRightPosition] = value + 1;
			}
		});
	} else if (position % lineSize === 0) {
		// [0 , 0, 0]
		// [X , 0, 0]
		// [X , 0, 0]
		if (lineSize ** 2 - lineSize === position) {
			// ESQUERDA-FUNDO
			positions.leftBottom.forEach((leftBottomPosition) => {
				const value = board[leftBottomPosition];
				if (value >= 0) {
					board[leftBottomPosition] = value + 1;
				}
			});
		} else {
			// Centro
			positions.left.forEach((leftPosition) => {
				const value = board[leftPosition];
				if (value >= 0) {
					board[leftPosition] = value + 1;
				}
			});
		}
	} else if (
		position >= lineSize ** 2 - lineSize &&
		position <= lineSize ** 2 - 1
	) {
		// [0 , 0, 0]
		// [0 , 0, 0]
		// [0 , X, X]
		if (position === lineSize ** 2 - 1) {
			positions.bottomRight.forEach((bottomRightPosition) => {
				const value = board[bottomRightPosition];
				if (value >= 0) {
					board[bottomRightPosition] = value + 1;
				}
			});
		} else {
			positions.bottom.forEach((bottomPosition) => {
				const value = board[bottomPosition];
				if (value >= 0) {
					board[bottomPosition] = value + 1;
				}
			});
		}
	} else if ((position + 1) % lineSize === 0) {
		// [0 , 0, 0]
		// [0 , X, X]
		// [0 , 0, 0]
		positions.right.forEach((rightPosition) => {
			const value = board[rightPosition];
			if (value >= 0) {
				board[rightPosition] = value + 1;
			}
		});
	} else {
		positions.center.forEach((centerPosition) => {
			const value = board[centerPosition];
			if (value >= 0) {
				board[centerPosition] = value + 1;
			}
		});
	}
}

export function generateBoard(minesSize: number, boardSize: number): number[] {
	const board = Array(boardSize).fill(0);
	let minesToAdd = minesSize;

	while (minesToAdd > 0) {
		const position = Math.floor(Math.random() * boardSize);

		if (board[position] !== -1) {
			board[position] = -1;
			minesToAdd -= 1;
			increasePositionsAround(position, board);
		}
	}

	return board;
}

export function paramsByDifficulty(difficulty: string): number[] {
	switch (difficulty) {
		case 'easy':
			return [5, 25, 120000];
		case 'normal':
			return [12, 49, 180000];
		case 'hard':
			return [24, 81, 180000];
		default:
			return [55, 121, 120000];
	}
}

export function formatTimer(milliseconds: number): string {
	const seconds = milliseconds / 1000;
	const minutes = Math.floor(seconds / 60);
	const rest = Math.floor(seconds - minutes * 60);

	const minutesFormatted = String(minutes).padStart(2, '0');
	const restFormatted = String(rest).padStart(2, '0');

	return `${minutesFormatted}:${restFormatted}`;
}
