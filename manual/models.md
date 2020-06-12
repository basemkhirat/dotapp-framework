# Models

Models are data handlers file created in `models` directory.

Our models are built on `mongoose ORM` and use mongodb.

let's create `models/post.js`.

```javascript
// models/post.js

import { Schema, Model } from "dotapp/model";

const schema = Schema({
    title: {
        type: String,
    },
    status: {
        type: Number,
        default: 1,
    },
});

// create mongodb normal index if wanted
schema.index({ status: 1 });

// create mongodb text index if wanted
schema.index({ email: "text" });

export default Model("post", schema, "post");
```

Now, you can use it everywhere in your application.

``` javascript

import Post from '~/models/post';

// Find all posts in database

let posts = await Post.find();

// Save a new user

let post = new Post();
post.title = "A new nodejs framework released";
await post.save();

```

Reference: https://mongoosejs.com/
