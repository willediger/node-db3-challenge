const db = require("../data/dbConfig.js");

module.exports = {
  find: function() {
    return db("schemes");
  },
  findById: function(id) {
    return db("schemes")
      .where("id", id)
      .first();
  },
  findSteps: function(id) {
    return db("schemes as sch")
      .join("steps as st", "sch.id", "st.scheme_id")
      .select("st.id", "sch.scheme_name", "st.step_number", "st.instructions")
      .where("sch.id", id)
      .orderBy("st.step_number");
  },
  insert: function(scheme) {
    return db("schemes")
      .insert(scheme)
      .then(([id]) => this.findById(id));
  },
  update: function(changes, id) {
    return db("schemes")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? this.findById(id) : null));
  },
  remove: function(id) {
    return db("schemes")
      .where("id", id)
      .del();
  },
  addStep: function(step, scheme_id) {
    const newStep = { ...step, scheme_id };
    return db("steps")
      .insert(newStep)
      .then(([id]) => this.findStepById(id));
  },
  findStepById: function(id) {
    return db("steps")
      .where("id", id)
      .first();
  }
};
