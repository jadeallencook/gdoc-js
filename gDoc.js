/*!
 * gDoc.js v2.0.1 (https://github.com/jadeallencook/gDoc)
 * Copyright 2016-2021 @jadeallencook & @claytonleonardcook
 * Licensed under the MIT license
 */

class gDoc {
    constructor() {
        var id = '1cfW7dwJkwJq7rqTsftNy3wjCJR3-yDylc5MRmsc0Yw8';
        var url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv`;

        fetch(url).then(response => response.text()).then(data => {
            let [keys, values] = data.split('\n');
            keys = keys.split(',');
            values = values.split(',');
            const json = {};
            for (let index = 0, max = keys.length; index < max; index++) {
                const key = keys[index];
                const value = values[index];
                json[key] = value;
            }
            console.log(json);
        });
    }
}