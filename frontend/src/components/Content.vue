<template>
    <div 
        id="content-wrapper"
        class="px-0"
    >
        <div v-for="post in posts" :key="post.id">
            <Post :post="post"/>
        </div>
        <div class="load-more"></div>
    </div>
</template>

<script>
import Post from './post/Post';


export default {
    name: 'Content',
    components: {Post},
    props: {
        content: Array
    },
    data() {
        return {
            posts: null
        }
    },
    mounted() {
        const url = 'http://localhost:3001/home';
        fetch(url)
        .then(response => (response.json()))
        .then(response => (this.posts = response))
    }
}
</script>

<style scoped>
    #content-wrapper {
        padding-bottom: 75px;
    }
</style>