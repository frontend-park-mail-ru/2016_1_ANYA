define(function(require) {
    QUnit.module('models/scores');

    QUnit.test('Scores collection is ordered!', function () {
        var scores = require('../collections/scores').toJSON(),
            scoresSorted = _.sortBy(scores, function (model) {
                return -model.score;
            });

        QUnit.ok(_.isEqual(scores, scoresSorted), 'Returned array is sorted');
    });
});
