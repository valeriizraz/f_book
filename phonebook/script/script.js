
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
