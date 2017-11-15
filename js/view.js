// takes a list of models
// renders the UI

function TodoView(containerId) {
	this.container = document.getElementById(containerId);
}

TodoView.prototype.init = function(ctrl) {
	this.ctrl = ctrl;
	
	var form = document.createElement('form');
	var input = document.createElement('input');
	var button = document.createElement('input');
	var div = document.createElement('div');
		
	form.onsubmit = add.bind(this);
	form.action = 'javascript:';
	
	button.value = 'add';
	button.type = 'submit';
	
	
	form.appendChild(input);
	form.appendChild(button);
	this.container.appendChild(form);
	
	var doSelectedItems = document.createElement('input');
	doSelectedItems.type = 'button';
	doSelectedItems.value = 'Do Selected Items';
	doSelectedItems.onclick = this.ctrl.performSelectedItemsAction.bind(ctrl, 'isDone');
	doSelectedItems.className = 'doSelectedItems';
	div.appendChild(doSelectedItems);

	var deleteSelectedItems = document.createElement('input');
	deleteSelectedItems.type = 'button';
	deleteSelectedItems.value = 'Delete Selected Items';
	deleteSelectedItems.onclick = this.ctrl.performSelectedItemsAction.bind(ctrl, 'isDeleted');
	deleteSelectedItems.className = 'deleteSelectedItems';
	div.appendChild(deleteSelectedItems);
	this.container.appendChild(div);

	
	this.ul = document.createElement('ul');
	this.container.appendChild(this.ul);
	
	this.showDeletedCheckBox = document.createElement('input');
	this.showDeletedCheckBox.type ='checkBox';
	this.showDeletedCheckBox.onclick = this.ctrl.showDeletedCheckBoxHandler.bind(ctrl);
	this.showDeletedCheckBox.className = 'showDeletedCheckBox';
	this.showDeletedCheckBox.checked = true;
	
	var showDeletedLabel = document.createElement('label')
	showDeletedLabel.type = 'label';
	showDeletedLabel.innerHTML = 'Show deleted items';
	showDeletedLabel.className = 'moveprevbtn';

	showDeletedLabel.appendChild(this.showDeletedCheckBox);
	this.container.appendChild(showDeletedLabel);
	
	this.deletedUl = document.createElement('ul');
	this.container.appendChild(this.deletedUl);
			
	window.onload = function(){ input.focus(); };
	
	function add(e) { 
		this.ctrl.addTodoHandler(input.value);
		input.value = '';
		input.focus();
	};
	
}


TodoView.prototype.render = function() {
	var todoList = this.ctrl.todoList;
	
	while(this.ul.lastChild){ this.ul.removeChild(this.ul.lastChild); };
	while(this.deletedUl.lastChild){ this.deletedUl.removeChild(this.deletedUl.lastChild); };
	
	for(var i = 0, idx=0, idxDel=0; i < todoList.length; i++) {
		var todo = todoList[i];
		var ul = todo.isDeleted ? this.deletedUl : this.ul;
		todo.isDeleted ? idxDel++ : idx++;
		
		var li = document.createElement('li');
		(!todo.isDeleted || this.showDeletedCheckBox.checked) && ul.appendChild(li);
		
		var span = document.createElement('span');
		var buttonSpan = document.createElement('span');
		var doImg = document.createElement('img')
		var deleteImg = document.createElement('img');
		var selectBox = document.createElement('input');
		selectBox.type = 'checkBox';
		selectBox.checked = todo.isSelected;
		

		li.appendChild(selectBox);
		li.appendChild(span);
		!todo.isDeleted && buttonSpan.appendChild(doImg);
		buttonSpan.appendChild(deleteImg);
		li.appendChild(buttonSpan);
		
		span.className= 'titleSpan';
		span.innerHTML = (todo.isDeleted ? idxDel : idx) + '. ' + todo.title + ' ';
		doImg.className ='imgButton';
		todo.isDone && (span.className += ' done');
		
		todo.isDeleted && (span.className += ' deleted') && (deleteImg.className = 'img');
		deleteImg.className = todo.isDeleted ? deleteImg.src = 'assets/img/Undelete.png' : deleteImg.src = 'assets/img/Delete.png';
		deleteImg.onclick = this.ctrl.deleteHandler.bind(this.ctrl, todo);
		deleteImg.className = 'imgButton';

		selectBox.onclick = this.ctrl.selectHandler.bind(this.ctrl, todo);
		
		if(todo.isDeleted) continue;
		doImg.innerHTML = todo.isDone ? doImg.src = 'assets/img/Undo.png' : doImg.src = 'assets/img/Do.png';
		doImg.onclick = this.ctrl.doHandler.bind(this.ctrl, todo);
		
		// doImg.onclick = (function(that, td){
			// return function(e) {
				// that.ctrl.doHandler(td);
			// };
		// })(this, todo);
		
	}
}