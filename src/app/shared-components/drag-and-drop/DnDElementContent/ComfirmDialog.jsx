import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ConfirmDialog({ open, onClose, onConfirm, title, content, yes, no }) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={onClose}
					color="primary"
				>
					{no}
				</Button>
				<Button
					onClick={onConfirm}
					color="primary"
				>
					{yes}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmDialog;
