(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d221853"],{cb64:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"posts"},[a("div",{staticClass:"page--head"},[a("div",{staticClass:"wrap--content"},[a("div",{staticClass:"page--title"},[a("div",[a("h1",{staticClass:"title--text"},[t._v("Posts")]),a("breadcrumb",{attrs:{links:t.breadcrumb}})],1),a("div",{staticClass:"page--title--action ml-auto"},[a("button",{staticClass:"button is-primary",on:{click:t.submitForm}},[t._v("Save Changes")])])])])]),a("div",{staticClass:"wrap--content"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm()}}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-lg-8"},[a("div",{staticClass:"post--content"},[a("main-field-post",{attrs:{post:this.post},on:{setDataFromChild:t.setDataFromMainField}}),a("content-editor",{attrs:{post:this.post},on:{setDataFromChild:t.setDataFromCardsContent}}),a("div",{staticClass:"text-center button--save--form d-none d-lg-block"},[a("button",{staticClass:"button is-primary",class:{"is-loading":t.isLoading},attrs:{type:"submit"}},[t._v("Save Changes")])])],1)]),a("post-info",{attrs:{post:this.post},on:{setDataFromChild:t.setDataFromPostInfo}}),a("div",{staticClass:"text-center button--save--form d-block d-lg-none w-100"},[a("button",{staticClass:"button is-primary",class:{"is-loading":t.isLoading},attrs:{type:"submit"}},[t._v("\n            Save\n            Changes\n          ")])])],1)])])])},s=[],n=(a("96cf"),a("3b8d")),o=a("f499"),r=a.n(o),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12 col-lg-4"},[a("div",{staticClass:"card--block"},[a("div",{staticClass:"card--content"},[a("div",{staticClass:"post--info--item"},[a("b-field",{staticClass:"field-group flex-column"},[a("label",{staticClass:"label"},[t._v("Schedule")]),a("datetime",{staticClass:"custom--datetime theme-primary",attrs:{type:"datetime",placeholder:"Schedule Date","use12-hour":""},model:{value:t.postInfo.published_at,callback:function(e){t.$set(t.postInfo,"published_at",e)},expression:"postInfo.published_at"}})],1)],1),a("div",{staticClass:"post--info--item"},[a("b-field",{staticClass:"field-group flex-column"},[a("label",{staticClass:"label"},[t._v("Format")]),a("v-select",{staticClass:"select--with--icon w-100 v--select--scroll",attrs:{options:t.allFormat,label:"name",placeholder:"format"},scopedSlots:t._u([{key:"option",fn:function(e){return[t._v(t._s(e.name))]}}]),model:{value:t.postInfo.format,callback:function(e){t.$set(t.postInfo,"format",e)},expression:"postInfo.format"}})],1)],1)])]),a("div",{staticClass:"card--block"},[a("div",{staticClass:"card--content"},[a("div",{staticClass:"post--info--item"},[a("b-field",{staticClass:"field-group flex-column"},[a("label",{staticClass:"label"},[t._v("categories")]),a("treeselect",{staticClass:"custom--treeSelect",attrs:{"show-count":!0,flat:!0,multiple:!0,options:t.categories},model:{value:t.postInfo.categories,callback:function(e){t.$set(t.postInfo,"categories",e)},expression:"postInfo.categories"}})],1)],1)])]),a("div",{staticClass:"card--block"},[a("div",{staticClass:"card--content"},[a("div",{staticClass:"post--info--item"},[a("b-field",{staticClass:"field-group flex-column"},[a("label",{staticClass:"label"},[t._v("Tags")]),a("b-taginput",{attrs:{data:t.filteredTags,autocomplete:"","allow-new":!0,field:"name",icon:"label",placeholder:"Add a tag",loading:t.tagsFilterLoading},on:{typing:t.getFilteredTags},model:{value:t.postInfo.tags,callback:function(e){t.$set(t.postInfo,"tags",e)},expression:"postInfo.tags"}})],1)],1)])])])},c=[],d=(a("7f7f"),a("859b")),u=(a("d355"),a("7026")),p=a.n(u),m=(a("542c"),a("d7f2")),h=a("3304"),f=m["a"].get("tags"),g=m["a"].get("categories"),v={props:["post"],data:function(){return{postInfo:{status:0,format:"",tags:[],published_at:"",categories:[],author:""},filteredTags:[],tagsFilterLoading:!1,allSections:["News","Media","Sport","Art"],allFormat:h["a"],scheduleDate:"",page:1,limit:10,value:null,categories:[],optionsSelect:[{id:"1",label:"Sports",children:[{id:"s1",label:"sports child one"},{id:"s2",label:"sports child two"},{id:"s3",label:"sports child three"}]},{id:"2",label:"Movies",children:[{id:"m1",label:"Movies child one"},{id:"m2",label:"Movies child two"},{id:"m3",label:"Movies child three"}]},{id:"3",label:"News"}]}},components:{Datetime:d["Datetime"],Treeselect:p.a},watch:{postInfo:{handler:function(){this.sentDataToParent()},deep:!0},post:function(){var t=this;this.post&&(this.postInfo.status=this.post.status,this.post.tags.length&&this.post.tags.map(function(e){t.postInfo.tags.push(e.name)}),this.post.categories.length&&this.post.categories.map(function(e){t.postInfo.categories.push(e.id)}),this.postInfo.published_at=this.post.published_at,this.postInfo.format=this.post.format)}},created:function(){this.$emit("setDataFromChild",this.postInfo),this.fetchAllCategories()},methods:{sentDataToParent:function(){this.$emit("setDataFromChild",this.postInfo)},getFilteredTags:function(t){var e=this;this.filteredTags=[];var a={};a.searchQuery=t,clearTimeout(this.debounce),this.debounce=setTimeout(function(){e.fetchAllTags(a)},500)},fetchAllTags:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var a,i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.tagsFilterLoading=!0,t.next=3,f.getAllTags(this.page,this.limit,e);case 3:a=t.sent,a.data.docs.map(function(t){i.filteredTags.push(t.name)}),this.tagsFilterLoading=!1;case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),fetchAllCategories:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e,a,i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,g.getAllCategories(this.page,this.limit);case 2:e=t.sent,a=e.data.docs,a.map(function(t){if(t.children.length){var e=[];t.children.map(function(t){e.push({id:t.id,label:t.name})}),i.categories.push({id:t.id,label:t.name,children:e})}else i.categories.push({id:t.id,label:t.name})});case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}},C=v,b=a("2877"),y=Object(b["a"])(C,l,c,!1,null,null,null),_=y.exports,w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card--block"},[a("div",{staticClass:"card--content"},[a("div",{staticClass:"row align-items-center"},[a("div",{staticClass:"col-12"},[a("b-field",{staticClass:"field-group"},[a("div",[t.mediaItemPreview.image?[t.mediaItemPreview.thumbnails?a("b-field",{staticClass:"field-group img--preview img--preview--mainimg"},[a("img",{attrs:{src:t.mediaItemPreview.thumbnails.max}}),a("div",{staticClass:"wrap--replace--media",on:{click:function(e){return t.openModalMedia("mainArticlePhoto")}}},[a("div",{staticClass:"btn--replace--media"},[t._v("Replace")])]),a("a",{staticClass:"delete is-large btn--delete--media",on:{click:function(e){t.mediaItemPreview=""}}})]):t._e()]:a("div",{on:{click:function(e){return t.openModalMedia("mainArticlePhoto")}}},[a("media-placeholder",{attrs:{type:"image",text:"Browse Media"}})],1)],2)])],1),a("div",{staticClass:"col-12"},[a("b-field",{staticClass:"field-group"},[a("b-input",{attrs:{type:"text",size:"is-medium",placeholder:"Title"},model:{value:t.mainFieldPost.title,callback:function(e){t.$set(t.mainFieldPost,"title",e)},expression:"mainFieldPost.title"}})],1)],1),a("div",{staticClass:"col-12"},[a("b-field",{staticClass:"field-group"},[a("b-input",{attrs:{type:"textarea",rows:"2",placeholder:"Excerpt"},model:{value:t.mainFieldPost.excerpt,callback:function(e){t.$set(t.mainFieldPost,"excerpt",e)},expression:"mainFieldPost.excerpt"}})],1)],1)])])])},k=[],x=a("cebc"),F=a("2f62"),P={props:["post"],data:function(){return{title:"",mediaItemPreview:{image:""},mainFieldPost:{title:"",excerpt:"",media:""}}},created:function(){this.resetData()},watch:{mainFieldPost:{handler:function(t){this.sentDataToParent()},deep:!0},mainArticlePhoto:function(){this.mediaItemPreview=this.mainArticlePhoto,this.mainFieldPost.media=this.mainArticlePhoto.id},post:function(){this.post&&(this.mainFieldPost.title=this.post.title,this.mainFieldPost.excerpt=this.post.excerpt,this.post.media&&(this.mediaItemPreview=this.post.media))}},methods:{openModalMedia:function(t){this.$store.commit("openMediaImageAndVideo",t)},sentDataToParent:function(t){this.$emit("setDataFromChild",this.mainFieldPost)},resetData:function(){this.$store.commit("resetPostData")}},computed:Object(x["a"])({},Object(F["c"])({mainArticlePhoto:function(t){return t.media.mainArticlePhoto}}))},M=P,I=Object(b["a"])(M,w,k,!1,null,null,null),$=I.exports,T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content--editor"},[a("menu-editor",{on:{setEditorType:t.setEditorType}}),t.cards.length?a("Container",{attrs:{"drag-handle-selector":".card-header-title-drop"},on:{drop:t.onDrop}},t._l(t.cards,function(e,i){return a("Draggable",{key:e.id},["paragraph"===e.type?a("div",{staticClass:"card--block"},[a("div",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title card-header-title-drop"},[t._v("\n                        Paragraph\n                    ")]),a("a",{staticClass:"card-header-icon",on:{click:function(e){return t.deleteCard(i)}}},[a("b-icon",{attrs:{icon:"close"}})],1)]),a("div",{staticClass:"card--content"},[a("vue-editor",{attrs:{editorToolbar:t.toolbarEditor},model:{value:e.content,callback:function(a){t.$set(e,"content",a)},expression:"card.content"}})],1)]):t._e(),"blockquote"===e.type?a("div",{staticClass:"card--block"},[a("div",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title card-header-title-drop"},[t._v("\n                        Blockquote\n                    ")]),a("a",{staticClass:"card-header-icon",on:{click:function(e){return t.deleteCard(i)}}},[a("b-icon",{attrs:{icon:"close"}})],1)]),a("div",{staticClass:"card--content"},[a("b-input",{attrs:{type:"textarea",rows:"4",placeholder:"Blockquote"},model:{value:e.content,callback:function(a){t.$set(e,"content",a)},expression:"card.content"}})],1)]):t._e(),"embed"===e.type?a("div",{staticClass:"card--block preview--iframe"},[a("div",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title card-header-title-drop"},[t._v("\n                        Embed\n                    ")]),a("a",{staticClass:"card-header-icon",on:{click:function(e){return t.deleteCard(i)}}},[a("b-icon",{attrs:{icon:"close"}})],1)]),a("div",{staticClass:"card--content"},[a("b-input",{attrs:{type:"textarea",rows:"2",placeholder:"Content"},model:{value:e.content,callback:function(a){t.$set(e,"content",a)},expression:"card.content"}}),a("div",{staticClass:"text-center mt-3",domProps:{innerHTML:t._s(e.content)}})],1)]):t._e(),"image"===e.type?a("div",{staticClass:"card--block"},[a("div",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title card-header-title-drop"},[t._v("\n                        Image\n                    ")]),a("a",{staticClass:"card-header-icon",on:{click:function(e){return t.deleteCard(i)}}},[a("b-icon",{attrs:{icon:"close"}})],1)]),a("div",{staticClass:"card--content"},[e.image?[e.image.thumbnails?a("b-field",{staticClass:"field-group img--preview"},[a("img",{attrs:{src:e.image.thumbnails.large,alt:""}}),a("div",{staticClass:"wrap--replace--media",on:{click:function(e){return t.openModalMedia({type:"cardImage",index:i})}}},[a("div",{staticClass:"btn--replace--media"},[t._v("Replace")])]),a("a",{staticClass:"delete is-large btn--delete--media",on:{click:function(t){e.image={}}}})]):a("div",{on:{click:function(e){return t.openModalMedia({type:"cardImage",index:i})}}},[a("media-placeholder",{attrs:{type:"image",text:"Browse Media"}})],1)]:t._e()],2)]):t._e(),"gallery"===e.type?a("div",{staticClass:"card--block"},[a("div",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title card-header-title-drop"},[t._v("\n                        Gallery\n                    ")]),a("a",{staticClass:"card-header-icon",on:{click:function(e){return t.deleteCard(i)}}},[a("b-icon",{attrs:{icon:"close"}})],1)]),a("div",{staticClass:"card--content gallery--editor"},[e.gallery?[e.gallery.length?t._l(e.gallery,function(s,n){return a("div",{key:s.id,staticClass:"gallery--img--editor"},[s.thumbnails?[s.thumbnails?a("b-field",{staticClass:"field-group img--preview"},[a("img",{attrs:{src:s.thumbnails.large,alt:""}}),a("div",{staticClass:"wrap--replace--media",on:{click:function(e){return t.openModalMedia({type:"cardGallery",index:i})}}},[a("div",{staticClass:"btn--replace--media"},[t._v("Replace")])]),a("a",{staticClass:"delete is-large btn--delete--media",on:{click:function(t){return e.gallery.splice(n,1)}}})]):t._e()]:t._e()],2)}):a("div",{on:{click:function(e){return t.openModalMedia({type:"cardGallery",index:i})}}},[a("media-placeholder",{attrs:{type:"gallery",text:"Browse Media"}})],1)]:t._e()],2)]):t._e(),"video"===e.type?a("div",{staticClass:"card--block"},[a("div",{staticClass:"card-header"},[a("p",{staticClass:"card-header-title card-header-title-drop"},[t._v("\n                        Video\n                    ")]),a("a",{staticClass:"card-header-icon",on:{click:function(e){return t.deleteCard(i)}}},[a("b-icon",{attrs:{icon:"close"}})],1)]),a("div",{staticClass:"card--content"},[e.video?[e.video.thumbnails?a("b-field",{staticClass:"field-group img--preview"},[a("img",{attrs:{src:e.video.thumbnails.large,alt:""}}),a("div",{staticClass:"wrap--replace--media",on:{click:function(e){return t.openModalMedia({type:"cardVideo",index:i})}}},[a("div",{staticClass:"btn--replace--media"},[t._v("Replace")])]),a("a",{staticClass:"delete is-large btn--delete--media",on:{click:function(t){e.video={}}}})]):a("div",{on:{click:function(e){return t.openModalMedia({type:"cardVideo",index:i})}}},[a("media-placeholder",{attrs:{type:"video",text:"Browse Media"}})],1)]:t._e()],2)]):t._e()])}),1):t._e(),t.windowWidth>991.98?[a("div",{attrs:{id:"scroll--bottom"}})]:t._e()],2)},D=[],E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"menu--editor"},[a("ul",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#scroll--bottom",expression:"'#scroll--bottom'"}],staticClass:"nav"},[a("li",{staticClass:"menu--item",on:{click:function(e){return t.setEditorType("paragraph")}}},[t._m(0),t._v("\n            paragraph\n        ")]),a("li",{staticClass:"menu--item",on:{click:function(e){return t.setEditorType("image")}}},[t._m(1),t._v("\n            Image\n        ")]),a("li",{staticClass:"menu--item",on:{click:function(e){return t.setEditorType("gallery")}}},[t._m(2),t._v("\n            Gallery\n        ")]),a("li",{staticClass:"menu--item",on:{click:function(e){return t.setEditorType("video")}}},[t._m(3),t._v("\n            video\n        ")]),a("li",{staticClass:"menu--item",on:{click:function(e){return t.setEditorType("blockquote")}}},[t._m(4),t._v("\n            blockquote\n        ")]),a("li",{staticClass:"menu--item",on:{click:function(e){return t.setEditorType("embed")}}},[t._m(5),t._v("\n            embed\n        ")])])])},O=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fas fa-paragraph"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fas fa-image"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fas fa-images"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fas fa-video"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fas fa-quote-right"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fas fa-link"})])}],j={methods:{setEditorType:function(t){this.$emit("setEditorType",t)}}},A=j,S=Object(b["a"])(A,E,O,!1,null,null,null),R=S.exports,L=a("3f7d"),V=a("21b8"),G=a("ff41"),q={props:["post"],data:function(){return{cardEditorType:"",cards:[],toolbarEditor:[[{align:""},{align:"center"},{align:"right"},{align:"justify"}],["bold","italic","underline"],[{list:"ordered"},{list:"bullet"},{header:[1,2,3,!1]}],["link"]]}},components:{MenuEditor:R,Container:L["Container"],Draggable:L["Draggable"],VueEditor:V["VueEditor"]},watch:{setContentCardImage:function(){this.cards[this.setContentCardImage.index].image=this.setContentCardImage.item},setContentCardGallery:function(){this.cards[this.setContentCardGallery.index].gallery=this.setContentCardGallery.item},setContentCardVideo:function(){this.cards[this.setContentCardVideo.index].video=this.setContentCardVideo.item},cards:{handler:function(t){this.sentDataToParents()},deep:!0},post:function(){this.post&&(this.cards=this.post.content)}},computed:Object(x["a"])({},Object(F["c"])({setContentCardImage:function(t){return t.media.setContentCardImage},setContentCardGallery:function(t){return t.media.setContentCardGallery},setContentCardVideo:function(t){return t.media.setContentCardVideo}}),{windowWidth:function(){return window.innerWidth}}),methods:{setEditorType:function(t){this.cardEditorType=t,this.addNewCard(t)},sentDataToParents:function(){this.$emit("setDataFromChild",this.cards)},deleteCard:function(t){this.cards.splice(t,1)},onDrop:function(t){this.cards=Object(G["a"])(this.cards,t)},addNewCard:function(t){var e={type:t};switch(t){case"image":e.image={};break;case"video":e.video={};break;case"gallery":e.gallery=[];break;default:e.content=""}this.cards.push(e)},openModalMedia:function(t){"cardVideo"===t.type?this.$store.commit("openMediaVideosFromPosts",t):"cardGallery"===t.type?this.$store.commit("openMediaGalleryFromPosts",t):this.$store.commit("openMediaImageFromPosts",t)}}},B=q,N=Object(b["a"])(B,T,D,!1,null,null,null),J=N.exports,W=m["a"].get("posts"),K={name:"postForm",data:function(){return{breadcrumb:[{link:"/posts",label:"posts"},{link:"",label:"add & update post"}],postInfo:{},postMainField:{},postMainFieldData:{},allCards:[],cardContent:[],isLoading:!1,post:{}}},components:{PostInfo:_,ContentEditor:J,MainFieldPost:$},created:function(){this.$route.params.id&&this.getPost(this.$route.params.id)},watch:{},methods:{setDataFromPostInfo:function(t){this.postInfo=t},setDataFromMainField:function(t){this.postMainField=t},setDataFromCardsContent:function(t){this.allCards=t},submitForm:function(){this.isLoading=!1;var t=JSON.parse(r()(this.allCards));if(t){var e=function(e){if("image"===t[e].type){var a=t[e].image;a.id&&(t[e].image=a.id)}if("video"===t[e].type){var i=t[e].video;i.id&&(t[e].video=i.id)}if("gallery"===t[e].type){var s=t[e].gallery;t[e].gallery=[],s.map(function(a){t[e].gallery.push(a.id)})}};for(var a in t)e(a)}var i={};i.title=this.postMainField.title,i.excerpt=this.postMainField.excerpt,this.postMainField.media&&(i.media=this.postMainField.media),i.status=this.postInfo.status,i.tags=this.postInfo.tags,i.categories=this.postInfo.categories,this.postInfo.format&&(i.format=this.postInfo.format.value),i.published_at=this.postInfo.published_at,i.content=t,this.isLoading=!0,this.$route.params.id?this.updatePost(this.$route.params.id,i):this.newPost(i)},newPost:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,W.newPost(e);case 2:a=t.sent,a.success?(this.successMessage(a.message),this.$router.push("/postForm/"+a.data)):this.errorMessage(a[0]),this.isLoading=!1;case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),getPost:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,W.getPost(e);case 2:a=t.sent,this.post=a;case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),updatePost:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e,a){var i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,W.updatePost(e,a);case 2:i=t.sent,i.success?this.successMessage(i.message):this.errorMessage(i[0]),this.isLoading=!1;case 5:case"end":return t.stop()}},t,this)}));function e(e,a){return t.apply(this,arguments)}return e}(),errorMessage:function(t){this.$snackbar.open({message:t,type:"is-danger",position:"is-bottom-right",actionText:"OK",queue:!1,duration:1e4,indefinite:!1})},successMessage:function(t){this.$snackbar.open({message:t,type:"is-success",position:"is-bottom-right",actionText:"OK",queue:!1,duration:1e4,indefinite:!1})},changeSideBarStyle:function(){document.body.classList.add("editor--mini"),this.$store.commit("miniSidebar")}}},z=K,H=Object(b["a"])(z,i,s,!1,null,null,null);e["default"]=H.exports}}]);
//# sourceMappingURL=chunk-2d221853.037ff3b0.js.map