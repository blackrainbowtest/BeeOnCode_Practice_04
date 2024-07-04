import { memo } from 'react';
import { useTheme } from '@mui/material/styles';
import styled, { ThemeProvider } from 'styled-components';
import DragAndDrop from 'app/shared-components/drag-and-drop/DragAndDrop';

const MenuContentContainer = styled.div`
	background: ${(props) => props.theme.palette.background.default};
	color: ${(props) => props.theme.palette.text.primary};
`;

function MenuContent() {
	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<MenuContentContainer>
				<DragAndDrop />
			</MenuContentContainer>
		</ThemeProvider>
	);
}

export default memo(MenuContent);
