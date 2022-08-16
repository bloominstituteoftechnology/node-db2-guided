
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('fruits').del()
  await knex('fruits').insert([
    { name: 'apple', color: 'red', delicious: true, avgWeightOz: 10},
    { name: 'banana', color: 'yellow', delicious: true, avgWeightOz: 10},
  ]);
};
