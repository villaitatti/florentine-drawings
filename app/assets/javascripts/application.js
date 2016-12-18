// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
// = require jquery
// = require jquery_ujs
// = require turbolinks//
// Required by Blacklight
// = require blacklight/blacklight

// = require_tree .

// switch the images out
$(document).ready(function () {
  $('.preview-thumbnail').click(function (event) {
    var src = $(this).data('src')
    var iiif = $(this).data('iiif')

    if (iiif){
    	$('#openseadragon').css('display','block')
    	$('#main-image-link').css('display','none')
    }else{
    	$('#main-image-link').css('display','block')
    	$('#openseadragon').css('display','none')
    }
    $('#main-image').attr('src', src)


    event.preventDefault()
    return false
  })

  if (iiifData){
  	console.log("DOOING IT")

    var viewer = OpenSeadragon({
        id: "openseadragon",
        prefixUrl: '/assets/openseadragon/',
	    sequenceMode: true,
	    tileSources: [iiifData]


    });
  }

})
