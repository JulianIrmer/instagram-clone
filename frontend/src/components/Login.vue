<template>
    <div class="login-wrapper">
        <h1>Login</h1>
        <input type="text" name="username" id="username" placeholder="Username" required>
        <input type="password" name="password" id="password" placeholder="Password" required>
        <button v-on:click="submit()">Login</button>

        <button v-on:click="redirect('register')">Register</button>
    </div>
</template>

<script>
export default {
    name: 'Login',
    methods: {
        submit: () => {

            const url = 'http://localhost:3001/user/login'
            const data = {
                username: document.querySelector('#username').value,
                password: document.querySelector('#password').value
            }
            if (data.username.length < 4 && data.password.length < 6) {
                return;
            }

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {return response.json()})
            .then((response) => {
                console.log(response);
                // window.location.reload();
            })
            .catch(err => console.log(err));
        }
    }
}
</script>