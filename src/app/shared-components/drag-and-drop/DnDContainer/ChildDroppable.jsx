import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ParentDraggable } from './ParentDraggable';

const ChildsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 400px;
	margin-left: 30px;
	background: inherit;
`;

export const ChildDroppable = memo(function ChildDroppable({ parent }) {
	const menuState = useSelector((state) => state.DnDSlice);
	return (
		<ChildsContainer onDragOver={(e) => e.stopPropagation()}>
			{menuState.data
				.slice()
				.filter((item) => item.parent === parent.id)
				.sort((a, b) => a.order - b.order)
				.map((item) => (
					<ParentDraggable
						key={item.id}
						item={item}
					/>
				))}
		</ChildsContainer>
	);
});
