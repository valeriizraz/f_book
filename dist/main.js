(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Container
const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};

// Header
const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');

  const headerContainer = createContainer();
  header.append(headerContainer);

  header.headerContainer = headerContainer;

  return header;
};

const createLogo = title => {
  const h1 = document.createElement('h1');
  h1.classList.add('logo');
  h1.textContent = `Телефонный справочник ${title}`;

  return h1;
};

// Main
const createMain = () => {
  const main = document.createElement('main');

  const mainContainer = createContainer();
  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};

// Main button
const createButtonsGroup = params => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = text;
    button.type = type;
    return button;
  });

  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};

// Main table
const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th class="delete">Удалить</th>
      <th>Имя</th>
      <th>Фамилия</th>
      <th>Телефон</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');
  table.append(thead, tbody);
  table.tbody = tbody;

  return table;
};

// Footer
const createFooter = title => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const footerContainer = createContainer();

  const h2 = document.createElement('h2');
  h2.textContent = `Все права защищены ${title}`;
  footerContainer.append(h2);

  footer.append(footerContainer);
  footer.footerContainer = footerContainer;

  return footer;
};

// Form
const createForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay');

  const form = document.createElement('form');
  form.classList.add('form');
  form.insertAdjacentHTML('beforeend', `
  <button class="close" type="button"></button>
  <h2 class="form-title">Добавить контакт</h2>
  
  <div class="form-group">
    <label class="form-label" for="name">Имя:</label>
    <input class="form-input" name="name"
      id="name" type="text" required>
  </div>

  <div class="form-group">
    <label class="form-label" for="surname">Фамилия:</label>
    <input class="form-input" name="surname"
      id="surname" type="text" required>
  </div>

  <div class="form-group">
    <label class="form-label" for="phone">Телефон:</label>
    <input class="form-input" name="phone"
      id="phone" type="number" required>
  </div>

  `);

  // Form buttons
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  form.append(...buttonGroup.btns);
  overlay.append(form);

  return {
    overlay,
    form,
  };
};

const createRow = ({name: firstName, surname, phone}) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');

  const tdDel = document.createElement('td');
  tdDel.classList.add('delete');
  const buttonDel = document.createElement('button');
  buttonDel.classList.add('del-icon');

  tdDel.append(buttonDel);

  const tdName = document.createElement('td');
  tdName.textContent = firstName;

  const tdSurname = document.createElement('td');
  tdSurname.textContent = surname;

  const tdPhone = document.createElement('td');
  const phoneLink = document.createElement('a');
  tr.phoneLink = phoneLink;
  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = phone;

  tdPhone.append(phoneLink);

  const tdEdit = document.createElement('td');
  tdEdit.classList.add('edit-icon');

  tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

  return tr;
};

module.exports = {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createFooter,
  createForm,
  createRow,
};

},{}],2:[function(require,module,exports){


const {
  createRow,
} = require('./createElements');

const {
  getStorage,
  setStorage,
  removeStorage,
} = require('./storageControl');

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach((contact) => {
    contact.addEventListener('mouseenter', (e) => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', (e) => {
      logo.textContent = text;
    });
  });
};

// Форма (показать, скрыть)
const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', () => {
    openModal();
  });

  formOverlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

// Удаление контакта
const deleteControl = (btnDel, list, title) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('del-icon')) {
      const phone = e.target.closest('.contact').children[3].textContent;
      const local = getStorage(title);

      removeStorage(local, phone, title);

      e.target.closest('.contact').remove();
    }
  });
};

// Добавление контакта на страницу
const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

// Работа с формой
const formControl = (form, list, closeModal, title) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);


    addContactPage(newContact, list);
    setStorage(title, newContact);
    form.reset();
    closeModal();
  });
};

module.exports = {
  hoverRow,
  modalControl,
  deleteControl,
  addContactPage,
  formControl,
};

},{"./createElements":1,"./storageControl":4}],3:[function(require,module,exports){
const {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createFooter,
  createForm,
  createRow,
} = require('./createElements');

const {
  getStorage,
} = require('./storageControl');

// Render
const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const footer = createFooter(title);
  const {form, overlay} = createForm();

  header.headerContainer.append(logo);
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
  app.append(header, main, footer);

  return {
    list: table.tbody,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
    table,
  };
};

const renderContact = (elem, title) => {
  const local = getStorage(title);

  const allRow = local.map(createRow);
  elem.append(...allRow);
  return allRow;
};

module.exports = {
  renderPhoneBook,
  renderContact,
};

},{"./createElements":1,"./storageControl":4}],4:[function(require,module,exports){
// Storage
const getStorage = (key) => {
  const local = localStorage.getItem(key);

  if (local === null) {
    console.log(local);
    return [];
  } else {
    console.log(local);
    return JSON.parse(local);
  }
};

const setStorage = (key, contact) => {
  const storageArr = getStorage(key);
  console.log(storageArr);
  storageArr.push(contact);
  localStorage.setItem(key, JSON.stringify(storageArr));
};

const removeStorage = (local, phone, title) => {
  local.forEach((elem, index) => {
    if (elem.phone === phone) {
      console.log(true);
      local.splice(index, 1);
      localStorage.setItem(title, JSON.stringify(local));
    }
  });
};

module.exports = {
  getStorage,
  setStorage,
  removeStorage,
};


},{}],5:[function(require,module,exports){

{
  const {
    hoverRow,
    modalControl,
    deleteControl,
    formControl,
  } = require('./modules/eventControl');

  const {
    renderPhoneBook,
    renderContact,
  } = require('./modules/renderElements');

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);

    // Функционал

    // Наведение на ряды
    const allRow = renderContact(list, title);

    // Форма (открытие, закрытие)
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list, title);
    formControl(form, list, closeModal, title);
  };

  window.phoneBookInit = init;
}

},{"./modules/eventControl":2,"./modules/renderElements":3}]},{},[5]);
