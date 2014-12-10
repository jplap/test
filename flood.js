app.get("/flood", function(req, resp) {
	var level = req.getParameter('level');
	var arrdt = req.getParameter('arrdt');
	var dry = req.getParameter('dry');
	
	var query =
		"prefix dsM1: <http://www.3ds.com/RDF/Corpus/M1/> \
		prefix DSBuilding: <http://www.3ds.com/RDF/Corpus/M1/DSBuilding> \
		prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
		SELECT ?geom ?height ?batname ?altitude \
		WHERE { \
		?batiment dsM1:IsLocatedIn DSCity:Paris . \
		?batiment DSBuilding:geometry ?geom . \
		?batiment rdfs:label ?batname . \
		?batiment DSBuilding:height ?height . ";

	
	if (arrdt)
		query += " ?batiment DSBuilding:code_arr " + arrdt + " . ";
	
	if (dry && (dry == '1' || dry == 'true'))
		query += "{?batiment DSBuilding:altitude ?altitude . FILTER (?altitude > " + level + " )}}";
	else
		query += "{?batiment DSBuilding:altitude ?altitude . FILTER (?altitude <= " + level + " )}}";

	sparql.run(query, resp.getOutputStream());
});
