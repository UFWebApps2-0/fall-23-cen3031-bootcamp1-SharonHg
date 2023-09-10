var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  /*Investigate the request object. 
    You will need to use several of its properties: url and method
  */
  var parsedUrl = url.parse(request.url); 
  //console.log(request.method);
  if(request.method !='GET' || parsedUrl.pathname != '/listings' )
	{
	    response.writeHead(404,"Not Found");
	    response.write("Bad gateway error");
	    response.end();
    }
    else
    {
        //console.log("listings");
        response.writeHead(200, { 'Content-Type': 'text/html' });
	//response.writeHead(200, { 'Content-Type': 'application/json' });
        //console.log("writehead End");
        response.end(JSON.stringify(listingData));
    }

  /*
    Your request handler should send listingData in the JSON format as a response if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: Explore the request object and its properties 
    HINT: Explore the response object and its properties
    https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
    
    HINT: Explore how callback's work 
    http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4
    
    HINT: Explore the list of MIME Types
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
   
    HINT: Explore mdn web docs for resources on how to use javascript.
    Helpful example: if-else structure- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
    */
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 

    HINT: Check out this resource on fs.readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

    HINT: Read up on JSON parsing Node.js
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

    //Check for errors
    /*this resource gives you an idea of the general format err objects and Throwing an existing object.
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw#throwing_an_existing_object
   */
   if(err) //ppt says that we don't have to worry about error handling now. err is enough.
   {
       throw err;
   }
   

   //Save the data in the listingData variable already defined
   listingData = JSON.parse(data);
  

  //Creates the server
  server = http.createServer(requestHandler);
  
  //Start the server
  server.listen(port, function() 
        {
            console.log('Server listening on: http://127.0.0.1:' + port);
        }
    );
});
