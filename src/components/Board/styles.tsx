import styled, { css } from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	height: 80vh;

	max-width: 700px;
	max-height: 700px;

	margin: 1rem;
	padding: 1.6rem;

	border-radius: 0.6rem;
	background-color: var(--black);

	overflow: hidden;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MinefieldProps = {
	boardSize: number;
};

export const Minefield = styled.div<MinefieldProps>`
	flex: 1;
	display: grid;

	${({ boardSize }) => {
		const lineSize = boardSize ** 0.5;
		const sizePercent = `${100 / lineSize}%`;

		let gridTemplate = '';
		for (let i = 0; i < lineSize; i += 1) {
			gridTemplate += `${sizePercent} `;
		}

		return css`
			grid-template-columns: ${gridTemplate};
			grid-template-rows: ${gridTemplate};
		`;
	}};
`;
