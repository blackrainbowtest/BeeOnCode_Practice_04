import { memo, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableContainer from 'app/shared-components/drag-and-drop/DroppableContainer';

/**
 * Example DnD list of elements.
 */

const initialItems = [
	{
		id: 'q101',
		name: 'Category 1',
		items: [
			{ id: 'abc', name: 'First' },
			{ id: 'def', name: 'Second' }
		]
	},
	{
		id: 'wkqx',
		name: 'Category 2',
		items: [
			{ id: 'ghi', name: 'Third' },
			{ id: 'jkl', name: 'Fourth' },
			{
				id: 'jfl',
				name: 'kink',
				items: [
					{ id: 'ghi1', name: 'Fifet' },
					{ id: 'jkl2', name: 'Sixs' },
					{ id: 'jfl3', name: 'Seven' }
				]
			}
		]
	}
];

/**
 * Function to change the order of elements.
 */

const reorder = (list, source, destination) => {
	console.log(source, destination);
	const result = Array.from(list); /** make copy of state */
	return result;
};

/**
 * Function for updating nested lists.
 */

const updateNestedList = (list, source, destination) => {
	console.log(list, source, destination);

	// const sourceClone = Array.from(list);
	// const destClone = Array.from(list);
	// const [removed] = sourceClone.splice(source.index, 1);
	// destClone.splice(destination.index, 0, removed);
	// return destClone;
};

/**
 * rename element
 */
const renameElement = (e, item) => {
	e.stopPropagation();
	console.log('renameElement', item);
};

/**
 * add element
 */
const addElement = (e, item) => {
	e.stopPropagation();
	console.log('addElement', item);
};
/**
 * delete element
 */
const deleteElement = (e, item) => {
	e.stopPropagation();
	console.log('deleteElement', item);
};

function MenuContent() {
	const [state, setState] = useState(initialItems);

	const onDragEnd = (result) => {
		const { source, destination } = result;

		if (!destination) return;

		if (source.droppableId === destination.droppableId) {
			const items = reorder(state, source, destination);
			setState(items);
		} else {
			// const updatedState = updateNestedList(state, source, destination);
			// console.log(updatedState);
			// setState(updatedState);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<DroppableContainer
				type="droppable-item"
				droppableId="root"
				items={state}
				callback={{ renameElement, addElement, deleteElement }}
			/>
		</DragDropContext>
	);
}

export default memo(MenuContent);
