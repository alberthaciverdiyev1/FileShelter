document.addEventListener('DOMContentLoaded', function () {

    document.querySelector(`[data-role="register"]`).addEventListener('click', async function () {
        let data = {
            email: document.getElementById(`email`).value,
            username: document.getElementById(`username`).value,
            password: document.getElementById(`password`).value,
            confirmPassword: document.getElementById(`confirm_password`).value,
        };
        console.log(data);
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (res) {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        });
    });

  });