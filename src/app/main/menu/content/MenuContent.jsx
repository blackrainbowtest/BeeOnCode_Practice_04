import { memo, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableContainer from 'app/shared-components/drag-and-drop/DroppableContainer';

/**
 * Example DnD list of elements.
 */

const initialItems = [
	{
		id: '1',
		content: 'First item',
		children: [
			{ id: '1-1', content: 'Child item 1', children: [] },
			{ id: '1-2', content: 'Child item 2', children: [] }
		]
	},
	{
		id: '2',
		content: 'Second item',
		children: []
	},
	{
		id: '3',
		content: 'Third item',
		children: []
	}
];

/**
 * Function to change the order of elements.
 */

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

/**
 * Function for updating nested lists.
 */

const updateNestedList = (list, source, destination) => {
	/**
	 * I need add update logic here.
	 */
	return list;
};

function MenuContent() {
	const [state, setState] = useState(initialItems);

	const onDragEnd = (result) => {
		console.log(result);
		const { source, destination } = result;

		if (!result.destination) return;

		if (source.droppableId === destination.droppableId) {
			const items = reorder(state, source.index, destination.index);
			setState(items);
		} else {
			const updatedState = updateNestedList(state, source, destination);
			setState(updatedState);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<DroppableContainer
				droppableId="root"
				items={state}
			/>
		</DragDropContext>
	);
}

export default memo(MenuContent);
