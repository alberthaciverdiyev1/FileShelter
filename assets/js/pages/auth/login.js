document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('[data-role="login"]').addEventListener('click', async function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember_me').checked;

        const data = {
            email: email,
            password: password,
            rememberMe: rememberMe
        };
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.status === 200) {
            window.location.href = '/';
        } else {
            console.error('Error:', response.status, responseData.message);
        }

    });
});
