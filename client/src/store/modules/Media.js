const Media = {
    state: {
        itemsSelectedCount: 0,
        stateMediaModal: false,
        previewImages: false,
        previewVideos: false,
        imageSelected: {},
        videoSelected: {},
        mainArticlePhoto: {},
        setContentCardImage: '',
        setContentCardVideo: '',
        selectedType: '',
        previewItemAction: true,
        galleryMode: false,
    },
    mutations: {
        // Reset Media Type
        resetType(state){
            state.previewImages = false
            state.previewVideos = false
            state.galleryMode = false
            state.previewItemAction = true
        },
        // Open Global Media
        openMediaModal(state) {
            this.commit('resetType')
            state.stateMediaModal = !state.stateMediaModal
        },
        // Open Media And Preview All Images
        openMediaImage(state) {
            this.commit('resetType')
            state.stateMediaModal = !state.stateMediaModal
            state.previewImages = true
            state.previewItemAction = false
        },
        // Open Media And Preview All Images
        openMediaImageFromPosts(state, type = '') {
            this.commit('resetType')
            state.selectedType = type
            state.stateMediaModal = !state.stateMediaModal
            state.previewImages = true
            state.previewItemAction = false
        },
        // Open Media And Preview All Videos
        openMediaVideosFromPosts(state, type = '') {
            this.commit('resetType')
            state.selectedType = type
            state.stateMediaModal = !state.stateMediaModal
            state.previewVideos = true
            state.previewItemAction = false
        },
        // Open Media And Preview All Images
        openMediaGalleryFromPosts(state, type = '') {
            this.commit('resetType')
            state.selectedType = type
            state.stateMediaModal = !state.stateMediaModal
            state.previewImages = true
            state.galleryMode = true
        },
        closeMediaModal(state) {
            state.stateMediaModal = false
        },
        checkItemsSelected(state, count) {
            state.itemsSelectedCount = count
        },
        setItemSelected(state, item) {
            if(state.selectedType === 'mainArticlePhoto'){
                state.mainArticlePhoto = item
                state.imageSelected = item
            }
            else if (state.selectedType.type === 'cardImage'){
                state.setContentCardImage = {item: item, index: state.selectedType.index}
                state.imageSelected = item
            }
            else if (state.selectedType.type === 'cardGallery'){
                state.setContentCardImage = {item: item, index: state.selectedType.index}
                state.imageSelected = item
            }
            else if (state.selectedType.type === 'cardVideo'){
                state.setContentCardVideo = {item: item, index: state.selectedType.index}
                state.videoSelected = item
            }
        }
    },
    actions: {

    },
    getters: {}
}

export default Media
