<template>
    <div id="app">
        <Header />
        <Content />
        <Bottombar/>
    </div>
</template>


<script>
    import Header from './components/Header.vue';
    import Content from './components/Content.vue';
    import Bottombar from './components/bottombar/Bottombar.vue';
    export default {
        name: 'App',
        components: {
            Header,
            Content,
            Bottombar
        }
    }
</script>