// TodoFormView
function TodoFormView() {
}

TodoFormView.prototype.render = function (container) {
    var form = document.createElement('form');
    var input = document.createElement('input');
    var button = document.createElement('input');

    form.onsubmit = add.bind(this);
    form.action = 'javascript:';

    button.value = 'Add';
    button.type = 'submit';
    input.placeholder = 'Add Item';

    form.appendChild(input);
    form.appendChild(button);

    form.className = 'form';
    input.classList= 'input';
    button.className = 'add';

    container.appendChild(form);
    

    window.onload = function () { input.focus(); };

    function add(e) {
        this.onAddTodo && this.onAddTodo(input.value);
        input.value = '';
        input.focus();
    };
}