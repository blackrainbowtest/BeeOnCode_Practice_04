import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentItem, deleteData } from 'app/store/slices/DnDSlice';
import DnDElementContent from '../DnDElementContent';
import { ChildDroppable } from './ChildDroppable';
import { DnDAddItemComponent } from '../DnDAddItemComponent/DnDAddItemComponent';

export const ParentDraggable = memo(function ParentDraggable({ item }) {
	const dispatch = useDispatch();
	const [showChildren, setShowChildren] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [isAdd, setIsAdd] = useState(false);
	const menuState = useSelector((state) => state.DnDSlice);
	const menuChildCount = menuState.data.filter((menu) => menu.parent === item.id).length;

	const renameElement = (e, item) => {
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
	};

	const addElement = (e, item) => {
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
	};

	const deleteElement = (item) => {
		dispatch(deleteData(item.id));
	};

	return (
		<>
			<DnDElementContent
				item={item}
				isOpen={showChildren}
				setShowChildren={setShowChildren}
				childCount={menuChildCount}
				callback={{ renameElement, addElement, deleteElement }}
				isEdit={isEdit}
				setIsEdit={setIsEdit}
				setIsAdd={setIsAdd}
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
