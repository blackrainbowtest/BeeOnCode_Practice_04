import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { renameData } from 'app/store/slices/DnDSlice';
import { DnDNewItemComponent } from '../DnDAddNewElement/DnDNewItemComponent';

export const DnDEditItemComponent = memo(function DnDEditItemComponent({ setIsClicked, item }) {
	const dispatch = useDispatch();
	const editInputData = (editName) => {
		dispatch(renameData({ ...item, name: editName }));
	};
	return (
		<DnDNewItemComponent
			item={item}
			setIsClicked={setIsClicked}
			defaultName={item?.name}
			inputData={editInputData}
		/>
	);
});
