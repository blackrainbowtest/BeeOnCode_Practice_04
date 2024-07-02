import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

const AnimatedContainer = styled.div`
	/* relative */
	position: relative;
	transition: height 0.9s ease-in-out;
	background-color: inherit;
	padding: 5px;
	width: 100%;
`;

const AnimetedChildrenContainer = styled.div`
	/* common NEW block spawn */
	position: relative;
	background: inherit;
	left: 0;
	top: 0;
	width: 100%;
	transition: transform 0.8s ease-in-out;
	transform: translateX(-200%);

	&.appear {
		transform: translateX(0);
	}
	/* END common new block spawn */
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
