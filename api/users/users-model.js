const db = require('../../data/dbConfig.js')

function find() {
    return db("users")
        .select("users.id", "users.username")
}

function findBy(filter) {
    return db("users")
        .select("users.id", "users.username", "users.password")
        .where(filter)
}

function findById(id) {
    return db("users")
        .select("users.id", "users.username", "users.password")
        .where("users.id", id)
}

async function add(user) {
    const [id] = await db("users").insert(user)
    return findById(id)
}

module.exports = {
    add,
    find,
    findBy,
    findById
}