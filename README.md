# gDoc.js v2.0.1

Use Google Spreadsheets as your CMS!

# Getting Started

Create a Google Spreadsheet containing all the information you will need for your site. After, choose 'Publish to the web...' in the 'File' menu. Then grab the id in the link.

https://docs.google.com/spreadsheets/d/__yourPublicId__/pubhtml

Inside of your HTML document include these two files.

```html
<script src="tabletop.js"></script>
<script src="gDoc.js"></script>
```

__Or just this file__

```html
<script src="gDoc.min.js"></script>
```

Now at the footer of your html page initiate the connection! 

__By default the sheetName is 'Sheet1'__

```html
<script>
    gDoc(yourPublicId, sheetName);
</script>
```

__Example connection__

```html
<script>
    // initiating connection
    gDoc('1cfW7dwJkwJq7rqTsftNy3wjCJR3-yDylc5MRmsc0Yw8', 'layout');
</script>
```

All that's left now is to add gDoc attributes to your html!

__Example spreadsheet__

| title               | header              | subheader           |
| ------------------- |:-------------------:| -------------------:|
| My website          | Welcome,            | This is my website! |

__How to insert from example spreadsheet above.__

```html 
<html>
    <head>
        <title gDoc="title"></title>
        <script src="tabletop.js"></script>
        <script src="gDoc.js"></script>
    </head>
    <body>
        <h1 gDoc="header"></h1>
        <h2 gDoc="subheader"></h2>
    </body>
    <footer>
        <script>
            gDoc(yourPublicId, sheetName);
        </script>               
    </footer>
</html>
```

And it's that easy!

# Setting Parameters

You might want to use gDoc to set link hrefs, img srcs, and set styles. 

__Here's a quick example of how you would make a red link__

| my-link             | my-link:href        | my-link:style       |
| ------------------- |:-------------------:| -------------------:|
| Example             | www.mylink.com      | color: red          |


```html 
<a gDoc="my-link"></a>
```

# Advanced Blocks (Store & Blog)

To iterate over a block of html simply just pass gDoc an object {}.

__Let's say you want to export your 4 most recent blog posts__

```javascript 
gDoc({
    public: yourPublicId,
    sheet: 'blog',
    gDoc: 'blog-section',
    columns: ['title', 'body', 'link'],
    loop: 4,
    html: function() {
        var html = '<a href="{{link}}">';
        html += '<h1>{{title}}</h1>';
        html += '<p>{{body}}</p>';
        html += '</a>';
        return html;
    }
});
```

The loop key can be set to __false__ to iterate over all items in the document. _Make sure you instantiate all your variables in the 'columns' array, otherwise they won't show up in the mustache syntax._ 

# Sending Data To Spreedsheet

__The "connect" functionality uses AJAX, make sure jQuery is installed!__

Create a Google Form by visiting _forms.google.com_ and then press share to get the id.

https://docs.google.com/forms/d/e/__yourFormId__/viewform

Create a blank form that will hold your inputs.

```html
<form id="example-form"></form>
```

In the footer, pass gDoc.js an object with these parameters.

```javascript 
gDoc({
    connect: true,
    id: yourFormId,
    appendTo: 'example-form'
});
```

That's it, all of your inputs are automatically inserted!

When submitted, the responses will be sent to the form, and your can export to spreedsheet from there.

Additionally you can add some optional parameters - 

```javascript 
gDoc({
    connect: true,
    id: yourFormId,
    appendTo: 'example-form',
    submitValue: 'Submit Form', // submit button text
    successMsg: 'It worked!', // success message after submit
    preloader: 'loading.gif' // img to show while form is loading
});
```

__As of right now, gDoc will only insert "text" inputs.__

# Custom Form CSS

Here is an example of how we would modify the above form's CSS.

```css
    form#my-form input {
        display: block;
        margin: 5px auto;
        padding: 5px;
        border-radius: 3px;
        border: #ddd solid thin;
    }
    form#my-form input[type="submit"] {
        background-color: dodgerblue;
        color: #fff;
        border: none;
        border-radius: 3px;
    }
```

Enjoy!