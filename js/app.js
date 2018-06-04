$(document).ready(function () {
    let items = localStorage.getItem('books') && JSON.parse(localStorage.getItem('books')) || [],
        numItem = 0;
    const inputAuthor = $('.input-author'),
            inputYear = $('.input-year'),
            inputName = $('.input-name'),
            inputPageCount = $('.input-pageCount'),
            content = $('.content');

    if (items.length) {
        console.log('items', items);
        showItemOnPages(items);
    }



    //конструктор объекта книги
    class oneBook {
        constructor(author, year, name, pageCount, id) {
            this.author = author;
            this.year = year;
            this.name = name;
            this.pageCount = pageCount;
            this.id = id;
        }
    };

    function setBooksInLocalStorage(books) {
        localStorage.setItem('books', JSON.stringify(books))
    };


    //добавление по клику
    $('.button-add').on('click', function () {
        const book = {
            author: inputAuthor.val(),
            name: inputName.val(),
            year: inputYear.val(),
            pageCount: inputPageCount.val()
        }
        addBook(book);
    });

    //функция добавления элемента на страницу и в массив
   function addBook(book) {
       // let valid = validBook(book);
       // if (!valid) return;
       items.push(new oneBook(book.author,book.year, book.name, book.pageCount, numItem));
       numItem++;
       showItemOnPages(items);
       setBooksInLocalStorage(items);
       cleaningFields();
   };

   function cleaningFields() {
       inputAuthor.val('');
       inputYear.val('');
       inputName.val('');
       inputPageCount.val('');
   };

   function showItemOnPages(booksArray) {
        let bookList = '';
        for (const book of booksArray) {
            bookList += createBookElement(book);
        }
        $('.list-books').html(bookList);
    };

    function createBookElement(book) {
        return `<li id=${book.id} class='book'>
                    <span>Author: ${book.author}</span>
                    <span>Year: ${book.year}</span>
                    <span>Book name: ${book.name}</span>
                    <span>Pages: ${book.pageCount}</span>
                    <input class="button-edit" type="button" value="Edit">
                    <input class="button-remove" type="button" value="Remove">
                </li>`
    };

    function setValue(book) {
        inputAuthor.val(book.author);
        inputYear.val(book.year);
        inputName.val(book.name);
        inputPageCount.val(book.pageCount);
    }

    //редактирование книги
    content.on('click', '.list-books .book .button-edit', function () {
        const id = $(this).parent().attr('id');
        const bookIndex = items.findIndex((item) => {
            return item.id == id
        });
        const bookToEdit = items[bookIndex];
        items.splice(bookIndex, 1);
        setValue(bookToEdit);
        setBooksInLocalStorage(items);
        showItemOnPages(items);
    });

    //удаление книги
    content.on('click', '.list-books .book .button-remove', function () {
        const id = $(this).parent().attr('id');
        const bookIndex = items.findIndex((item) => {
            return item.id == id
        });
        items.splice(bookIndex, 1);
        setBooksInLocalStorage(items);
        showItemOnPages(items);
    });
});
