import styled, { css } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ContainerProps = {
	visible: boolean;
};

export const Container = styled.div<ContainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;

	background-color: rgba(0, 0, 0, 0.5);

	${({ visible }) =>
		!visible &&
		css`
			display: none;
		`};
`;

export const Card = styled.div`
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 26rem;
	padding: 2rem;

	background-color: var(--white);
	border-radius: 0.6rem;

	svg {
		position: absolute;
		top: 0.6rem;
		right: 0.6rem;

		width: 2rem;
		height: 2rem;

		&:hover {
			cursor: pointer;
		}
	}

	span {
		font-size: 2.2rem;
		font-weight: bold;
		text-align: center;
		color: var(--secondary);

		margin-bottom: 1.4rem;
	}
`;

export const Button = styled.button.attrs(() => ({
	type: 'button',
}))`
	font-size: 1.2rem;
	font-weight: bold;

	border: none;
	border-radius: 0.4rem;
	padding: 0.8rem 1.4rem;

	color: var(--white);
	background-color: var(--secondary);

	transition: filter 0.2s;
	&:hover {
		cursor: pointer;
		filter: brightness(0.9);
	}
`;
