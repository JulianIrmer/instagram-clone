<template>
    <div  class="container px-0 py-2">
        <div class="header w-100 px-2 py-2 d-flex">
            <div class="thumbnail">
                <!-- <img :src="post.author.thumbnail" alt="" class="thumbnail"> -->
            </div>
            <div class="account-name">
                {{post.post.author}}
            </div>
        </div>
        <div v-on:dblclick="likePost(post.post.id)" class="d-flex image-wrapper w-100 position-relative">
            <div>
                <v-lazy-image :src="require(`@../../../../backend/uploads/images/${post.post.id}.jpg`)" />
            </div>
            <div>
                <b-icon :id="'postid_' + post.post.id" icon="heart-fill" class="heart-animation"></b-icon>
            </div>
        </div>
        <div class="action-wrapper w-100 d-flex px-2 py-2">
            <div class="like mr-3">
                <b-icon v-on:click="likePost(post.post.id)" class="icon-post" icon="heart-fill" variant="light"></b-icon>
            </div>
            <div class="comment">
                <b-icon v-on:click="addComment()" class="icon-post" icon="chat-text-fill" variant="light"></b-icon>
            </div>
        </div>
        <div class="info-wrapper px-2">
            <div class="w-100">
                Gefällt {{likeCount}} Mal
            </div>
            <span v-if="post.post.comments.length > 0">
                {{post.comments[0]}}
            </span>
            <span v-if="post.post.comments.length > 0">
                Mehr Kommentare lesen...
            </span>
            <span v-else>Kommentar schreiben</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'post',
    props: {
        post: Object
    },
    data() {
        return {
            likeCount: this.post.post.likes.length
        }
    },
    methods: {
        likePost: function(postID) {
            const url = 'http://localhost:3001/content/posts/like?id='+postID;
            const that = this;
            fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                that.likeCount = response.data;
                const selector = `#postid_${postID}`;
                const element = document.querySelector(selector);
                if (response.action === 'add') {
                    element.classList.add('animate');
                } else {
                    element.classList.remove('animate');
                }
            })
        },
        // addComment: function(postID) {
        //     const url = 'http://localhost:3001/content/comment/add';
        // }
    },
}
</script>


<style lang="scss" scoped>
    .container {
        width: 100%;
    }

    .action-wrapper {
        .icon-post {
            height: 25px;
            width: 25px;
        }
    }

    .v-lazy-image {
        height: 100%;
        max-width: 650px;
        filter: blur(10px);
        transition: filter 0.7s;
        z-index: 2;
    }

    .v-lazy-image-loaded {
        filter: blur(0);
        width: 100%;
    }

    .heart-animation {
        position: absolute;
        font-size: 200px;
        top: 50%;
        left: 50%;
        color: rgba(255, 0, 0, 0.623);
        opacity: 0;
        transform: scale(0.5) translate(-100%, -100%);
    }

    .animate {
        animation: animateHeart 750ms;
    }

    @keyframes animateHeart {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
</style>

