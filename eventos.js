const inputName = document.querySelector('#form-input-name');
const inputNumber = document.querySelector('#form-input-number');
const form = document.querySelector('#form');
const formBtn = document.querySelector('#form-btn');
const list = document.querySelector('#list');

let nameValidation = false;
let numberValidation = false;
let contacts = [];

const validateInput = (validation, input) => {
  const formInfo = input.parentElement.children[2];
  if (nameValidation && numberValidation) {
    formBtn.disabled = false;
  } else {
    formBtn.disabled = true;
  }

  if (input.value === '') {
    input.classList.remove('correct');
    input.classList.remove('invalid');
    formInfo.classList.remove('show');
  } else if (validation) {
    input.classList.add('correct');
    input.classList.remove('invalid');
    formInfo.classList.remove('show');
  } else {
    input.classList.add('invalid');
    input.classList.remove('correct');
    formInfo.classList.add('show');
  }
}

const validateInputEdit = (validation, input) => {
  
  if (input.value === '') {
    input.classList.remove('correct');
    input.classList.add('invalid');
  } else if (validation) {
    input.classList.add('correct');
    input.classList.remove('invalid');
  } else {
    input.classList.add('invalid');
    input.classList.remove('correct');
  }
}

const renderContacts = () => {
  list.innerHTML = '';
  contacts.forEach(contact => {
    const listItem = document.createElement('tr');
    listItem.classList.add('prueba');
    listItem.id = contact.id;
    listItem.innerHTML = `
    <td>
       <button class="delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg> 
      </button>
    </td>
    <td>
        <input type="text" class="edit-name"  value="${contact.name}" readonly>
        <input type="text" class="edit-number"  value="${contact.phone}" readonly>
    </td>
    <td>
      <button class="edit-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
      </button>
    </td>
    `;
    list.append(listItem);
  });
}

inputName.addEventListener('input', e => {
  const NAME_REGEX = /^[A-Z][a-z ]*[A-Z][a-z]*$/;
  nameValidation = NAME_REGEX.test(inputName.value);
  validateInput(nameValidation, inputName);
});

inputNumber.addEventListener('input', e => {
  const NUMBER_REGEX = /^(0212|0412|0414|0424|0416|0426)[0-9]{7}$/;
  numberValidation = NUMBER_REGEX.test(inputNumber.value);
  validateInput(numberValidation, inputNumber);
});
//   application/json
form.addEventListener('submit', e => {
  e.preventDefault();
  const contactsCopy = contacts;
  const sortedContactsCopy = contactsCopy.sort((a,b) => b.id - a.id);

  const newContact = {
    name: inputName.value,
    phone: inputNumber.value,
    id: contactsCopy.length
    ? sortedContactsCopy[0].id + 1 : 0,
  }

  contacts = contacts.concat(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  renderContacts();

  nameValidation = false;
  numberValidation = false;

  inputName.value = '';
  inputNumber.value = '';

  validateInput(nameValidation, inputName);
  validateInput(numberValidation, inputNumber);

});

list.addEventListener('click', e => {
  const deleteBtn = e.target.closest('.delete-btn');
  const editBtn = e.target.closest('.edit-btn');

  if (deleteBtn) {
    const contactToDelete = deleteBtn.parentElement;
    const id = Number(contactToDelete.id);
    contacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
  }

  if (editBtn) {
    const li = editBtn.parentElement;
    const inputEditName = editBtn.parentElement.parentElement.querySelector(".edit-name")
    const inputEditNumber = editBtn.parentElement.parentElement.querySelector(".edit-number");
    // const inputEditName = editBtn.parentElement.children[1];
    // const inputEditNumber = editBtn.parentElement.children[2];
    let nameValidation_EDIT = true;
    let numberValidation_EDIT = true;

    if (editBtn.classList.contains('editando')) {

      editBtn.classList.remove('editando')
      inputEditName.setAttribute('readonly', true);
      inputEditNumber.setAttribute('readonly', true);

      const NUMBER_REGEX = /^(0212|0412|0414|0424|0416|0426)[0-9]{7}$/;
      numberValidation_EDIT = NUMBER_REGEX.test(inputEditNumber.value);
      
      const NAME_REGEX = /^[A-Z][a-z ]*[A-Z][a-z]*$/;
      nameValidation_EDIT = NAME_REGEX.test(inputEditName.value);

      if(nameValidation_EDIT && numberValidation_EDIT){
        const id = Number(li.id);
        const contactToUpdate = contacts.find(contact => contact.id === id);
        const contactUpdated = {
          ...contactToUpdate,
          name: inputEditName.value,
          phone: inputEditNumber.value
        }
        contacts = contacts.map(contact => {
          if (contact.id === id) {
            return contactUpdated;
          } else {
            return contact
          }
        });
        
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }else{
        alert("No se pudo actualizar")   
      }
      renderContacts();
      editBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>        
      `;
      
    } else {
      editBtn.classList.add('editando')
      inputEditName.removeAttribute('readonly');
      inputEditNumber.removeAttribute('readonly');
      editBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
      `;
      // 1. Agregar eventos a inputs
      // 2. Agregar regex a cada input
      // 3. Testear el regex
      // 4. 

    }

    inputEditName.addEventListener('input', e => {
      const NAME_REGEX = /^[A-Z][a-z ]*[A-Z][a-z]*$/;
      nameValidation_EDIT = NAME_REGEX.test(inputEditName.value);
      validateInputEdit(nameValidation_EDIT, inputEditName);
    });

    inputEditNumber.addEventListener('input', e => {
      const NUMBER_REGEX = /^(0212|0412|0414|0424|0416|0426)[0-9]{7}$/;
      numberValidation_EDIT = NUMBER_REGEX.test(inputEditNumber.value);
      validateInputEdit(numberValidation_EDIT, inputEditNumber);
    });
  }
});

(() => {
  const contactsStorage = localStorage.getItem('contacts') || [];
  contacts = JSON.parse(contactsStorage);
  renderContacts();
})();