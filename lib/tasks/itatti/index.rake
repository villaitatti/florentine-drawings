require 'rsolr'
require 'rest-client'
require 'json'
include Blacklight


namespace :itatti do
  desc 'Index the data from the SPARQL endpoint'
  task index: :environment do

  	years = ['1903','1938','1961']
  	#years = ['1961']

	endpoint = 'http://data.itatti.harvard.edu:10080/blazegraph/namespace/florentinedrawings/sparql/'
	# endpoint = 'http://192.168.1.129:9999/blazegraph/namespace/florentinedrawings/sparql/'


	p "Droping index"
 	solr = RSolr.connect :url => Blacklight.connection_config[:url]
 	solr.delete_by_query '*:*'
 	count = 0
	objects = {}
	allUris = []

  	years.each do |year|

  		objects[year] = {}
  		triples = {}

		query = "
		  Select * WhERE {

		    GRAPH <http://data.itatti.harvard.edu/florentinedrawings/berenson#{year}>{
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

						if not allUris.include? key; allUris << key end

						objects[year][key] = {
							:id => key,
							:year => [],
							:bcn => '',
							:title_verso => '--',
							:title_recto => '--',
							:id_verso => '--',
							:id_recto => '--',
							:note_verso => '--',
							:note_recto => '--',
							:figures_verso => [],
							:figures_recto => [],
							:creator_carried_out_by => [],
							:creator_attributed_to => [],
							:creator_school_of => [],
							:creator_imitator_of => [],
							:creator_dc => [],
							:creator_all => [],
							:page_number => '',
							:current_former_owner => []
						}

					end
				end
			end
		end

		objects[year].keys().each do |key|

			triples[key].each do |predicateObject|
				# find the bernson id
				if predicateObject[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P1_is_identified_by'
					triples[predicateObject[:o]].each do |idTriple|
						if idTriple[:p] == 'http://www.w3.org/2000/01/rdf-schema#label'
							objects[year][key][:bcn] = idTriple[:o]
						end
					end
				end

				# find the producer
				if predicateObject[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P108i_was_produced_by'

					triples[predicateObject[:o]].each do |st|
						if st[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P14_carried_out_by'
							objects[year][key][:creator_carried_out_by] << st[:o]
							if !objects[year][key][:creator_all].include? st[:o];  objects[year][key][:creator_all] << st[:o] end
						elsif st[:p] == 'http://data.itatti.harvard.edu/florentinedrawings/ontologies/attributed_to'
							objects[year][key][:creator_attributed_to] << st[:o]
							if !objects[year][key][:creator_all].include? st[:o]; objects[year][key][:creator_all] << st[:o] end
						elsif st[:p] == 'http://data.itatti.harvard.edu/florentinedrawings/ontologies/carried_out_by_school_of'
							objects[year][key][:creator_school_of] << st[:o]
							if !objects[year][key][:creator_all].include? st[:o]; objects[year][key][:creator_all] << st[:o] end
						elsif st[:p] == 'http://data.itatti.harvard.edu/florentinedrawings/ontologies/carried_out_by_imitator_of'
							objects[year][key][:creator_imitator_of] << st[:o]
							if !objects[year][key][:creator_all].include? st[:o]; objects[year][key][:creator_all] << st[:o] end
						end
					end
				end

				# less specific creator
				if predicateObject[:p] == 'http://purl.org/dc/terms/creator'
					objects[year][key][:creator_dc] << predicateObject[:o]
					if !objects[year][key][:creator_all].include? predicateObject[:o];  objects[year][key][:creator_all] << predicateObject[:o] end
				end

				# page
				if predicateObject[:p] == 'http://dbpedia.org/ontology/atPage'
					objects[year][key][:page_number] = predicateObject[:o]
				end

				# find the two titles
				if predicateObject[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P46_is_composed_of'
					# the recto verso id
					if predicateObject[:o].include? '/recto'
						objects[year][key][:id_recto] = predicateObject[:o]
					else
						objects[year][key][:id_verso] = predicateObject[:o]
					end
					# get the title
					triples[predicateObject[:o]].each do |st|
						if st[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P102_has_title'
							triples[st[:o]].each do |titleTriple|
								if titleTriple[:p] == 'http://www.w3.org/2000/01/rdf-schema#label'
									if predicateObject[:o].include? '/recto'
										objects[year][key][:title_recto] = titleTriple[:o]
									else
										objects[year][key][:title_verso] = titleTriple[:o]
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
												objects[year][key][:figures_recto] << figureSubTriple[:o]
											else
												objects[year][key][:figures_verso] << figureSubTriple[:o]
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
										objects[year][key][:note_recto] = noteTriple[:o]
									else
										objects[year][key][:note_verso] = noteTriple[:o]
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
		objects[year].keys().each do |key|
			objects[year][key][:creator_all].each do |uri|
				ulanId = uri.rpartition('/').last
				if !responses.keys().include? uri
					if !File.file?("lib/tasks/itatti/cache/#{ulanId}.json")
						begin
							p "Donwloading #{uri}.json"
							response = RestClient::Request.new(
							   :method => "get",
							   :url => "#{uri}.json"
							).execute
							responses[uri] = JSON.parse(response)
							File.open("lib/tasks/itatti/cache/#{ulanId}.json", "w") {|f| f.write(responses[uri].to_json) }
						rescue
							p "Error! #{uri}.json is not a valid URL, cannot download ulan data"
							responses[uri] = "BAD ULAN URI"
						end
					else
						responses[uri] = JSON.parse(File.read("lib/tasks/itatti/cache/#{ulanId}.json"))
					end
				end
			end
		end


		objects[year].keys().each do |key|
			creators = []
			creatorsAdded = []

			objects[year][key][:creator_carried_out_by].each do |uri|
				if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => '(Carried out by)'}; creatorsAdded << uri end
			end
			objects[year][key][:creator_attributed_to].each do |uri|
				if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => '(Attributed to)'}; creatorsAdded << uri  end
			end
			objects[year][key][:creator_school_of].each do |uri|
				if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => '(School of)'}; creatorsAdded << uri  end
			end
			objects[year][key][:creator_imitator_of].each do |uri|
				if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => '(Imitator of)'}; creatorsAdded << uri  end
			end
			objects[year][key][:creator_dc].each do |uri|
				if !creatorsAdded.include? uri; creators <<  {:uri => uri, :role => ''}; creatorsAdded << uri  end
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
				if triples.include? creator[:uri]
					triples[creator[:uri]].each do |nameTriple|
						if nameTriple[:p] == 'http://www.w3.org/2000/01/rdf-schema#label'
							creator[:name] = nameTriple[:o]
						end
					end
				end

			end
			objects[year][key][:creators] = creators
		end
	end


	# now do the enriched project data
	triples = {}
	responsesAAT = {}
	museumData = {}
	geoLabels = {}
	geoParents = {}

	query = "
	  Select * WhERE {
	    GRAPH <http://data.itatti.harvard.edu/florentinedrawings/project2016>{
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

	response['results']['bindings'].each do |triple|
		subject = triple['s']['value']
		predicate = triple['p']['value']
		object = triple['o']['value']
		if not triples.key?(subject)
			triples[subject] = []
		end
		triples[subject] << {:p => predicate, :o => object}
	end

	# download all the lod
	triples.keys().each do |aatUri|
		if aatUri.include? '/aat/'
			aatUri = aatUri.sub('http://http://','http://')
			ulanId = aatUri.rpartition('/').last

			if !responsesAAT.keys().include? aatUri
				if !File.file?("lib/tasks/itatti/cache/aat#{ulanId}.json")
					begin
						p "Donwloading #{aatUri}.json"
						response = RestClient::Request.new(
						   :method => "get",
						   :url => "#{aatUri}.json"
						).execute
						responsesAAT[aatUri] = JSON.parse(response)
						File.open("lib/tasks/itatti/cache/aat#{ulanId}.json", "w") {|f| f.write(responsesAAT[aatUri].to_json) }
					rescue
						p "Error! #{aatUri}.json is not a valid URL, cannot download ulan data"
						responsesAAT[aatUri] = "BAD ULAN aatUri"
					end
				else
					responsesAAT[aatUri] = JSON.parse(File.read("lib/tasks/itatti/cache/aat#{ulanId}.json"))
				end
			end
		end

		if aatUri.include? 'viaf.org'
			triples[aatUri].each do |subTriple|
				if !museumData.keys().include? aatUri
					museumData[aatUri] = { :label => '', :geonames => '' }
				end
				if subTriple[:p] == 'http://www.w3.org/2000/01/rdf-schema#label'
					museumData[aatUri][:label] = subTriple[:o]
				end
				if subTriple[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P74_has_current_or_former_residence'
					museumData[aatUri][:geonames] = subTriple[:o]
				end
			end

		end

		if aatUri.include? 'geonames.org'
			triples[aatUri].each do |subTriple|
				if subTriple[:p] == 'http://www.w3.org/2000/01/rdf-schema#label'
					geoLabels[aatUri] = subTriple[:o]
				end
				if subTriple[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P89_falls_within'
					geoParents[aatUri] = subTriple[:o]
				end
			end
		end

		if aatUri.include? '/entity/'
			triples[aatUri].each do |subTriple|
				if !museumData.keys().include? aatUri
					museumData[aatUri] = { :label => '', :geonames => '' }
				end
				if subTriple[:p] == 'http://www.w3.org/2000/01/rdf-schema#label'
					museumData[aatUri][:label] = subTriple[:o]
				end
			end
		end


	end


	# clean up the data to only what we want from AAT
	responsesAAT.keys.each do |aatUri|
		label = "unknown technique type"
		responsesAAT[aatUri]['results']['bindings'].each do |aatTriple|

			if aatTriple.keys().include? 'Predicate'
				if aatTriple['Predicate']['value'] == 'http://www.w3.org/2004/02/skos/core#prefLabel'
					if aatTriple['Object'].keys().include? 'xml:lang'
						if aatTriple['Object']['xml:lang'] == 'en' or aatTriple['Object']['xml:lang'] == 'en-us'
							label = aatTriple['Object']['value']
						end
					end
				end
			end
		end
		responsesAAT[aatUri] = label
	end


	objectsTechnique = {}
	museumLinks = {}
	bmUri = {}
	currentFormerOwner = {}
	currentOwner = {}

	triples.keys().each do |projectTriple|
		if projectTriple.include? 'data.itatti.harvard.edu'
			uri = "#{projectTriple.split('Berenson').first}Berenson"
			if !objectsTechnique.include? uri
				objectsTechnique[uri] = {:allTechniques => [], :rectoTechinque => [], :versoTechinque => [], :rectoTechinqueUri => [], :versoTechinqueUri => [] }
			end
			triples[projectTriple].each do |subTriple|
				# techique
				if subTriple[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P32_used_general_technique' or subTriple[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P126_employed'
					subTriple[:o] = subTriple[:o].sub('http://http://','http://')
					if projectTriple.include? 'verso'
						objectsTechnique[uri][:versoTechinque] << responsesAAT[subTriple[:o]]
						objectsTechnique[uri][:versoTechinqueUri] << subTriple[:o]
					else
						objectsTechnique[uri][:rectoTechinque] << responsesAAT[subTriple[:o]]
						objectsTechnique[uri][:rectoTechinqueUri] << subTriple[:o]
					end
					if !objectsTechnique[uri][:allTechniques].include? responsesAAT[subTriple[:o]]
						objectsTechnique[uri][:allTechniques] << responsesAAT[subTriple[:o]]
					end
				end

				# museum link
				if subTriple[:p] == 'http://schema.org/url'
					museumLinks[uri] = subTriple[:o]
				end
				if subTriple[:p] == 'http://www.w3.org/2002/07/owl#sameAs' and subTriple[:o].include? 'britishmuseum.org'
					bmUri[uri] = subTriple[:o]
				end

				# current/former owner
				if subTriple[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P51_has_former_or_current_owner'
					if !currentFormerOwner.keys().include? uri
						currentFormerOwner[uri] = []
					end
					currentFormerOwner[uri] << subTriple[:o]
				end
				if subTriple[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P52_has_current_owner'
					if !currentOwner.keys().include? uri
						currentOwner[uri] = []
					end
					currentOwner[uri] << subTriple[:o]
				end

			end
		end
	end

	counter = 0
	allUris.each do |uri|

	  	doc = {}
	  	doc[:id] = uri.rpartition('/').last
	  	doc[:language_facet] = []
	  	doc[:edition_facet] = []
	  	doc[:owner_facet] = []
	  	doc[:technique_facet] = objectsTechnique[uri][:allTechniques]
	  	doc[:technique_recto_t] = objectsTechnique[uri][:rectoTechinque]
	  	doc[:technique_recto_uri] = objectsTechnique[uri][:rectoTechinqueUri]
	  	doc[:technique_verso_t] = objectsTechnique[uri][:versoTechinque]
	  	doc[:technique_verso_uri] = objectsTechnique[uri][:versoTechinqueUri]

	  	if museumLinks.keys().include? uri
	  		doc[:museum_url_s] = museumLinks[uri]
	  	end

	  	if bmUri.keys().include? uri
	  		doc[:bm_uri_s] = bmUri[uri]
	  	end

	  	doc[:owners_label_t] = []
	  	doc[:owners_uri_t] = []
	  	doc[:owners_geo_label_t] = []
	  	doc[:owners_geo_uri_t] = []

	  	if currentOwner.keys().include? uri
	  		currentOwner[uri].each do |owner|
	  			if !museumData[owner].nil?
	  				doc[:owners_label_t]  << museumData[owner][:label]
	  				doc[:owners_uri_t]  << owner
	  				doc[:owner_facet] << museumData[owner][:label]
	  				if museumData[owner][:geonames] != ''
	  					doc[:owners_geo_label_t] << geoLabels[museumData[owner][:geonames]]
						doc[:owners_geo_uri_t] << museumData[owner][:geonames]
	  				end
	  			else
	  				p "No label for #{owner}"
	  			end
	  		end
	  	end


	  	if currentFormerOwner.keys().include? uri
	  		label = "unknown"
	  		currentFormerOwner[uri].each do |owner|
	  			if !museumData[owner].nil?
	  				doc[:owners_label_t]  << museumData[owner][:label]
	  				doc[:owners_uri_t]  << owner
	  				doc[:owner_facet] << museumData[owner][:label]
	  				if museumData[owner][:geonames] != ''
	  					doc[:owners_geo_label_t] << geoLabels[museumData[owner][:geonames]]
	  					doc[:owners_geo_uri_t] << museumData[owner][:geonames]
	  				end
	  			else
	  				p "No label for #{owner}"
	  			end
	  		end
	  	end






	  	doc[:bcn_t] = []

	  	counter = counter +1
	  	p "#{counter}/#{allUris.size}"



	  	years.each do |year|

		  	# if doc[:id] == "0001491-Berenson"
		  	# 	p objects[year][uri]
		  	# end
		  	if !objects[year][uri][:bcn].blank?
		  		doc[:edition_facet] << "Berenson #{year}"
		  		doc["bnc_#{year}_s"] = objects[year][uri][:bcn]
		  	end

	  		if objects[year].include? uri
	  			# doc[:language_facet] << "Berenson #{year}"
	  			doc["verso_title_#{year}_t"] = objects[year][uri][:title_verso]
	  			doc["recto_title_#{year}_t"] = objects[year][uri][:title_recto]

	  			doc["verso_note_#{year}_t"] = objects[year][uri][:note_verso]
	  			doc["recto_note_#{year}_t"] = objects[year][uri][:note_recto]

	  			doc["verso_figures_#{year}_t"] = objects[year][uri][:figures_verso]
	  			doc["recto_figures_#{year}_t"] = objects[year][uri][:figures_recto]

	  			doc[:bcn_t] << objects[year][uri][:bcn]

	  			doc["page_number_#{year}_s"] = objects[year][uri][:page_number]


			  	authorDisplay = ""
			  	objects[year][uri][:creators].each do |creator|
			  		authorDisplay = authorDisplay + "#{creator[:name]} #{creator[:role]} "
			  		doc[:language_facet] << creator[:role].sub('(','').sub(')','')
			  	end
			  	doc["author_#{year}_display_s"] = authorDisplay.strip


			  	if doc["author_#{year}_display_s"].size == 0; doc["author_#{year}_display_s"] = "--"  end
	  		end
	  	end

	  	# use the 1961 title if it eixsts
	  	if objects.keys().include? '1961'
	  		title = ""
	  		if objects['1961'][uri][:title_recto] != 'N/A'; title = objects['1961'][uri][:title_recto] end
	  		if objects['1961'][uri][:title_verso] != 'N/A'; title = "#{title} / #{objects['1961'][uri][:title_verso]}".sub('/ --','').strip end
  		  	doc[:title_t] = title
  			doc[:title_display] = title
  		end


  		if objects.keys().include? '1961'
		  	authorDisplay = ""
		  	authors = []
		  	objects['1961'][uri][:creators].each do |creator|
		  		doc[:subject_topic_facet] = "#{creator[:name]}"
		  		authorDisplay = authorDisplay + "#{creator[:name]} #{creator[:role]} "
		  		authors << "#{creator[:name]}"
		  	end
		  	doc[:author_display] = authorDisplay.strip
		  	doc[:author_t] = authors
			doc[:authorsuggest] = authorDisplay.strip

		end

		# p doc
	  	solr.add doc
	  	solr.commit
	  	sleep(0.1)

	end
	# solr.commit

  end
end