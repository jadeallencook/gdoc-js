const sheet = async (id) => !id ?
    null : await fetch(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv`)
    .then(response => response.text())
    .then(data => {
        let [keys, values] = data.split('\n');
        keys = keys.split(',');
        values = values.split(',');
        const json = {};
        for (let index = 0, max = keys.length; index < max; index++) {
            const key = keys[index];
            const value = values[index];
            json[key] = value;
        }
        return json;
    });

export default sheet;