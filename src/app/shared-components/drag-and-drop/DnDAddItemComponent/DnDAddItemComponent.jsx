import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewData } from 'app/store/slices/DnDSlice';
import { DnDNewItemComponent } from '../DnDAddNewElement/DnDNewItemComponent';

export const DnDAddItemComponent = memo(function DnDAddItemComponent({ setIsClicked, item }) {
	const dispatch = useDispatch();
	const menuState = useSelector((state) => state.DnDSlice);

	const editInputData = (newName) => {
		const dataId = [...menuState.data].sort((a, b) => a.id - b.id)[menuState.data.length - 1].id + 1;
		const orderId =
			[...menuState.data].filter((menu) => menu.parent === item.id).sort((a, b) => a.order - b.order).length + 1;
		dispatch(addNewData({ order: orderId, name: newName, parent: item.id, id: dataId }));
	};
	return (
		<DnDNewItemComponent
			item={item}
			setIsClicked={setIsClicked}
			inputData={editInputData}
		/>
	);
});
