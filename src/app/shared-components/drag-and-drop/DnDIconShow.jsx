import { memo } from 'react';
import styled from 'styled-components';

/**
 * Styled component for DnD main icon
 */

const ItemIcon = styled.div`
	min-width: 34px;
	display: flex;
	justify-content: center;
	border-radius: 5px;
	align-items: center;
	color: white;
	font-size: 24px;
	cursor: pointer;

	&:hover {
		background-color: #8c0f39;
	}
`;

function DnDIconShow({ isOpen, callback }) {
	return (
		<ItemIcon
			onClick={(e) => {
				e.stopPropagation();
				callback((prev) => !prev);
			}}
		>
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
