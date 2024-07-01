import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import NestedDraggable from './NestedDraggable';

/**
 * Styled component for droppable container
 */

const DroppableWrapper = styled.div`
	background-color: #f8f8f8;
	padding: 8px;
	min-height: 100px;
`;

/**
 * Renders a drop zone with elements
 * Renders each element as Nested Draggable.
 */

function DroppableContainer({ droppableId, items }) {
	return (
		<Droppable droppableId={droppableId}>
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
						/>
					))}
					{provided.placeholder}
				</DroppableWrapper>
			)}
		</Droppable>
	);
}

export default DroppableContainer;
