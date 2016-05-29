# gDoc.js v1.0.1

Use Google Spreadsheets as your CMS!

# Getting Started

Create a Google Spreadsheet containing all the information you will need for the site. After you're done, go to choose 'Publish to the web...' in the 'File' menu. After you publish the document, grab the id in the link 'https://docs.google.com/spreadsheets/d/yourPublicId/pubhtml'.

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

_By default the sheetName is 'Sheet1'_

```html
    <script>
        gDoc(yourPublicId, sheetName);
    </script>
```

_Example of a connection_

```html
    <script>
        // caching the public id 
        var public = '1cfW7dwJkwJq7rqTsftNy3wjCJR3-yDylc5MRmsc0Yw8';
        // initiating connection
        gDoc(public, 'layout');
    </script>
```

All that's left now is to add gDoc attributes to your html!

_How to insert from example spreadsheet above._

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