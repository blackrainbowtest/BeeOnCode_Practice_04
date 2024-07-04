import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const NoButton = styled(Button)`
	background: ${(props) => props.theme.palette.error.main};
	color: ${(props) => props.theme.palette.error.contrastText};
	&:hover {
		background: ${(props) => props.theme.palette.error.dark};
	}
`;

function ConfirmDialog({ open, onClose, onConfirm, title, content, yes, no }) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			onClick={(e) => e.stopPropagation()}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<NoButton onClick={onClose}>{no}</NoButton>
				<Button
					onClick={onConfirm}
					color="secondary"
				>
					{yes}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmDialog;
