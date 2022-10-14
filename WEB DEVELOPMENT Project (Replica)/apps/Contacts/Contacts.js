const StorageCtrl= (function() {
    return {
        storeContact: function(contact) {
            let contacts= null;
            if(localStorage.getItem('Contacts') === null) {
                contacts= [];
                contacts.push(contact);				
				//Converted a JavaScript object into a string with JSON.stringify().
                localStorage.setItem('Contacts', JSON.stringify(contacts));
            } else {
				//Parse the data with JSON.parse(), and the data becomes a JavaScript object.
                contacts= JSON.parse(localStorage.getItem('Contacts'));
                contacts.push(contact)
                localStorage.setItem('Contacts', JSON.stringify(contacts));
            }
        },
        getContacts: function() {
            let contacts= null;
            if(localStorage.getItem('Contacts') === null ) {
                contacts= [];
            } else {
                contacts= JSON.parse(localStorage.getItem('Contacts'));
            }
            return contacts;
        },
        updateContactFromLS: function(updatedCont) {
            let lsContacts= JSON.parse(localStorage.getItem('Contacts'));
            lsContacts.forEach(function(contact, index) {
                if(contact.id === updatedCont.id) {
                    lsContacts.splice(index, 1, updatedCont);
                }
            });
            localStorage.setItem('Contacts', JSON.stringify(lsContacts));
        },
        deleteContactFromLS: function(id) {
            let lsContacts= JSON.parse(localStorage.getItem('Contacts'));
            lsContacts.forEach(function(contact, index) {
                if(id === contact.id) {
                    lsContacts.splice(index, 1);
                }
            });
            localStorage.setItem('Contacts', JSON.stringify(lsContacts));
        },
        deleteEverythingFromLS: function() {
            localStorage.removeItem('Contacts');
        }
    }
})();
const contactsDataCtrl= (function() {
    class Contact {
        constructor(id, firstName, lastName, phone) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phone = phone;
        }
    }
    const contacts= {
        details: StorageCtrl.getContacts(),
        currentData: null
    };
    return {
        addToContactsDS: function(data) {
            let ID;
            if(contacts.details.length > 0) {
                ID= contacts.details[contacts.details.length - 1].id + 1;
            } else {
                ID= 0;
            }
            const contactAdd= new Contact(ID, data.firstName, data.lastName, data.phone);
            contacts.details.push(contactAdd);
            return contactAdd;
        },
        getContactById: function(id) {
            let found;
            contacts.details.find(function(contact) {
                if(id=== contact.id) {
                    found= contact
                }
            });
            return found;
        },
        setCurrentContact: function(contact) {
            contacts.currentData= contact;
        },
        getCurrentContact: function() {
            return contacts.currentData;
        },
        updateContact: function(firstName, lastName, phone) {
            let found= null;
            contacts.details.forEach(function(contact) {
                if(contact.id === contacts.currentData.id) {
                    contact.firstName= firstName;
                    contact.lastName= lastName;
                    contact.phone= phone;
                    found= contact;
                }
            });
            console.log(found, 123);
            return found;
        },
        deleteFromDS: function(id) {
            console.log(id);
            let found;
            found= contacts.details.map(function(contact) {
                return contact.id;
            });
            const index= found.indexOf(id);
            contacts.details.splice(index, 1);
            console.log(found);

        },
        logData: function() {
            return contacts.details;
        },
        log: function() {
            return contacts;
        }
    }
})();
const UICtrl= (function() {
    const selectors= {
        headerContactAddForm: '#header-contact-add-form',
        nameFields: '#nameFields',
        plusBtn: '#add-contacts',
        searchContacts: '#search-contacts',
        myNumber: '#my-number',
        contactList: '#contacts',
        firstName: '#firstName',
        lastName: '#lastName',
        phoneNumber: '#phoneNumber',
        doneBtn: '#Done',
        cancelBtn: '#Cancel',
        searchBox: '#search-box',
        contactDetailsPerPerson: '#contact-details-per-person',
        contactClick: '.contact-click',
        backBtn: '#backBtn',
        editClick: '#edit-click',
        editContact: '#editContact',
        updateButton: '#updateButton',
        contactsUIInterface: '#contactsUIInterface',
        backToHome: '#backToHome',
        deleteContact: '#deleteContact'
    };
    return {
        getInputs: function() {
            return {
                firstName:  document.querySelector(selectors.firstName).value,
                lastName :  document.querySelector(selectors.lastName).value,
                phone    :  document.querySelector(selectors.phoneNumber).value
            };
        },
        showContactsToUI: function(contactObject) {
            const allContactsFromDS= contactsDataCtrl.logData();
            const html= `
            <a href="#" class="contact-click ${contactObject.id} cont-${contactObject.id}">
                <div class="contact">
                    <b class='search-item'>${contactObject.firstName} ${contactObject.lastName}</b>
                </div>
                <hr class="line">
            </a>
            `;

            document.querySelector(selectors.contactList).insertAdjacentHTML('beforeend', html);
        },
        paintDatas: function() {
            let html= '';
            const datas= contactsDataCtrl.logData();
            datas.forEach(function(data) {
                html +=`
                    <a href="#" class="contact-click ${data.id} cont-${data.id}">
                        <div class="contact">
                            <b class='search-item'>${data.firstName} ${data.lastName}</b>
                        </div>
                        <hr class="line">
                    </a>
                `;
            });
            document.querySelector(selectors.contactList).insertAdjacentHTML('beforeend', html);
        },
        clearInputFields: function() {
            document.querySelector(selectors.firstName).value   = '';
            document.querySelector(selectors.lastName).value    = '';
            document.querySelector(selectors.phoneNumber).value = '';
        },
        hideNewContactBlock: function() {
            document.querySelector(selectors.headerContactAddForm).style.display= 'none';
            document.querySelector(selectors.nameFields).style.display= 'none';
            document.querySelector(selectors.contactDetailsPerPerson).style.display= 'none';
        },
        hideEditContact: function() {
            document.querySelector(selectors.editContact).style.display= 'none';
        },
        displayNewContactBlock: function() {
            document.querySelector(selectors.headerContactAddForm).style.display= 'block';
            document.querySelector(selectors.nameFields).style.display= 'block';
            document.querySelector(selectors.plusBtn).style.display= 'none';
            document.querySelector(selectors.searchContacts).style.display= 'none';
            document.querySelector(selectors.myNumber).style.display= 'none';
            document.querySelector(selectors.contactList).style.display= 'none';
            document.querySelector('#deleteContacts').style.display= 'none';
            document.querySelector(selectors.editContact).style.display= 'none';
        },
        updateState: function() {
            document.querySelector(selectors.editContact).style.display= 'block';
            document.querySelector(selectors.plusBtn).style.display= 'none';
            document.querySelector(selectors.searchContacts).style.display= 'none';
            document.querySelector(selectors.myNumber).style.display= 'none';
            document.querySelector(selectors.contactList).style.display= 'none';
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        hideContactShowHomeBlock: function() {
            document.querySelector(selectors.headerContactAddForm).style.display= 'none';
            document.querySelector(selectors.nameFields).style.display= 'none';
            document.querySelector(selectors.editContact).style.display= 'none';
            document.querySelector(selectors.plusBtn).style.display= 'block';
            document.querySelector(selectors.searchContacts).style.display= 'block';
            document.querySelector(selectors.myNumber).style.display= 'block';
        },
        uiStateOnNameClick: function() {
            document.querySelector(selectors.plusBtn).style.display= 'none';
            document.querySelector(selectors.searchContacts).style.display= 'none';
            document.querySelector(selectors.myNumber).style.display= 'none';
            document.querySelector(selectors.contactList).style.display= 'none';
            document.querySelector(selectors.contactDetailsPerPerson).style.display= 'block';
            document.querySelector(selectors.editContact).style.display= 'none';
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        paintCurrentItem: function() {
            document.querySelector('#details-name').textContent= `${contactsDataCtrl.getCurrentContact().firstName} ${contactsDataCtrl.getCurrentContact().lastName}`;
            document.querySelector('#phone-wrap').setAttribute('href', `tel: ${contactsDataCtrl.getCurrentContact().phone}`);
            document.querySelector('#det-phoneNumber').textContent= `Number: ${contactsDataCtrl.getCurrentContact().phone}`;
            document.querySelector(selectors.editContact).style.display= 'none';
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        addValuesToUI: function() {
            const inputsFromDS= contactsDataCtrl.log().currentData;
            document.querySelector('#fName').value= inputsFromDS.firstName;
            document.querySelector('#lName').value= inputsFromDS.lastName;
            document.querySelector('#phone').value= inputsFromDS.phone;
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        showInputFields: function() {
            document.querySelector(selectors.nameFields).style.display   = 'block';
            document.querySelector(selectors.editContact).style.display= 'none';
            document.querySelector('#deleteContacts').style.display= 'none';
        },
        deleteFromUI: function(id) {
            const classOfContact= `.cont-${id}`;
            document.querySelector(classOfContact).remove();
        },
        UISelectors: function() {
            return selectors;
        }
    }
})();
const AppCtrl= (function(contactsDataCtrl, UICtrl, StorageCtrl) {
    function loadEvents() {
        const UISelectors= UICtrl.UISelectors();
        document.querySelector(UISelectors.plusBtn).addEventListener('click', UICtrl.displayNewContactBlock);
        document.querySelector(UISelectors.doneBtn).addEventListener('click', addContact);
        document.querySelector(UISelectors.searchBox).addEventListener('keyup', searchContact);
        document.querySelector(UISelectors.cancelBtn).addEventListener('click', Cancel);
        document.querySelector(UISelectors.contactList).addEventListener('click', showContactDetails);
        document.querySelector(UISelectors.backBtn).addEventListener('click', backFunction);
        document.querySelector(UISelectors.editClick).addEventListener('click', editState);
        document.querySelector(UISelectors.updateButton).addEventListener('click', updateFunction);
        document.querySelector(UISelectors.deleteContact).addEventListener('click', deleteContactFunc);
    }
    function addContact() {
        const UISelectors= UICtrl.UISelectors();
        const inputs= UICtrl.getInputs();
        console.log(inputs);
        if(inputs.firstName !== '' && inputs.lastName !== '' && inputs.phone !== '') {
            const addedContact= contactsDataCtrl.addToContactsDS(inputs);
            StorageCtrl.storeContact(addedContact);
            UICtrl.showContactsToUI(addedContact);
        }
        UICtrl.clearInputFields();
        UICtrl.hideContactShowHomeBlock();
        document.querySelector(UISelectors.contactList).style.display= 'block';
        location.reload();
    }
    function searchContact(e) {
        document.querySelectorAll('.contact-click').forEach(function(item) {
            if(item.firstElementChild.firstElementChild.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1) {
                item.style.display= 'block';
            } else {
                item.style.display= 'none';
            }
        });
    }
    function Cancel() {
        const UISelectors= UICtrl.UISelectors();
        UICtrl.clearInputFields();
        UICtrl.hideContactShowHomeBlock();
        document.querySelector(UISelectors.contactList).style.display= 'block';
        location.reload();
    }
    function showContactDetails(e) {
        if(e.target.classList.contains('search-item')) {
            UICtrl.uiStateOnNameClick();
            const id= parseInt(e.target.parentElement.parentElement.classList[1]);
            const contact= contactsDataCtrl.getContactById(id);
            contactsDataCtrl.setCurrentContact(contact);
            UICtrl.paintCurrentItem();
        }
    }
    function backFunction() {
        const UISelectors= UICtrl.UISelectors();
        UICtrl.hideContactShowHomeBlock();
        document.querySelector(UISelectors.contactList).style.display= 'block';
        document.querySelector(UISelectors.contactDetailsPerPerson).style.display= 'none';
        location.reload();
    }
    const editState= function() {
        const UISelectors= UICtrl.UISelectors();
        document.querySelector(UISelectors.contactDetailsPerPerson).style.display= 'none';
        UICtrl.updateState();
        UICtrl.addValuesToUI();
        const inputValues= UICtrl.getInputs();
        contactsDataCtrl.updateContact(inputValues.firstName, inputValues.lastName, inputValues.phone); 
    };
    const updateFunction= function() {
        const UISelectors= UICtrl.UISelectors();
        UICtrl.clearInputFields();
        UICtrl.hideContactShowHomeBlock();
        document.querySelector(UISelectors.contactList).style.display= 'block';
        console.log(document.querySelector('#firstName').value);
        let firstName= document.querySelector('#fName').value;
        let lastName= document.querySelector('#lName').value;
        let phone= document.querySelector('#phone').value;
        console.log(firstName, lastName, phone);
        const foundData= contactsDataCtrl.updateContact(firstName, lastName, phone);
        console.log(foundData);
        const DSid= foundData.id;
        console.log(foundData);
        document.querySelectorAll(UISelectors.contactClick).forEach(function(contact) {
            const id= parseInt(contact.classList[1]);
            console.log(id);
            if(DSid === id) {
                document.querySelector(`.cont-${DSid}`).innerHTML = `
                    <div class="contact">
                        <b class='search-item'>${foundData.firstName} ${foundData.lastName}</b>
                    </div>
                    <hr class="line">
                `;
            }
        });
        StorageCtrl.updateContactFromLS(foundData);
        UICtrl.hideContactShowHomeBlock();
        document.querySelector(UISelectors.contactList).style.display= 'block';
        location.reload();
    }
    const deleteContactFunc= function() {
        const UISelectors= UICtrl.UISelectors();
        const currentCont= contactsDataCtrl.log().currentData;
        contactsDataCtrl.deleteFromDS(currentCont.id);
        UICtrl.deleteFromUI(currentCont.id);
        StorageCtrl.deleteContactFromLS(currentCont.id);
        UICtrl.clearInputFields();
        UICtrl.hideContactShowHomeBlock();
        document.querySelector(UISelectors.contactList).style.display= 'block';
        document.querySelector('#contact-details-per-person').style.display= 'none';
        location.reload();
    };
    return {
        initApp: function() {
            UICtrl.hideNewContactBlock();
            const cont= contactsDataCtrl.log().details;
            document.querySelector('#deleteContacts').style.display= 'none';
            if(cont.length > 0) {
                UICtrl.paintDatas();
                document.querySelector('#deleteContacts').style.display= 'block';
                document.querySelector('#deleteContacts').addEventListener('click', function() {
                    StorageCtrl.deleteEverythingFromLS();
                    location.reload();
                });
            } else {
                document.querySelector(UICtrl.UISelectors().contactList).style.display= 'none';
            }
            UICtrl.hideEditContact();
            loadEvents();
        }
    }
})(contactsDataCtrl, UICtrl, StorageCtrl);
AppCtrl.initApp();