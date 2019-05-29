const media = {
     state: {
          itemsSelectedCount: 0,
          imageSelected: {}
     },
     mutations: {
          checkItemsSelected(state, count){
               state.itemsSelectedCount = count
          },
          setItemSelected(state, item){
             state.imageSelected = item
          }
     },
     actions: {

     },
     getters: {}
}

export default media
