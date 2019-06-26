<template>
    <div class="content--editor">
        <!-- Menu Editor -->
        <menu-editor @setEditorType="setEditorType" />

        <!-- Card Content -->
        <Container @drop="onDrop" drag-handle-selector=".card-header-title-drop" v-if="cards.length">
            <Draggable v-for="(card, index) in cards" :key="card.id">

                <!-- Paragraph Card -->
                <b-collapse class="card--block" v-if="card.type === 'paragraph'">
                    <div slot="trigger" slot-scope="props" class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            Paragraph
                        </p>
                        <a class="card-header-icon p-0">
                            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                            </b-icon>
                        </a>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <vue-editor
                            :editorToolbar="toolbarEditor"
                            v-model="card.content"/>
                    </div>
                </b-collapse>

                <!-- Blockquote Card -->
                <b-collapse class="card--block" v-if="card.type === 'blockquote'">
                    <div slot="trigger" slot-scope="props" class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            Blockquote
                        </p>
                        <a class="card-header-icon p-0">
                            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                            </b-icon>
                        </a>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <b-input type="textarea" rows="4" v-model="card.content" rounded placeholder="Blockquote" />
                    </div>
                </b-collapse>

                <!-- Embed Card -->
                <b-collapse class="card--block preview--iframe" v-if="card.type === 'embed'">
                    <div slot="trigger" slot-scope="props" class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            Embed
                        </p>
                        <a class="card-header-icon p-0">
                            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                            </b-icon>
                        </a>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <b-input type="textarea" rows="2" v-model="card.content" rounded placeholder="Content" />
                        <div v-html="card.content" class="text-center mt-3"></div>
                    </div>
                </b-collapse>

                <!-- Card Image -->
                <b-collapse class="card--block" v-if="card.type === 'image'">
                    <div slot="trigger" slot-scope="props" class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            Image
                        </p>
                        <a class="card-header-icon p-0">
                            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                            </b-icon>
                        </a>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <template v-if="card.image">
                            <b-field class="field-group img--preview" v-if="card.image.thumbnails">
                                <img :src="card.image.thumbnails.large" alt="">
                                <a class="delete is-large btn--delete" @click="card.image = {}"></a>
                            </b-field>
                        </template>
                        <div class="file--upload" @click="openModalMedia({type: 'cardImage', index: index})">
                            {{card.image.image? 'Replace Image' : ' Select Image'}}
                        </div>
                    </div>
                </b-collapse>

                <!-- Card Gallery -->
                <b-collapse class="card--block" v-if="card.type === 'gallery'">
                    <div slot="trigger" slot-scope="props" class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            Gallery
                        </p>
                        <a class="card-header-icon p-0">
                            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                            </b-icon>
                        </a>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content gallery--editor">
                        <template v-if="card.gallery">
                            <div v-for="(itemImg, indexImg) in card.gallery" :key="itemImg.id" class="gallery--img--editor">
                                <template v-if="itemImg.thumbnails">
                                    <b-field class="field-group img--preview" v-if="itemImg.thumbnails">
                                        <img :src="itemImg.thumbnails.large" alt="">
                                        <a class="delete is-large btn--delete" @click="card.gallery.splice(indexImg, 1)"></a>
                                    </b-field>
                                </template>
                            </div>
                        </template>
                        <div class="file--upload" @click="openModalMedia({type: 'cardGallery', index: index})">
                            {{card.gallery.length? 'Replace Images' : ' Select Images'}}
                        </div>
                    </div>
                </b-collapse>

                <!-- Video Card-->
                <b-collapse class="card--block" v-if="card.type === 'video'">
                    <div slot="trigger" slot-scope="props" class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            Video
                        </p>
                        <a class="card-header-icon p-0">
                            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                            </b-icon>
                        </a>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <template v-if="card.video">
                            <b-field class="field-group img--preview" v-if="card.video.thumbnails">
                                <img :src="card.video.thumbnails.large" alt="">
                            </b-field>
                        </template>
                        <div class="file--upload" @click="openModalMedia({type: 'cardVideo', index: index})">
                            {{card.video.image? 'Replace Video' : ' Select Video'}}
                        </div>
                    </div>
                </b-collapse>

            </Draggable>
        </Container>

        <!-- Scroll To Bottom -->
        <template v-if="windowWidth > 991.98">
            <div id="scroll--bottom"></div>
        </template>

    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';

    // Menu Toalbar
    import MenuEditor from './MenuEditor'
    // Draggable
    import {
        Container,
        Draggable
    } from "vue-smooth-dnd";
    // Vue Editor
    import { VueEditor } from "vue2-editor";
    // Set Sort All Cards After Drop
    import {applyDrag} from '../../../helpers/DragAndDrop'


    export default {
        props: ['post'],
        data() {
            return {
                cardEditorType: '',
                cards: [],
                toolbarEditor: [
                    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                    ['bold', 'italic', 'underline'],
                    [{
                        'list': 'ordered'
                    }, {
                        'list': 'bullet'
                    }, {
                        'header': [1, 2, 3, false]
                    }],
                    ['link']
                ]

            }
        },
        components: {
            MenuEditor,
            Container,
            Draggable,
            VueEditor,
        },
        watch:{
            setContentCardImage() {
                this.cards[this.setContentCardImage.index].image = this.setContentCardImage.item
            },
            setContentCardGallery() {
                this.cards[this.setContentCardGallery.index].gallery = this.setContentCardGallery.item
            },
            setContentCardVideo() {
                this.cards[this.setContentCardVideo.index].video = this.setContentCardVideo.item
            },
            // Send Data To Parent
            cards: {
                handler(val) {
                    this.sentDataToParents()
                },
                deep: true
            },
            post(){
                if(this.post){
                    this.cards = this.post.content
                }
            }
        },
        computed: {
            ...mapState({
                setContentCardImage: state => state.media.setContentCardImage,
                setContentCardGallery: state => state.media.setContentCardGallery,
                setContentCardVideo: state => state.media.setContentCardVideo,
            }),
            windowWidth(){
                return window.innerWidth
            }
        },
        methods: {
            // Send Type To Parent Component
            setEditorType(type) {
                this.cardEditorType = type
                this.addNewCard(type)
            },
            // Send Data To Parent
            sentDataToParents() {
                this.$emit('setDataFromChild', this.cards)
            },
            // Delete Card
            deleteCard(index) {
                this.cards.splice(index, 1)
            },
            // Set Sort All Cards After Drop
            onDrop(dropResult) {
                this.cards = applyDrag(this.cards, dropResult);
            },
            // Add New Card
            addNewCard(type) {
                let card = {
                    type: type
                };
                switch (type) {
                    case 'image':
                        card.image = {}
                        break;
                    case 'video':
                        card.video = {}
                        break;
                    case 'gallery':
                        card.gallery = []
                        break;
                    default:
                        card.content = '';
                        // card.id = this.cards.length + 1
                }
                this.cards.push(card);
            },
            // set Image From Media
            openModalMedia(type) {
                if(type.type === 'cardVideo'){
                    this.$store.commit('openMediaVideosFromPosts', type)
                } else if (type.type === 'cardGallery'){
                    this.$store.commit('openMediaGalleryFromPosts', type)
                } else {
                    this.$store.commit('openMediaImageFromPosts', type)
                }
            }
        }
    }
</script>
