import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import NestedDraggable from './NestedDraggable';

/**
 * Styled component for droppable container
 */

const DroppableWrapper = styled.div`
	background-color: none;
	margin-left: 25px;
`;

/**
 * Renders a drop zone with elements
 * Renders each element as Nested Draggable.
 */

function DroppableContainer({ type, droppableId, items, callback }) {
	return (
		<Droppable
			droppableId={droppableId}
			type={type}
		>
			{(provided) => (
				<DroppableWrapper
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					{items.map((item, index) => (
						<NestedDraggable
							key={item.id}
							item={item}
							index={index}
							callback={callback}
						/>
					))}
					{provided.placeholder}
				</DroppableWrapper>
			)}
		</Droppable>
	);
}

export default DroppableContainer;
