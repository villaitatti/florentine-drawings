require 'rest-client'
require 'json'
require 'aws-sdk'
require 'open-uri'
require 'rmagick'
require 'fileutils'

include Magick


page_mappings = {"1"=>423367559,"2"=>423367562,"3"=>423367563,"4"=>423367566,"5"=>423367569,"6"=>423367572,"7"=>423367573,"8"=>423367576,"9"=>423367577,"10"=>423367580,"11"=>423367581,"12"=>423367584,"13"=>423367585,"14"=>423367588,"15"=>423367589,"16"=>423367592,"17"=>423367593,"18"=>423367596,"19"=>423367597,"20"=>423367600,"21"=>423367603,"22"=>423367606,"23"=>423367607,"24"=>423367610,"25"=>423367611,"26"=>423367614,"27"=>423367615,"28"=>423367618,"29"=>423367619,"30"=>423367622,"31"=>423367623,"32"=>423367626,"33"=>423367627,"34"=>423367630,"35"=>423367631,"36"=>423367634,"37"=>423367637,"38"=>423367640,"39"=>423367641,"40"=>423367644,"41"=>423367645,"42"=>423367648,"43"=>423367649,"44"=>423367652,"45"=>423367653,"46"=>423367656,"47"=>423367657,"48"=>423367660,"49"=>423367661,"50"=>423367664,"51"=>423367665,"52"=>423367668,"53"=>423367671,"54"=>423367674,"55"=>423367675,"56"=>423367678,"57"=>423367679,"58"=>423367682,"59"=>423367683,"60"=>423367684,"61"=>423367687,"62"=>423367688,"63"=>423367691,"64"=>423367692,"65"=>423367695,"66"=>423367696,"67"=>423367699,"68"=>423367700,"69"=>423367703,"70"=>423367704,"71"=>423367707,"72"=>423367708,"73"=>423367711,"74"=>423367712,"75"=>423367715,"76"=>423367716,"77"=>423367719,"78"=>423367720,"79"=>423367723,"80"=>423367724,"81"=>423367727,"82"=>423367728,"83"=>423367731,"84"=>423367732,"85"=>423367735,"86"=>423367736,"87"=>423367739,"88"=>423367740,"89"=>423367743,"90"=>423367744,"91"=>423367747,"92"=>423367748,"93"=>423367751,"94"=>423367752,"95"=>423367755,"96"=>423367756,"97"=>423367759,"98"=>423367760,"99"=>423367763,"100"=>423367764,"101"=>423367767,"102"=>423367768,"103"=>423367771,"104"=>423367772,"105"=>423367775,"106"=>423367776,"107"=>423367779,"108"=>423367780,"109"=>423367783,"110"=>423367784,"111"=>423367787,"112"=>423367788,"113"=>423367791,"114"=>423367792,"115"=>423367795,"116"=>423367796,"117"=>423367799,"118"=>423367800,"119"=>423367803,"120"=>423367804,"121"=>423367807,"122"=>423367808,"123"=>423367811,"124"=>423367812,"125"=>423367815,"126"=>423367816,"127"=>423367819,"128"=>423367820,"129"=>423367823,"130"=>423367824,"131"=>423367827,"132"=>423367828,"133"=>423367831,"134"=>423367832,"135"=>423367835,"136"=>423367836,"137"=>423367839,"138"=>423367840,"139"=>423367843,"140"=>423367844,"141"=>423367847,"142"=>423367848,"143"=>423367851,"144"=>423367852,"145"=>423367855,"146"=>423367856,"147"=>423367859,"148"=>423367860,"149"=>423367863,"150"=>423367864,"151"=>423367867,"152"=>423367868,"153"=>423367871,"154"=>423367872,"155"=>423367875,"156"=>423367876,"157"=>423367879,"158"=>423367880,"159"=>423367883,"160"=>423367884,"161"=>423367887,"162"=>423367888,"163"=>423367891,"164"=>423367892,"165"=>423367895,"166"=>423367896,"167"=>423367899,"168"=>423367900,"169"=>423367903,"170"=>423367904,"171"=>423367907,"172"=>423367908,"173"=>423367911,"174"=>423367912,"175"=>423367915,"176"=>423367916,"177"=>423367919,"178"=>423367920,"179"=>423367923,"180"=>423367924,"181"=>423367929,"182"=>423367930,"183"=>423367933,"184"=>423367934,"185"=>423367937,"186"=>423367938,"187"=>423367941,"188"=>423367942,"189"=>423367947,"190"=>423367948,"191"=>423367951,"192"=>423367952,"193"=>423367955,"194"=>423367956,"195"=>423367959,"196"=>423367960,"197"=>423367965,"198"=>423367966,"199"=>423367969,"200"=>423367970}

def download_image(url, path)
  File.open(path, "w") do |f|
    IO.copy_stream(open(url), f)
  end
end

namespace :itatti do
  desc 'Check for thumbnails and upload to s3 if they do not exist'
  task thumbs: :environment do


  	image_hash = {}


  	has_thumbnail = []



    # p 'start'
    # download_image('http://ids.lib.harvard.edu/ids/view/423367823',"lib/tasks/itatti/thumbs/423367823.jpg")
    # img =  Magick::Image.read("lib/tasks/itatti/thumbs/423367823.jpg").first 
    # thumb = img.scale(200,200)
    # thumb.write "lib/tasks/itatti/thumbs/423367823_thumb.jpg"

    # File.delete("lib/tasks/itatti/thumbs/423367823.jpg") if File.exist?("lib/tasks/itatti/thumbs/423367823.jpg")

    # s3 = Aws::S3::Resource.new
    # obj = s3.bucket('florentinedrawings').object('thumbs/000534A-Berenson_text.jpg')
    # obj.upload_file "lib/tasks/itatti/thumbs/423367823_thumb.jpg"

    # p 'end'








    




  	# florentinedrawings
    #  # s3.delete_object(bucket:'florentinedrawings', key: 'testwrite/')

  	s3 = Aws::S3::Client.new

    # s3.delete_object(bucket:'florentinedrawings', key: 'thumbs/423367823-Berenson_text.jpg')



  	s3.list_objects(bucket:'florentinedrawings').each do |response|	  
  	  response.contents.map(&:key).each do |id|
  	  	if id.include? 'thumbs/'
  	  		id = id.gsub('thumbs/','').gsub('-Berenson.jpg','')
  	  		has_thumbnail << id
  	  	end	  	
  	  end  	
  	end


    # XVADFGDAB = DFGSDFGDFGDFG

	# s3.put_object(bucket:'florentinedrawings', key: "testwrite/")



  # ----------------------------------


  	endpoint = 'http://data.itatti.harvard.edu/sparql'


  	#get the 1903 data for the IIIF and page urls
  	query = "
  	  Select * WhERE {
  	    GRAPH <http://data.itatti.harvard.edu/resource/florentinedrawings/berenson1903>{
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
  		# p "#{subject} #{predicate} #{object}"
  		triples[subject] << {:p => predicate, :o => object}
  	end

  	triples.keys().each do |key|

  		# get the page number
  		if key.include? '1903_page'
  			page = key.split('/')[-1]
  			id = key.split('/')[5].gsub('-Berenson','')
  			if !image_hash.key?(id)
  				image_hash[id] = {:has_thumb => false, :has_plate => false, :has_museum => false, :has_page => false }
  			end
  			image_hash[id][:has_page] = page_mappings[page]
  		end

  		triples[key].each do |predObj|
  			if predObj[:o].include? 'iiif.itatti.harvard.edu'
  				id = key.split('/')[5].gsub('-Berenson','')
  				if !image_hash.key?(id)
  					image_hash[id] = {:has_thumb => false, :has_plate => false, :has_museum => false, :has_page => false }
  				end
  				image_hash[id][:has_plate] = predObj[:o]				
  			end
  		end
  	end

    # get museum links

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
  		# p "#{subject} #{predicate} #{object}"
  		triples[subject] << {:p => predicate, :o => object}
  	end

  	triples.keys().each do |key|
  		if (key.include? 'recto/museum_image')
  			triples[key].each do |predObj|
  				if predObj[:p] == 'http://www.cidoc-crm.org/cidoc-crm/P138i_has_representation'
  					id = key.split('/')[5].gsub('-Berenson','')
  					if !image_hash.key?(id)
  						image_hash[id] = {:has_thumb => false, :has_plate => false, :has_museum => false, :has_page => false }
  					end
  					image_hash[id][:has_museum] = predObj[:o]					
  				end
  			end
  		end
  	end


    image_hash.keys().each do |key|
      if (!has_thumbnail.include?(key))
        p key
        p image_hash[key]
      end
    end


  end
end
