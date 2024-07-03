import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [
		{
			order: 1,
			name: 'Menu 1',
			parent: null,
			id: 1
		},
		{
			order: 2,
			name: 'Menu 2',
			parent: null,
			id: 2
		},
		{
			order: 3,
			name: 'Menu 3',
			parent: null,
			id: 4
		},
		{
			order: 1,
			name: 'Menu 1.1',
			parent: 1,
			id: 3
		},
		{
			order: 2,
			name: 'Menu 1.2',
			parent: 1,
			id: 5
		},
		{
			order: 3,
			name: 'Menu 1.3',
			parent: 1,
			id: 6
		},
		{
			order: 1,
			name: 'Menu 1.2.1',
			parent: 5,
			id: 8
		},
		{
			order: 1,
			name: 'Menu 1.2.1.1',
			parent: 8,
			id: 9
		},
		{
			order: 1,
			name: 'Menu 1.2.1.1.1',
			parent: 9,
			id: 10
		},
		{
			order: 2,
			name: 'Menu 1.2.1.1.2',
			parent: 9,
			id: 11
		},
		{
			order: 2,
			name: 'Menu 1.2.1.2',
			parent: 8,
			id: 12
		},
		{
			order: 1,
			name: 'Menu 1.2.1.1.1.1',
			parent: 10,
			id: 13
		},
		{
			order: 1,
			name: 'Menu 1.1.1',
			parent: 3,
			id: 14
		},
		{
			order: 2,
			name: 'test',
			parent: 3,
			id: 15
		}
	],
	errorMessage: '',
	loading: false,
	currentItem: null,
	draggedItem: null,
	isChildShow: false,
};

const DnDSlice = createSlice({
	name: 'DnDSlice',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.errorMessage = action.payload;
		},
		changeCurrentItem: (state, action) => {
			state.currentItem = action.payload;
		},
		changeDraggedItem: (state, action) => {
			state.draggedItem = action.payload;
		},
		changeIsChildShow: (state, action) => {
			state.isChildShow = action.payload;
		},
		updateData: (state, action) => {
			state.data = action.payload;
		},
		addNewData: (state, action) => {
			state.data = [...state.data, action.payload];
		},
		deleteData: (state, action) => {
			state.data = state.data.filter((menu) => menu.id !== action.payload);
		},
		renameData: (state, action) => {
			state.data = state.data.map((menu) => (menu.id === action.payload.id ? action.payload : menu));
		}
	}
});

export const {
	setError,
	changeCurrentItem,
	changeDraggedItem,
	changeIsChildShow,
	updateData,
	addNewData,
	deleteData,
	renameData
} = DnDSlice.actions;
export default DnDSlice.reducer;
export const DnDSliceName = DnDSlice.name;
