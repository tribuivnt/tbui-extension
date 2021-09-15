fetchItems();

// document.querySelector('.create-todo').addEventListener('click', function(){
//     document.querySelector('.new-item').style.display = "block";
// });

document.querySelector('.new-item button').addEventListener('click', function(){
    var itemName = document.querySelector('.new-item input').value;
    if (itemName != '') {
        var itemsStorage = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(itemsStorage);
        itemsArr.push({"item": itemName, "status": 0});
        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.new-item input').value = '';
        document.querySelector('.new-item').style.display = "none";
    }
});

function fetchItems() {
    const itemsList = document.querySelector('ul.todo-items');
    itemsList.innerHTML = '';
    var newItemHTML = '';
    try {
        var items = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(items);

        for (var i = 0; i < itemsArr.length; i++) {
            var status = '';
            if(itemsArr[i].status == 1) {
                status = 'class="done"';
            }
            newItemHTML += `<li data-itemindex="${i}" ${status}>
            <span class="item">${itemsArr[i].item}</span>
            <div>
                <span class="itemComplete"><img src="/images/add.png" alt="add" width="16px"></span>
                <span class="itemUndo"><img src="/images/delete.png" alt="delete" width="16px"></span>
                <span class="itemDelete"><img src="/images/bin.png" alt="bin" width="16px"></span>
            </div>
            </li>`;
        }

        itemsList.innerHTML = newItemHTML;
        var itemsListUL = document.querySelectorAll('ul li');
        
        for (var i = 0; i < itemsListUL.length; i++) {
            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function() {
                //
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemComplete(index);
            });
            itemsListUL[i].querySelector('.itemUndo').addEventListener('click', function() {
                //
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemUndo(index);
            });
            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function() {
                //
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemDelete(index);
            });
        }
    }catch(e) {
        //
    }
}

function itemComplete(index) {
    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage);

    itemsArr[index].status = 1;

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='done';
}

function itemUndo(index) {
    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage);

    itemsArr[index].status = 0;

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='undo';
}

function itemDelete(index) {
    var itemsStorage = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(itemsStorage);

    itemsArr.splice(index, 1);

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();
}

function saveItems(obj) {
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

fetchItems();