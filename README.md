# gDoc.js v1.0.1

Use Google Spreadsheets as your CMS!

# Getting Started

Create a Google Spreadsheet containing all the information you will need for your site. After, choose 'Publish to the web...' in the 'File' menu. Then grab the id in the link.

```html
    https://docs.google.com/spreadsheets/d/yourPublicId/pubhtml
```

__Example spreadsheet__

| title       | header   | subheader           |
| ----------- |:--------:| -------------------:|
| My Website  | Welcome, | This is my website! |

Inside of your HTML document include these two files into your head.

```html
    <head>
        <script src="tabletop.js"></script>
        <script src="gDoc.js"></script>
    </head>
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
        // caching the public id 
        var public = '1cfW7dwJkwJq7rqTsftNy3wjCJR3-yDylc5MRmsc0Yw8';
        // initiating connection
        gDoc(public, 'layout');
    </script>
```

All that's left now is to add gDoc attributes to your html!

__How to insert from example spreadsheet above.__

```html 
    <html>
        <head>
            <title gDoc="title"></title>
        </head>
        <body>
            <h1 gDoc="header"></h1>
            <h2 gDoc="subheader"></h2>
        </body>
    </html>
```

And it's that easy!