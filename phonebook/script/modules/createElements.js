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
