var records = [
    { id: 1, username: 'alicew', password: 'password', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'bobs', password: 'password', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
  , { id: 3, username: 'carolc', password: 'password', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
  , { id: 4, username: 'mali', password: 'password', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
