
// --------- select field ---------

const isSelectVisible = (select) => {
    const display = $(select).css('display');
    return display === '' || display === 'block'
}

const toggleSelectDisplay = (select) => {
    if (isSelectVisible(select)) {
        $(select).hide();
    } else {
        $(select).show();
    }
}

const toggleInputBorderRadius = (select, input) => {
   const newBorderRadius = isSelectVisible(select) ? 'calc(4px * var(--scale)) calc(4px * var(--scale)) 0 0' : 'calc(4px * var(--scale))';
   $(input).css('border-radius', newBorderRadius)
}

const makeButtonDown = (button) => {
    $(button).removeClass('select-field__button_up').addClass('select-field__button_down')
}

const toggleButtonClass = (button) => {
    $(button).toggleClass('select-field__button_down select-field__button_up');
}

const toggleSelectFieldStyles = (selectField, button) => {
    const select = $(selectField).find('.select-field__select')
    const input = $(selectField).find('.input')

    toggleSelectDisplay(select);
    toggleInputBorderRadius(select, input)
    toggleButtonClass(button);
}

const setAnotherBlockClickHandler = (select, button) => {
    $(document).mouseup((event) => {
        if (!button.is(event.target) && button.has(event.target).length === 0) {
            $(select).hide();
            makeButtonDown(button);
        }
    })
}

const setSelectHandlers = () => {
    for (let button of $('.select-field__button')) {
        $(button).click(function(event) {
            const selectField = $(this).closest('.select-field');
            const select = $(selectField).find('.select-field__select');

            toggleSelectFieldStyles(selectField, button);
            setAnotherBlockClickHandler(select, $(this));

            event.preventDefault();
        })
    }

    for (let option of $('.select-field__option')) {
        $(option).click(function() {
            const selectField = $(this).closest('.select-field')
            const input = $(selectField).find('.input')
            const select = $(selectField).find('.select-field__select')
            const button = $(selectField).find('.select-field__button');

            input.val($(this).text())
            $(select).css('display', 'none')
            toggleButtonClass(selectField, button)
        })
    }
}

// --------- cacnel button ---------

const setCancelButtonClickHandler = () => {
    for (let button of $('.cancel-button')) {
        $(button).click(function(event) {
            const modal = $(this).closest('.modal');
            $(modal).hide();
            event.preventDefault();
        })
    }
}

// --------- modal ---------

const setClickModalHandlers = () => {
    for (let modal of $('.modal')) {
        $(modal).click(function(event) {
            if ($(event.target).closest('.modal__container').length === 0) {
                $(modal).hide();
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
    return `${formatDate(date.getDate())}/${formatDate(date.getMonth() + 1)}/${date.getFullYear()}`
}

const setInputDateSettings = () => {
    for (let input of $('.input[name=date]')) {
        $(input).attr('placeholder', getTodayDate())
        $(input).inputmask('99/99/9999')
    }
}

// --------- table input ---------

const disableInput = (input) => {
    $(input).attr('disabled', 'disabled');
}

const disableTableInputs = () => {
    for (let input of $('.table .input')) {
        disableInput(input);
    }
}

// --------- funnel table link ---------

const setFunnelLinkClickHandlers = () => {
    for (let link of $('.funnel__link')) {
        $(link).click(function() {
            $('.modal-funnel').show();
        })
    }
}

$(document).ready(() => {
    setSelectHandlers();
    setCancelButtonClickHandler();
    setInputDateSettings();
    setClickModalHandlers();
    disableTableInputs();
    setFunnelLinkClickHandlers();
})


