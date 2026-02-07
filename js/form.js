/* ============================================
   NOBLE HANDKRAFT — Contact Form
   ============================================ */

function initContactForm() {
    var form = document.getElementById('contactForm');
    var statusEl = document.getElementById('formStatus');

    if (!form || !statusEl) return;

    var fields = {
        name: {
            el: document.getElementById('contactName'),
            validate: function (val) {
                if (!val.trim()) return 'Please enter your name';
                if (val.trim().length < 2) return 'Name must be at least 2 characters';
                return '';
            }
        },
        email: {
            el: document.getElementById('contactEmail'),
            validate: function (val) {
                if (!val.trim()) return 'Please enter your email';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return 'Please enter a valid email';
                return '';
            }
        },
        phone: {
            el: document.getElementById('contactPhone'),
            validate: function (val) {
                if (val.trim() && !/^[+]?[\d\s()-]{7,}$/.test(val.trim())) {
                    return 'Please enter a valid phone number';
                }
                return '';
            }
        },
        message: {
            el: document.getElementById('contactMessage'),
            validate: function (val) {
                if (!val.trim()) return 'Please enter a message';
                if (val.trim().length < 10) return 'Message must be at least 10 characters';
                return '';
            }
        }
    };

    // Show error for a field
    function showError(field, message) {
        var errorEl = field.el.parentElement.querySelector('.contact-form__error');
        if (errorEl) errorEl.textContent = message;

        field.el.classList.remove('contact-form__input--valid', 'contact-form__textarea--valid');
        if (message) {
            field.el.classList.add('contact-form__input--error', 'contact-form__textarea--error');
        } else {
            field.el.classList.remove('contact-form__input--error', 'contact-form__textarea--error');
            field.el.classList.add('contact-form__input--valid', 'contact-form__textarea--valid');
        }
    }

    // Validate a single field
    function validateField(key) {
        var field = fields[key];
        if (!field || !field.el) return true;
        var error = field.validate(field.el.value);
        showError(field, error);
        return !error;
    }

    // Validate all fields
    function validateAll() {
        var isValid = true;
        var firstInvalid = null;

        Object.keys(fields).forEach(function (key) {
            if (!validateField(key) && !firstInvalid) {
                firstInvalid = fields[key].el;
                isValid = false;
            } else if (!validateField(key)) {
                isValid = false;
            }
        });

        if (firstInvalid) firstInvalid.focus();
        return isValid;
    }

    // Blur validation
    Object.keys(fields).forEach(function (key) {
        var field = fields[key];
        if (field.el) {
            field.el.addEventListener('blur', function () {
                if (this.value) validateField(key);
            });
        }
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous status
        statusEl.className = 'contact-form__status';
        statusEl.textContent = '';

        if (!validateAll()) return;

        // Disable submit button
        var submitBtn = form.querySelector('.contact-form__submit');
        var originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate submission
        // TODO: Replace with actual API endpoint / email service integration
        setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            statusEl.className = 'contact-form__status contact-form__status--success';
            statusEl.textContent = 'Thank you for your inquiry. We\'ll get back to you within 24 hours.';

            form.reset();

            // Clear validation styles
            Object.keys(fields).forEach(function (key) {
                var field = fields[key];
                if (field.el) {
                    field.el.classList.remove(
                        'contact-form__input--valid',
                        'contact-form__input--error',
                        'contact-form__textarea--valid',
                        'contact-form__textarea--error'
                    );
                    var errorEl = field.el.parentElement.querySelector('.contact-form__error');
                    if (errorEl) errorEl.textContent = '';
                }
            });

            // Hide success message after 5 seconds
            setTimeout(function () {
                statusEl.className = 'contact-form__status';
                statusEl.textContent = '';
            }, 5000);
        }, 1500);
    });
}
