
// let currentCreateForm;

// for (let modal of document.querySelectorAll('.modal')) {
//     if (modal.style.display != 'none') {
//         currentCreateForm = modal;
//     }
// }

// for (let select of currentCreateForm.querySelectorAll('.select-field__select')) {

//     select.addEventListener('click', () => {
//         select.style.color = 'black';
//     })

//     const placeholder = select.querySelector('.select-field__placeholder');

//     if (placeholder.getAttribute('selected') === 'selected') {
//         select.style.color = '#A1A1A1';
//     }

// }


// // -------------------------------------------------------


// const getCurrentModal = () => {
//     for (let modal of document.querySelectorAll('.modal')) {
//         if (modal.style.display != 'none') {
//             return modal;
//         }
//     }
// }

const toggleSelect = () => {
    const select = document.querySelector('.test .select-field__select');
    select.style.display = select.style.display === '' || select.style.display === 'block' ? 'none' : 'block';
}

const toggleButton = document.querySelector('.test .select-field__button')

const options = document.querySelectorAll('.test .select-field__option')

const setInputValue = (value) => {
    const input = document.querySelector('.test .select-field__input')
    input.value = value
}

toggleButton.addEventListener('click', toggleSelect)

for (let option of options) {
    option.addEventListener('click', () => setInputValue(option.innerHTML))
} 
