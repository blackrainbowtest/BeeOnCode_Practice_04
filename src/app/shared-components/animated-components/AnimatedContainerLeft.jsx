import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

const AnimatedContainer = styled.div`
	width: 100%;
	position: relative;
	padding: 5px;
	background: inherit;
	transition: height 0.9s ease-in-out;
`;

const AnimetedChildrenContainer = styled.div`
	left: 0;
	top: 0;
	width: 100%;
	position: relative;
	background: inherit;
	transition: transform 0.8s ease-in-out;
	transform: translateX(-200%);
	&.appear {
		transform: translateX(0);
	}
`;

export const AnimatedContainerLeft = memo(function AnimatedContainerLeft({
	children = <h1>U forgot HTML DOM element!</h1>
}) {
	const [appear, setAppear] = useState(false);

	useEffect(() => {
		if (!appear) {
			setAppear(true);
		}
	}, [appear]);
	return (
		<AnimatedContainer>
			<AnimetedChildrenContainer className={appear ? 'appear' : null}>{children}</AnimetedChildrenContainer>
		</AnimatedContainer>
	);
});
