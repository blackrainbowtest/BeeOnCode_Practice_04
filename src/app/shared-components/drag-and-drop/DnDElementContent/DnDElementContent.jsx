import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentItem } from 'app/store/slices/DnDSlice';
import styled from 'styled-components';
import DnDIconMain from './DnDIconMain';
import DnDIconEdit from './DnDIconEdit';
import DnDIconDelete from './DnDIconDelete';
import DnDIconAdd from './DnDIconAdd';
import DnDIconShow from './DnDIconShow';
import { DnDEditItemComponent } from '../DnDEditItemComponent/DnDEditItemComponent';

/**
 * Styled component for draggable item (Perhaps in the future we will add dynamic style changes)
 */

const ItemContent = styled.div`
	background-color: #de1f5f;
	padding: 8px;
	min-height: 40px;
	min-width: 400px;
	width: 400px;
	padding: 6px;
	border-radius: 0px 8px 8px 0px;
	display: flex;
	&.active {
		background-color: #6457bb;
	}
`;

const ItemTitle = styled.div`
	width: 100%;
	color: #ffffff;
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

function DnDElementContent({
	item = {},
	callback = {},
	isOpen = false,
	setShowChildren = {},
	childCount = 0,
	isEdit = false,
	setIsEdit,
	setIsAdd
}) {
	const { renameElement, addElement, deleteElement } = callback;
	const menuState = useSelector((state) => state.DnDSlice);
	const dispatch = useDispatch();

	const setCurrentItem = (e) => {
		e.stopPropagation();
		dispatch(changeCurrentItem(item));
		setIsEdit(false);
		setIsAdd(false);

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
		<ItemContent
			className={menuState?.currentItem?.id === item?.id ? 'active' : ''}
			onClick={setCurrentItem}
		>
			{childCount > 0 ? (
				<DnDIconShow
					isOpen={isOpen}
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
	);
}

export default memo(DnDElementContent);
