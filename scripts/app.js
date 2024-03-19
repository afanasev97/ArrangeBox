class ArrangeBox {
	constructor() {
		this.documentContainer = document.querySelector('.container');

		this.control;
		this.availableList;
		this.selectedList;
	}


	init() {
		this.availableList = this.createListItems("available", ["Item 1", "Item 2", "Item 3", "Item 4"]);
		this.selectedList = this.createListItems("selected");
		this.control = this.createControl();
	}

	createControl() {
		/*
		container
		left
		center
		right
		*/
		const controlObj = {};

		controlObj.container = document.createElement('div');
		controlObj.container.classList.add('arrange-box');

		controlObj.left = document.createElement('div');
		controlObj.left.classList.add('box', 'left');
		controlObj.container.appendChild(controlObj.left);

		controlObj.center = document.createElement('div');
		controlObj.center.classList.add('panel', 'center');
		controlObj.container.appendChild(controlObj.center);

		controlObj.right = document.createElement('div');
		controlObj.right.classList.add('box', 'right');
		controlObj.container.appendChild(controlObj.right);



		return controlObj;
	}

	createListItems(id, arrayValues = []) {
		const list = document.createElement('ul');
		list.classList.add('list-items');
		list.setAttribute('id', id);
		arrayValues.forEach(value => {
			const li = this.createLiElement(value);
			list.appendChild(li);
		})

		return list;
	}

	createList(listName) {

	}

	createLiElement(value) {
		const li = document.createElement('li');
		li.textContent = value;
		li.classList.add('item');
		li.addEventListener('click', () => {
			li.classList.toggle('selected');
			this.toggleAllButtons();
		});
		return li;
	}
}

// (() => new ArrangeBox())();
// const arrangeBox = new ArrangeBox();