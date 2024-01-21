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
