$(document).ready(function () {
    let items = [],
        numItem = 0;
    const inputAuthor = $('.input-author'),
            inputYear = $('.input-year'),
            inputName = $('.input-name'),
            inputPageCount = $('.input-pageCount');

    //конструктор объекта книги
    class oneBook {
        constructor(author, year, name, pageCount, id) {
            this.author = author;
            this.year = year;
            this.name = name;
            this.pageCount = pageCount;
            this._id = id;
        }
    };

    //добавление по клику
    $('.button-add').on('click', function () {
        const book = {
            author: inputAuthor.val(),
            name: inputName.val(),
            year: inputYear.val(),
            pageCount: inputPageCount.val()
        }
        addItem(book);
    });

    //функция добавления элемента на страницу и в массив
   function addItem(book) {
       // let valid = validBook(book);
       // if (!valid) return;
       items.push(new oneBook(book.author,book.year, book.name, book.pageCount));
       numItem++;
       console.log(items, numItem);
       // $('.input-text').val('');
   };

});
