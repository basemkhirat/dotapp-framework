(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e944b"],{"8d8a":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"posts"},[s("div",{staticClass:"page--head"},[s("div",{staticClass:"wrap--content"},[s("div",{staticClass:"page--title"},[s("div",[s("h1",{staticClass:"title--text"},[t._v("\n                        Events\n                    ")]),s("breadcrumb",{attrs:{links:t.breadcrumb}})],1),s("div",{staticClass:"page--title--action ml-auto"},[s("button",{staticClass:"button is-primary",class:{"is-loading":t.isLoading},on:{click:t.submitForm}},[t._v("Save Changes")])])])])]),s("div",{staticClass:"wrap--content"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm()}}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-lg-8"},[s("div",{staticClass:"post--content"},[s("main-field-post",{attrs:{post:this.post},on:{setDataFromChild:t.setDataFromMainField}}),s("div",{staticClass:"text-center button--save--form d-none d-lg-block"},[s("button",{staticClass:"button is-primary",class:{"is-loading":t.isLoading},attrs:{type:"submit"}},[t._v("Save Changes")])])],1)]),s("post-info",{attrs:{post:this.post},on:{setDataFromChild:t.setDataFromPostInfo}}),s("div",{staticClass:"text-center button--save--form d-block d-lg-none w-100"},[s("button",{staticClass:"button is-primary",class:{"is-loading":t.isLoading},attrs:{type:"submit"}},[t._v("Save\n                        Changes")])])],1)])])])},a=[],n=(s("96cf"),s("3b8d")),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-12 col-lg-4"},[s("div",{staticClass:"card--block"},[s("div",{staticClass:"card--content"},[s("div",{staticClass:"post--info--item"},[s("b-field",{staticClass:"field-group align-items-center justify-content-between"},[s("label",{staticClass:"label"},[t._v("Status")]),s("b-switch",{attrs:{"true-value":1,"false-value":0},model:{value:t.postInfo.status,callback:function(e){t.$set(t.postInfo,"status",e)},expression:"postInfo.status"}},[t._v("\n                        Published\n                    ")])],1)],1),s("div",{staticClass:"post--info--item"},[s("b-field",{staticClass:"field-group flex-column"},[s("label",{staticClass:"label"},[t._v("Schedule")]),s("datetime",{staticClass:"custom--datetime theme-primary",attrs:{type:"datetime",placeholder:"Schedule Date","use12-hour":""},model:{value:t.postInfo.published_at,callback:function(e){t.$set(t.postInfo,"published_at",e)},expression:"postInfo.published_at"}})],1)],1)])]),s("div",{staticClass:"card--block"},[s("div",{staticClass:"card--content"},[s("div",{staticClass:"post--info--item"},[s("b-field",{staticClass:"field-group flex-column"},[s("label",{staticClass:"label"},[t._v("Event Date & Time")]),s("datetime",{staticClass:"custom--datetime theme-primary",attrs:{type:"datetime",placeholder:"Event Date","use12-hour":""},model:{value:t.postInfo.eventDate,callback:function(e){t.$set(t.postInfo,"eventDate",e)},expression:"postInfo.eventDate"}})],1)],1)])]),s("div",{staticClass:"card--block"},[s("div",{staticClass:"card--content"},[s("div",{staticClass:"post--info--item"},[s("b-field",{staticClass:"field-group flex-column"},[s("label",{staticClass:"label"},[t._v("Type")]),s("div",[s("v-select",{staticClass:"select--with--icon w-100 v--select--scroll",attrs:{options:t.allType,label:"name",placeholder:"type"},scopedSlots:t._u([{key:"option",fn:function(e){return[t._v("\n                                "+t._s(e.name)+"\n                            ")]}}]),model:{value:t.typeContent,callback:function(e){t.typeContent=e},expression:"typeContent"}}),"paid"===t.typeContent.value?s("div",[s("b-input",{staticClass:"w-100 mt-3",attrs:{type:"text",placeholder:"Event Price"},model:{value:t.postInfo.price,callback:function(e){t.$set(t.postInfo,"price",e)},expression:"postInfo.price"}})],1):t._e()],1)])],1),s("div",{staticClass:"post--info--item"},[s("b-field",{staticClass:"field-group flex-column"},[s("label",{staticClass:"label"},[t._v("categories")]),s("treeselect",{staticClass:"custom--treeSelect",attrs:{"show-count":!0,flat:!0,multiple:!0,options:t.categories},model:{value:t.postInfo.categories,callback:function(e){t.$set(t.postInfo,"categories",e)},expression:"postInfo.categories"}})],1)],1)])]),s("div",{staticClass:"card--block"},[s("div",{staticClass:"card--content"},[s("div",{staticClass:"post--info--item"},[s("b-field",{staticClass:"field-group flex-column"},[s("label",{staticClass:"label"},[t._v("Location")]),s("div",{staticClass:"field has-addons"},[s("b-input",{staticClass:"w-100",attrs:{type:"text",placeholder:"Location Title"},model:{value:t.postInfo.address,callback:function(e){t.$set(t.postInfo,"address",e)},expression:"postInfo.address"}})],1),s("b-input",{staticClass:"w-100",attrs:{type:"textarea",rows:"3",placeholder:"Location Embed"},model:{value:t.postInfo.map,callback:function(e){t.$set(t.postInfo,"map",e)},expression:"postInfo.map"}})],1)],1)])]),s("div",{staticClass:"card--block"},[s("div",{staticClass:"card--content"},[s("div",{staticClass:"post--info--item"},[s("b-field",{staticClass:"field-group flex-column"},[s("label",{staticClass:"label"},[t._v("Tags")]),s("b-taginput",{attrs:{data:t.filteredTags,autocomplete:"","allow-new":!0,field:"name",icon:"label",placeholder:"Add a tag",loading:t.tagsFilterLoading},on:{typing:t.getFilteredTags},model:{value:t.postInfo.tags,callback:function(e){t.$set(t.postInfo,"tags",e)},expression:"postInfo.tags"}})],1)],1)])])])},l=[],r=(s("7f7f"),s("859b")),c=(s("d355"),s("7026")),d=s.n(c),p=(s("542c"),s("d7f2")),u=p["a"].get("tags"),m=p["a"].get("categories"),h={props:["post"],data:function(){return{postInfo:{status:0,tags:[],published_at:"",eventDate:"",type:"free",categories:[],address:"",map:"",price:""},filteredTags:[],tagsFilterLoading:!1,scheduleDate:"",page:1,limit:10,allType:[{value:"free",name:"Free"},{value:"paid",name:"Paid"}],typeContent:{value:"free",name:"Free"},categories:[]}},components:{Datetime:r["Datetime"],Treeselect:d.a},watch:{postInfo:{handler:function(){this.sentDataToParent()},deep:!0},post:function(){var t=this;this.post&&(this.postInfo.status=this.post.status,this.post.tags.length&&this.post.tags.map(function(e){t.postInfo.tags.push(e.name)}),this.post.categories.length&&this.post.categories.map(function(e){t.postInfo.categories.push(e.id)}),this.postInfo.published_at=this.post.published_at,this.postInfo.eventDate=this.post.scheduled_at,this.postInfo.price=this.post.price,this.postInfo.address=this.post.address,this.postInfo.map=this.post.map,"free"===this.post.type?this.typeContent={value:"free",name:"Free"}:"paid"===this.post.type&&(this.typeContent={value:"paid",name:"Paid"}))},typeContent:function(){this.postInfo.type=this.typeContent.value}},created:function(){this.$emit("setDataFromChild",this.postInfo),this.fetchAllCategories()},methods:{sentDataToParent:function(){this.$emit("setDataFromChild",this.postInfo)},getFilteredTags:function(t){var e=this;this.filteredTags=[];var s={};s.searchQuery=t,clearTimeout(this.debounce),this.debounce=setTimeout(function(){e.fetchAllTags(s)},500)},fetchAllTags:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var s,i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.tagsFilterLoading=!0,t.next=3,u.getAllTags(this.page,this.limit,e);case 3:s=t.sent,s.data.docs.map(function(t){i.filteredTags.push(t.name)}),this.tagsFilterLoading=!1;case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),fetchAllCategories:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e,s,i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,m.getAllCategories(this.page,this.limit);case 2:e=t.sent,s=e.data.docs,s.map(function(t){if(t.children.length){var e=[];t.children.map(function(t){e.push({id:t.id,label:t.name})}),i.categories.push({id:t.id,label:t.name,children:e})}else i.categories.push({id:t.id,label:t.name})});case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}},f=h,v=s("2877"),g=Object(v["a"])(f,o,l,!1,null,null,null),b=g.exports,C=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"card--block"},[s("div",{staticClass:"card--content"},[s("div",{staticClass:"row align-items-center"},[s("div",{staticClass:"col-12"},[s("b-field",{staticClass:"field-group"},[s("div",[t.mediaItemPreview?[t.mediaItemPreview.thumbnails?s("b-field",{staticClass:"field-group img--preview img--preview--mainimg"},[s("img",{attrs:{src:t.mediaItemPreview.thumbnails.max}}),s("div",{staticClass:"wrap--replace--media",on:{click:function(e){return t.openModalMedia("mainArticlePhoto")}}},[s("div",{staticClass:"btn--replace--media"},[t._v("Replace")])]),s("a",{staticClass:"delete is-large btn--delete--media",on:{click:function(e){t.mediaItemPreview=""}}})]):t._e()]:s("div",{on:{click:function(e){return t.openModalMedia("mainArticlePhoto")}}},[s("media-placeholder",{attrs:{type:"image",text:"Browse Media"}})],1)],2)])],1),s("div",{staticClass:"col-12"},[s("b-field",{staticClass:"field-group"},[s("b-input",{attrs:{type:"text",size:"is-medium",placeholder:"Title"},model:{value:t.mainFieldPost.title,callback:function(e){t.$set(t.mainFieldPost,"title",e)},expression:"mainFieldPost.title"}})],1)],1),s("div",{staticClass:"col-12"},[s("b-field",{staticClass:"field-group"},[s("b-input",{attrs:{type:"textarea",rows:"2",placeholder:"Excerpt"},model:{value:t.mainFieldPost.excerpt,callback:function(e){t.$set(t.mainFieldPost,"excerpt",e)},expression:"mainFieldPost.excerpt"}})],1)],1)])])]),s("div",{staticClass:"card--block"},[t._m(0),s("div",{staticClass:"card--content"},[s("vue-editor",{model:{value:t.mainFieldPost.content,callback:function(e){t.$set(t.mainFieldPost,"content",e)},expression:"mainFieldPost.content"}})],1)])])},I=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card-header"},[s("p",{staticClass:"card-header-title "},[t._v("\n                Event Content\n            ")])])}],w=s("cebc"),F=s("2f62"),x=s("21b8"),y={props:["post"],data:function(){return{title:"",mediaItemPreview:{image:""},mainFieldPost:{title:"",excerpt:"",media:"",content:""},toolbarEditor:[[{align:""},{align:"center"},{align:"right"},{align:"justify"}],["bold","italic","underline"],[{list:"ordered"},{list:"bullet"},{header:[1,2,3,!1]}],["link"]]}},created:function(){this.resetData(),this.$emit("setDataFromChild",this.mainFieldPost)},components:{VueEditor:x["VueEditor"]},watch:{mainFieldPost:{handler:function(){this.sentDataToParent()},deep:!0},mainArticlePhoto:function(){this.mediaItemPreview=this.mainArticlePhoto,this.mainFieldPost.media=this.mainArticlePhoto.id},post:function(){this.post&&(this.mainFieldPost.title=this.post.title,this.mainFieldPost.excerpt=this.post.excerpt,this.mainFieldPost.content=this.post.content,this.post.media&&(this.mediaItemPreview=this.post.media))}},methods:{openModalMedia:function(t){this.$store.commit("openMediaImageAndVideo",t)},sentDataToParent:function(){this.$emit("setDataFromChild",this.mainFieldPost)},resetData:function(){this.$store.commit("resetPostData")}},computed:Object(w["a"])({},Object(F["c"])({mainArticlePhoto:function(t){return t.media.mainArticlePhoto}}))},P=y,k=Object(v["a"])(P,C,I,!1,null,null,null),_=k.exports,D=p["a"].get("events"),$={name:"postForm",data:function(){return{breadcrumb:[{link:"/events",label:"events"},{link:"",label:"add & update  event"}],postInfo:{},postMainField:{},postMainFieldData:{},allCards:[],cardContent:[],isLoading:!1,post:{}}},components:{PostInfo:b,MainFieldPost:_},created:function(){this.$route.params.id&&this.getEvent(this.$route.params.id)},watch:{},methods:{setDataFromPostInfo:function(t){this.postInfo=t},setDataFromMainField:function(t){this.postMainField=t},setDataFromCardsContent:function(t){this.allCards=t},submitForm:function(){this.isLoading=!1;var t={};t.title=this.postMainField.title,t.excerpt=this.postMainField.excerpt,this.postMainField.media&&(t.media=this.postMainField.media),t.content=this.postMainField.content,t.status=this.postInfo.status,t.tags=this.postInfo.tags,t.categories=this.postInfo.categories,t.published_at=this.postInfo.published_at,t.scheduled_at=this.postInfo.eventDate,t.price=this.postInfo.price,t.address=this.postInfo.address,t.map=this.postInfo.map,t.type=this.postInfo.type,"free"===t.type&&(t.price=""),this.isLoading=!0,this.$route.params.id?this.updateEvent(this.$route.params.id,t):this.newEvent(t)},newEvent:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,D.newEvent(e);case 2:s=t.sent,s.success?(this.successMessage(s.message),this.$router.push("/eventForm/"+s.data)):this.errorMessage(s[0]),this.isLoading=!1;case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),getEvent:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,D.getEvent(e);case 2:s=t.sent,this.post=s;case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),updateEvent:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e,s){var i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,D.updateEvent(e,s);case 2:i=t.sent,i.success?this.successMessage(i.message):this.errorMessage(i[0]),this.isLoading=!1;case 5:case"end":return t.stop()}},t,this)}));function e(e,s){return t.apply(this,arguments)}return e}(),errorMessage:function(t){this.$snackbar.open({message:t,type:"is-danger",position:"is-bottom-right",actionText:"OK",queue:!1,duration:1e4,indefinite:!1})},successMessage:function(t){this.$snackbar.open({message:t,type:"is-success",position:"is-bottom-right",actionText:"OK",queue:!1,duration:1e4,indefinite:!1})}}},M=$,T=Object(v["a"])(M,i,a,!1,null,null,null);e["default"]=T.exports}}]);
//# sourceMappingURL=chunk-2d0e944b.56b387ea.js.map