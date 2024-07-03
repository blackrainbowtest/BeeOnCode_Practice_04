/**
 * Handles the logic for updating the data array when the mouse is in the upper half of the target item.
 *
 * @param {Array} data - The array of data items.
 * @param {boolean} isMouseInUpperHalf - A flag indicating whether the mouse is in the upper half of the target item.
 * @param {Object} item
 * @param {Object} currentItem - The item that the user is dragging.
 * @param {Object} draggedItem - The item on which the user is dropping
 * @returns {Array} - The updated array of data items.
 */
export function topHalfLogicHandler(data, isMouseInUpperHalf, item, currentItem, draggedItem) {
	if (!isMouseInUpperHalf) return data;

	const currentItemTemp = data.find((obj) => obj.id === currentItem.id);
	const draggedItemTemp = data.find((obj) => obj.id === item.id);

	if (currentItemTemp.parent === item.parent) {
		// console.log('%cLogic for top half when parent is the same', 'color: green');
		data = data.map((el) => {
			if (currentItemTemp.order < draggedItemTemp.order) {
				if (el.id === currentItemTemp.id) {
					return { ...el, order: draggedItemTemp.order - 1 };
				}

				if (
					el.parent === currentItemTemp.parent &&
					el.order <= draggedItemTemp.order - 1 &&
					el.order > currentItemTemp.order
				) {
					return { ...el, order: el.order - 1 };
				}
			} else {
				if (el.id === currentItemTemp.id) {
					return { ...el, order: draggedItemTemp.order };
				}

				if (
					el.parent === currentItemTemp.parent &&
					el.order >= draggedItemTemp.order &&
					el.order < currentItemTemp.order
				) {
					return { ...el, order: el.order + 1 };
				}
			}

			return el;
		});
	} else if (item.id !== (draggedItem?.id || null)) {
		// console.log('%cLogic for top half when parent is different', 'color: yellow');
		data = data.map((el) => {
			if (el.id === currentItemTemp.id) {
				return { ...el, order: draggedItemTemp?.order, parent: draggedItemTemp.parent };
			}

			if (el.parent === currentItemTemp.parent && el.order >= currentItemTemp.order) {
				return { ...el, order: el.order - 1 };
			}

			if (el.parent === draggedItemTemp.parent && el.order >= draggedItemTemp.order) {
				return { ...el, order: el.order + 1 };
			}

			return el;
		});
	}

	return [...data];
}

/**
 * Handles the logic for updating the data array when the mouse is in the lower half of the target item.
 *
 * @param {Array} data - The array of data items.
 * @param {boolean} isMouseInUpperHalf - A flag indicating whether the mouse is in the upper half of the target item.
 * @param {Object} item
 * @param {Object} currentItem - The item that the user is dragging.
 * @param {Object} draggedItem - The item on which the user is dropping
 * @returns {Array} - The updated array of data items.
 */
export function bottomHalfLogicHandler(data, isMouseInUpperHalf, item, currentItem, draggedItem) {
	if (isMouseInUpperHalf) return data;

	const currentItemTemp = data.find((obj) => obj.id === currentItem.id);
	const draggedItemTemp = data.find((obj) => obj.id === item.id);

	if (currentItemTemp.parent === item.parent) {
		// console.log('%cLogic for bottom half when parent is the same', 'color: blue');
		data = data.map((el) => {
			if (currentItemTemp.order < draggedItemTemp.order) {
				if (el.id === currentItemTemp.id) {
					return { ...el, order: draggedItemTemp.order };
				}

				if (
					el.parent === currentItemTemp.parent &&
					el.order <= draggedItemTemp.order &&
					el.order > currentItemTemp.order
				) {
					return { ...el, order: el.order - 1 };
				}
			} else {
				if (el.id === currentItemTemp.id) {
					return { ...el, order: draggedItemTemp.order + 1 };
				}

				if (
					el.parent === currentItemTemp.parent &&
					el.order > draggedItemTemp.order &&
					el.order <= currentItemTemp.order
				) {
					return { ...el, order: el.order + 1 };
				}
			}

			return el;
		});
	} else if (item.id !== (draggedItem?.id || null)) {
		// console.log('%cLogic for bottom half when parent is different', 'color: yellow');
		data = data.map((el) => {
			if (el.id === currentItemTemp.id) {
				return { ...el, order: draggedItemTemp.order + 1, parent: draggedItemTemp.parent };
			}

			if (el.parent === currentItemTemp.parent && el.order >= currentItemTemp.order) {
				return { ...el, order: el.order - 1 };
			}

			if (el.parent === draggedItemTemp.parent && el.order > draggedItemTemp.order) {
				return { ...el, order: el.order + 1 };
			}

			return el;
		});
	}

	return data;
}

/**
 * Updates the data array for drag and drop (DnD) functionality.
 * Determines whether to add the current item to the top or bottom half of the target item
 * and calls the corresponding handler function to update the data.
 *
 * @param {Array} data - The array of data items.
 * @param {boolean} isMouseInUpperHalf - A flag indicating whether the mouse is in the upper half of the target item.
 * @param {Object} item - The target item on which the user is dropping. // Maybe I should delete it)) It seems unnecessary
 * @param {Object} currentItem - The item that the user is dragging.
 * @param {Object} draggedItem - The item on which the user is dropping (same as `item`).
 * @returns {Array} - The updated array of data items.
 */
export function updateDataDnD(data, isMouseInUpperHalf, item, currentItem, draggedItem) {
	if (isMouseInUpperHalf) {
		return topHalfLogicHandler(data, isMouseInUpperHalf, item, currentItem, draggedItem);
	}

	return bottomHalfLogicHandler(data, isMouseInUpperHalf, item, currentItem, draggedItem);
}

/**
 * Checks whether the second element is a descendant of the first element in the array of items.
 * @param {number} parent The ID of the parent element.
 * @param {number} child The ID of the child element to check.
 * @param {Array<Object>} items An array of items where each item has an 'id' (number) and 'parent' (number|null) property.
 * @returns {boolean} Returns true if 'child' is a descendant of 'parent', otherwise false.
 */
export function isDescendant(parent, child, items) {
	if (parent === child) {
		return true;
	}

	const parentItem = items.find((item) => item.id === parent);

	if (!parentItem || parentItem.parent === null) {
		return false;
	}

	return isDescendant(parentItem.parent, child, items);
}

/**
 * Checks if the cursor position (Y-coordinate) is near the center of the element.
 * @param {DOMRect} elementRect The bounding rectangle of the element.
 * @param {number} cursorPositionY The Y-coordinate of the cursor position.
 * @returns {boolean} Returns true if the cursor is near the center, otherwise false.
 */
export function isNearCenter(elementRect, cursorPositionY) {
	/**
	 * Threshold for determining "close to the center"
	 */
	const middleThreshold = 0.25;
	const elementTop = elementRect.top;
	const elementBottom = elementRect.bottom;

	const elementHeight = elementBottom - elementTop;
	const middleZoneTop = elementTop + elementHeight * middleThreshold;
	const middleZoneBottom = elementBottom - elementHeight * middleThreshold;

	return cursorPositionY > middleZoneTop && cursorPositionY < middleZoneBottom;
}

/**
 * Checks if the cursor position (Y-coordinate) is in the upper half of the element.
 * @param {DOMRect} elementRect The bounding rectangle of the element.
 * @param {number} cursorPositionY The Y-coordinate of the cursor position.
 * @returns {boolean} Returns true if the cursor is in the upper half, otherwise false.
 */
export function isUpperHalf(elementRect, cursorPositionY) {
	const mouseYRelativeToTop = cursorPositionY - elementRect.top;
	const elementHeight = elementRect.height;
	return mouseYRelativeToTop <= elementHeight / 2;
}

/**
 * Moves the dragged item as a child of the target item.
 *
 * @param {Array} data - The array of data items.
 * @param {Object} draggedItem - The item that is being dragged.
 * @param {Object} targetItem - The item under which the dragged item will be nested.
 * @returns {Array} - The updated array of data items.
 */
export function moveItemAsChild(data, currentItem, draggedItem) {
	console.log(data, currentItem, draggedItem);
	// return data.map((item) => {

		// if (item.id === draggedItem.id) {
		// 	return { ...item, parent: targetItem.id };
		// }

		// return item;
	// });
}
