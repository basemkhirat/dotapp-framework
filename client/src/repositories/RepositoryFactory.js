import usersRepository from "./usersRepository";
import groupsRepository from "./groupsRepository";
import permissionsRepository from "./permissionsRepository";
import mediaRepository from "./mediaRepository";
import categoriesRepository from "./categoriesRepository";
import tagsRepository from "./tagsRepository";
import postsRepository from "./postsRepository";

const repositories = {
    users: usersRepository,
    groups: groupsRepository,
    permissions: permissionsRepository,
    media: mediaRepository,
    categories: categoriesRepository,
    tags: tagsRepository,
    posts: postsRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
