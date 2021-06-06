<template>
    <div id="app">
        <Header />
        <Content v-if="isAuthorized" />
        <Login v-else />
        <Bottombar v-if="isAuthorized" />
    </div>
</template>


<script>
    import Header from './components/Header.vue';
    import Content from './components/Content.vue';
    import Login from './components/Login.vue';
    import Bottombar from './components/bottombar/Bottombar.vue';
    export default {
        name: 'App',
        components: {
            Header,
            Content,
            Login,
            Bottombar
        },
        data() {
            return {
                isAuthorized: false
            }
        },
        mounted() {
            const url = 'http://localhost:3001/home';
            fetch(url)
            .then(response => (response.json()))
            .then((response) => {
                console.log(response.isAuthorized);
                this.isAuthorized = response.isAuthorized;
            })
            .catch(err => (console.log(err)));
        }
    }
</script>