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
	this.container.appendChild(this.showDeletedCheckBox);
	this.showDeletedCheckBox.type ='checkBox';
	this.showDeletedCheckBox.onclick = this.ctrl.showDeletedCheckBoxHandler.bind(ctrl);
	this.showDeletedCheckBox.className = 'showDeletedCheckBox';
	
	var showDeletedLable = document.createElement('label')
	showDeletedLable.type = 'label';
	showDeletedLable.innerHTML = 'Show deleted items';
	this.container.appendChild(showDeletedLable);
	showDeletedLable.className = 'moveprevbtn';
	
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
		var doImg = document.createElement('img')
		var deleteImg = document.createElement('img');
		var selectBox = document.createElement('input');
		selectBox.type = 'checkBox';
		
		li.appendChild(selectBox);
		li.appendChild(span);
		!todo.isDeleted && li.appendChild(doImg);
		li.appendChild(deleteImg);
		
		span.innerHTML = (todo.isDeleted ? idxDel : idx) + '. ' + todo.title + ' ';
		todo.isDone && (span.className = 'done');
		doImg.className = 'img';
		
		todo.isDeleted && (span.className = 'deleted') && (deleteImg.className = 'img');
		deleteImg.className = todo.isDeleted ? deleteImg.src = 'Undelete.png' : deleteImg.src = 'Delete.png';
		deleteImg.onclick = this.ctrl.deleteHandler.bind(this.ctrl, todo);
		
		selectBox.onclick = this.ctrl.selectHandler.bind(this.ctrl, todo);
		
		if(todo.isDeleted) continue;
		doImg.innerHTML = todo.isDone ? doImg.src = 'Undo.png' : doImg.src = 'Do.png';
		doImg.onclick = this.ctrl.doHandler.bind(this.ctrl, todo);
		// doImg.onclick = (function(that, td){
			// return function(e) {
				// that.ctrl.doHandler(td);
			// };
		// })(this, todo);
		
	}
}