<template>
    <div class="menu--editor">
        <ul class="nav" v-scroll-to="'#scroll--bottom'">
            <li class="menu--item" @click="setEditorType('paragraph')">
                <span class="icon">
                    <i class="fas fa-paragraph"></i>
                </span>
                {{$t('paragraph')}}
            </li>
            <li class="menu--item" @click="setEditorType('image')">
                <span class="icon">
                    <i class="fas fa-image"></i>
                </span>
                {{$t('image')}}
            </li>
            <li class="menu--item" @click="setEditorType('ads')">
                <span class="icon">
                    <i class="fas fa-ad"></i>
                </span>
                {{$t('ads')}}
            </li>
            <li class="menu--item" @click="setEditorType('gallery')">
                <span class="icon">
                    <i class="fas fa-images"></i>
                </span>
                {{$t('gallery')}}
            </li>
            <li class="menu--item" @click="setEditorType('video')">
                <span class="icon">
                    <i class="fas fa-video"></i>
                </span>
                {{$t('video')}}
            </li>
            <li class="menu--item" @click="setEditorType('blockquote')">
                <span class="icon">
                    <i class="fas fa-quote-right"></i>
                </span>
                {{$t('blockquote')}}
            </li>
            <li class="menu--item" @click="setEditorType('embed')">
                <span class="icon">
                    <i class="fas fa-link"></i>
                </span>
                {{$t('embed')}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {

    methods:{
        setEditorType(type){
            this.$emit('setEditorType', type)
        }
    }
}
</script>
