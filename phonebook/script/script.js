import {renderPhoneBook as myPhoneBook, renderContact}
  from './modules/renderElements.js';

import moduleEvent from './modules/eventControl.js';
const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} = moduleEvent;

const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);

  const {
    list,
    logo,
    btnAdd,
    formOverlay,
    form,
    btnDel,
  } = myPhoneBook(app, title);

  // Функционал
  const allRow = renderContact(list, title);

  // Форма (открытие, закрытие)
  const {closeModal} = modalControl(btnAdd, formOverlay);

  // Наведение на ряды
  hoverRow(allRow, logo);
  deleteControl(btnDel, list, title);
  formControl(form, list, closeModal, title);
};

window.phoneBookInit = init;

