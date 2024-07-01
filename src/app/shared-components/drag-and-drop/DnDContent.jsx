import { memo } from 'react';
import styled from 'styled-components';
import DnDIconMain from './DnDIconMain';
import DnDIconEdit from './DnDIconEdit';
import DnDIconDelete from './DnDIconDelete';
import DnDIconAdd from './DnDIconAdd';
import DnDIconShow from './DnDIconShow';

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
`;

const ItemTitle = styled.div`
	width: 100%;
	color: #ffffff;
	padding: 0px 8px;
	font-size: 16px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const ItemEmpty = styled.div`
	min-width: 34px;
`;

function DnDContent({ item = {}, callback = {}, isOpen = false, setShowChildren = {} }) {
	const { renameElement, addElement, deleteElement } = callback;
	return (
		<ItemContent>
			{item?.items?.length ? (
				<DnDIconShow
					isOpen={isOpen}
					callback={setShowChildren}
				/>
			) : (
				<ItemEmpty />
			)}
			<DnDIconMain />
			<ItemTitle>{item.name}</ItemTitle>
			<DnDIconEdit callback={(e) => renameElement(e, item)} />
			<DnDIconAdd callback={(e) => addElement(e, item)} />
			<DnDIconDelete callback={(e) => deleteElement(e, item)} />
		</ItemContent>
	);
}

export default memo(DnDContent);
