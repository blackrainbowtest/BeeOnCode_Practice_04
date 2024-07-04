import { AnimatedContainerLeft } from 'app/shared-components/animated-components/AnimatedContainerLeft';
import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const NewItemContainer = styled.div`
	position: relative;
	margin-top: 10px;
	background: inherit;
	width: 90%;
`;

const NewItemLabel = styled.label`
	position: absolute;
	top: -8px;
	left: 10px;
	font-size: 12px;
	z-index: 42;
	color: #333333;
	padding: 0px 4px;
	background: inherit;
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
	border: 1px solid #a2405f;
	background-color: transparent;
	border-radius: 5px;
	padding: 5px 5px 5px 15px;
	height: 40px;
	width: 100%;
	position: relative;

	&.active {
		animation: ${shake} 0.5s ease-in-out;
	}
`;

const NewItemSave = styled.button`
	border: 1px solid #6457bb;
	background-color: #6457bb;
	border-radius: 0px 10px 0px 0px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	position: absolute;
	color: #ffffff;
	font-size: 20px;
	top: 0%;
	right: 0;
	transform: translate(110%, 0%);
	padding: 5px;
	&.active {
		background-color: #de1f5f;
		border: 1px solid #6457bb;
	}
	&:focus,
	&:hover {
		background-color: #5b5080;
		border: 1px solid #382c74;
	}
	&:focus.active,
	&:hover.active {
		background-color: #cc143c;
		border: 1px solid #8c0f39;
	}
`;

export const DnDNewItemComponent = memo(function DnDNewItemComponent({
	setIsClicked,
	inputData,
	defaultName = '',
	item = null
}) {
	const [name, setName] = useState('');
	const [isShaking, setIsShaking] = useState(false);
	const menuState = useSelector((state) => state.DnDSlice);
	const inputRef = useRef(null);

	const { t } = useTranslation('menuPage');

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
			</NewItemContainer>
		</AnimatedContainerLeft>
	);
});
