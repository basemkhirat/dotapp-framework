import usersRepository from "./usersRepository";
import groupsRepository from "./groupsRepository";
import permissionsRepository from "./permissionsRepository";
import mediaRepository from "./mediaRepository";

const repositories = {
    users: usersRepository,
    groups: groupsRepository,
    permissions: permissionsRepository,
    media: mediaRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
