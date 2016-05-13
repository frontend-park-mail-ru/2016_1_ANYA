define([], function () {
    var utils = {
        throttle: function (fn, threshhold, scope) {
            if (!threshhold) {
                threshhold = 250;
            }
            if (!scope) {
                scope = this;
            }
            var last,
                deferTimer;
            return function () {
                var context = scope;

                var now = +new Date,
                args = arguments;
                if (last && now < last + threshhold) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        },
    }

    return utils;
});
