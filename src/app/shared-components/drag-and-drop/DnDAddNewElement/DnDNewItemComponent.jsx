import { AnimatedContainerLeft } from 'app/shared-components/animated-components/AnimatedContainerLeft';
import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import Tooltip from '@mui/material/Tooltip';

const NewItemContainer = styled.div`
	width: 90%;
	margin-top: 10px;
	position: relative;
	background: inherit;
`;

const NewItemLabel = styled.label`
	top: -8px;
	left: 10px;
	position: absolute;
	font-size: 12px;
	z-index: 42;
	padding: 0px 4px;
	background: inherit;
	color: ${(props) => props.theme.palette.text.secondary};
`;

const shake = keyframes`
  10%, 90% {
    transform: translateX(-5px);
  }
  20%, 80% {
    transform: translateX(5px);
  }
  30%, 50%, 70% {
    transform: translateX(-5px);
  }
  40%, 60% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
`;

const NewItemInput = styled.input`
	width: 100%;
	height: 40px;
	position: relative;
	border: 1px solid ${(props) => props.theme.palette.border.light};
	border-radius: 5px;
	padding: 5px 5px 5px 15px;
	background: inherit;

	&.active {
		animation: ${shake} 0.5s ease-in-out;
	}
`;

const NewItemSave = styled.button`
	top: 0%;
	right: 0;
	position: absolute;
	font-size: 20px;
	padding: 5px;
	border: 1px solid ${(props) => props.theme.palette.border.light};
	border-radius: 0px 10px 0px 0px;
	box-shadow: 0 4px 8px ${(props) => props.theme.palette.shadow.light};
	background: ${(props) => props.theme.palette.background.paper};
	color: ${(props) => props.theme.palette.text.secondary};
	transform: translate(110%, 0%);
	&.active {
		background: ${(props) => props.theme.palette.background.paper};
	}
	&:focus,
	&:hover {
		background: ${(props) => props.theme.palette.background.default};
	}
	&:focus.active,
	&:hover.active {
		background: ${(props) => props.theme.palette.background.default};
	}
`;

export const DnDNewItemComponent = memo(function DnDNewItemComponent({
	setIsClicked,
	inputData,
	defaultName = '',
	item = null
}) {
	const theme = useTheme();
	const { t } = useTranslation('menuPage');
	const inputRef = useRef(null);

	const [name, setName] = useState('');
	const [isShaking, setIsShaking] = useState(false);
	const menuState = useSelector((state) => state.DnDSlice);

	const createNewItemHandle = (e) => {
		e.stopPropagation();

		if (name.trim()) {
			inputData(name.trim());
			setIsClicked((prevIsClicked) => !prevIsClicked);
		} else {
			setIsShaking(true);
		}

		setTimeout(() => {
			setIsShaking(false);
		}, 500);
	};

	useEffect(() => {
		if (defaultName.trim()) {
			setName(defaultName);
		}

		inputRef.current.focus();
	}, [defaultName]);

	return (
		<ThemeProvider theme={theme}>
			<AnimatedContainerLeft>
				<NewItemContainer onClick={(e) => e.stopPropagation()}>
					<NewItemLabel htmlFor="addNewElement">{t('NAME_ADDNEW')}</NewItemLabel>
					<NewItemInput
						type="text"
						id="addNewElement"
						value={name}
						ref={inputRef}
						tabIndex="0"
						onChange={(e) => setName(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								createNewItemHandle(e);
							}
						}}
						className={isShaking ? 'active' : null}
					/>
					<Tooltip title={t('SAVE_TOOLTIP')}>
						<NewItemSave
							type="button"
							onClick={createNewItemHandle}
							tabIndex="0"
							className={menuState?.currentItem?.id === item?.id ? 'active' : ''}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-9 11q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-6-8h9V6H6z"
								/>
							</svg>
						</NewItemSave>
					</Tooltip>
				</NewItemContainer>
			</AnimatedContainerLeft>
		</ThemeProvider>
	);
});
