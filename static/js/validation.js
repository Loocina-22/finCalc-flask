document.addEventListener('DOMContentLoaded', function() {
    // Get all forms with class 'calculator-form'
    const forms = document.querySelectorAll('.calculator-form');

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            // Clear previous error messages
            clearErrors(form);

            // Get calculator type from hidden input
            const calcType = form.querySelector('input[name="calculator_type"]')?.value;
            let hasErrors = false;

            // Validation rules based on calculator type
            if (calcType === 'compound_interest') {
                hasErrors = validateCompoundInterest(form);
            } else if (calcType === 'loan_payment') {
                hasErrors = validateLoanPayment(form);
            } else if (calcType === 'savings_goal') {
                hasErrors = validateSavingsGoal(form);
            } else if (calcType === 'simple_interest') {
                hasErrors = validateSimpleInterest(form);
            }

            // Prevent submission if errors exist
            if (hasErrors) {
                event.preventDefault();
            }
        });
    });

    // Clear existing error messages
    function clearErrors(form) {
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.classList.remove('is-invalid'));
    }

    // Validate numeric input
    function validateNumber(value, fieldName, minValue = null) {
        const num = parseFloat(value);
        if (isNaN(num)) {
            return `${fieldName} must be a number.`;
        }
        if (minValue !== null && num < minValue) {
            return `${fieldName} must be ${minValue === 0 ? 'non-negative' : 'positive'}.`;
        }
        return '';
    }

    // Validate integer input
    function validateInteger(value, fieldName, minValue = null) {
        const num = parseInt(value);
        if (isNaN(num) || value.includes('.')) {
            return `${fieldName} must be a whole number.`;
        }
        if (minValue !== null && num < minValue) {
            return `${fieldName} must be ${minValue === 1 ? 'positive' : `at least ${minValue}`}.`;
        }
        return '';
    }

    // Append error message to input field
    function showError(input, message) {
        const div = document.createElement('div');
        div.className = 'error-message text-danger small mt-1';
        div.textContent = message;
        input.parentElement.appendChild(div);
        input.classList.add('is-invalid');
    }

    // Compound Interest Validation
    function validateCompoundInterest(form) {
        let hasErrors = false;
        const principal = form.querySelector('#principal').value;
        const rate = form.querySelector('#rate').value;
        const time = form.querySelector('#time').value;
        const compounds = form.querySelector('#compounds_per_year').value;

        const principalError = validateNumber(principal, 'Principal', 0);
        if (principalError) {
            showError(form.querySelector('#principal'), principalError);
            hasErrors = true;
        }

        const rateError = validateNumber(rate, 'Rate', 0);
        if (rateError) {
            showError(form.querySelector('#rate'), rateError);
            hasErrors = true;
        }

        const timeError = validateNumber(time, 'Time', 0);
        if (timeError) {
            showError(form.querySelector('#time'), timeError);
            hasErrors = true;
        }

        const compoundsError = validateInteger(compounds, 'Compounds per Year', 1);
        if (compoundsError) {
            showError(form.querySelector('#compounds_per_year'), compoundsError);
            hasErrors = true;
        }

        return hasErrors;
    }

    // Loan Payment Validation
    function validateLoanPayment(form) {
        let hasErrors = false;
        const principal = form.querySelector('#principal').value;
        const annualRate = form.querySelector('#annual_rate').value;
        const years = form.querySelector('#years').value;

        const principalError = validateNumber(principal, 'Principal', 0);
        if (principalError) {
            showError(form.querySelector('#principal'), principalError);
            hasErrors = true;
        }

        const rateError = validateNumber(annualRate, 'Annual Rate', 0);
        if (rateError) {
            showError(form.querySelector('#annual_rate'), rateError);
            hasErrors = true;
        }

        const yearsError = validateInteger(years, 'Years', 1);
        if (yearsError) {
            showError(form.querySelector('#years'), yearsError);
            hasErrors = true;
        }

        return hasErrors;
    }

    // Savings Goal Validation
    function validateSavingsGoal(form) {
        let hasErrors = false;
        const goal = form.querySelector('#goal').value;
        const years = form.querySelector('#years').value;
        const annualRate = form.querySelector('#annual_rate').value;

        const goalError = validateNumber(goal, 'Goal', 0);
        if (goalError) {
            showError(form.querySelector('#goal'), goalError);
            hasErrors = true;
        }

        const yearsError = validateNumber(years, 'Years', 0.1);
        if (yearsError) {
            showError(form.querySelector('#years'), yearsError);
            hasErrors = true;
        }

        const rateError = validateNumber(annualRate, 'Annual Rate', 0);
        if (rateError) {
            showError(form.querySelector('#annual_rate'), rateError);
            hasErrors = true;
        }

        return hasErrors;
    }

    // Simple Interest Validation
    function validateSimpleInterest(form) {
        let hasErrors = false;
        const principal = form.querySelector('#principal').value;
        const rate = form.querySelector('#rate').value;
        const time = form.querySelector('#time').value;

        const principalError = validateNumber(principal, 'Principal', 0);
        if (principalError) {
            showError(form.querySelector('#principal'), principalError);
            hasErrors = true;
        }

        const rateError = validateNumber(rate, 'Rate', 0);
        if (rateError) {
            showError(form.querySelector('#rate'), rateError);
            hasErrors = true;
        }

        const timeError = validateNumber(time, 'Time', 0);
        if (timeError) {
            showError(form.querySelector('#time'), timeError);
            hasErrors = true;
        }

        return hasErrors;
    }
});
