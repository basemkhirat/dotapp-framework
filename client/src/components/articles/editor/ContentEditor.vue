<template>
    <div class="content--editor">
        <!-- Menu Editor -->
        <menu-editor @setEditorType="setEditorType" />

        <!-- Card Content -->
        <Container @drop="onDrop" drag-handle-selector=".card-header-title-drop" v-if="cards.length">
            <Draggable v-for="(card, index) in cards" :key="card.id">

                <!-- Paragraph Card -->
                <div class="card--block" v-if="card.type === 'paragraph'">
                    <div class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            {{$t('paragraph')}}
                        </p>
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
                </div>

                <!-- Blockquote Card -->
                <div class="card--block" v-if="card.type === 'blockquote'">
                    <div class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            {{$t('blockquote')}}
                        </p>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <b-input type="textarea" rows="4" v-model="card.content" placeholder="Blockquote" />
                    </div>
                </div>

                <!-- Embed Card -->
                <div class="card--block preview--iframe" v-if="card.type === 'embed'">
                    <div class="card-header">
                        <p class="card-header-title card-header-title-drop">
                             {{$t('embed')}}
                        </p>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <b-input type="textarea" rows="2" v-model="card.content" placeholder="Content" />
                        <div v-html="card.content" class="text-center mt-3"></div>
                    </div>
                </div>

                <!-- Card Image -->
                <div class="card--block" v-if="card.type === 'image'">
                    <div class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            {{$t('image')}}
                        </p>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <!-- Main Image OR Video -->
                        <template v-if="card.image">
                            <b-field class="field-group img--preview" v-if="card.image.thumbnails">
                                <img :src="card.image.thumbnails.large" alt="">
                                <div class="wrap--replace--media" @click="openModalMedia({type: 'cardImage', index: index})">
                                    <div class="btn--replace--media">Replace</div>
                                </div>
                                <a class="delete is-large btn--delete--media" @click="card.image = {}"></a>
                            </b-field>
                            <div @click="openModalMedia({type: 'cardImage', index: index})" v-else>
                                <media-placeholder type="image" text="Browse Media" />
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Card Ads -->
                <div class="card--block" v-if="card.type === 'ads'">
                    <div class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            {{$t('ads')}}
                        </p>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <!-- Ads Link -->
                        <b-input placeholder="URL" type="url" v-model="card.link" class="mb-4 text-force-left"></b-input>
                        <!-- Main Ads Image -->
                        <template v-if="card.ads">
                            <b-field class="field-group img--preview" v-if="card.ads.thumbnails">
                                <img :src="card.ads.thumbnails.large">
                                <div class="wrap--replace--media" @click="openModalMedia({type: 'cardAds', index: index})">
                                    <div class="btn--replace--media">Replace</div>
                                </div>
                                <a class="delete is-large btn--delete--media" @click="card.ads = {}"></a>
                            </b-field>
                            <div @click="openModalMedia({type: 'cardAds', index: index})" v-else>
                                <media-placeholder type="image" text="Browse Media" />
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Card Gallery -->
                <div class="card--block" v-if="card.type === 'gallery'">
                    <div class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            {{$t('gallery')}}
                        </p>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content gallery--editor">
                        <template v-if="card.gallery">
                            <template v-if="card.gallery.length">
                                <div v-for="(itemImg, indexImg) in card.gallery" :key="itemImg.id" class="gallery--img--editor">
                                    <template v-if="itemImg.thumbnails">
                                        <b-field class="field-group img--preview" v-if="itemImg.thumbnails">
                                            <img :src="itemImg.thumbnails.large" alt="">
                                            <div class="wrap--replace--media" @click="openModalMedia({type: 'cardGallery', index: index})">
                                                <div class="btn--replace--media">Replace</div>
                                            </div>
                                            <a class="delete is-large btn--delete--media" @click="card.gallery.splice(indexImg, 1)"></a>
                                        </b-field>
                                    </template>
                                </div>
                            </template>
                            <div @click="openModalMedia({type: 'cardGallery', index: index})" v-else>
                                <media-placeholder type="gallery" text="Browse Media" />
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Video Card-->
                <div class="card--block" v-if="card.type === 'video'">
                    <div class="card-header">
                        <p class="card-header-title card-header-title-drop">
                            {{$t('video')}}
                        </p>
                        <a class="card-header-icon" @click="deleteCard(index)">
                            <b-icon icon="close">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card--content">
                        <template v-if="card.video">
                            <b-field class="field-group img--preview" v-if="card.video.thumbnails">
                                <img :src="card.video.thumbnails.large" alt="">
                                <div class="wrap--replace--media" @click="openModalMedia({type: 'cardVideo', index: index})">
                                    <div class="btn--replace--media">Replace</div>
                                </div>
                                <a class="delete is-large btn--delete--media" @click="card.video = {}"></a>
                            </b-field>

                            <div @click="openModalMedia({type: 'cardVideo', index: index})" v-else>
                                <media-placeholder type="video" text="Browse Media" />
                            </div>
                        </template>
                    </div>

                </div>

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
            setContentCardImageAds() {
                this.cards[this.setContentCardImageAds.index].ads = this.setContentCardImageAds.item
            },
            // Send Data To Parent
            cards: {
                handler() {
                    this.sentDataToParents()
                    console.log('this.cards', this.cards)
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
                setContentCardImageAds: state => state.media.setContentCardImageAds,
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
                    case 'ads':
                        card.ads = {}
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
                } else if (type.type === 'cardAds'){
                    this.$store.commit('openMediaAdsFromPosts', type)
                } else {
                    this.$store.commit('openMediaImageFromPosts', type)
                }
            }
        }
    }
</script>
