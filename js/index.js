const isBlockVisible = (block) => {
    const display = $(block).css('display');
    return display !== 'none'
}

const toggleBlockDisplay = (block) => {
    if (isBlockVisible(block)) {
        $(block).hide();
    } else {
        $(block).show();
    }
}

// --------- modal for employee  ---------

const transformModalForEmployee = (modal, modalLeadsTrue, inputLeadsValue) => {
    console.log(inputLeadsValue)
    if (inputLeadsValue === '1') {
        $(modal).find('input[name=leads]').val('0');
        $(modal).hide();
        $(modalLeadsTrue).show();
    } else if (inputLeadsValue === '0') {
        $(modalLeadsTrue).find('input[name=leads]').val('1');
        $(modalLeadsTrue).hide();
        $(modal).show();
    }
}

const inputLeadsChangeHandler = () => {
    const modal = $('.modal-for-employee');
    const modalLeadsTrue = $('.modal-for-employee_leads-true');
    const inputLeadsValue = $(isBlockVisible(modal) ? modal : modalLeadsTrue).find('input[name=leads]').val();

    transformModalForEmployee(modal, modalLeadsTrue, inputLeadsValue);
}

// --------- select field ---------

const toggleInputBorderRadius = (select, input) => {
   const newBorderRadius = isBlockVisible(select) ? 'calc(4px * var(--scale)) calc(4px * var(--scale)) 0 0' : 'calc(4px * var(--scale))';
   $(input).css('border-radius', newBorderRadius);
}

const makeButtonDown = (button) => {
    $(button).removeClass('select-field__button_up').addClass('select-field__button_down');
}

const toggleButtonClass = (button) => {
    $(button).toggleClass('select-field__button_down select-field__button_up');
}

const toggleSelectFieldStyles = (selectField, button) => {
    const select = $(selectField).find('.select-field__select');
    const input = $(selectField).find('.input');

    toggleBlockDisplay(select);
    toggleInputBorderRadius(select, input);
    toggleButtonClass(button);
}

const setAnotherBlockClickHandler = (select, button, input) => {
    $(document).mouseup((event) => {
        if (!button.is(event.target) && button.has(event.target).length === 0) {
            $(select).hide();
            makeButtonDown(button);
            toggleInputBorderRadius(select, input);
        }
    })
}

const setInputsLeadsChangeHandlers = () => {
    const inputsLeads = $('.modal-for-employee input[name=leads], .modal-for-employee_leads-true input[name=leads]');

    for (let inputLeads of inputsLeads) {
        $(inputLeads).change(inputLeadsChangeHandler);
    }
}

const setSelectHandlers = () => {
    for (let button of $('.select-field__button')) {
        $(button).click(function(event) {
            const selectField = $(this).closest('.select-field');
            const select = $(selectField).find('.select-field__select');
            const input = $(selectField).find('.input');

            toggleSelectFieldStyles(selectField, button);
            setAnotherBlockClickHandler(select, $(this), input);

            event.preventDefault();
        })
    }

    for (let option of $('.select-field__option')) {
        $(option).click(function() {
            const selectField = $(this).closest('.select-field');
            const input = $(selectField).find('.input');
            const select = $(selectField).find('.select-field__select');
            const button = $(selectField).find('.select-field__button');

            $(input).val($(this).text());
            $(input).change();

            $(select).hide();
            makeButtonDown(button);
            toggleInputBorderRadius(select, input);
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
        $(modal).click((event) => {
            if ($(event.target).closest('.modal__container').length === 0) {
                $(modal).hide();
            }
        })
    }
}

// --------- input date ---------

const formatDate = (dayMonth) => {
    return String(dayMonth).length < 2 ? `0${dayMonth}` : String(dayMonth);
}

const getTodayDate = () => {
    const date = new Date(Date.now())
    return `${formatDate(date.getDate())}/${formatDate(date.getMonth() + 1)}/${date.getFullYear()}`;
}

const setInputDateSettings = () => {
    for (let input of $('.input[name=date]')) {
        $(input).attr('placeholder', getTodayDate());
        $(input).inputmask('99/99/9999');
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
        $(link).click(() => {
            $('.modal-funnel').show();
        })
    }
}

// --------- table comment  ---------


const setTableCommentClickHandler = () => {
    for (let comment of $('.table__comment, .button-create')) {
        $(comment).click(() => {
            $('.modal-comment-click').show();
        })
    }
}


// --------- nav links ---------

const navLinkClickHandler = (link) => {
    const sections = $('.main > section');
    let currentSection;
    for (let section of sections) {
        if ($(section).css('display') !== 'none') {
            currentSection = section;
        }
    }
    $(currentSection).hide();
    $(`.${$(link).attr('href')}`).show();
}

const setNavLinkClickHandlers = () => {
    const links = $('.nav__link');

    for (let link of links) {
        $(link).click((event) => {
            event.preventDefault();
            navLinkClickHandler(link);
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
    setNavLinkClickHandlers();
    setInputsLeadsChangeHandlers();
    setTableCommentClickHandler();
})


