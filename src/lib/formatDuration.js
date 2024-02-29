"use strict";
exports.__esModule = true;
exports.formatDuration = void 0;
function formatDuration(durationInMilliseconds) {
    var durationInMillisecondsAsNumber = parseInt(durationInMilliseconds);
    var minutes = Math.floor(durationInMillisecondsAsNumber / (1000 * 60));
    var seconds = Math.floor((durationInMillisecondsAsNumber % (1000 * 60)) / 1000);
    return "".concat(minutes, ":").concat(seconds);
}
exports.formatDuration = formatDuration;
