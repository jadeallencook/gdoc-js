/*!
 * gDoc v1.0.1 (http://jadeallencook.com/gDoc.js)
 * Copyright 2016-2016 Jade Allen Cook
 * Licensed under the MIT license
 * Built using Tabletop.js
 */

// attaching function to window
window.gDoc = function (data, sheet) {
    // caching build functions
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
            var public = data.public;
            var sheet = data.sheet;
            var element = data.gDoc;
            var columns = data.columns;
            var loops = data.loop;
            // insert values into html function
            var html = data.html('test', 'test');
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
                obj = obj[sheet].elements;
                // loop through gDoc array and then build html
                if (loops == false)
                    for (var i = 0; i < obj.length; i++) build.html(obj, i, element, html, columns);
                else
                    for (var i = 0; i < loops; i++) build.html(obj, i, element, html, columns);
            }
            // calling spreadsheet
            tabletop(public);
        },
        // for loop block build
        html: function (obj, count, element, html, columns) {
            // grab sheet
            obj = obj[count];
            // loop through columns to get selectors
            for (var i = 0; i < columns.length; i++) {
                // cache values for html build
                var column = columns[i];
                var value = obj[column];
                // replace mustaches with values
                html = html.replace('{{' + column + '}}', value);
            }
            // get element to insert html
            element = document.querySelector('[gDoc="' + element + '"]');
            // append html to element
            element.insertAdjacentHTML('beforeend', html);
        }
    };
    // layout and block switch - based on var data 
    if (typeof (data) === 'object') build.block();
    else build.layout();
};