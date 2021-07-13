import React from 'react';
import { ReactComponent as ClockIcon } from '../../assets/clock.svg';
import { useTimer } from '../../hooks/timer';

import { formatTimer } from '../../utils';

const Timer: React.FC = () => {
	const { time } = useTimer();

	return (
		<div>
			<span>{formatTimer(time)}</span>
			<ClockIcon />
		</div>
	);
};

export default Timer;
