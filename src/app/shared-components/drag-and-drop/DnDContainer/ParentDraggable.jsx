import { memo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentItem, changeDraggedItem, deleteData, updateData } from 'app/store/slices/DnDSlice';
import DnDElementContent from '../DnDElementContent';
import { ChildDroppable } from './ChildDroppable';
import { DnDAddItemComponent } from '../DnDAddItemComponent/DnDAddItemComponent';
import { isDescendant, isNearCenter, isUpperHalf, moveItemAsChild, updateDataDnD } from '../DnDUtils';

export const ParentDraggable = memo(function ParentDraggable({ item }) {
	const dispatch = useDispatch();
	const [showChildren, setShowChildren] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [isAdd, setIsAdd] = useState(false);
	const [isAtCenter, setIsAtCenter] = useState(false);
	const menuState = useSelector((state) => state.DnDSlice);
	const menuChildCount = menuState.data.filter((menu) => menu.parent === item.id).length;

	/**
	 * DnD actions
	 */
	const renameElement = useCallback((e, item) => {
		e.stopPropagation();
		setIsEdit((prev) => !prev);
		dispatch(changeCurrentItem(item));

		const handleEscKey = (event) => {
			if (event.key === 'Escape') {
				setIsEdit(false);
				dispatch(changeCurrentItem(null));
				// eslint-disable-next-line no-undef
				document.removeEventListener('keydown', handleEscKey);
			}
		};
		// eslint-disable-next-line no-undef
		document.addEventListener('keydown', handleEscKey);
	}, []);

	const addElement = useCallback((e, item) => {
		e.stopPropagation();
		setIsAdd((prev) => !prev);
		dispatch(changeCurrentItem(item));

		const handleEscKey = (event) => {
			if (event.key === 'Escape') {
				setIsAdd(false);
				dispatch(changeCurrentItem(null));
				// eslint-disable-next-line no-undef
				document.removeEventListener('keydown', handleEscKey);
			}
		};
		// eslint-disable-next-line no-undef
		document.addEventListener('keydown', handleEscKey);
	}, []);

	const deleteElement = useCallback((item) => {
		dispatch(deleteData(item.id));
	}, []);

	/**
	 * DnD logic ===============================
	 */
	const dragStartHandle = useCallback((e) => {
		e.stopPropagation();
		/**
		 * set current item on start drag
		 */
		dispatch(changeCurrentItem(item));
		setShowChildren(false);
	}, []);

	const dragLeaveHandle = useCallback((e) => {
		e.stopPropagation();
	}, []);

	const dragEndHandle = useCallback((e) => {
		e.stopPropagation();
		/**
		 * clear selected items after DnD
		 */
		dispatch(changeCurrentItem(null));
		dispatch(changeDraggedItem(null));
	}, []);

	const dragOverHandle = useCallback(
		(e) => {
			e.stopPropagation();
			e.preventDefault();

			/**
			 * change status only when the target is not its own child
			 */
			if (!isDescendant(item.id, menuState.currentItem.id, menuState.data)) {
				/**
				 * Get the current target altitude.
				 */
				const elementRect = e.currentTarget.firstElementChild.getBoundingClientRect();
				const inCenter = isNearCenter(elementRect, e.clientY);
				const isMouseInUpperHalf = isUpperHalf(elementRect, e.clientY);

				let newData = [...menuState.data];

				if (inCenter) {
					setIsAtCenter(true);
				} else {
					newData = updateDataDnD(
						newData,
						isMouseInUpperHalf,
						item,
						menuState.currentItem,
						menuState.draggedItem
					);
					setIsAtCenter(false);
				}

				dispatch(updateData(newData));
				dispatch(changeDraggedItem(item));
			}
		},
		[menuState.draggedItem, menuState.currentItem]
	);

	const dropHandle = useCallback(
		(e) => {
			e.stopPropagation();
			e.preventDefault();

			if (isAtCenter) {
				dispatch(updateData(moveItemAsChild(menuState.data, menuState.currentItem, menuState.draggedItem)));
				setIsAtCenter(false);
			}

			dispatch(changeDraggedItem(null));
		},
		[menuState.draggedItem, menuState.currentItem, isAtCenter]
	);

	return (
		<>
			<DnDElementContent
				item={item}
				isOpen={showChildren}
				childCount={menuChildCount}
				callback={{ renameElement, addElement, deleteElement, setShowChildren, setIsEdit, setIsAdd }}
				isEdit={isEdit}
				draggable={!isAdd && !isEdit}
				dragActions={{ dragStartHandle, dragLeaveHandle, dragEndHandle, dragOverHandle, dropHandle }}
			/>
			{menuState?.currentItem?.id === item?.id && isAdd ? (
				<DnDAddItemComponent
					setIsClicked={setIsAdd}
					item={item}
				/>
			) : null}
			{showChildren ? <ChildDroppable parent={item} /> : null}
		</>
	);
});
