import Vue from "vue";
import Router from "vue-router";
import Wrapper from "./Wrapper";
import AuthPages from "./views/pages/AuthPages";

Vue.use(Router);

function isIModuleHasPermissions(userPermissions, role) {
    for (var key in userPermissions) {
        if (userPermissions[key] === role) {
            return true;
        }
    }
    return false;
}

function routerGuard(to, from, next) {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData) {
        if (userData.status === 0) {
            return next("/login");
        }
        if (to.meta.role) {
            if (isIModuleHasPermissions(userData.permissions, to.meta.role)) {
                return next();
            }
            return next("/notAuthorized");
        } else {
            return next();
        }
    }
}

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/authPages",
            component: AuthPages,
            children: [{
                    path: "/login",
                    name: "login",
                    component: () => import("./views/pages/Login.vue")
                },
                {
                    path: "/forgotPassword",
                    name: "forgotPassword",
                    component: () => import("./views/pages/forgotPassword.vue")
                },
            ]
        },
        {
            path: "/",
            component: Wrapper,
            beforeEnter: routerGuard,
            redirect: "/",
            children: [{
                    path: "",
                    name: "dashboard",
                    component: () => import("./views/dashboard/Dashboard"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/users",
                    name: "users",
                    component: () => import("./views/users/Users.vue"),
                    meta: {
                        role: "user.view"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/userForm/:id?",
                    name: "userForm",
                    props: true,
                    component: () => import("./views/users/Form.vue"),
                    meta: {
                        role: "user.update"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/myProfile",
                    name: "myProfile",
                    props: true,
                    component: () => import("./views/pages/MyProfile.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/groups",
                    name: "groups",
                    component: () => import("./views/groups/Groups.vue"),
                    meta: {
                        role: "role.view"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/groupForm/:id?",
                    name: "groupForm",
                    component: () => import("./views/groups/Form.vue"),
                    meta: {
                        role: "role.update"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/media",
                    name: "media",
                    component: () => import("./views/media/Media.vue"),
                    // meta: {
                    //     role: "media.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/posts",
                    name: "posts",
                    component: () => import("./views/posts/Posts.vue"),
                    // meta: {
                    //     role: 'post.view'
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/postForm/:id?",
                    name: "postForm",
                    component: () => import("./views/posts/Form.vue"),
                    meta: {
                        role: 'post.update'
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/articles",
                    name: "articles",
                    component: () => import("./views/articles/Articles.vue"),
                    // meta: {
                    //     role: 'post.view'
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/articleForm/:id?",
                    name: "articleForm",
                    component: () => import("./views/articles/Form.vue"),
                    meta: {
                        role: 'post.update'
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/categories/:id?",
                    name: "categories",
                    component: () =>
                        import("./views/categories/Categories.vue"),
                    // meta: {
                    //     role: "category.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/categoryForm/:id?",
                    name: "categoryForm",
                    component: () => import("./views/categories/Form.vue"),
                    meta: {
                        role: "category.update"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/tags",
                    name: "tags",
                    component: () => import("./views/tags/Tags.vue"),
                    // meta: {
                    //     role: "tag.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/tagForm/:id?",
                    name: "tagForm",
                    component: () => import("./views/tags/Form.vue"),
                    meta: {
                        role: "tag.update"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/authors",
                    name: "authors",
                    component: () =>
                        import("./views/authors/Authors.vue"),
                    // meta: {
                    //     role: "author.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/authorForm/:id?",
                    name: "authorForm",
                    component: () => import("./views/authors/Form.vue"),
                    meta: {
                        role: "author.manage"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/pages",
                    name: "pages",
                    component: () => import("./views/page/pages.vue"),
                    // meta: {
                    //     role: 'page.view'
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/pageForm/:id?",
                    name: "pageForm",
                    component: () => import("./views/page/Form.vue"),
                    meta: {
                        role: 'page.update'
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/notAuthorized",
                    name: "notAuthorized",
                    component: () => import("./views/pages/NotAuthorized.vue")
                },
                {
                    path: "/events",
                    name: "events",
                    component: () => import("./views/events/Events.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/eventForm/:id?",
                    name: "eventForm",
                    component: () => import("./views/events/Form.vue"),
                    meta: {
                        role: "event.manage"
                    },
                    beforeEnter: routerGuard
                },
            ]
        }
    ],
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        };
    }
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/login", "/forgotPassword"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("token");
    if (to.path == "/login" && loggedIn) {
        router.push({
            path: "/"
        });
    }
    if (authRequired && !loggedIn) {
        return next({
            path: '/login',
            // query: { returnUrl: to.path }
        });
    }

    next();
});

export default router;
