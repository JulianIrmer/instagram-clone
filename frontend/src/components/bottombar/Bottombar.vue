<template>
    <div id="bottom-bar" class="d-flex justify-content-between px-2 py-2 position-fixed w-100">
        <div id="home">
            <b-icon class="icon-bottom-bar" icon="house-door-fill" variant="light"></b-icon>
        </div>
        <div id="search">
            <b-icon class="icon-bottom-bar" icon="search" variant="light"></b-icon>
        </div>
        <div id="add">
            <b-icon class="icon-bottom-bar" icon="plus" variant="light"></b-icon>
        </div>
        <div id="notifications">
            <b-icon class="icon-bottom-bar" icon="heart-fill" variant="light"></b-icon>
        </div>
        <div id="account">
            <b-icon class="icon-bottom-bar" icon="person-fill" variant="light"></b-icon>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Bottombar'
}
</script>

<style lang="scss" scoped>
    @import '../../variables.scss';

    #bottom-bar {
        align-items: center;
        bottom: 0;
        z-index: 100;
        max-width: $max-doc-width;
        background-color: #000000;
    }
    .icon-bottom-bar {
        height: 50px;
        width: 25px;
    }
</style>