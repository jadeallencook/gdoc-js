window.onload = function() {
    // caching public 
    var public = '1cfW7dwJkwJq7rqTsftNy3wjCJR3-yDylc5MRmsc0Yw8';
    // init gDoc
    gDoc(public, 'layout');
    // template insert
    gDoc({
        public: public,
        sheet: 'links',
        id: 'links',
        data: ['title', 'link'],
        html: function() {
            var html = '<a href="{{link}}">{{title}}</a>';
            return html;
        }
    });
};