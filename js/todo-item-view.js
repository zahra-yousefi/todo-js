function TodoItemView(todo) {
    this.todo = todo;
}

TodoItemView.prototype.render = function (container) {
    var div = document.createElement('div'),
        selectBox = document.createElement('input'),
        span = document.createElement('span'),
        doImg = document.createElement('img'),
        deleteImg = document.createElement('img');

    container.appendChild(div);
    div.appendChild(selectBox);
    div.appendChild(span);
    !this.todo.isDeleted && div.appendChild(doImg);
    div.appendChild(deleteImg);

    selectBox.type = 'checkBox';
    selectBox.checked = this.todo.isSelected;
    selectBox.onclick = selectItem.bind(this);

    span.className = 'titleSpan' + (this.todo.isDone ? ' done' : '') + (this.todo.isDeleted ? ' deleted' : '');
    span.innerHTML = this.todo.index + '. ' + this.todo.title;

    doImg.className = 'imgButton';
    doImg.src = this.todo.isDone ? 'assets/img/Undo.png' : 'assets/img/Do.png';
    doImg.onclick = doItem.bind(this);

    deleteImg.className = 'imgButton';
    deleteImg.src = this.todo.isDeleted ? 'assets/img/unDelete.png' : 'assets/img/Delete.png';
    deleteImg.onclick = deleteItem.bind(this);


    function doItem() {
        this.onDoItem && this.onDoItem(this.todo);
    }
    function deleteItem() {
        this.onDeleteItem && this.onDeleteItem(this.todo);
    }

    function selectItem() {
        this.onSelectItem && this.onSelectItem(this.todo);
    }
}

