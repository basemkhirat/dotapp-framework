import usersRepository from "./usersRepository";

const repositories = {
    users: usersRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
