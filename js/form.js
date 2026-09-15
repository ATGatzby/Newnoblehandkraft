/* ============================================================
   NOBLE HANDKRAFT — Request a Quote

   Submits to Formspree, which forwards to the address
   configured for the form in the Formspree dashboard.
   The endpoint is set via data-endpoint on the <form>.

   Delivery address is NOT set here — Formspree ignores any
   recipient sent from the page (that would make it an open
   relay). To change where enquiries land, edit the form's
   recipient at formspree.io.
   ============================================================ */

(function () {
    'use strict';

    var form = document.getElementById('quoteForm');
    if (!form) { return; }

    var status = document.getElementById('formStatus');
    var submit = form.querySelector('[type="submit"]');
    var endpoint = form.getAttribute('data-endpoint');

    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(field, message) {
        var input = form.elements[field];
        if (!input) { return; }
        var slot = document.getElementById('err-' + field);
        if (slot) { slot.textContent = message || ''; }
        if (message) { input.setAttribute('aria-invalid', 'true'); }
        else { input.removeAttribute('aria-invalid'); }
    }

    function validate() {
        var ok = true;

        [['name', 'Please tell us your name.'],
         ['company', 'Please tell us your company.'],
         ['requirement', 'Please tell us what you are looking for.']
        ].forEach(function (pair) {
            var value = (form.elements[pair[0]].value || '').trim();
            setError(pair[0], value ? '' : pair[1]);
            if (!value) { ok = false; }
        });

        var email = (form.elements.email.value || '').trim();
        if (!email) {
            setError('email', 'Please give us an email address.');
            ok = false;
        } else if (!EMAIL.test(email)) {
            setError('email', 'That email address does not look right.');
            ok = false;
        } else {
            setError('email', '');
        }

        return ok;
    }

    function say(message, isError) {
        status.textContent = message;
        status.classList.add('is-shown');
        status.classList.toggle('is-error', !!isError);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validate()) {
            say('Please check the highlighted fields and send again.', true);
            var firstBad = form.querySelector('[aria-invalid="true"]');
            if (firstBad) { firstBad.focus(); }
            return;
        }

        submit.disabled = true;
        var original = submit.textContent;
        submit.textContent = 'Sending…';
        say('Sending your requirement…');

        fetch(endpoint, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        }).then(function (res) {
            if (res.ok) {
                form.reset();
                say('Thank you — your requirement has reached us at info@noblehandkraft.com. We reply to every enquiry within one working day.');
                submit.textContent = 'Sent';
            } else {
                return res.json().then(function (data) {
                    var detail = data && data.errors && data.errors.length
                        ? data.errors.map(function (x) { return x.message; }).join(' ')
                        : 'Something went wrong at our end.';
                    say(detail + ' Please email info@noblehandkraft.com and we will pick it up from there.', true);
                    submit.disabled = false;
                    submit.textContent = original;
                });
            }
        }).catch(function () {
            say('We could not send that just now. Please email info@noblehandkraft.com or call +91 98104 73142.', true);
            submit.disabled = false;
            submit.textContent = original;
        });
    });

    /* Clear a field's error as soon as the visitor fixes it. */
    ['name', 'company', 'email', 'requirement'].forEach(function (field) {
        var input = form.elements[field];
        if (input) {
            input.addEventListener('input', function () {
                if (input.getAttribute('aria-invalid') === 'true') { setError(field, ''); }
            });
        }
    });
})();
