import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';

/**
 * Styled component for DnD main icon
 */

const ItemIcon = styled.div`
	display: flex;
	justify-content: center;
	border-radius: 5px;
	align-items: center;
	color: white;
	padding: 5px;
	font-size: 24px;
	cursor: pointer;

	&:hover {
		background-color: #8c0f39;
	}
`;

function DnDIconDelete({ callback }) {
	const { t } = useTranslation('menuPage');
	return (
		<Tooltip title={t('DELETE_TOOLTIP')}>
			<ItemIcon onClick={callback}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 2048 2048"
				>
					<path
						fill="currentColor"
						d="M1792 384h-128v1472q0 40-15 75t-41 61t-61 41t-75 15H448q-40 0-75-15t-61-41t-41-61t-15-75V384H128V256h512V128q0-27 10-50t27-40t41-28t50-10h384q27 0 50 10t40 27t28 41t10 50v128h512zM768 256h384V128H768zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45zM768 1664H640V640h128zm256 0H896V640h128zm256 0h-128V640h128z"
					/>
				</svg>
			</ItemIcon>
		</Tooltip>
	);
}

export default memo(DnDIconDelete);
