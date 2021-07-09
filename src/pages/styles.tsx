import styled from 'styled-components';

import blueMine from '../assets/background-mine.svg';

export const Container = styled.div`
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: var(--background);
	background-image: url(${blueMine});
	background-size: 4rem;
`;
