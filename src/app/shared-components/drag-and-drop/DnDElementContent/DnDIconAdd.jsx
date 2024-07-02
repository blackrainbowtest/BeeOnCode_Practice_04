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

function DnDIconAdd({ callback }) {
	const { t } = useTranslation('menuPage');
	return (
		<Tooltip title={t('ADD_TOOLTIP')}>
			<ItemIcon onClick={callback}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 9h-4V7h-2v4H7v2h4v4h2v-4h4z"
					/>
				</svg>
			</ItemIcon>
		</Tooltip>
	);
}

export default memo(DnDIconAdd);
