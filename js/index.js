
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

const toggleSelectFieldStyles = (selectField) => {
    const select = $(selectField).find('.select-field__select')
    const input = $(selectField).find('.select-field__input')

    toggleSelectDisplay(select);
    toggleInputBorderRadius(select, input)
}

const setSelectHandlers = () => {
    for (let button of $('.select-field__button')) {
        $(button).click(function(event) {
            const selectField = $(this).closest('.select-field')
            toggleSelectFieldStyles(selectField)
            event.preventDefault();
        })
    }

    for (let option of $('.select-field__option')) {
        $(option).click(function() {
            const selectField = $(this).closest('.select-field')
            const input = $(selectField).find('.select-field__input')
            const select = $(selectField).find('.select-field__select')
            
            input.val($(this).text())
            $(select).css('display', 'none')
        })
    }
}


// --------- cacnel button ---------

const cancelButtonClickHandler = (currnetModal) => {
    $(currnetModal).css('display', 'none')
}

const setCancelButtonClickHandler = () => {
    for (let button of $('.cancel-button')) {
        $(button).click(function(event) {
            const currnetModal = $(this).closest('.modal');
            cancelButtonClickHandler(currnetModal);
            event.preventDefault();
        })
    }
}


$(document).ready(() => {
    setSelectHandlers();
    setCancelButtonClickHandler();
})


