<template>
    <nav class="breadcrumb has-arrow-separator custom--breadcrumb " aria-label="breadcrumbs">
        <ul>
            <li>
                <router-link class="is--link" to="/">Backend</router-link>
            </li>
            <li v-for="(link , index) in links" :key="index">
                <router-link class="is--link" v-if="link.link" :to="link.link">{{link.label}}</router-link>
                <a v-else class="no--link" >{{link.label}}</a>
            </li>
        </ul>
    </nav>
</template>

<script>

export default {
    props:['links'],
    data(){
        return{

        }
    },
}
</script>
