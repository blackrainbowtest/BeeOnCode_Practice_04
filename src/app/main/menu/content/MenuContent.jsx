import { memo } from 'react';
import { useSelector } from 'react-redux';
import DragAndDrop from 'app/shared-components/drag-and-drop/DragAndDrop';

function MenuContent() {
	const menuState = useSelector((state) => state.DnDSlice);

	return <DragAndDrop data={menuState.data} />;
}

export default memo(MenuContent);
