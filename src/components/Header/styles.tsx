import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row;

	align-items: center;
	justify-content: space-between;

	padding-bottom: 1rem;

	color: var(--white);

	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

export const LeftSide = styled.div`
	display: flex;
	align-items: center;

	select {
		margin-left: 0.8rem;

		height: 2.2rem;
		border-radius: 0.4rem;
	}

	button {
		background-color: transparent;
		border: none;

		&:hover {
			cursor: pointer;
			filter: brightness(0.86);
		}
	}
`;

export const RightSide = styled.div`
	display: flex;
	align-items: center;

	div {
		display: flex;
		align-items: center;

		margin-left: 2rem;

		span {
			font-size: 1.6rem;
			margin-right: 0.4rem;
		}
	}
`;
