<template>
    <div :id="post.id" class="container px-0 py-2">
        <div class="header w-100 px-2 py-2 d-flex">
            <div class="thumbnail">
                <img :src="post.author.thumbnail" alt="" class="thumbnail">
            </div>
            <div class="account-name">
                {{post.author.name}}
            </div>
        </div>
        <div class="image-wrapper w-100">
            <v-lazy-image :src="require(`@/assets/img/${post.image}`)" />
        </div>
        <div class="action-wrapper w-100 d-flex px-2 py-2">
            <div class="like mr-3">
                <b-icon class="icon-post" icon="heart-fill" variant="light"></b-icon>
            </div>
            <div class="comment">
                <b-icon class="icon-post" icon="chat-text-fill" variant="light"></b-icon>
            </div>
        </div>
        <div class="info-wrapper px-2">
            <span>
                Gefällt {{post.likesQuantity}} Mal
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'post',
    props: {
        post: Object
    }
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
        filter: blur(10px);
        transition: filter 0.7s;
    }

    .v-lazy-image-loaded {
        filter: blur(0);
        width: 100%;
    }
</style>

