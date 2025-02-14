import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import styled, { ThemeProvider } from 'styled-components';
import Tooltip from '@mui/material/Tooltip';

const AddNewMenu = styled.button`
	display: flex;
	justify-content: center;
	border-radius: 5px;
	align-items: center;
	padding: 5px;
	font-size: 24px;
	cursor: pointer;
	min-width: 400px;
	height: 40px;
	border: 1px dashed ${(props) => props.theme.palette.border.light};

	&:hover {
		background: ${(props) => props.theme.palette.background.paper};
	}
`;

export const DnDNewMenuButton = memo(function DnDNewMenuButton({ isClicked = false, setIsClicked }) {
	const theme = useTheme();
	const { t } = useTranslation('menuPage');
	useEffect(() => {
		const handleEscKey = (event) => {
			if (event.key === 'Escape') {
				setIsClicked(false);
			}
		};

		// eslint-disable-next-line no-undef
		document.addEventListener('keydown', handleEscKey);

		return () => {
			// eslint-disable-next-line no-undef
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [setIsClicked]);

	const buttonClickHandle = () => {
		setIsClicked((prevIsClicked) => !prevIsClicked);
	};

	return (
		<ThemeProvider theme={theme}>
			<Tooltip title={t('ADDNEWDNDELEMENT_TOOLTIP')}>
				<AddNewMenu
					type="button"
					onClick={buttonClickHandle}
				>
					{!isClicked ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M7 12h4V8h1v4h4v1h-4v4h-1v-4H7zM6 4h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"
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
								d="M7 12h9v1H7zM6 4h11a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"
							/>
						</svg>
					)}
				</AddNewMenu>
			</Tooltip>
		</ThemeProvider>
	);
});
