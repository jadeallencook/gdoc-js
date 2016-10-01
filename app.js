window.onload = function () {
    // for cms
    gDoc('1cfW7dwJkwJq7rqTsftNy3wjCJR3-yDylc5MRmsc0Yw8', 'layout');
    // for database
    gDoc({
        connect: true,
        id: '1FAIpQLSdegl68Zno-JNLbt2UH0lDLNJuRkTpOfJGIh3RfQI7y5yz8qw',
        appendTo: 'my-form',
        submitValue: 'Submit Form',
        successMsg: 'It worked!',
        preloader: 'http://www.androidpolice.com/wp-content/uploads/2014/10/nexus2cee_gif.gif'
    });
};