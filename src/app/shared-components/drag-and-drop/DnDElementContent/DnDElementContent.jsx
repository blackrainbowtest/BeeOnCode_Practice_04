import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentItem } from 'app/store/slices/DnDSlice';
import { useTheme } from '@mui/material/styles';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import DnDIconMain from './DnDIconMain';
import DnDIconEdit from './DnDIconEdit';
import DnDIconDelete from './DnDIconDelete';
import DnDIconAdd from './DnDIconAdd';
import DnDIconShow from './DnDIconShow';
import { DnDEditItemComponent } from '../DnDEditItemComponent/DnDEditItemComponent';

/**
 * Styled component for draggable item (Perhaps in the future we will add dynamic style changes)
 */
const moveStripes = keyframes`
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: 40px 0px;
	}
`;

const ItemContent = styled.div`
	width: 400px;
	min-width: 400px;
	min-height: 40px;
	padding: 6px;
	border: 1px solid ${(props) => props.theme.palette.border.light};
	border-radius: 0px 8px 8px 0px;
	box-shadow: 0 4px 8px ${(props) => props.theme.palette.shadow.light};
	display: flex;
	user-select: none;
	background: inherit;
	cursor: ${(props) => (props.draggable ? 'grab' : 'auto')};
	&.active {
		background: ${(props) => props.theme.palette.background.paper};
	}
	&.dragging {
		background: linear-gradient(
			45deg,
			${(props) => props.theme.palette.background.paper} 25%,
			transparent 25%,
			transparent 50%,
			${(props) => props.theme.palette.background.paper} 50%,
			${(props) => props.theme.palette.background.paper} 75%,
			transparent 75%,
			transparent
		);
		background-size: 20px 20px;
		animation: ${moveStripes} 1s linear infinite;
	}
`;

const ItemTitle = styled.div`
	width: 100%;
	padding: 0px 8px;
	font-size: 16px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	overflow: hidden;
	background-color: inherit;
`;

const ItemEmpty = styled.div`
	min-width: 34px;
`;

function DnDElementContent({ item = {}, callback = {}, childCount = 0, dragBooleans, draggable, dragActions }) {
	const theme = useTheme();
	const dispatch = useDispatch();

	const menuState = useSelector((state) => state.DnDSlice);
	const { renameElement, addElement, deleteElement, setShowChildren, setIsEdit, setIsAdd } = callback;
	const { dragStartHandle, dragLeaveHandle, dragEndHandle, dragOverHandle, dropHandle } = dragActions;
	const { isEdit, showChildren, isAtCenter } = dragBooleans;

	const setCurrentItem = (e) => {
		e.stopPropagation();
		dispatch(changeCurrentItem(item));
		setIsEdit(false);
		setIsAdd(false);

		if (menuState.data.filter((menu) => menu.parent === item.id).length > 0) {
			setShowChildren((prev) => !prev);
		}

		const handleEscKey = (event) => {
			if (event.key === 'Escape') {
				dispatch(changeCurrentItem(null));
				// eslint-disable-next-line no-undef
				document.removeEventListener('keydown', handleEscKey);
			}
		};
		// eslint-disable-next-line no-undef
		document.addEventListener('keydown', handleEscKey);
	};
	return (
		<ThemeProvider theme={theme}>
			<ItemContent
				className={`${menuState?.currentItem?.id === item?.id ? 'active' : ''} 
			${menuState?.draggedItem?.id === item.id && isAtCenter ? 'dragging' : ''}`}
				onClick={setCurrentItem}
				draggable={draggable}
				onDragStart={dragStartHandle}
				onDragLeave={dragLeaveHandle}
				onDragEnd={dragEndHandle}
				onDragOver={dragOverHandle}
				onDrop={dropHandle}
			>
				{childCount > 0 ? (
					<DnDIconShow
						isOpen={showChildren}
						callback={setShowChildren}
						childCount={childCount}
						item={item}
					/>
				) : (
					<ItemEmpty />
				)}
				<DnDIconMain />
				<ItemTitle>
					{isEdit && menuState?.currentItem?.id === item.id ? (
						<DnDEditItemComponent
							item={item}
							setIsClicked={setIsEdit}
						/>
					) : (
						item?.name
					)}
				</ItemTitle>
				{isEdit && menuState?.currentItem?.id === item.id ? null : (
					<DnDIconEdit callback={(e) => renameElement(e, item)} />
				)}
				<DnDIconAdd callback={(e) => addElement(e, item)} />
				<DnDIconDelete callback={() => deleteElement(item)} />
			</ItemContent>
		</ThemeProvider>
	);
}

export default memo(DnDElementContent);
