var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"
  },
  useNullAsDefault: true
});
var bookshelf = require('bookshelf')(knex);

exports.User = bookshelf.Model.extend({
  tableName: 'users'
});

exports.init = Promise.resolve().then(function () {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments();
    table.string('name');
    table.string('key');
    table.timestamps();
  });
}).then(function () {
  var demoUser = new exports.User({
    id: 1,
    name: 'admin',
    key: 'password'
  });
  return demoUser.save();
});
