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
    const listItem = document.createElement('li');
    listItem.classList.add('prueba');
    listItem.id = contact.id;
    listItem.innerHTML = `
    <button class="delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      </button>
      <input type="text" class="edit-name"  value="${contact.name}" readonly>
      <input type="text" class="edit-number"  value="${contact.phone}" readonly>
      <button class="edit-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>        
      </button>
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
  const NUMBER_REGEX = /^(0212|0412|0414|0424)[0-9]{7}$/;
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
    const inputEditName = editBtn.parentElement.children[1];
    const inputEditNumber = editBtn.parentElement.children[2];
    let nameValidation_EDIT = true;
    let numberValidation_EDIT = true;

    if (editBtn.classList.contains('editando')) {

      editBtn.classList.remove('editando')
      inputEditName.setAttribute('readonly', true);
      inputEditNumber.setAttribute('readonly', true);

      const NUMBER_REGEX = /^(0212|0412|0414|0424)[0-9]{7}$/;
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
      const NUMBER_REGEX = /^(0212|0412|0414|0424)[0-9]{7}$/;
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