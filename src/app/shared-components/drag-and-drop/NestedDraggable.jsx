import { memo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DroppableContainer from './DroppableContainer';
import DnDContent from './DnDContent';

/**
 * Styled component for draggable item (Perhaps in the future we will add dynamic style changes)
 */

const DraggableItem = styled.div`
	background-color: ${({ bgColor }) => bgColor || '#fff'};
	border: 1px solid #ddd;
`;

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	margin: `${grid}px 0 ${grid}px 0`,
	border: 'none',
	borderRadius: '5px',
	// change background colour if dragging
	background: isDragging ? 'lightgrey' : 'none',

	// styles we need to apply on draggables
	...draggableStyle
});

/**
 * Renders each element being dragged
 * If the element has nested elements (children), renders the nested Draggable Container.
 */

function NestedDraggable({ item = {}, index = 0, callback = {} }) {
	const [showChildren, setShowChildren] = useState(false);
	return (
		<Draggable
			draggableId={item.id}
			index={index}
		>
			{(provided, snapshot) => (
				<DraggableItem
					ref={provided.innerRef} /** binds a DOM element to provided.innerRef */
					{...provided.draggableProps} /** necessary to make the element draggable */
					{...provided.dragHandleProps} /** are added to the element that will act as the initiator */
					style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
				>
					<DnDContent
						item={item} /** contents of the current element */
						callback={callback} /** callback object */
						isOpen={showChildren}
						setShowChildren={setShowChildren}
					/>
					{showChildren && item?.items && item.items.length > 0 && (
						<DroppableContainer
							droppableId={item.id}
							items={item.items}
							callback={callback}
						/>
					)}
				</DraggableItem>
			)}
		</Draggable>
	);
}

export default memo(NestedDraggable);
