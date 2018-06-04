$(document).ready(function () {
    let items = localStorage.getItem('books') && JSON.parse(localStorage.getItem('books')) || [],
        numItem = 0;
    const inputAuthor = $('.input-author'),
            inputYear = $('.input-year'),
            inputName = $('.input-name'),
            inputPageCount = $('.input-pageCount'),
            content = $('.content');
    const itemsOnPage = 2;
    let currentPage;

    if (items.length) {
        paginationItems(items);
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

    //валидация
    function validBook() {
        let valid = true;
        if (!inputAuthor.val() || !inputName.val() || !inputYear.val() || !inputPageCount.val()) {
            valid = false;
            if (!$('*').is('.alert')) {
                $('.app').prepend(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>Опа!</strong> Необходимо заполнить все поля!
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`);
            }
        }
        return valid;
    }

    //функция добавления элемента на страницу и в массив
   function addBook(book) {
       const valid = validBook();
       if (!valid) return;
       $('.error').hide();
       items.push(new oneBook(book.author,book.year, book.name, book.pageCount, numItem));
       numItem++;
       paginationItems(items);
       setBooksInLocalStorage(items);
       cleaningFields();
   };
   //очистка полей
   function cleaningFields() {
       inputAuthor.val('');
       inputYear.val('');
       inputName.val('');
       inputPageCount.val('');
   };
   //создание книги
   function createBookElement(book) {
        return  `<div id=${book.id} class="card book">
                    <div class="card-header">Название: ${book.name}</div>
                    <div class="card-body
                        <p class="card-text">Автор: ${book.author}</p>
                        <a href="#" class="btn btn-primary button-edit">Редактировать</a>
                        <a href="#" class="btn btn-primary button-remove">Удалить</a>
                    </div>
                </div>`
    };
    //установка данных в поля
    function setValue(book) {
        inputAuthor.val(book.author);
        inputYear.val(book.year);
        inputName.val(book.name);
        inputPageCount.val(book.pageCount);
    }

    //редактирование книги
    content.on('click', '.list-books .book .button-edit', function () {
        const id = $(this).parent().parent().attr('id');
        const bookIndex = items.findIndex((item) => {
            return item.id == id
        });
        const bookToEdit = items[bookIndex];
        setValue(bookToEdit);
        items.splice(bookIndex, 1);
        setBooksInLocalStorage(items);
        paginationItems(items);
    });

    //удаление книги
    content.on('click', '.list-books .book .button-remove', function () {
        const id = $(this).parent().parent().attr('id'),
            clickNum = +$('.pages ul .page a#currentPage').text();

        const bookIndex = items.findIndex((item) => {
            return item.id == id
        });
        items.splice(bookIndex, 1);
        setBooksInLocalStorage(items);
        paginationItems(items, clickNum);
    });

    //переход по страницам
    $('.pages').on('click', '.page a', function () {
        const clickNum = +$(this).text();
        paginationItems(items, clickNum);
    });

    //Пагинация
    function countPages(array) {
        return Math.ceil(array.length / itemsOnPage)
    };

    function showItemOnPages(currentPage, booksArray) {
        let bookList = '';
        let showItemsBox = booksArray.slice(currentPage * itemsOnPage - itemsOnPage, currentPage * itemsOnPage);
        for (const book of showItemsBox) {
            bookList += createBookElement(book);
        }
        $('.list-books').html(bookList);
    };

    function paginationItems(array, numPage) {
        let allPages = countPages(array);
        numPage
            ? (numPage > allPages ? currentPage = allPages : currentPage = numPage)
            : (currentPage = allPages);

        let paginationString = '<ul class="pagination">';
        for (let i = 1; i <= allPages; i++) {
            i == currentPage
                ? paginationString = `${paginationString}<li class="page page-item">
                                                            <a href="#" class="page-link" id="currentPage">${i}</a>
                                                        </li>`
                :  paginationString = `${paginationString}<li class="page page-item">
                                                            <a class="page-link" href="#">${i}</a>
                                                        </li>`;
        }
        paginationString = `${paginationString}</ul>`;
        $('.pages').html(paginationString);
        showItemOnPages(currentPage, array);
    };
});
