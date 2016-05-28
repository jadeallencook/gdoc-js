window.onload = function() {
    // single insert
    gDoc('#app', 'test')
    // template insert
    gDoc({
        selector: '#app',
        column: ['title', 'link'],
        html: function() {
            var html = '<a href="{{link}}">{{title}}</a>';
            return html;
        }
    });
};