
// --------- select field ---------

const isSelectVisible = (select) => {
    const display = $(select).css('display');
    return display === '' || display === 'block'
}

const toggleSelectDisplay = (select) => {
    const newDisplay = isSelectVisible(select) ? 'none' : 'block';
    $(select).css('display', newDisplay);
}

const toggleInputBorderRadius = (select, input) => {
   const newBorderRadius = isSelectVisible(select) ? 'calc(4px * var(--scale)) calc(4px * var(--scale)) 0 0' : 'calc(4px * var(--scale))';
   $(input).css('border-radius', newBorderRadius)
}

const toggleButtonClass = (select, button) => {
    console.log(button)
    if (isSelectVisible(select)) {
        $(button).toggleClass('select-field__button_down select-field__button_up')
    } else {
        $(button).toggleClass('select-field__button_up select-field__button_down')
    }
}

const toggleSelectFieldStyles = (selectField, button) => {
    const select = $(selectField).find('.select-field__select')
    const input = $(selectField).find('.input')

    toggleSelectDisplay(select);
    toggleInputBorderRadius(select, input)
    toggleButtonClass(select, button);
}

const setSelectHandlers = () => {
    for (let button of $('.select-field__button')) {
        $(button).click(function(event) {
            const selectField = $(this).closest('.select-field')
            toggleSelectFieldStyles(selectField, button)
            event.preventDefault();
        })
    }

    for (let option of $('.select-field__option')) {
        $(option).click(function() {
            const selectField = $(this).closest('.select-field')
            const input = $(selectField).find('.input')
            const select = $(selectField).find('.select-field__select')
            
            input.val($(this).text())
            $(select).css('display', 'none')
        })
    }
}


// --------- cacnel button ---------

const cancelButtonClickHandler = (modal) => {
    $(modal).css('display', 'none')
}

const setCancelButtonClickHandler = () => {
    for (let button of $('.cancel-button')) {
        $(button).click(function(event) {
            const modal = $(this).closest('.modal');
            cancelButtonClickHandler(modal);
            event.preventDefault();
        })
    }
}

// --------- modal ---------

const hideModal = (modal) => {
    $(modal).css('display', 'none');
}

const setClickModalHandlers = () => {
    for (let modal of $('.modal')) {
        $(modal).click(function(event) {
            if ($(event.target).closest('.modal__container').length === 0) {
                hideModal(modal);
            }
        })
    }
}

// --------- input date ---------

const formatDate = (dayMonth) => {
    return String(dayMonth).length < 2 ? `0${dayMonth}` : String(dayMonth)
}

const getTodayDate = () => {
    const date = new Date(Date.now())
    console.log(date.getMonth())
    return `${formatDate(date.getDate())}/${formatDate(date.getMonth() + 1)}/${date.getFullYear()}`
}

const setInputDateSettings = () => {
    for (let input of $('.input[name=date]')) {
        $(input).attr('placeholder', getTodayDate())
        $(input).inputmask('99/99/9999')
    }
}

$(document).ready(() => {
    setSelectHandlers();
    setCancelButtonClickHandler();
    setInputDateSettings();
    setClickModalHandlers();
})


