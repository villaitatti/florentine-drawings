require 'rest-client'
require 'json'


namespace :itatti do
  desc 'Check for thumbnails and upload to s3 if they do not exist'
  task thumbs: :environment do


	endpoint = 'http://data.itatti.harvard.edu/sparql'


	query = "
	  Select * WhERE {
	    GRAPH <http://data.itatti.harvard.edu/resource/florentinedrawings/project2016>{
	        ?s ?p ?o
	      }
	  }
	"
	puts "POSTing SPARQL query to #{endpoint}"

	response = RestClient::Request.new(
	   :method => "post",
	   :url => endpoint,
	   :payload => {:query => query},
	   :headers => { :accept => :json}
	).execute

	response = JSON.parse(response)

	triples = {}

	response['results']['bindings'].each do |triple|
		subject = triple['s']['value']
		predicate = triple['p']['value']
		object = triple['o']['value']
		if not triples.key?(subject)
			triples[subject] = []
		end
		triples[subject] << {:p => predicate, :o => object}
	end


  end
end
