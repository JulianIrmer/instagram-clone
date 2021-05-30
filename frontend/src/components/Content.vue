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

const posts = [
    {
        id: '1',
        author: {
            name: 'abc',
            thumbnail: 'thumbnail.jpg'
        },
        image: 'someImage.jpg',
        likesQuantity: 30,
        commentsQuantity: 2,
        date: new Date('October 13, 2014 11:13:00')
    },
    {
        id: '2',
        author: {
            name: 'abc',
            thumbnail: 'thumbnail.jpg'
        },
        image: 'someImage.jpg',
        likesQuantity: 2,
        commentsQuantity: 14,
        date: new Date('October 03, 2020 11:13:00')
    },
    {
        id: '3',
        author: {
            name: 'abc',
            thumbnail: 'thumbnail.jpg'
        },
        image: 'someImage.jpg',
        likesQuantity: 100000,
        commentsQuantity: 25000,
        date: new Date('October 13, 2020 11:13:00')
    },
    {
        id: '4',
        author: {
            name: 'abc',
            thumbnail: 'thumbnail.jpg'
        },
        image: 'someImage.jpg',
        likesQuantity: 100000,
        commentsQuantity: 25000,
        date: new Date('October 13, 2020 11:13:00')
    },
    {
        id: '5',
        author: {
            name: 'abc',
            thumbnail: 'thumbnail.jpg'
        },
        image: 'someImage.jpg',
        likesQuantity: 100000,
        commentsQuantity: 25000,
        date: new Date('October 13, 2020 11:13:00')
    },
    {
        id: '6',
        author: {
            name: 'abc',
            thumbnail: 'thumbnail.jpg'
        },
        image: 'image2.jpg',
        likesQuantity: 100000,
        commentsQuantity: 25000,
        date: new Date('October 13, 2020 11:13:00')
    },
];

export default {
    name: 'Content',
    components: {Post},
    props: {
        content: Array
    },
    data() {
        return {
            posts: []
        }
    },
    created() {
        this.posts = posts
    }
}
</script>

<style scoped>
    #content-wrapper {
        padding-bottom: 75px;
    }
</style>