app.get("/hello", function(req, resp) {
	println("got it JPL");
	resp.getWriter().write("hello there");});
