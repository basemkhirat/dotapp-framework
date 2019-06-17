<template>
    <div class="menu--editor">
        <ul class="nav">
            <li class="menu--item" @click="setEditorType('paragraph')">
                <span class="icon">
                    <i class="fas fa-paragraph"></i>
                </span>
                paragraph
            </li>
            <li class="menu--item" @click="setEditorType('image')">
                <span class="icon">
                    <i class="fas fa-image"></i>
                </span>
                Image
            </li>
            <li class="menu--item" @click="setEditorType('gallery')">
                <span class="icon">
                    <i class="fas fa-images"></i>
                </span>
                Gallery
            </li>
            <li class="menu--item" @click="setEditorType('video')">
                <span class="icon">
                    <i class="fas fa-video"></i>
                </span>
                video
            </li>
            <li class="menu--item" @click="setEditorType('blockquote')">
                <span class="icon">
                    <i class="fas fa-quote-right"></i>
                </span>
                blockquote
            </li>
            <li class="menu--item" @click="setEditorType('embed')">
                <span class="icon">
                    <i class="fas fa-link"></i>
                </span>
                embed
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    created(){
        document.body.classList.add('editor--mini')
        this.$store.commit('miniSidebar')
    },
    methods:{
        setEditorType(type){
            this.$emit('setEditorType', type)
        }
    }
}
</script>
