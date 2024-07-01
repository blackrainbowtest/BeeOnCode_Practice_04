import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DroppableContainer from './DroppableContainer';

/**
 * Styled component for draggable item (Perhaps in the future we will add dynamic style changes)
 */

const DraggableItem = styled.div`
	padding: 8px;
	margin: 4px;
	background-color: ${({ bgColor }) => bgColor || '#fff'};
	border: 1px solid #ddd;
`;

/**
 * Renders each element being dragged
 * If the element has nested elements (children), renders the nested Draggable Container.
 */

function NestedDraggable({ item, index }) {
	return (
		<Draggable
			draggableId={item.id}
			index={index}
		>
			{(provided) => (
				<DraggableItem
					ref={provided.innerRef} /** binds a DOM element to provided.innerRef */
					{...provided.draggableProps} /** necessary to make the element draggable */
					{...provided.dragHandleProps} /** are added to the element that will act as the initiator */
				>
					{item?.content /** contents of the current element */}
					{item?.children && item.children.length > 0 && (
						<DroppableContainer
							droppableId={item.id}
							items={item.children}
						/>
					)}
				</DraggableItem>
			)}
		</Draggable>
	);
}

export default NestedDraggable;
