// Storage
const getStorage = (key) => {
  const local = localStorage.getItem(key);

  if (local === null) {
    return [];
  } else {
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

export default {
  getStorage,
  setStorage,
  removeStorage,
};

