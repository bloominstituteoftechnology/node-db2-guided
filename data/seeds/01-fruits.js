
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('fruits').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('fruits').insert([
        { name: 'dragon fruit', aveWeightOz: 16.7, delicious: true, color: 'red' },
        { name: 'durian', aveWeightOz: 52.9, delicious: false, color: 'yellow' },
        { name: 'rambutan', aveWeightOz: 1.1, delicious: true, color: 'pink' },
        { name: 'lingonberry', aveWeightOz: 0.01, delicious: true, color: 'red' },
        { name: 'golden gooseberries', aveWeightOz: 0.02, delicious: false, color: 'yellow' }
      ]);
    });
};
