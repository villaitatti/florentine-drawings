require 'rest-client'
require 'json'
require 'pp'

triples = {}
objects = {}

query = "
  Select * WhERE {

    GRAPH <http://data.itatti.harvard.edu/florentinedrawings/berenson1938>{
        ?s ?p ?o
      }
  }

"
endpoint = 'http://192.168.1.129:9999/blazegraph/namespace/florentinedrawings/sparql/'

puts "POSTing SPARQL query to #{endpoint}"

response = RestClient::Request.new(
   :method => "post",
   :url => endpoint,
   :payload => {:query => query},
   :headers => { :accept => :json}
).execute

response = JSON.parse(response)

response['results']['bindings'].each do |triple|
	subject = triple['s']['value']
	predicate = triple['p']['value']
	object = triple['o']['value']
	if not triples.key?(subject)
		triples[subject] = []
	end
	triples[subject] << {:p => predicate, :o => object}
end

# make an hash for each record, find the core uri
triples.keys().each do |key|
	triples[key].each do |aTriple|
		if aTriple[:p] == 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' and aTriple[:o] == 'http://www.cidoc-crm.org/cidoc-crm/E22_Man-Made_Object'
			if not key.include? '/recto' and not key.include? '/verso'

				objects[key] = {
					:id => key,
					:bcn => nil,
					:title_verso => nil,
					:title_recto => nil,
					:id_verso => nil,
					:id_recto => nil,
					:note_verso => nil,
					:note_recto => nil,
					:figures_verso => [],
					:figures_recto => [],
					:creator_carried_out_by => [],
					:creator_attributed_to => [],
					:creator_school_of => [],
					:creator_imitator_of => [],
					:creator_dc => [],
					:creator_all => []
				}

			end
		end
	end
end

objects.keys().each do |key|


	triples[key].each do |predicateObject|
		# find the bernson id
		if predicateObject[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P1_is_identified_by'
			triples[predicateObject[:o]].each do |idTriple|
				if idTriple[:p] == 'http://www.w3.org/2000/01/rdf-schema#label'
					objects[key][:bcn] = idTriple[:o]
				end
			end

		end

		# find the producer
		if predicateObject[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by'

			triples[predicateObject[:o]].each do |st|
				if st[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by'
					objects[key][:creator_carried_out_by] << st[:o]
					if !objects[key][:creator_all].include? st[:o];  objects[key][:creator_all] << st[:o] end
				elsif st[:p] == 'http://data.itatti.harvard.edu/florentinedrawings/ontologies/attributed_to'
					objects[key][:creator_attributed_to] << st[:o]
					if !objects[key][:creator_all].include? st[:o]; objects[key][:creator_all] << st[:o] end
				elsif st[:p] == 'http://data.itatti.harvard.edu/florentinedrawings/ontologies/carried_out_by_school_of'
					objects[key][:creator_school_of] << st[:o]
					if !objects[key][:creator_all].include? st[:o]; objects[key][:creator_all] << st[:o] end
				elsif st[:p] == 'http://data.itatti.harvard.edu/florentinedrawings/ontologies/carried_out_by_imitator_of'
					objects[key][:creator_imitator_of] << st[:o]
					if !objects[key][:creator_all].include? st[:o]; objects[key][:creator_all] << st[:o] end
				end
			end
		end

		# less specific creator
		if predicateObject[:p] == 'http://purl.org/dc/terms/creator'
			objects[key][:creator_dc] << predicateObject[:o]
			if !objects[key][:creator_all].include? predicateObject[:o];  objects[key][:creator_all] << predicateObject[:o] end
		end


		# find the two titles
		if predicateObject[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of'
			# the recto verso id
			if predicateObject[:o].include? '/recto'
				objects[key][:id_recto] = predicateObject[:o]
			else
				objects[key][:id_verso] = predicateObject[:o]
			end
			# get the title
			triples[predicateObject[:o]].each do |st|
				if st[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P102_has_title'
					triples[st[:o]].each do |titleTriple|
						if titleTriple[:p] == 'http://www.w3.org/2000/01/rdf-schema#label'
							if predicateObject[:o].include? '/recto'
								objects[key][:title_recto] = titleTriple[:o]
							else
								objects[key][:title_verso] = titleTriple[:o]
							end

						end
					end
				end
			end
			# get the figure ids
			triples[predicateObject[:o]].each do |st|
				if st[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P138i_has_representation'
					triples[st[:o]].each do |figureTriple|
						if figureTriple[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P149_is_identified_by'
							triples[figureTriple[:o]].each do |figureSubTriple|
								if figureSubTriple[:p] == 'http://www.w3.org/2000/01/rdf-schema#label'
									if predicateObject[:o].include? '/recto'
										objects[key][:figures_recto] << figureSubTriple[:o]
									else
										objects[key][:figures_verso] << figureSubTriple[:o]
									end
								end
							end
						end
					end
				end
			end
			# get the notes
			triples[predicateObject[:o]].each do |st|
				if st[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P67i_is_referred_to_by'
					triples[st[:o]].each do |noteTriple|
						if noteTriple[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P3_has_note'
							if predicateObject[:o].include? '/recto'
								objects[key][:note_recto] = noteTriple[:o]
							else
								objects[key][:note_verso] = noteTriple[:o]
							end
						end
					end
				end
			end

		end
	end
end

responses = {}
# cache all the response, make sure we have all the data
objects.keys().each do |key|
	objects[key][:creator_all].each do |uri|
		ulanId = uri.rpartition('/').last
		if !responses.keys().include? uri
			if !File.file?("cache/#{ulanId}.json")
				begin
					p "Donwloading #{uri}.json"
					response = RestClient::Request.new(
					   :method => "get",
					   :url => "#{uri}.json"
					).execute
					responses[uri] = JSON.parse(response)
					File.open("cache/#{ulanId}.json", "w") {|f| f.write(responses[uri].to_json) }
				rescue
					p "Error! #{uri}.json is not a valid URL, cannot download ulan data"
					responses[uri] = "BAD ULAN URI"
				end
			else
				responses[uri] = JSON.parse(File.read("cache/#{ulanId}.json"))
			end
		end
	end
end


objects.keys().each do |key|
	creators = []
	creatorsAdded = []

	objects[key][:creator_carried_out_by].each do |uri|
		if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => 'carried_out_by'}; creatorsAdded << uri end
	end
	objects[key][:creator_attributed_to].each do |uri|
		if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => 'attributed_to'}; creatorsAdded << uri  end
	end
	objects[key][:creator_school_of].each do |uri|
		if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => 'school_of'}; creatorsAdded << uri  end
	end
	objects[key][:creator_imitator_of].each do |uri|
		if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => 'imitator_of'}; creatorsAdded << uri  end
	end
	objects[key][:creator_dc].each do |uri|
		if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => 'creator'}; creatorsAdded << uri  end
	end

	creators.each do |creator|
		if responses.include? creator[:uri] and responses[creator[:uri]]['results']
			creator[:nameAlt] = []
			responses[creator[:uri]]['results']['bindings'].each do |triple|
				if triple['Predicate']['value'] == 'http://www.w3.org/2004/02/skos/core#prefLabel'
					creator[:name] = triple['Object']['value']
				end
				if triple['Predicate']['value'] == 'http://www.w3.org/2004/02/skos/core#altLabel'
					creator[:nameAlt] << triple['Object']['value']
				end
			end
		else
			p "Error! Could not find this uri in the catched response #{creator[:uri]}"
			creator[:name] = "Unkown literal"
		end
	end
	objects[key][:creators] = creators
end




PP.pp(objects, $>, 40)