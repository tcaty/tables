
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
        $(button).click(function() {
            const selectField = $(this).closest('.select-field')
            toggleSelectFieldStyles(selectField)
        })
    }

    for (let option of $('.select-field__option')) {
        $(option).click(function() {
            const input = $(this).closest('.select-field').find('.select-field__input')
            input.val($(this).text())
        })
    }
}

$(document).ready(() => {
    setSelectHandlers()
})


