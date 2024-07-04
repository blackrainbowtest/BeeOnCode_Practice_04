import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

/**
 * Styled component for DnD main icon
 */

const ItemIcon = styled.div`
	position: relative;
	min-width: 34px;
	display: flex;
	justify-content: center;
	border-radius: 5px;
	align-items: center;
	font-size: 24px;
	cursor: pointer;

	&:hover {
		background: ${(props) => props.theme.palette.background.paper};
	}
`;

const ItemChildCount = styled.div`
	position: absolute;
	background: ${(props) => props.theme.palette.secondary.main};
	color: ${(props) => props.theme.palette.secondary.contrastText};
	border-radius: 50%;
	top: -2px;
	left: 0px;
	width: 17px;
	height: 17px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 11px;
	letter-spacing: 0;

	&.active {
		background: ${(props) => props.theme.palette.secondary.light};
	}
`;

function DnDIconShow({ isOpen, callback, childCount, item }) {
	const menuState = useSelector((state) => state.DnDSlice);
	return (
		<ItemIcon
			onClick={(e) => {
				e.stopPropagation();
				callback((prev) => !prev);
			}}
		>
			<ItemChildCount className={menuState?.currentItem?.id === item.id ? 'active' : ''}>
				{childCount}
			</ItemChildCount>
			{!isOpen ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
					/>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="M19 12.998H5v-2h14z"
					/>
				</svg>
			)}
		</ItemIcon>
	);
}

export default memo(DnDIconShow);
