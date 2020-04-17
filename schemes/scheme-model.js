const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep,
};

function find() {
    return db('schemes');
};

function findById(id) {
    return db('schemes').where({ id }).first();
};

function findSteps(id) {
    return db('schemes')
        .join('steps', 'schemes.id', '=', 'steps.scheme_id')
        .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where({ 'schemes.id': id })
}

function add(scheme) {
    return db('schemes')
    .insert(scheme, "id")
    .then(([id]) => {
        return findById(id)
    })
};

function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id);
        })
};

function remove(id) {
    return db('schemes')
        .where({ id })
        .del();
};

function addStep(step, scheme_id) {
    const newStep = {
        ...step,
        scheme_id
    }
    return db('steps')
        .insert(newStep)
        .then(id => db('steps')
        .where({ id: id[0] }))
};