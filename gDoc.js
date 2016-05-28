/*!
 * gDoc v1.0.0 (http://jadeallencook.com/gDoc.js)
 * Copyright 2016-2016 Jade Allen Cook
 * Licensed under the MIT license
 * Built using Tabletop.js
 */

window.gDoc = function (data, column) {
    if (typeof(data) === 'object') {
        // start cache
        var selector = data.selector;
        var gData = data.column;
        var html = data.html;
    } else {
        // start cache
        var selector = data;
        var gData = data.column;
    }
};