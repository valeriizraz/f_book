

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
