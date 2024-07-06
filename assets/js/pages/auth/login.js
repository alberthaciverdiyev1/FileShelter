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

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status !== 201) {
                throw new Error('HTTP error ' + response.status);
            }

            const responseData = await response.json();
            document.cookie = `token=${responseData.token}; Secure; HttpOnly`;
            window.location.href = '/';
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
});
