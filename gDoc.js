/*!
 * gDoc v1.0.0 (http://jadeallencook.com/gDoc.js)
 * Copyright 2016-2016 Jade Allen Cook
 * Licensed under the MIT license
 * Built using Tabletop.js
 */

window.gDoc = function (data, sheet) {
    if (typeof (data) === 'object') {
        // start cache
        var id = data.id;
        var array = data.data;
        var html = data.html;
        return false;
    } else {
        // using tabletop to get gDoc
        function tabletop(doc) {
            Tabletop.init({
                key: doc,
                callback: insertDoc,
                simpleSheet: false
            });
        }
        // inserting gDoc data
        function insertDoc(obj) {
            // grab sheet
            obj = obj[sheet].elements[0];
            // convert to array
            obj = Object.keys(obj).map(function (key) {
                return obj[key]
            });
        }
        // calling spreadsheet
        tabletop(data);
    }
};