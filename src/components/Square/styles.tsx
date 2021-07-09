import styled, { css } from 'styled-components';

type ButtonProps = {
	boardSize: number;
	index: number;
	value: number;
	wasClicked: boolean;
};

export const Container = styled.button.attrs({
	type: 'button',
})<ButtonProps>`
	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 2.2rem;
	font-weight: bold;
	color: transparent;
	border: none;
	transition: filter 0.2s;

	svg {
		opacity: 0;
		width: 70%;
		height: auto;
	}

	${({ index, boardSize, wasClicked }) => {
		const number = boardSize % 2 === 0 ? 3 : 2;

		if (index % number === 0) {
			if (wasClicked) {
				return css`
					background-color: var(--clicked-square-odd);
				`;
			}
			return css`
				background-color: var(--square-odd);
			`;
		}

		if (wasClicked) {
			return css`
				background-color: var(--clicked-square-even);
			`;
		}

		return css`
			background-color: var(--square-even);
		`;
	}}

	${({ wasClicked, value }) =>
		!wasClicked
			? css`
					&:hover {
						cursor: pointer;
						filter: brightness(0.98);
					}
			  `
			: css`
					color: var(--mine-${value});
					svg {
						opacity: 1;
					}
			  `};
`;
