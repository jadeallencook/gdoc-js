/*!
 * gDoc.js v2.0.1 (https://github.com/jadeallencook/gDoc)
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
            var html = data.html();
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
            // get element to insert html into
            element = document.querySelector('[gDoc="' + element + '"]');
            // append html to element
            element.insertAdjacentHTML('beforeend', html);
        },
        // insert form inputs and connect to spreadsheet
        connect: function () {
            // caching variables
            var url = 'https://docs.google.com/forms/d/e/' + data.id + '/viewform';
            var $app = $('#' + data.appendTo);
            // cross origin patch written by stackoverflow user otaxige_aol
            jQuery.ajax = (function (_ajax) {
                // creating protocol for cross origin 
                var protocol = location.protocol,
                    hostname = location.hostname,
                    exRegex = RegExp(protocol + '//' + hostname),
                    YQL = 'http' + (/^https/.test(protocol) ? 's' : '') + '://query.yahooapis.com/v1/public/yql?callback=?',
                    query = 'select * from html where url="{URL}" and xpath="*"';
                // external url check
                function isExternal(url) {
                    return !exRegex.test(url) && /:\/\//.test(url);
                }
                return function (o) {
                    var url = o.url;
                    if (/get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url)) {
                        // manipulate options so that JSONP-x request is made to YQL
                        o.url = YQL;
                        o.dataType = 'json';
                        o.data = {
                            q: query.replace(
                                '{URL}',
                                url + (o.data ?
                                    (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data) : '')
                            ),
                            format: 'xml'
                        };
                        // since it's a JSONP request
                        // complete === success
                        if (!o.success && o.complete) {
                            o.success = o.complete;
                            delete o.complete;
                        }
                        o.success = (function (_success) {
                            return function (data) {
                                if (_success) {
                                    // Fake XHR callback.
                                    _success.call(this, {
                                        responseText: data.results[0]
                                            // YQL screws with <script>s
                                            // Get rid of them
                                            .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                                    }, 'success');
                                }
                            };
                        })(o.success);
                    }
                    return _ajax.apply(this, arguments);
                };
            })(jQuery.ajax);
            // emptying form
            $app.empty();
            // inserting preloader
            if (data.preloader !== undefined) $app.append('<img class="gDoc-preloader-' + data.id + '" width="50px" src="' + data.preloader + '" />');
            else $app.append('<span class="gDoc-preloader-' + data.id + '">Loading Form...<span>');
            // google form ajax request
            $.ajax({
                url: url,
                type: 'GET',
                success: function (res) {
                    // caching response
                    var formHTML = new String();
                    var response = new Object();
                    var formAction = $(res.responseText).find('form').attr('action');
                    var $inputs = $(res.responseText).find('input[type="text"]');
                    var $preloader = $('.gDoc-proloader-' + data.id);
                    // set success message
                    if (typeof (data.successMsg) === 'string') var successMsg = data.successMsg;
                    else var successMsg = 'Success';
                    // set submit button value if set
                    if (typeof (data.submitValue) === 'string') var submitText = data.submitValue;
                    else var submitText = 'Submit';
                    // build form html from response
                    $inputs.each(function () {
                        formHTML += '<input type="text" ';
                        formHTML += 'name="' + $(this).attr('name') + '" ';
                        formHTML += 'placeholder="' + $(this).attr('aria-label') + '" ';
                        if ($(this).attr('required') === 'required') formHTML += 'required'
                        formHTML += '/>';
                        response[$(this).attr('name')] = new String();
                    });
                    formHTML += '<input type="submit" value="' + submitText + '" />';
                    // removing preloader and appending form
                    $app.empty().append(formHTML);
                    // ajax for when form is submitted
                    $app.submit(function (event) {
                        event.preventDefault();
                        // assigning response keys
                        $inputs = $app.find('input[type="text"]');
                        for (var i = 0, max = ($inputs.length - 1); i <= max; i++) {
                            var input = $($inputs[i]);
                            response[input.attr('name')] = input.val();
                        }
                        // posting response to form
                        $.ajax({
                            url: 'https://docs.google.com/forms/d/e/' + data.id + '/formResponse',
                            data: response,
                            type: 'POST',
                            dataType: 'json',
                            error: function () {
                                // getting XMLHttpRequest error but everything still goes though... 
                                console.log('XMLHttpRequest error will appear, this is nothing to worry about.');
                                $app.empty().append('<span class="gdoc-success">' + successMsg + '</span>');
                            },
                            success: function () {
                                // just incase it returns as success
                                $app.empty().append('<span class="gdoc-success">' + successMsg + '</span>');
                            }
                        });
                    });
                }
            });
        }
    };
    // init connection based off of data being passed
    if (typeof (data) === 'object') {
        // check if connection or block object
        if (data.connect === true) build.connect();
        else build.block();
    } else {
        build.layout();
    }
};