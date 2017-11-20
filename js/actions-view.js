// TodoActionsView
function TodoActionsView() {
    this.showDeletedTodos = true;
}

TodoActionsView.prototype.render = function (container) {
    var div = document.createElement('div'),
        doSelectedItems = document.createElement('input'),
        deleteSelectedItems = document.createElement('input'),
        unDeleteAllselect = document.createElement('input'),
        selectAll = document.createElement('input'),
        showDeletedCheckBox = document.createElement('input'),
        showDeletedLabel = document.createElement('label');

    container.appendChild(div);
    div.appendChild(doSelectedItems);
    div.appendChild(deleteSelectedItems);
    div.appendChild(unDeleteAllselect);
    div.appendChild(selectAll);
    div.appendChild(showDeletedLabel);
    
    doSelectedItems.type = 'button';
    doSelectedItems.value = 'Do';
    doSelectedItems.onclick = doSeleted.bind(this);
    doSelectedItems.className = 'actionButton doSelectedItems';
    
    deleteSelectedItems.type = 'button';
    deleteSelectedItems.value = 'Delete';
    deleteSelectedItems.onclick = deleteSeleted.bind(this);
    deleteSelectedItems.className = 'actionButton deleteSelectedItems';
    
    selectAll.type = 'button';
    selectAll.value = 'Select All ';
    selectAll.onclick = select.bind(this);
    selectAll.className = 'actionButton selectAll';
    
    showDeletedLabel.type = 'label';
    showDeletedLabel.innerHTML = 'Show deleted items';
    showDeletedLabel.className = 'moveprevbtn';
    showDeletedLabel.appendChild(showDeletedCheckBox);

	showDeletedCheckBox.type = 'checkBox';
	showDeletedCheckBox.onclick = toggleShowDeleted.bind(this);
	showDeletedCheckBox.className = 'showDeletedCheckBox';
    showDeletedCheckBox.checked = this.showDeletedTodos;

    unDeleteAllselect.type = 'button';
    unDeleteAllselect.value = 'UnDelete';
    unDeleteAllselect.onclick = unDeleteAllSelect.bind(this);
    unDeleteAllselect.className = 'actionButton undeleteSelectedItems';


    function doSeleted() {
        this.onDoSelected && this.onDoSelected();
    }
    function deleteSeleted() {
        this.onDeleteSelected && this.onDeleteSelected();
    }
    function select() {
        this.onSelectAll && this.onSelectAll();
    }
    function toggleShowDeleted() {
        this.showDeletedTodos = !this.showDeletedTodos;
        this.onShowDeletedCheckBox && this.onShowDeletedCheckBox();
    }

    function unDeleteAllSelect(){
        this.onUnDeleteSelectAll && this.onUnDeleteSelectAll();
    }
}