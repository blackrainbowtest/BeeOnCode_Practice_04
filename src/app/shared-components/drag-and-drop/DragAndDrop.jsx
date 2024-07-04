import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewData } from 'app/store/slices/DnDSlice';
import { useTheme } from '@mui/material/styles';
import styled, { ThemeProvider } from 'styled-components';
import { ParentDraggable } from './DnDContainer';
import { DnDNewMenuButton } from './DnDAddNewElement/DnDNewMenuButton';
import { DnDNewItemComponent } from './DnDAddNewElement/DnDNewItemComponent';

const NewMenuContainer = styled.div`
	padding: 15px 0px;
	transition: transform 0.5s ease-in-out;
	background: inherit;
`;

const MainParentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 400px;
	background: inherit;
`;

function DragAndDrop() {
	const theme = useTheme();
	const [isClicked, setIsClicked] = useState(false);
	const dispatch = useDispatch();
	const menuState = useSelector((state) => state.DnDSlice);

	const createNewMenu = (menuName) => {
		const sortedData = [...menuState.data].sort((a, b) => a.id - b.id);
		const dataOrder = [...sortedData].filter((menu) => menu.parent == null).length + 1;
		const dataId = sortedData[sortedData.length - 1].id + 1;
		dispatch(addNewData({ order: dataOrder, name: menuName, parent: null, id: dataId }));
	};

	return (
		<ThemeProvider theme={theme}>
			<NewMenuContainer>
				<DnDNewMenuButton
					isClicked={isClicked}
					setIsClicked={setIsClicked}
				/>
				{isClicked ? (
					<DnDNewItemComponent
						setIsClicked={setIsClicked}
						inputData={createNewMenu}
					/>
				) : null}
			</NewMenuContainer>
			<MainParentContainer>
				{menuState.data
					.slice()
					.filter((item) => item.parent === null)
					.sort((a, b) => a.order - b.order)
					.map((item) => (
						<ParentDraggable
							key={item.id}
							item={item}
						/>
					))}
			</MainParentContainer>
		</ThemeProvider>
	);
}

export default memo(DragAndDrop);
