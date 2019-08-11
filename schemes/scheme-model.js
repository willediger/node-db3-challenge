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
      .orderBy("st.id");
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
  }
};
