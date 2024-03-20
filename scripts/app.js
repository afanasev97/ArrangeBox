class ArrangeBox {
	constructor() {
		this.documentContainer = document.querySelector('.container');

		this.control;
		this.availableList;
		this.selectedList;

		this.availableListInitValues = this.#generateRandomValues()
		this.#init();
	}

	get availableListLiElements() {
		return Array.from(this.availableList.querySelectorAll('.item'));
	}

	get selectedListLiElements() {
		return Array.from(this.selectedList.querySelectorAll('.item'));
	}

	get availableListValues() {
		return this.availableListLiElements.map(item => item.innerText);
	}

	get selectedListValues() {
		return this.selectedListLiElements.map(item => item.innerText);
	}

	#init() {
		this.availableList = this.#createListItems("available", this.availableListInitValues);
		this.selectedList = this.#createListItems("selected");
		this.control = this.#createControl();

		this.control.querySelector('.left').appendChild(this.#createPanelActions(this.availableList));
		this.control.querySelector('.left').appendChild(this.#createList('Available', this.availableList));
		this.control.querySelector('.right').appendChild(this.#createPanelActions(this.selectedList));
		this.control.querySelector('.right').appendChild(this.#createList('Selected', this.selectedList));

		this.documentContainer.appendChild(this.control);
		this.#toggleAllButtons();
	}

	#createControl() {
		const container = document.createElement('div');
		container.classList.add('arrange-box');

		const left = document.createElement('div');
		left.classList.add('box', 'left');
		container.appendChild(left);

		const center = this.#createCentralPanel();
		container.appendChild(center);

		const right = document.createElement('div');
		right.classList.add('box', 'right');
		container.appendChild(right);

		const settings = this.#createSettings();
		container.appendChild(settings);

		return container;
	}

	#createCentralPanel() {
		const centerElement = document.createElement('div');
		const moveRightButton = document.createElement('button');
		const moveRightAllButton = document.createElement('button');
		const moveLeftButton = document.createElement('button');
		const moveLeftAllButton = document.createElement('button');
		const settingsButton = document.createElement('button');

		centerElement.classList.add('panel', 'center');

		moveRightButton.innerHTML = '<img src="./src/images/arrow-right.svg" alt="Move Right">';
		moveRightAllButton.innerHTML = '<img src="./src/images/arrow-double-right.svg" alt="Move Right All">';
		moveLeftButton.innerHTML = '<img src="./src/images/arrow-left.svg" alt="Move Left">';
		moveLeftAllButton.innerHTML = '<img src="./src/images/arrow-double-left.svg" alt="Move Left All">';
		settingsButton.innerHTML = '<img src="./src/images/settings.svg" alt="Settings">';

		moveRightButton.addEventListener('click', () => {
			this.availableListLiElements.filter(item => item.classList.contains('selected')).forEach(item => {
				this.selectedList.appendChild(item);
			});
			this.#toggleAllButtons();
		});
		moveRightAllButton.addEventListener('click', () => {
			this.availableListLiElements.forEach(item => {
				this.selectedList.appendChild(item);
			});
			this.#toggleAllButtons();
		});
		moveLeftButton.addEventListener('click', () => {
			this.selectedListLiElements.filter(item => item.classList.contains('selected')).forEach(item => {
				this.availableList.appendChild(item);
			});
			this.#toggleAllButtons();
		});
		moveLeftAllButton.addEventListener('click', () => {
			this.selectedListLiElements.forEach(item => {
				this.availableList.appendChild(item);
			});
			this.#toggleAllButtons();
		});
		settingsButton.addEventListener('click', () => this.#showSettings());

		centerElement.appendChild(moveRightButton);
		centerElement.appendChild(moveRightAllButton);
		centerElement.appendChild(moveLeftButton);
		centerElement.appendChild(moveLeftAllButton);
		centerElement.appendChild(settingsButton);

		return centerElement;
	}

	#createSettings() {
		const settingsElement = document.createElement('div');
		const availableControlValuesButton = document.createElement('button');
		const createNewArrangeBoxButton = document.createElement('button');
		const selectedControlValuesButton = document.createElement('button');
		const resetButton = document.createElement('button');

		availableControlValuesButton.innerText = 'Available Control Values';
		createNewArrangeBoxButton.innerText = 'Create New Arrange Box';
		selectedControlValuesButton.innerText = 'Selected Control Values';
		resetButton.innerText = 'Reset';

		availableControlValuesButton.addEventListener('click', () => {
			alert(`Available Control Values:\n${this.availableListValues}`);
		});
		createNewArrangeBoxButton.addEventListener('click', () => {
			console.log("new arrange box will be created");
			this.#createNewArrangeBox();
		});
		selectedControlValuesButton.addEventListener('click', () => {
			alert(`Selected Control Values:\n${this.selectedListValues}`);
		});
		resetButton.addEventListener('click', () => {
			this.#reset();
		})

		settingsElement.classList.add('settings', 'hidden');
		settingsElement.appendChild(availableControlValuesButton);
		settingsElement.appendChild(createNewArrangeBoxButton);
		settingsElement.appendChild(selectedControlValuesButton);
		settingsElement.appendChild(resetButton);

		return settingsElement;
	}

	#createPanelActions(targetList) {
		const panelActionsElement = document.createElement('div');
		panelActionsElement.classList.add('panel', 'actions');
		const addButton = document.createElement('button');
		const moveTopButton = document.createElement('button');
		const moveUpButton = document.createElement('button');
		const moveDownButton = document.createElement('button');
		const moveBottomButton = document.createElement('button');

		addButton.innerHTML = '<img src="./src/images/add.svg" alt="Add">';
		moveTopButton.innerHTML = '<img src="./src/images/arrow-top.svg" alt="Move Top">';
		moveUpButton.innerHTML = '<img src="./src/images/arrow-up.svg" alt="Move Up">';
		moveDownButton.innerHTML = '<img src="./src/images/arrow-down.svg" alt="Move Down">';
		moveBottomButton.innerHTML = '<img src="./src/images/arrow-bottom.svg" alt="Move Bottom">';

		addButton.addEventListener('click', () => {
			const newItemElement = prompt('Enter new item:');
			if (newItemElement) {
				targetList.appendChild(this.#createLiElement(newItemElement));
			};
		});

		moveTopButton.addEventListener('click', () => {
			Array.from(targetList.querySelectorAll(".selected")).reverse().forEach(item => {
				targetList.insertBefore(item, targetList.firstChild);
			})
			this.#toggleAllButtons();
		});

		moveUpButton.addEventListener('click', () => {
			Array.from(targetList.querySelectorAll(".selected")).forEach(item => {
				const prevSibling = item.previousElementSibling;
				if (prevSibling && !prevSibling.classList.contains('selected')) {
					targetList.insertBefore(item, prevSibling);
				}
			})
			this.#toggleAllButtons();
		});

		moveDownButton.addEventListener('click', () => {
			Array.from(targetList.querySelectorAll(".selected")).reverse().forEach(item => {
				const nextSibling = item.nextElementSibling;
				if (nextSibling && !nextSibling.classList.contains('selected')) {
					targetList.insertBefore(nextSibling, item);
				}
			})
			this.#toggleAllButtons();
		});

		moveBottomButton.addEventListener('click', () => {
			targetList.querySelectorAll(".selected").forEach(item => {
				targetList.append(item);
			})
			this.#toggleAllButtons();
		});

		panelActionsElement.appendChild(addButton);
		panelActionsElement.appendChild(moveTopButton);
		panelActionsElement.appendChild(moveUpButton);
		panelActionsElement.appendChild(moveDownButton);
		panelActionsElement.appendChild(moveBottomButton);

		return panelActionsElement;
	}

	#createList(listName, listItems) {
		const listElement = document.createElement('div');
		const listNameElement = document.createElement('div');
		const searchElement = document.createElement('div');
		const searchInputElement = document.createElement('input');

		listElement.classList.add('list');
		listNameElement.classList.add('list-name');
		searchElement.classList.add('search');
		searchInputElement.classList.add('search-input');

		listNameElement.textContent = listName;
		searchInputElement.setAttribute('type', 'text');
		searchInputElement.setAttribute('placeholder', 'Search by name...');
		searchInputElement.addEventListener('input', () => {
			const searchValue = searchInputElement.value.toLowerCase();
			listItems.querySelectorAll('.item').forEach(item => {
				if (item.textContent.toLowerCase().includes(searchValue)) {
					item.classList.remove('hidden');
				} else {
					item.classList.add('hidden');
				}
			})
		})

		searchElement.appendChild(searchInputElement);
		listElement.appendChild(listNameElement);
		listElement.appendChild(searchElement);
		listElement.appendChild(listItems);

		return listElement;
	}

	#createListItems(id, arrayValues = []) {
		const listElement = document.createElement('ul');
		listElement.classList.add('list-items');
		listElement.setAttribute('id', id);
		arrayValues.forEach(value => {
			const li = this.#createLiElement(value);
			listElement.appendChild(li);
		})

		return listElement;
	}

	#createLiElement(value) {
		const liElement = document.createElement('li');
		liElement.textContent = value;
		liElement.classList.add('item');
		liElement.addEventListener('click', () => {
			liElement.classList.toggle('selected');
			this.#toggleAllButtons();
		});
		return liElement;
	}

	#showSettings() {
		this.control.querySelector('.settings').classList.toggle('hidden');
	}

	#toggleAllButtons() {
		const leftButtons = Array.from(this.control.querySelector('.left').querySelectorAll("button:not(:first-Child)"));
		const rightButtons = Array.from(this.control.querySelector('.right').querySelectorAll("button:not(:first-Child)"));
		const centerButtons = Array.from(this.control.querySelector('.center').querySelectorAll("button:not(:last-Child)"));

		this.#toggleButtonsInList(leftButtons, this.availableList)
		this.#toggleButtonsInList(rightButtons, this.selectedList)
		this.#toggleButtonsinCenter(centerButtons)
	}

	#toggleButtonsInList(buttonsArray, list) {
		if (!list.querySelector('.selected')) {
			this.#toggleButtons(buttonsArray, true);
			return;
		}
		this.#toggleButtons([buttonsArray[0], buttonsArray[1]], list.firstChild.classList.contains('selected'));
		this.#toggleButtons([buttonsArray[2], buttonsArray[3]], list.lastChild.classList.contains('selected'));
	}

	#toggleButtonsinCenter(buttonsArray) {
		this.#toggleButtons([buttonsArray[0], buttonsArray[1]], this.availableListLiElements.length < 1);
		this.#toggleButtons([buttonsArray[2], buttonsArray[3]], this.selectedListLiElements.length < 1);
	}

	#toggleButtons(buttonsArray, value) {
		buttonsArray.forEach(button => {
			button.disabled = value;
		});
	}

	#createNewArrangeBox() {
		return new ArrangeBox();
	}

	#reset() {
		this.documentContainer.removeChild(this.control);
		this.#init();
	}

	#generateRandomValues(valuesAmmount = 7) {
		const adjectives = [
			'Black', 'Brown', 'Red', 'Cool', 'White', 'Gaming', 'Galaxy'];
		const nouns = [
			'Watch', 'T-Shirt', 'Keyboard', 'Mouse', 'Monitor', 'Headphones', 'Bracelet']
		const values = new Set();

		while (values.size < valuesAmmount) {
			values.add(`${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`);
		}
		return Array.from(values);
	}
}

/*
 * Actually didn't understood should we need to have instance of this class in global scope or not
 * if it needed then change comment and uncomment lines
*/
(() => new ArrangeBox())();
// const arrangeBox = new ArrangeBox();