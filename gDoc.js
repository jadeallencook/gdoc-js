/*!
 * gDoc v1.0.0 (http://jadeallencook.com/gDoc.js)
 * Copyright 2016-2016 Jade Allen Cook
 * Licensed under the MIT license
 * Built using Tabletop.js
 */

window.gDoc = function (data, sheet) {
    
    var build = {
        // build complete sheet
        layout: function () {
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
                // convert to array and get key/values
                var keys = Object.keys(obj);
                var values = Object.keys(obj).map(function (key) {
                    return obj[key]
                });
                // loop through columns in gDoc
                for (var i = 0; i < keys.length; i++) {
                    // if the column has special selector
                    if (keys[i].indexOf(':') > -1) {
                        // split attribute and element
                        var attribute = keys[i].substr(keys[i].indexOf(':') + 1);
                        var element = keys[i].substr(0, keys[i].indexOf(':'));
                        element = document.querySelector('[gDoc="' + element + '"]');
                        element.setAttribute(attribute, values[i]);
                    } else {
                        // get elements that have gDocs set to column names
                        var element = document.querySelector('[gDoc="' + keys[i] + '"]');
                        // insert value into element
                        element.innerHTML = values[i];
                    }
                }
            }
            // calling spreadsheet
            tabletop(data);
        },
        // build block of html
        block: function () {
            // start cache
            var id = data.id;
            var array = data.data;
            var html = data.html;
            var public = data.public;
        }
    };

    // layout and block switch - based on var data 
    if (typeof (data) === 'object') build.block();
    else build.layout();
    
};