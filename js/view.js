// takes a list of models
// renders the UI

function TodoView(containerId) {
	this.container = document.getElementById(containerId);
}

TodoView.prototype.init = function (ctrl) {
	this.ctrl = ctrl;

	var todoFormView = new TodoFormView();
	todoFormView.onAddTodo = this.ctrl.addTodoHandler.bind(ctrl);
	todoFormView.render(this.container);

	var todoActionsView = new TodoActionsView();
	todoActionsView.onDoSelected = this.ctrl.performSelectedItemsAction.bind(ctrl, 'isDone', true);
	todoActionsView.onDeleteSelected = this.ctrl.performSelectedItemsAction.bind(ctrl, 'isDeleted',true);
	todoActionsView.onSelectAll = this.ctrl.performSelectAllAction.bind(ctrl);
	todoActionsView.onShowDeletedCheckBox = this.ctrl.showDeletedCheckBoxHandler.bind(ctrl);
	todoActionsView.onUnDeleteSelectAll = this.ctrl.performSelectedItemsAction.bind(ctrl, 'isDeleted' ,false);
	todoActionsView.render(this.container);
	this.actionsView = todoActionsView;

	
	

	this.ul = document.createElement('ul');
	this.container.appendChild(this.ul);

	this.deletedUl = document.createElement('ul');
	this.container.appendChild(this.deletedUl);
}


TodoView.prototype.render = function () {
	var todoList = this.ctrl.todoList;

	while (this.ul.lastChild) { this.ul.removeChild(this.ul.lastChild); };
	while (this.deletedUl.lastChild) { this.deletedUl.removeChild(this.deletedUl.lastChild); };

	for (var i = 0, idx = 0, idxDel = 0; i < todoList.length; i++) {
		var todo = todoList[i];
		var ul = todo.isDeleted ? this.deletedUl : this.ul;
		todo.isDeleted ? idxDel++ : idx++;

		var li = document.createElement('li');

		(!todo.isDeleted || this.actionsView.showDeletedTodos) && ul.appendChild(li);
		
		todo.index = todo.isDeleted ? idxDel : idx;
		var todoItemView = new TodoItemView(todo);
		todoItemView.onSelectItem = this.ctrl.selectHandler.bind(this.ctrl);
		todoItemView.onDoItem = this.ctrl.doHandler.bind(this.ctrl);
		todoItemView.onDeleteItem = this.ctrl.deleteHandler.bind(this.ctrl);
		todoItemView.render(li);
		
		// doImg.onclick = (function(that, td){
		// return function(e) {
		// that.ctrl.doHandler(td);
		// };
		// })(this, todo);

	}
}