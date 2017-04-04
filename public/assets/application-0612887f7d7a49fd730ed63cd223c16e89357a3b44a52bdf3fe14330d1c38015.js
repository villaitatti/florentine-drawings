/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
Blacklight = function() {
  var buffer = new Array;
  return {
    onLoad: function(func) {
      buffer.push(func);
    },

    activate: function() {
      for(var i = 0; i < buffer.length; i++) {
        buffer[i].call();
      }
    },

    listeners: function () {
      var listeners = [];
      if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
        // Turbolinks 5
        if (Turbolinks.BrowserAdapter) {
          listeners.push('turbolinks:load');
        } else {
          // Turbolinks < 5
          listeners.push('page:load', 'ready');
        }
      } else {
        listeners.push('ready');
      }

      return listeners.join(' ');
    }
  };
}();

// turbolinks triggers page:load events on page transition
// If app isn't using turbolinks, this event will never be triggered, no prob. 
$(document).on(Blacklight.listeners(), function() {
  Blacklight.activate();  
});


(function($) {
  Blacklight.do_search_autofocus_fallback = function() {
    if (typeof Modernizer != "undefined") {
      if (Modernizr.autofocus) {
        return;
      }
    }

    $('input[autofocus]').focus();
  }

  Blacklight.onLoad(function() {
    Blacklight.do_search_autofocus_fallback();
  });
})(jQuery);
/* A JQuery plugin (should this be implemented as a widget instead? not sure)
   that will convert a "toggle" form, with single submit button to add/remove
   something, like used for Bookmarks, into an AJAXy checkbox instead. 
   
   Apply to a form. Does require certain assumption about the form:
    1) The same form 'action' href must be used for both ADD and REMOVE
       actions, with the different being the hidden input name="_method"
       being set to "put" or "delete" -- that's the Rails method to pretend
       to be doing a certain HTTP verb. So same URL, PUT to add, DELETE
       to remove. This plugin assumes that. 
       
       Plus, the form this is applied to should provide a data-doc-id 
       attribute (HTML5-style doc-*) that contains the id/primary key
       of the object in question -- used by plugin for a unique value for
       DOM id's. 

  Uses HTML for a checkbox compatible with Bootstrap 3. 
       
   Pass in options for your class name and labels:
   $("form.something").bl_checkbox_submit({    
        checked_label: "Selected",
        unchecked_label: "Select",
        progress_label: "Saving...",
        //css_class is added to elements added, plus used for id base
        css_class: "toggle_my_kinda_form",
        success: function(after_success_check_state) {
          #optional callback
        }
   });
*/

(function($) {    
    $.fn.bl_checkbox_submit = function(arg_opts) {              
      
      this.each(function() {
        var options = $.extend({}, $.fn.bl_checkbox_submit.defaults, arg_opts);
                                  
          
        var form = $(this);
        form.children().hide();
        //We're going to use the existing form to actually send our add/removes
        //This works conveneintly because the exact same action href is used
        //for both bookmarks/$doc_id.  But let's take out the irrelevant parts
        //of the form to avoid any future confusion. 
        form.find("input[type=submit]").remove();
        form.addClass('form-horizontal');
        
        //View needs to set data-doc-id so we know a unique value
        //for making DOM id
        var unique_id = form.attr("data-doc-id") || Math.random();
        // if form is currently using method delete to change state, 
        // then checkbox is currently checked
        var checked = (form.find("input[name=_method][value=delete]").size() != 0);
            
        var checkbox = $('<input type="checkbox">')	    
          .addClass( options.css_class )
          .attr("id", options.css_class + "_" + unique_id);	  
        var label = $('<label>')
          .addClass( options.css_class )
          .attr("for", options.css_class + '_' + unique_id)
          .attr("title", form.attr("title") || "");
        var span = $('<span>');

        label.append(checkbox);
        label.append(" ");
        label.append(span);  

        var checkbox_div = $("<div class='checkbox' />")
          .addClass(options.css_class)
          .append(label);
          
        function update_state_for(state) {
            checkbox.prop("checked", state);
            label.toggleClass("checked", state);
            if (state) {    
               //Set the Rails hidden field that fakes an HTTP verb
               //properly for current state action. 
               form.find("input[name=_method]").val("delete");
               span.text(form.attr('data-present'));
            } else {
               form.find("input[name=_method]").val("put");
               span.text(form.attr('data-absent'));
            }
          }
        
        form.append(checkbox_div);
        update_state_for(checked);
        
        checkbox.click(function() {
            span.text(form.attr('data-inprogress'));
            label.attr("disabled", "disabled");  
            checkbox.attr("disabled", "disabled");
                            
            $.ajax({
                url: form.attr("action"),
                dataType: 'json',
                type: form.attr("method").toUpperCase(),
                data: form.serialize(),
                error: function() {
                   alert("Error");
                   update_state_for(checked);
                   label.removeAttr("disabled");
                   checkbox.removeAttr("disabled");
                },
                success: function(data, status, xhr) {
                  //if app isn't running at all, xhr annoyingly
                  //reports success with status 0. 
                  if (xhr.status != 0) {
                    checked = ! checked;
                    update_state_for(checked);
                    label.removeAttr("disabled");
                    checkbox.removeAttr("disabled");
                    options.success.call(form, checked, xhr.responseJSON);
                  } else {
                    alert("Error");
                    update_state_for(checked);
                    label.removeAttr("disabled");
                    checkbox.removeAttr("disabled");
                  }
                }
            });
            
            return false;
        }); //checkbox.click
        
        
      }); //this.each      
      return this;
    };
	
  $.fn.bl_checkbox_submit.defaults =  {
            //css_class is added to elements added, plus used for id base
            css_class: "bl_checkbox_submit",
            success: function() {} //callback
  };
})(jQuery);


(function($) {
//change form submit toggle to checkbox
    Blacklight.do_bookmark_toggle_behavior = function() {
      $(Blacklight.do_bookmark_toggle_behavior.selector).bl_checkbox_submit({
         //css_class is added to elements added, plus used for id base
         css_class: "toggle_bookmark",
         success: function(checked, response) {
           if (response.bookmarks) {
             $('[data-role=bookmark-counter]').text(response.bookmarks.count);
           }
         }
      });
    };
    Blacklight.do_bookmark_toggle_behavior.selector = "form.bookmark_toggle"; 

Blacklight.onLoad(function() {
  Blacklight.do_bookmark_toggle_behavior();  
});
  

})(jQuery);


/* 
  The ajax_modal plugin can display some interactions inside a Bootstrap
  modal window, including some multi-page interactions. 

  It supports unobtrusive Javascript, where a link or form that would have caused
  a new page load is changed to display it's results inside a modal dialog,
  by this plugin.  The plugin assumes there is a Bootstrap modal div
  on the page with id #ajax-modal to use as the modal -- the standard Blacklight
  layout provides this. 

  To make a link or form have their results display inside a modal, add
  `data-ajax-modal="trigger"` to the link or form. (Note, form itself not submit input)
  With Rails link_to helper, you'd do that like:

      link_to something, link, :data => {:ajax_modal => "trigger"}

  The results of the link href or form submit will be displayed inside
  a modal -- they should include the proper HTML markup for a bootstrap modal's
  contents. Also, you ordinarily won't want the Rails template with wrapping
  navigational elements to be used.  The Rails controller could suppress
  the layout when a JS AJAX request is detected, OR the response
  can include a `<div data-ajax-modal="container">` -- only the contents
  of the container will be placed inside the modal, the rest of the
  page will be ignored. 

  If you'd like to have a link or button that closes the modal,
  you can just add a `data-dismiss="modal"` to the link,
  standard Bootstrap convention. But you can also have
  an href on this link for non-JS contexts, we'll make sure
  inside the modal it closes the modal and the link is NOT followed. 

  Link or forms inside the modal will ordinarily cause page loads
  when they are triggered. However, if you'd like their results
  to stay within the modal, just add `data-ajax-modal="preserve"`
  to the link or form. 

  Here's an example of what might be returned, demonstrating most of the devices available:

    <div data-ajax-modal="container">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 class="modal-title">Request Placed</h3>
      </div>
  
      <div class="modal-body">
        <p>Some message</p>
        <%= link_to "This result will still be within modal", some_link, :data => {:ajax_modal => "preserve"} %>
      </div>


      <div class="modal-footer">
        <%= link_to "Close the modal", request_done_path, :class => "submit button dialog-close", :data => {:dismiss => "modal"} %>
      </div>
    </div>


  One additional feature. If the content returned from the AJAX modal load
  has an element with `data-ajax-modal=close`, that will trigger the modal
  to be closed. And if this element includes a node with class "flash_messages",
  the flash-messages node will be added to the main page inside #main-flahses. 

  == Events

  We'll send out an event 'loaded.blacklight.ajax-modal' with the #ajax-modal
  dialog as the target, right after content is loaded into the modal but before
  it is shown (if not already a shown modal).  In an event handler, you can 
  inspect loaded content by looking inside $(this).  If you call event.preventDefault(),
  we won't 'show' the dialog (although it may already have been shown, you may want to
  $(this).modal("hide") if you want to ensure hidden/closed. 

  The data-ajax-modal=close behavior is implemented with this event, see for example. 
*/

// We keep all our data in Blacklight.ajaxModal object. 
// Create lazily if someone else created first. 
if (Blacklight.ajaxModal === undefined) {
  Blacklight.ajaxModal = {};
}


// a Bootstrap modal div that should be already on the page hidden
Blacklight.ajaxModal.modalSelector = "#ajax-modal";

// Trigger selectors identify forms or hyperlinks that should open
// inside a modal dialog.
Blacklight.ajaxModal.triggerLinkSelector  = "a[data-ajax-modal~=trigger], a.lightboxLink,a.more_facets_link,.ajax_modal_launch";
Blacklight.ajaxModal.triggerFormSelector  = "form[data-ajax-modal~=trigger], form.ajax_form";

// preserve selectors identify forms or hyperlinks that, if activated already
// inside a modal dialog, should have destinations remain inside the modal -- but
// won't trigger a modal if not already in one.
//
// No need to repeat selectors from trigger selectors, those will already
// be preserved. MUST be manually prefixed with the modal selector,
// so they only apply to things inside a modal.
Blacklight.ajaxModal.preserveLinkSelector = Blacklight.ajaxModal.modalSelector + ' a[data-ajax-modal~=preserve]';
Blacklight.ajaxModal.preserveFormSelector = Blacklight.ajaxModal.modalSelector + ' form[data-ajax-modal~=preserve]'

Blacklight.ajaxModal.containerSelector    = "[data-ajax-modal~=container]";

Blacklight.ajaxModal.modalCloseSelector   = "[data-ajax-modal~=close], span.ajax-close-modal";

// Called on fatal failure of ajax load, function returns content
// to show to user in modal.  Right now called only for extreme
// network errors. 
Blacklight.ajaxModal.onFailure = function(data) {
  var contents =  "<div class='modal-header'>" +
           "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>" +
           "Network Error</div>";
  $(Blacklight.ajaxModal.modalSelector).find('.modal-content').html(contents);
  $(Blacklight.ajaxModal.modalSelector).modal('show'); 
}

Blacklight.ajaxModal.receiveAjax = function (data) {      
      if (data.readyState == 0) {
        // Network error, could not contact server. 
        Blacklight.ajaxModal.onFailure(data)
      }
      else {
        var contents = data.responseText;
      
        // does it have a data- selector for container?
        // important we don't execute script tags, we shouldn't. 
        // code modelled off of JQuery ajax.load. https://github.com/jquery/jquery/blob/master/src/ajax/load.js?source=c#L62
        var container =  $("<div>").
          append( jQuery.parseHTML(contents) ).find( Blacklight.ajaxModal.containerSelector ).first();
        if (container.size() !== 0) {
          contents = container.html();
        }

        $(Blacklight.ajaxModal.modalSelector).find('.modal-content').html(contents);

        // send custom event with the modal dialog div as the target
        var e    = $.Event('loaded.blacklight.ajax-modal')
        $(Blacklight.ajaxModal.modalSelector).trigger(e);
        // if they did preventDefault, don't show the dialog
        if (e.isDefaultPrevented()) return;

        $(Blacklight.ajaxModal.modalSelector).modal('show');      
      }
};


Blacklight.ajaxModal.modalAjaxLinkClick = function(e) {
  e.preventDefault();

  var jqxhr = $.ajax({
    url: $(this).attr('href'),
    dataType: 'script'
  });

  jqxhr.always( Blacklight.ajaxModal.receiveAjax );
};

Blacklight.ajaxModal.modalAjaxFormSubmit = function(e) {
  e.preventDefault();

  var jqxhr = $.ajax({
    url: $(this).attr('action'),
    data: $(this).serialize(),
    type: $(this).attr('method'), //POST',
    dataType: 'script'
 });

 jqxhr.always(Blacklight.ajaxModal.receiveAjax);
}



Blacklight.ajaxModal.setup_modal = function() {
	// Event indicating blacklight is setting up a modal link,
  // you can catch it and call e.preventDefault() to abort
  // setup. 
	var e = $.Event('setup.blacklight.ajax-modal');
	$("body").trigger(e);
	if (e.isDefaultPrevented()) return;

  // Register both trigger and preserve selectors in ONE event handler, combining
  // into one selector with a comma, so if something matches BOTH selectors, it
  // still only gets the event handler called once. 
  $("body").on("click", Blacklight.ajaxModal.triggerLinkSelector  + ", " + Blacklight.ajaxModal.preserveLinkSelector,
    Blacklight.ajaxModal.modalAjaxLinkClick);
  $("body").on("submit", Blacklight.ajaxModal.triggerFormSelector + ", " + Blacklight.ajaxModal.preserveFormSelector,
    Blacklight.ajaxModal.modalAjaxFormSubmit);

  // Catch our own custom loaded event to implement data-ajax-modal=closed
  $("body").on("loaded.blacklight.ajax-modal", Blacklight.ajaxModal.check_close_ajax_modal);

  // we support doing data-dismiss=modal on a <a> with a href for non-ajax
  // use, we need to suppress following the a's href that's there for
  // non-JS contexts. 
  $("body ").on("click", Blacklight.ajaxModal.modalSelector + " a[data-dismiss~=modal]", function (e) {
    e.preventDefault();
  });
};

// A function used as an event handler on loaded.blacklight.ajax-modal
// to catch contained data-ajax-modal=closed directions
Blacklight.ajaxModal.check_close_ajax_modal = function(event) {  
  if ($(event.target).find(Blacklight.ajaxModal.modalCloseSelector).length) {
    modal_flashes = $(this).find('.flash_messages');

    $(event.target).modal("hide");
    event.preventDefault();

    main_flashes = $('#main-flashes');
    main_flashes.append(modal_flashes);
    modal_flashes.fadeIn(500);  
  }
}

Blacklight.onLoad(function() {  
  Blacklight.ajaxModal.setup_modal();
});
(function($) {
  Blacklight.do_search_context_behavior = function() {
    $('a[data-context-href]').on('click.search-context', Blacklight.handleSearchContextMethod);
  };

  // this is the $.rails.handleMethod with a couple adjustments, described inline:
  // first, we're attaching this directly to the event handler, so we can check for meta-keys
  Blacklight.handleSearchContextMethod = function(event) {
    var link = $(this);

    // instead of using the normal href, we need to use the context href instead
    var href = link.data('context-href'),
      method = 'post',
      target = link.attr('target'),
      csrfToken = $('meta[name=csrf-token]').attr('content'),
      csrfParam = $('meta[name=csrf-param]').attr('content'),
      form = $('<form method="post" action="' + href + '"></form>'),
      metadataInput = '<input name="_method" value="' + method + '" type="hidden" />',
      redirectHref = '<input name="redirect" value="' + link.attr('href') + '" type="hidden" />';

    // check for meta keys.. if set, we should open in a new tab
    if(event.metaKey || event.ctrlKey) {
      target = '_blank';
    }

    if (csrfParam !== undefined && csrfToken !== undefined) {
      metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
    }

    if (target) { form.attr('target', target); }

    form.hide().append(metadataInput).append(redirectHref).appendTo('body');
    form.submit();

    return false;
  };

  Blacklight.onLoad(function() {
    Blacklight.do_search_context_behavior();
  });
})(jQuery);
(function($) {
  Blacklight.onLoad(function() {
    // when clicking on a link that toggles the collapsing behavior, don't do anything
    // with the hash or the page could jump around.
    $(document).on("click", "a[data-toggle=collapse][href='#'], [data-toggle=collapse] a[href='#']", function(event) {
      event.preventDefault();
    });
  });
})(jQuery);
/*global Blacklight */


(function($) {
  'use strict';
  
  Blacklight.doResizeFacetLabelsAndCounts = function() {
    // adjust width of facet columns to fit their contents
    function longer (a,b){ return b.textContent.length - a.textContent.length; }

    $('ul.facet-values, ul.pivot-facet').each(function(){
      var longest = $(this).find('span.facet-count').sort(longer).first();
      var clone = longest.clone()
        .css('visibility','hidden').css('width', 'auto');
      $('body').append(clone);
      $(this).find('.facet-count').first().width(clone.width());
      clone.remove();
    });
  };

  Blacklight.onLoad(function() {
    Blacklight.doResizeFacetLabelsAndCounts();
  });
})(jQuery);
/*global Bloodhound */


Blacklight.onLoad(function() {
  'use strict';

  $('[data-autocomplete-enabled="true"]').each(function() {
    var $el = $(this);
    if($el.hasClass('tt-hint')) {
      return;
    }
    var suggestUrl = $el.data().autocompletePath;

    var terms = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: suggestUrl + '?q=%QUERY',
        wildcard: '%QUERY'
      }
    });

    terms.initialize();

    $el.typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    },
    {
      name: 'terms',
      displayKey: 'term',
      source: terms.ttAdapter()
    });
  });
});
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], function(a0) {
            return root["Bloodhound"] = factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        root["Bloodhound"] = factory(jQuery);
    }
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var VERSION = "0.11.1";
    var tokenizers = function() {
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey(keys) {
                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(keys, function(k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        "use strict";
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                    this.size--;
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        "use strict";
        var LOCAL_STORAGE;
        try {
            LOCAL_STORAGE = window.localStorage;
            LOCAL_STORAGE.setItem("~~~", "!");
            LOCAL_STORAGE.removeItem("~~~");
        } catch (err) {
            LOCAL_STORAGE = null;
        }
        function PersistentStorage(namespace, override) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
            this.ls = override || LOCAL_STORAGE;
            !this.ls && this._noop();
        }
        _.mixin(PersistentStorage.prototype, {
            _prefix: function(key) {
                return this.prefix + key;
            },
            _ttlKey: function(key) {
                return this._prefix(key) + this.ttlKey;
            },
            _noop: function() {
                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
            },
            _safeSet: function(key, val) {
                try {
                    this.ls.setItem(key, val);
                } catch (err) {
                    if (err.name === "QuotaExceededError") {
                        this.clear();
                        this._noop();
                    }
                }
            },
            get: function(key) {
                if (this.isExpired(key)) {
                    this.remove(key);
                }
                return decode(this.ls.getItem(this._prefix(key)));
            },
            set: function(key, val, ttl) {
                if (_.isNumber(ttl)) {
                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
                } else {
                    this.ls.removeItem(this._ttlKey(key));
                }
                return this._safeSet(this._prefix(key), encode(val));
            },
            remove: function(key) {
                this.ls.removeItem(this._ttlKey(key));
                this.ls.removeItem(this._prefix(key));
                return this;
            },
            clear: function() {
                var i, keys = gatherMatchingKeys(this.keyMatcher);
                for (i = keys.length; i--; ) {
                    this.remove(keys[i]);
                }
                return this;
            },
            isExpired: function(key) {
                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
                return _.isNumber(ttl) && now() > ttl ? true : false;
            }
        });
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return $.parseJSON(val);
        }
        function gatherMatchingKeys(keyMatcher) {
            var i, key, keys = [], len = LOCAL_STORAGE.length;
            for (i = 0; i < len; i++) {
                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
                    keys.push(key.replace(keyMatcher, ""));
                }
            }
            return keys;
        }
    }();
    var Transport = function() {
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastReq = null;
            this._send = o.transport;
            this._get = o.limiter ? o.limiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _fingerprint: function fingerprint(o) {
                o = o || {};
                return o.url + o.type + $.param(o.data || {});
            },
            _get: function(o, cb) {
                var that = this, fingerprint, jqXhr;
                fingerprint = this._fingerprint(o);
                if (this.cancelled || fingerprint !== this.lastReq) {
                    return;
                }
                if (jqXhr = pendingRequests[fingerprint]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb(null, resp);
                    that._cache.set(fingerprint, resp);
                }
                function fail() {
                    cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[fingerprint];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(o, cb) {
                var resp, fingerprint;
                cb = cb || $.noop;
                o = _.isString(o) ? {
                    url: o
                } : o || {};
                fingerprint = this._fingerprint(o);
                this.cancelled = false;
                this.lastReq = fingerprint;
                if (resp = this._cache.get(fingerprint)) {
                    cb(null, resp);
                } else {
                    this._get(o, cb);
                }
            },
            cancel: function() {
                this.cancelled = true;
            }
        });
        return Transport;
    }();
    var SearchIndex = window.SearchIndex = function() {
        "use strict";
        var CHILDREN = "c", IDS = "i";
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.identify = o.identify || _.stringify;
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.matchAnyQueryToken = o.matchAnyQueryToken;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    var id, tokens;
                    that.datums[id = that.identify(datum)] = datum;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
                            node[IDS].push(id);
                        }
                    });
                });
            },
            get: function get(ids) {
                var that = this;
                return _.map(ids, function(id) {
                    return that.datums[id];
                });
            },
            search: function search(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0 && !that.matchAnyQueryToken) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node[CHILDREN][ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node[IDS].slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        if (!that.matchAnyQueryToken) {
                            matches = [];
                            return false;
                        }
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    return that.datums[id];
                }) : [];
            },
            all: function all() {
                var values = [];
                for (var key in this.datums) {
                    values.push(this.datums[key]);
                }
                return values;
            },
            reset: function reset() {
                this.datums = {};
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function(token) {
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            var node = {};
            node[IDS] = [];
            node[CHILDREN] = {};
            return node;
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort();
            arrayB = arrayB.sort();
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
        }
    }();
    var Prefetch = function() {
        "use strict";
        var keys;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        function Prefetch(o) {
            this.url = o.url;
            this.ttl = o.ttl;
            this.cache = o.cache;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = o.transport;
            this.thumbprint = o.thumbprint;
            this.storage = new PersistentStorage(o.cacheKey);
        }
        _.mixin(Prefetch.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            store: function store(data) {
                if (!this.cache) {
                    return;
                }
                this.storage.set(keys.data, data, this.ttl);
                this.storage.set(keys.protocol, location.protocol, this.ttl);
                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
            },
            fromCache: function fromCache() {
                var stored = {}, isExpired;
                if (!this.cache) {
                    return null;
                }
                stored.data = this.storage.get(keys.data);
                stored.protocol = this.storage.get(keys.protocol);
                stored.thumbprint = this.storage.get(keys.thumbprint);
                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            fromNetwork: function(cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                settings = this.prepare(this._settings());
                this.transport(settings).fail(onError).done(onResponse);
                function onError() {
                    cb(true);
                }
                function onResponse(resp) {
                    cb(null, that.transform(resp));
                }
            },
            clear: function clear() {
                this.storage.clear();
                return this;
            }
        });
        return Prefetch;
    }();
    var Remote = function() {
        "use strict";
        function Remote(o) {
            this.url = o.url;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.indexResponse = o.indexResponse;
            this.transport = new Transport({
                cache: o.cache,
                limiter: o.limiter,
                transport: o.transport
            });
        }
        _.mixin(Remote.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            get: function get(query, cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                query = query || "";
                settings = this.prepare(query, this._settings());
                return this.transport.get(settings, onResponse);
                function onResponse(err, resp) {
                    err ? cb([]) : cb(that.transform(resp));
                }
            },
            cancelLastRequest: function cancelLastRequest() {
                this.transport.cancel();
            }
        });
        return Remote;
    }();
    var oParser = function() {
        "use strict";
        return function parse(o) {
            var defaults, sorter;
            defaults = {
                initialize: true,
                identify: _.stringify,
                datumTokenizer: null,
                queryTokenizer: null,
                matchAnyQueryToken: false,
                sufficient: 5,
                indexRemote: false,
                sorter: null,
                local: [],
                prefetch: null,
                remote: null
            };
            o = _.mixin(defaults, o || {});
            !o.datumTokenizer && $.error("datumTokenizer is required");
            !o.queryTokenizer && $.error("queryTokenizer is required");
            sorter = o.sorter;
            o.sorter = sorter ? function(x) {
                return x.sort(sorter);
            } : _.identity;
            o.local = _.isFunction(o.local) ? o.local() : o.local;
            o.prefetch = parsePrefetch(o.prefetch);
            o.remote = parseRemote(o.remote);
            return o;
        };
        function parsePrefetch(o) {
            var defaults;
            if (!o) {
                return null;
            }
            defaults = {
                url: null,
                ttl: 24 * 60 * 60 * 1e3,
                cache: true,
                cacheKey: null,
                thumbprint: "",
                prepare: _.identity,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("prefetch requires url to be set");
            o.transform = o.filter || o.transform;
            o.cacheKey = o.cacheKey || o.url;
            o.thumbprint = VERSION + o.thumbprint;
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            return o;
        }
        function parseRemote(o) {
            var defaults;
            if (!o) {
                return;
            }
            defaults = {
                url: null,
                cache: true,
                prepare: null,
                replace: null,
                wildcard: null,
                limiter: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("remote requires url to be set");
            o.transform = o.filter || o.transform;
            o.prepare = toRemotePrepare(o);
            o.limiter = toLimiter(o);
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            delete o.replace;
            delete o.wildcard;
            delete o.rateLimitBy;
            delete o.rateLimitWait;
            return o;
        }
        function toRemotePrepare(o) {
            var prepare, replace, wildcard;
            prepare = o.prepare;
            replace = o.replace;
            wildcard = o.wildcard;
            if (prepare) {
                return prepare;
            }
            if (replace) {
                prepare = prepareByReplace;
            } else if (o.wildcard) {
                prepare = prepareByWildcard;
            } else {
                prepare = idenityPrepare;
            }
            return prepare;
            function prepareByReplace(query, settings) {
                settings.url = replace(settings.url, query);
                return settings;
            }
            function prepareByWildcard(query, settings) {
                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
                return settings;
            }
            function idenityPrepare(query, settings) {
                return settings;
            }
        }
        function toLimiter(o) {
            var limiter, method, wait;
            limiter = o.limiter;
            method = o.rateLimitBy;
            wait = o.rateLimitWait;
            if (!limiter) {
                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
            }
            return limiter;
            function debounce(wait) {
                return function debounce(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function throttle(wait) {
                return function throttle(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
        function callbackToDeferred(fn) {
            return function wrapper(o) {
                var deferred = $.Deferred();
                fn(o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function() {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function() {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var Bloodhound = function() {
        "use strict";
        var old;
        old = window && window.Bloodhound;
        function Bloodhound(o) {
            o = oParser(o);
            this.sorter = o.sorter;
            this.identify = o.identify;
            this.sufficient = o.sufficient;
            this.indexRemote = o.indexRemote;
            this.local = o.local;
            this.remote = o.remote ? new Remote(o.remote) : null;
            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
            this.index = new SearchIndex({
                identify: this.identify,
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            o.initialize !== false && this.initialize();
        }
        Bloodhound.noConflict = function noConflict() {
            window && (window.Bloodhound = old);
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            __ttAdapter: function ttAdapter() {
                var that = this;
                return this.remote ? withAsync : withoutAsync;
                function withAsync(query, sync, async) {
                    return that.search(query, sync, async);
                }
                function withoutAsync(query, sync) {
                    return that.search(query, sync);
                }
            },
            _loadPrefetch: function loadPrefetch() {
                var that = this, deferred, serialized;
                deferred = $.Deferred();
                if (!this.prefetch) {
                    deferred.resolve();
                } else if (serialized = this.prefetch.fromCache()) {
                    this.index.bootstrap(serialized);
                    deferred.resolve();
                } else {
                    this.prefetch.fromNetwork(done);
                }
                return deferred.promise();
                function done(err, data) {
                    if (err) {
                        return deferred.reject();
                    }
                    that.add(data);
                    that.prefetch.store(that.index.serialize());
                    deferred.resolve();
                }
            },
            _initialize: function initialize() {
                var that = this, deferred;
                this.clear();
                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
                return this.initPromise;
                function addLocalToIndex() {
                    that.add(that.local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
                return this;
            },
            get: function get(ids) {
                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
                return this.index.get(ids);
            },
            search: function search(query, sync, async) {
                var that = this, local;
                sync = sync || _.noop;
                async = async || _.noop;
                local = this.sorter(this.index.search(query));
                sync(this.remote ? local.slice() : local);
                if (this.remote && local.length < this.sufficient) {
                    this.remote.get(query, processRemote);
                } else if (this.remote) {
                    this.remote.cancelLastRequest();
                }
                return this;
                function processRemote(remote) {
                    var nonDuplicates = [];
                    _.each(remote, function(r) {
                        !_.some(local, function(l) {
                            return that.identify(r) === that.identify(l);
                        }) && nonDuplicates.push(r);
                    });
                    that.indexRemote && that.add(nonDuplicates);
                    async(nonDuplicates);
                }
            },
            all: function all() {
                return this.index.all();
            },
            clear: function clear() {
                this.index.reset();
                return this;
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.prefetch && this.prefetch.clear();
                return this;
            },
            clearRemoteCache: function clearRemoteCache() {
                Transport.resetCache();
                return this;
            },
            ttAdapter: function ttAdapter() {
                return this.__ttAdapter();
            }
        });
        return Bloodhound;
    }();
    return Bloodhound;
});

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], function(a0) {
            return factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var WWW = function() {
        "use strict";
        var defaultClassNames = {
            wrapper: "twitter-typeahead",
            input: "tt-input",
            hint: "tt-hint",
            menu: "tt-menu",
            dataset: "tt-dataset",
            suggestion: "tt-suggestion",
            selectable: "tt-selectable",
            empty: "tt-empty",
            open: "tt-open",
            cursor: "tt-cursor",
            highlight: "tt-highlight"
        };
        return build;
        function build(o) {
            var www, classes;
            classes = _.mixin({}, defaultClassNames, o);
            www = {
                css: buildCss(),
                classes: classes,
                html: buildHtml(classes),
                selectors: buildSelectors(classes)
            };
            return {
                css: www.css,
                html: www.html,
                classes: www.classes,
                selectors: www.selectors,
                mixin: function(o) {
                    _.mixin(o, www);
                }
            };
        }
        function buildHtml(c) {
            return {
                wrapper: '<span class="' + c.wrapper + '"></span>',
                menu: '<div class="' + c.menu + '"></div>'
            };
        }
        function buildSelectors(classes) {
            var selectors = {};
            _.each(classes, function(v, k) {
                selectors[k] = "." + v;
            });
            return selectors;
        }
        function buildCss() {
            var css = {
                wrapper: {
                    position: "relative",
                    display: "inline-block"
                },
                hint: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    borderColor: "transparent",
                    boxShadow: "none",
                    opacity: "1"
                },
                input: {
                    position: "relative",
                    verticalAlign: "top",
                    backgroundColor: "transparent"
                },
                inputWithNoHint: {
                    position: "relative",
                    verticalAlign: "top"
                },
                menu: {
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    zIndex: "100",
                    display: "none"
                },
                ltr: {
                    left: "0",
                    right: "auto"
                },
                rtl: {
                    left: "auto",
                    right: " 0"
                }
            };
            if (_.isMsie()) {
                _.mixin(css.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                });
            }
            return css;
        }
    }();
    var EventBus = function() {
        "use strict";
        var namespace, deprecationMap;
        namespace = "typeahead:";
        deprecationMap = {
            render: "rendered",
            cursorchange: "cursorchanged",
            select: "selected",
            autocomplete: "autocompleted"
        };
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            _trigger: function(type, args) {
                var $e;
                $e = $.Event(namespace + type);
                (args = args || []).unshift($e);
                this.$el.trigger.apply(this.$el, args);
                return $e;
            },
            before: function(type) {
                var args, $e;
                args = [].slice.call(arguments, 1);
                $e = this._trigger("before" + type, args);
                return $e.isDefaultPrevented();
            },
            trigger: function(type) {
                var deprecatedType;
                this._trigger(type, [].slice.call(arguments, 1));
                if (deprecatedType = deprecationMap[type]) {
                    this._trigger(deprecatedType, [].slice.call(arguments, 1));
                }
            }
        });
        return EventBus;
    }();
    var EventEmitter = function() {
        "use strict";
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function() {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function() {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function() {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function(doc) {
        "use strict";
        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function() {
        "use strict";
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o, www) {
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            www.mixin(this);
            this.$hint = $(o.hint);
            this.$input = $(o.input);
            this.query = this.$input.val();
            this.queryWhenFocused = this.hasFocus() ? this.query : null;
            this.$overflowHelper = buildOverflowHelper(this.$input);
            this._checkLanguageDirection();
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
        }
        Input.normalizeQuery = function(str) {
            return _.toStr(str).replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.queryWhenFocused = this.query;
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._setQuery(this.getInputValue());
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault;
                switch (keyName) {
                  case "up":
                  case "down":
                    preventDefault = !withModifier($e);
                    break;

                  default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                  case "tab":
                    trigger = !withModifier($e);
                    break;

                  default:
                    trigger = true;
                }
                return trigger;
            },
            _checkLanguageDirection: function checkLanguageDirection() {
                var dir = (this.$input.css("direction") || "ltr").toLowerCase();
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.$hint.attr("dir", dir);
                    this.trigger("langDirChanged", dir);
                }
            },
            _setQuery: function setQuery(val, silent) {
                var areEquivalent, hasDifferentWhitespace;
                areEquivalent = areQueriesEquivalent(val, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== val.length : false;
                this.query = val;
                if (!silent && !areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (!silent && hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            bind: function() {
                var that = this, onBlur, onFocus, onKeydown, onInput;
                onBlur = _.bind(this._onBlur, this);
                onFocus = _.bind(this._onFocus, this);
                onKeydown = _.bind(this._onKeydown, this);
                onInput = _.bind(this._onInput, this);
                this.$input.on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
                if (!_.isMsie() || _.isMsie() > 9) {
                    this.$input.on("input.tt", onInput);
                } else {
                    this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                        if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                            return;
                        }
                        _.defer(_.bind(that._onInput, that, $e));
                    });
                }
                return this;
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getLangDir: function getLangDir() {
                return this.dir;
            },
            getQuery: function getQuery() {
                return this.query || "";
            },
            setQuery: function setQuery(val, silent) {
                this.setInputValue(val);
                this._setQuery(val, silent);
            },
            hasQueryChangedSinceLastFocus: function hasQueryChangedSinceLastFocus() {
                return this.query !== this.queryWhenFocused;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value) {
                this.$input.val(value);
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            hasFocus: function hasFocus() {
                return this.$input.is(":focus");
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$overflowHelper.remove();
                this.$hint = this.$input = this.$overflowHelper = $("<div>");
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function() {
        "use strict";
        var keys, nameGenerator;
        keys = {
            val: "tt-selectable-display",
            obj: "tt-selectable-object"
        };
        nameGenerator = _.getIdGenerator();
        function Dataset(o, www) {
            o = o || {};
            o.templates = o.templates || {};
            o.templates.notFound = o.templates.notFound || o.templates.empty;
            if (!o.source) {
                $.error("missing source");
            }
            if (!o.node) {
                $.error("missing node");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            www.mixin(this);
            this.highlight = !!o.highlight;
            this.name = o.name || nameGenerator();
            this.limit = o.limit || 5;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source;
            this.async = _.isUndefined(o.async) ? this.source.length > 2 : !!o.async;
            this._resetLastSuggestion();
            this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name);
        }
        Dataset.extractData = function extractData(el) {
            var $el = $(el);
            if ($el.data(keys.obj)) {
                return {
                    val: $el.data(keys.val) || "",
                    obj: $el.data(keys.obj) || null
                };
            }
            return null;
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _overwrite: function overwrite(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (this.async && this.templates.pending) {
                    this._renderPending(query);
                } else if (!this.async && this.templates.notFound) {
                    this._renderNotFound(query);
                } else {
                    this._empty();
                }
                this.trigger("rendered", this.name, suggestions, false);
            },
            _append: function append(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length && this.$lastSuggestion.length) {
                    this._appendSuggestions(query, suggestions);
                } else if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (!this.$lastSuggestion.length && this.templates.notFound) {
                    this._renderNotFound(query);
                }
                this.trigger("rendered", this.name, suggestions, true);
            },
            _renderSuggestions: function renderSuggestions(query, suggestions) {
                var $fragment;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                this.$lastSuggestion = $fragment.children().last();
                this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions));
            },
            _appendSuggestions: function appendSuggestions(query, suggestions) {
                var $fragment, $lastSuggestion;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                $lastSuggestion = $fragment.children().last();
                this.$lastSuggestion.after($fragment);
                this.$lastSuggestion = $lastSuggestion;
            },
            _renderPending: function renderPending(query) {
                var template = this.templates.pending;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _renderNotFound: function renderNotFound(query) {
                var template = this.templates.notFound;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _empty: function empty() {
                this.$el.empty();
                this._resetLastSuggestion();
            },
            _getSuggestionsFragment: function getSuggestionsFragment(query, suggestions) {
                var that = this, fragment;
                fragment = document.createDocumentFragment();
                _.each(suggestions, function getSuggestionNode(suggestion) {
                    var $el, context;
                    context = that._injectQuery(query, suggestion);
                    $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + " " + that.classes.selectable);
                    fragment.appendChild($el[0]);
                });
                this.highlight && highlight({
                    className: this.classes.highlight,
                    node: fragment,
                    pattern: query
                });
                return $(fragment);
            },
            _getFooter: function getFooter(query, suggestions) {
                return this.templates.footer ? this.templates.footer({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _getHeader: function getHeader(query, suggestions) {
                return this.templates.header ? this.templates.header({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _resetLastSuggestion: function resetLastSuggestion() {
                this.$lastSuggestion = $();
            },
            _injectQuery: function injectQuery(query, obj) {
                return _.isObject(obj) ? _.mixin({
                    _query: query
                }, obj) : obj;
            },
            update: function update(query) {
                var that = this, canceled = false, syncCalled = false, rendered = 0;
                this.cancel();
                this.cancel = function cancel() {
                    canceled = true;
                    that.cancel = $.noop;
                    that.async && that.trigger("asyncCanceled", query);
                };
                this.source(query, sync, async);
                !syncCalled && sync([]);
                function sync(suggestions) {
                    if (syncCalled) {
                        return;
                    }
                    syncCalled = true;
                    suggestions = (suggestions || []).slice(0, that.limit);
                    rendered = suggestions.length;
                    that._overwrite(query, suggestions);
                    if (rendered < that.limit && that.async) {
                        that.trigger("asyncRequested", query);
                    }
                }
                function async(suggestions) {
                    suggestions = suggestions || [];
                    if (!canceled && rendered < that.limit) {
                        that.cancel = $.noop;
                        that._append(query, suggestions.slice(0, that.limit - rendered));
                        rendered += suggestions.length;
                        that.async && that.trigger("asyncReceived", query);
                    }
                }
            },
            cancel: $.noop,
            clear: function clear() {
                this._empty();
                this.cancel();
                this.trigger("cleared");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = $("<div>");
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || _.stringify;
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                notFound: templates.notFound && _.templatify(templates.notFound),
                pending: templates.pending && _.templatify(templates.pending),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return $("<div>").text(displayFn(context));
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Menu = function() {
        "use strict";
        function Menu(o, www) {
            var that = this;
            o = o || {};
            if (!o.node) {
                $.error("node is required");
            }
            www.mixin(this);
            this.$node = $(o.node);
            this.query = null;
            this.datasets = _.map(o.datasets, initializeDataset);
            function initializeDataset(oDataset) {
                var node = that.$node.find(oDataset.node).first();
                oDataset.node = node.length ? node : $("<div>").appendTo(that.$node);
                return new Dataset(oDataset, www);
            }
        }
        _.mixin(Menu.prototype, EventEmitter, {
            _onSelectableClick: function onSelectableClick($e) {
                this.trigger("selectableClicked", $($e.currentTarget));
            },
            _onRendered: function onRendered(type, dataset, suggestions, async) {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetRendered", dataset, suggestions, async);
            },
            _onCleared: function onCleared() {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetCleared");
            },
            _propagate: function propagate() {
                this.trigger.apply(this, arguments);
            },
            _allDatasetsEmpty: function allDatasetsEmpty() {
                return _.every(this.datasets, isDatasetEmpty);
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _getSelectables: function getSelectables() {
                return this.$node.find(this.selectors.selectable);
            },
            _removeCursor: function _removeCursor() {
                var $selectable = this.getActiveSelectable();
                $selectable && $selectable.removeClass(this.classes.cursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, nodeScrollTop, nodeHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                nodeScrollTop = this.$node.scrollTop();
                nodeHeight = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$node.scrollTop(nodeScrollTop + elTop);
                } else if (nodeHeight < elBottom) {
                    this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
                }
            },
            bind: function() {
                var that = this, onSelectableClick;
                onSelectableClick = _.bind(this._onSelectableClick, this);
                this.$node.on("click.tt", this.selectors.selectable, onSelectableClick);
                _.each(this.datasets, function(dataset) {
                    dataset.onSync("asyncRequested", that._propagate, that).onSync("asyncCanceled", that._propagate, that).onSync("asyncReceived", that._propagate, that).onSync("rendered", that._onRendered, that).onSync("cleared", that._onCleared, that);
                });
                return this;
            },
            isOpen: function isOpen() {
                return this.$node.hasClass(this.classes.open);
            },
            open: function open() {
                this.$node.scrollTop(0);
                this.$node.addClass(this.classes.open);
            },
            close: function close() {
                this.$node.removeClass(this.classes.open);
                this._removeCursor();
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.attr("dir", dir);
            },
            selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
                var $selectables, $oldCursor, oldIndex, newIndex;
                $oldCursor = this.getActiveSelectable();
                $selectables = this._getSelectables();
                oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
                newIndex = oldIndex + delta;
                newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;
                newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;
                return newIndex === -1 ? null : $selectables.eq(newIndex);
            },
            setCursor: function setCursor($selectable) {
                this._removeCursor();
                if ($selectable = $selectable && $selectable.first()) {
                    $selectable.addClass(this.classes.cursor);
                    this._ensureVisible($selectable);
                }
            },
            getSelectableData: function getSelectableData($el) {
                return $el && $el.length ? Dataset.extractData($el) : null;
            },
            getActiveSelectable: function getActiveSelectable() {
                var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
                return $selectable.length ? $selectable : null;
            },
            getTopSelectable: function getTopSelectable() {
                var $selectable = this._getSelectables().first();
                return $selectable.length ? $selectable : null;
            },
            update: function update(query) {
                var isValidUpdate = query !== this.query;
                if (isValidUpdate) {
                    this.query = query;
                    _.each(this.datasets, updateDataset);
                }
                return isValidUpdate;
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.query = null;
                this.$node.addClass(this.classes.empty);
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            destroy: function destroy() {
                this.$node.off(".tt");
                this.$node = $("<div>");
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Menu;
    }();
    var DefaultMenu = function() {
        "use strict";
        var s = Menu.prototype;
        function DefaultMenu() {
            Menu.apply(this, [].slice.call(arguments, 0));
        }
        _.mixin(DefaultMenu.prototype, Menu.prototype, {
            open: function open() {
                !this._allDatasetsEmpty() && this._show();
                return s.open.apply(this, [].slice.call(arguments, 0));
            },
            close: function close() {
                this._hide();
                return s.close.apply(this, [].slice.call(arguments, 0));
            },
            _onRendered: function onRendered() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onRendered.apply(this, [].slice.call(arguments, 0));
            },
            _onCleared: function onCleared() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onCleared.apply(this, [].slice.call(arguments, 0));
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.css(dir === "ltr" ? this.css.ltr : this.css.rtl);
                return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
            },
            _hide: function hide() {
                this.$node.hide();
            },
            _show: function show() {
                this.$node.css("display", "block");
            }
        });
        return DefaultMenu;
    }();
    var Typeahead = function() {
        "use strict";
        function Typeahead(o, www) {
            var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            if (!o.menu) {
                $.error("missing menu");
            }
            if (!o.eventBus) {
                $.error("missing event bus");
            }
            www.mixin(this);
            this.eventBus = o.eventBus;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.input = o.input;
            this.menu = o.menu;
            this.enabled = true;
            this.active = false;
            this.input.hasFocus() && this.activate();
            this.dir = this.input.getLangDir();
            this._hacks();
            this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
            onFocused = c(this, "activate", "open", "_onFocused");
            onBlurred = c(this, "deactivate", "_onBlurred");
            onEnterKeyed = c(this, "isActive", "isOpen", "_onEnterKeyed");
            onTabKeyed = c(this, "isActive", "isOpen", "_onTabKeyed");
            onEscKeyed = c(this, "isActive", "_onEscKeyed");
            onUpKeyed = c(this, "isActive", "open", "_onUpKeyed");
            onDownKeyed = c(this, "isActive", "open", "_onDownKeyed");
            onLeftKeyed = c(this, "isActive", "isOpen", "_onLeftKeyed");
            onRightKeyed = c(this, "isActive", "isOpen", "_onRightKeyed");
            onQueryChanged = c(this, "_openIfActive", "_onQueryChanged");
            onWhitespaceChanged = c(this, "_openIfActive", "_onWhitespaceChanged");
            this.input.bind().onSync("focused", onFocused, this).onSync("blurred", onBlurred, this).onSync("enterKeyed", onEnterKeyed, this).onSync("tabKeyed", onTabKeyed, this).onSync("escKeyed", onEscKeyed, this).onSync("upKeyed", onUpKeyed, this).onSync("downKeyed", onDownKeyed, this).onSync("leftKeyed", onLeftKeyed, this).onSync("rightKeyed", onRightKeyed, this).onSync("queryChanged", onQueryChanged, this).onSync("whitespaceChanged", onWhitespaceChanged, this).onSync("langDirChanged", this._onLangDirChanged, this);
        }
        _.mixin(Typeahead.prototype, {
            _hacks: function hacks() {
                var $input, $menu;
                $input = this.input.$input || $("<div>");
                $menu = this.menu.$node || $("<div>");
                $input.on("blur.tt", function($e) {
                    var active, isActive, hasActive;
                    active = document.activeElement;
                    isActive = $menu.is(active);
                    hasActive = $menu.has(active).length > 0;
                    if (_.isMsie() && (isActive || hasActive)) {
                        $e.preventDefault();
                        $e.stopImmediatePropagation();
                        _.defer(function() {
                            $input.focus();
                        });
                    }
                });
                $menu.on("mousedown.tt", function($e) {
                    $e.preventDefault();
                });
            },
            _onSelectableClicked: function onSelectableClicked(type, $el) {
                this.select($el);
            },
            _onDatasetCleared: function onDatasetCleared() {
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered(type, dataset, suggestions, async) {
                this._updateHint();
                this.eventBus.trigger("render", suggestions, async, dataset);
            },
            _onAsyncRequested: function onAsyncRequested(type, dataset, query) {
                this.eventBus.trigger("asyncrequest", query, dataset);
            },
            _onAsyncCanceled: function onAsyncCanceled(type, dataset, query) {
                this.eventBus.trigger("asynccancel", query, dataset);
            },
            _onAsyncReceived: function onAsyncReceived(type, dataset, query) {
                this.eventBus.trigger("asyncreceive", query, dataset);
            },
            _onFocused: function onFocused() {
                this._minLengthMet() && this.menu.update(this.input.getQuery());
            },
            _onBlurred: function onBlurred() {
                if (this.input.hasQueryChangedSinceLastFocus()) {
                    this.eventBus.trigger("change", this.input.getQuery());
                }
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                } else if ($selectable = this.menu.getTopSelectable()) {
                    this.autocomplete($selectable) && $e.preventDefault();
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.close();
            },
            _onUpKeyed: function onUpKeyed() {
                this.moveCursor(-1);
            },
            _onDownKeyed: function onDownKeyed() {
                this.moveCursor(+1);
            },
            _onLeftKeyed: function onLeftKeyed() {
                if (this.dir === "rtl" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onRightKeyed: function onRightKeyed() {
                if (this.dir === "ltr" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
            },
            _onLangDirChanged: function onLangDirChanged(e, dir) {
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.menu.setLanguageDirection(dir);
                }
            },
            _openIfActive: function openIfActive() {
                this.isActive() && this.open();
            },
            _minLengthMet: function minLengthMet(query) {
                query = _.isString(query) ? query : this.input.getQuery() || "";
                return query.length >= this.minLength;
            },
            _updateHint: function updateHint() {
                var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
                $selectable = this.menu.getTopSelectable();
                data = this.menu.getSelectableData($selectable);
                val = this.input.getInputValue();
                if (data && !_.isBlankString(val) && !this.input.hasOverflow()) {
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(data.val);
                    match && this.input.setHint(val + match[1]);
                } else {
                    this.input.clearHint();
                }
            },
            isEnabled: function isEnabled() {
                return this.enabled;
            },
            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            isActive: function isActive() {
                return this.active;
            },
            activate: function activate() {
                if (this.isActive()) {
                    return true;
                } else if (!this.isEnabled() || this.eventBus.before("active")) {
                    return false;
                } else {
                    this.active = true;
                    this.eventBus.trigger("active");
                    return true;
                }
            },
            deactivate: function deactivate() {
                if (!this.isActive()) {
                    return true;
                } else if (this.eventBus.before("idle")) {
                    return false;
                } else {
                    this.active = false;
                    this.close();
                    this.eventBus.trigger("idle");
                    return true;
                }
            },
            isOpen: function isOpen() {
                return this.menu.isOpen();
            },
            open: function open() {
                if (!this.isOpen() && !this.eventBus.before("open")) {
                    this.menu.open();
                    this._updateHint();
                    this.eventBus.trigger("open");
                }
                return this.isOpen();
            },
            close: function close() {
                if (this.isOpen() && !this.eventBus.before("close")) {
                    this.menu.close();
                    this.input.clearHint();
                    this.input.resetInputValue();
                    this.eventBus.trigger("close");
                }
                return !this.isOpen();
            },
            setVal: function setVal(val) {
                this.input.setQuery(_.toStr(val));
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            select: function select($selectable) {
                var data = this.menu.getSelectableData($selectable);
                if (data && !this.eventBus.before("select", data.obj)) {
                    this.input.setQuery(data.val, true);
                    this.eventBus.trigger("select", data.obj);
                    this.close();
                    return true;
                }
                return false;
            },
            autocomplete: function autocomplete($selectable) {
                var query, data, isValid;
                query = this.input.getQuery();
                data = this.menu.getSelectableData($selectable);
                isValid = data && query !== data.val;
                if (isValid && !this.eventBus.before("autocomplete", data.obj)) {
                    this.input.setQuery(data.val);
                    this.eventBus.trigger("autocomplete", data.obj);
                    return true;
                }
                return false;
            },
            moveCursor: function moveCursor(delta) {
                var query, $candidate, data, payload, cancelMove;
                query = this.input.getQuery();
                $candidate = this.menu.selectableRelativeToCursor(delta);
                data = this.menu.getSelectableData($candidate);
                payload = data ? data.obj : null;
                cancelMove = this._minLengthMet() && this.menu.update(query);
                if (!cancelMove && !this.eventBus.before("cursorchange", payload)) {
                    this.menu.setCursor($candidate);
                    if (data) {
                        this.input.setInputValue(data.val);
                    } else {
                        this.input.resetInputValue();
                        this._updateHint();
                    }
                    this.eventBus.trigger("cursorchange", payload);
                    return true;
                }
                return false;
            },
            destroy: function destroy() {
                this.input.destroy();
                this.menu.destroy();
            }
        });
        return Typeahead;
        function c(ctx) {
            var methods = [].slice.call(arguments, 1);
            return function() {
                var args = [].slice.call(arguments);
                _.each(methods, function(method) {
                    return ctx[method].apply(ctx, args);
                });
            };
        }
    }();
    (function() {
        "use strict";
        var old, keys, methods;
        old = $.fn.typeahead;
        keys = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        };
        methods = {
            initialize: function initialize(o, datasets) {
                var www;
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                www = WWW(o.classNames);
                return this.each(attach);
                function attach() {
                    var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
                    _.each(datasets, function(d) {
                        d.highlight = !!o.highlight;
                    });
                    $input = $(this);
                    $wrapper = $(www.html.wrapper);
                    $hint = $elOrNull(o.hint);
                    $menu = $elOrNull(o.menu);
                    defaultHint = o.hint !== false && !$hint;
                    defaultMenu = o.menu !== false && !$menu;
                    defaultHint && ($hint = buildHintFromInput($input, www));
                    defaultMenu && ($menu = $(www.html.menu).css(www.css.menu));
                    $hint && $hint.val("");
                    $input = prepInput($input, www);
                    if (defaultHint || defaultMenu) {
                        $wrapper.css(www.css.wrapper);
                        $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint);
                        $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null);
                    }
                    MenuConstructor = defaultMenu ? DefaultMenu : Menu;
                    eventBus = new EventBus({
                        el: $input
                    });
                    input = new Input({
                        hint: $hint,
                        input: $input
                    }, www);
                    menu = new MenuConstructor({
                        node: $menu,
                        datasets: datasets
                    }, www);
                    typeahead = new Typeahead({
                        input: input,
                        menu: menu,
                        eventBus: eventBus,
                        minLength: o.minLength
                    }, www);
                    $input.data(keys.www, www);
                    $input.data(keys.typeahead, typeahead);
                }
            },
            isEnabled: function isEnabled() {
                var enabled;
                ttEach(this.first(), function(t) {
                    enabled = t.isEnabled();
                });
                return enabled;
            },
            enable: function enable() {
                ttEach(this, function(t) {
                    t.enable();
                });
                return this;
            },
            disable: function disable() {
                ttEach(this, function(t) {
                    t.disable();
                });
                return this;
            },
            isActive: function isActive() {
                var active;
                ttEach(this.first(), function(t) {
                    active = t.isActive();
                });
                return active;
            },
            activate: function activate() {
                ttEach(this, function(t) {
                    t.activate();
                });
                return this;
            },
            deactivate: function deactivate() {
                ttEach(this, function(t) {
                    t.deactivate();
                });
                return this;
            },
            isOpen: function isOpen() {
                var open;
                ttEach(this.first(), function(t) {
                    open = t.isOpen();
                });
                return open;
            },
            open: function open() {
                ttEach(this, function(t) {
                    t.open();
                });
                return this;
            },
            close: function close() {
                ttEach(this, function(t) {
                    t.close();
                });
                return this;
            },
            select: function select(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.select($el);
                });
                return success;
            },
            autocomplete: function autocomplete(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.autocomplete($el);
                });
                return success;
            },
            moveCursor: function moveCursoe(delta) {
                var success = false;
                ttEach(this.first(), function(t) {
                    success = t.moveCursor(delta);
                });
                return success;
            },
            val: function val(newVal) {
                var query;
                if (!arguments.length) {
                    ttEach(this.first(), function(t) {
                        query = t.getVal();
                    });
                    return query;
                } else {
                    ttEach(this, function(t) {
                        t.setVal(_.toStr(newVal));
                    });
                    return this;
                }
            },
            destroy: function destroy() {
                ttEach(this, function(typeahead, $input) {
                    revert($input);
                    typeahead.destroy();
                });
                return this;
            }
        };
        $.fn.typeahead = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
        function ttEach($els, fn) {
            $els.each(function() {
                var $input = $(this), typeahead;
                (typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input);
            });
        }
        function buildHintFromInput($input, www) {
            return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly", true).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
        }
        function prepInput($input, www) {
            $input.data(keys.attrs, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass(www.classes.input).attr({
                autocomplete: "off",
                spellcheck: false
            });
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input;
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function revert($input) {
            var www, $wrapper;
            www = $input.data(keys.www);
            $wrapper = $input.parent().filter(www.selectors.wrapper);
            _.each($input.data(keys.attrs), function(val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);
            if ($wrapper.length) {
                $input.detach().insertAfter($wrapper);
                $wrapper.remove();
            }
        }
        function $elOrNull(obj) {
            var isValid, $el;
            isValid = _.isJQuery(obj) || _.isElement(obj);
            $el = isValid ? $(obj).first() : [];
            return $el.length ? $el : null;
        }
    })();
});

// This file is generated by Blacklight. You probably don't want to edit
//   this file directly, or you'll have to manually merge your changes if later
//   versions of Blacklight change this file. Instead, use your own JS file
//   which over-rides things in this JS file, as described below.
//
// These javascript files are compiled in via the Rails asset pipeline:








//
//Bootstrap JS for providing collapsable tablet/mobile menu/alert boxes






// Twitter Typeahead for autocomplete


/* Blacklight has a Javascript setup meant to support local disabling, 
  modification, and use of Blacklight behaviors. 
  
  There is a global Blacklight object, available to your local JS. 
  
  Individual logic to apply JS behaviors to particular elements is 
  stored in functions on that Blacklight object. 
  
  The actual behaviors themselves are implemented as JQuery plugins, 
  JQuery-UI widgets (a special kind of JQuery plugin), or in some cases
  just as logic in the Blacklight global object. 
  
  All of these things can be modified by your local JS code -- these functions
  are all set up on js load, and only called on document ready, so do your
  modifications just on js load, and they'll be made by the time document ready
  comes along. 
  
  Examples, in your application's own JS:
        
    Turn off adding of behavior to facet 'more' links, using a no-op function:
    
        Blacklight.do_more_facets_behavior = function() {};
        
    Change the implementation of facet 'more' link behavior to use entirely
    different JS. 
    
        Blacklight.do_more_facets_behavior = function() {
          $(Blacklight.do_more_facets_behavior.selector).each(function() {
            //my own thing!
          });
        };
*/


$('.no-js').removeClass('no-js').addClass('js');
// app/assets/javascripts/analytics.js

$(document).on('page:change', function() {
 if (window._gaq != null) {
  return _gaq.push(['_trackPageview']);
 } else if (window.pageTracker != null) {
  return pageTracker._trackPageview();
 }
});
//! openseadragon 2.2.1
//! Built on 2016-06-21
//! Git commit: v2.2.1-0-babdefd
//! http://openseadragon.github.io
//! License: http://openseadragon.github.io/license/


window.OpenSeadragon=window.OpenSeadragon||function(a){return new OpenSeadragon.Viewer(a)};"function"==typeof define&&define.amd&&define(function(){return window.OpenSeadragon});!function(a){a.version={versionStr:"<%= osdVersion.versionStr %>",major:parseInt("<%= osdVersion.major %>",10),minor:parseInt("<%= osdVersion.minor %>",10),revision:parseInt("<%= osdVersion.revision %>",10)};var b={"[object Boolean]":"boolean","[object Number]":"number","[object String]":"string","[object Function]":"function","[object Array]":"array","[object Date]":"date","[object RegExp]":"regexp","[object Object]":"object"},c=Object.prototype.toString,d=Object.prototype.hasOwnProperty;a.isFunction=function(b){return"function"===a.type(b)};a.isArray=Array.isArray||function(b){return"array"===a.type(b)};a.isWindow=function(a){return a&&"object"==typeof a&&"setInterval"in a};a.type=function(a){return null===a||void 0===a?String(a):b[c.call(a)]||"object"};a.isPlainObject=function(b){if(!b||"object"!==OpenSeadragon.type(b)||b.nodeType||a.isWindow(b))return!1;if(b.constructor&&!d.call(b,"constructor")&&!d.call(b.constructor.prototype,"isPrototypeOf"))return!1;var c;for(var e in b)c=e;return void 0===c||d.call(b,c)};a.isEmptyObject=function(a){for(var b in a)return!1;return!0};a.freezeObject=function(b){Object.freeze?a.freezeObject=Object.freeze:a.freezeObject=function(a){return a};return a.freezeObject(b)};a.supportsCanvas=function(){var b=document.createElement("canvas");return!(!a.isFunction(b.getContext)||!b.getContext("2d"))}();a.isCanvasTainted=function(a){var b=!1;try{a.getContext("2d").getImageData(0,0,1,1)}catch(c){b=!0}return b};a.pixelDensityRatio=function(){if(a.supportsCanvas){var b=document.createElement("canvas").getContext("2d");var c=window.devicePixelRatio||1;var d=b.webkitBackingStorePixelRatio||b.mozBackingStorePixelRatio||b.msBackingStorePixelRatio||b.oBackingStorePixelRatio||b.backingStorePixelRatio||1;return c/d}return 1}()}(OpenSeadragon);!function($){function getOffsetParent(a,b){return b&&a!=document.body?document.body:a.offsetParent}$.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=arguments.length,i=!1,j=1;if("boolean"==typeof g){i=g;g=arguments[1]||{};j=2}"object"==typeof g||OpenSeadragon.isFunction(g)||(g={});if(h===j){g=this;--j}for(;h>j;j++){a=arguments[j];if(null!==a||void 0!==a)for(b in a){c=g[b];d=a[b];if(g!==d)if(i&&d&&(OpenSeadragon.isPlainObject(d)||(e=OpenSeadragon.isArray(d)))){if(e){e=!1;f=c&&OpenSeadragon.isArray(c)?c:[]}else f=c&&OpenSeadragon.isPlainObject(c)?c:{};g[b]=OpenSeadragon.extend(i,f,d)}else void 0!==d&&(g[b]=d)}}return g};var isIOSDevice=function(){if("object"!=typeof navigator)return!1;var a=navigator.userAgent;return"string"!=typeof a?!1:-1!==a.indexOf("iPhone")||-1!==a.indexOf("iPad")||-1!==a.indexOf("iPod")};$.extend($,{DEFAULT_SETTINGS:{xmlPath:null,tileSources:null,tileHost:null,initialPage:0,crossOriginPolicy:!1,ajaxWithCredentials:!1,panHorizontal:!0,panVertical:!0,constrainDuringPan:!1,wrapHorizontal:!1,wrapVertical:!1,visibilityRatio:.5,minPixelRatio:.5,defaultZoomLevel:0,minZoomLevel:null,maxZoomLevel:null,homeFillsViewer:!1,clickTimeThreshold:300,clickDistThreshold:5,dblClickTimeThreshold:300,dblClickDistThreshold:20,springStiffness:6.5,animationTime:1.2,gestureSettingsMouse:{scrollToZoom:!0,clickToZoom:!0,dblClickToZoom:!1,pinchToZoom:!1,flickEnabled:!1,flickMinSpeed:120,flickMomentum:.25,pinchRotate:!1},gestureSettingsTouch:{scrollToZoom:!1,clickToZoom:!1,dblClickToZoom:!0,pinchToZoom:!0,flickEnabled:!0,flickMinSpeed:120,flickMomentum:.25,pinchRotate:!1},gestureSettingsPen:{scrollToZoom:!1,clickToZoom:!0,dblClickToZoom:!1,pinchToZoom:!1,flickEnabled:!1,flickMinSpeed:120,flickMomentum:.25,pinchRotate:!1},gestureSettingsUnknown:{scrollToZoom:!1,clickToZoom:!1,dblClickToZoom:!0,pinchToZoom:!0,flickEnabled:!0,flickMinSpeed:120,flickMomentum:.25,pinchRotate:!1},zoomPerClick:2,zoomPerScroll:1.2,zoomPerSecond:1,blendTime:0,alwaysBlend:!1,autoHideControls:!0,immediateRender:!1,minZoomImageRatio:.9,maxZoomPixelRatio:1.1,smoothTileEdgesMinZoom:1.1,iOSDevice:isIOSDevice(),pixelsPerWheelLine:40,autoResize:!0,preserveImageSizeOnResize:!1,minScrollDeltaTime:50,showSequenceControl:!0,sequenceControlAnchor:null,preserveViewport:!1,preserveOverlays:!1,navPrevNextWrap:!1,showNavigationControl:!0,navigationControlAnchor:null,showZoomControl:!0,showHomeControl:!0,showFullPageControl:!0,showRotationControl:!1,controlsFadeDelay:2e3,controlsFadeLength:1500,mouseNavEnabled:!0,showNavigator:!1,navigatorId:null,navigatorPosition:null,navigatorSizeRatio:.2,navigatorMaintainSizeRatio:!1,navigatorTop:null,navigatorLeft:null,navigatorHeight:null,navigatorWidth:null,navigatorAutoResize:!0,navigatorAutoFade:!0,navigatorRotate:!0,degrees:0,opacity:1,compositeOperation:null,placeholderFillStyle:null,showReferenceStrip:!1,referenceStripScroll:"horizontal",referenceStripElement:null,referenceStripHeight:null,referenceStripWidth:null,referenceStripPosition:"BOTTOM_LEFT",referenceStripSizeRatio:.2,collectionRows:3,collectionColumns:0,collectionLayout:"horizontal",collectionMode:!1,collectionTileSize:800,collectionTileMargin:80,imageLoaderLimit:0,maxImageCacheCount:200,timeout:3e4,useCanvas:!0,prefixUrl:"/images/",navImages:{zoomIn:{REST:"zoomin_rest.png",GROUP:"zoomin_grouphover.png",HOVER:"zoomin_hover.png",DOWN:"zoomin_pressed.png"},zoomOut:{REST:"zoomout_rest.png",GROUP:"zoomout_grouphover.png",HOVER:"zoomout_hover.png",DOWN:"zoomout_pressed.png"},home:{REST:"home_rest.png",GROUP:"home_grouphover.png",HOVER:"home_hover.png",DOWN:"home_pressed.png"},fullpage:{REST:"fullpage_rest.png",GROUP:"fullpage_grouphover.png",HOVER:"fullpage_hover.png",DOWN:"fullpage_pressed.png"},rotateleft:{REST:"rotateleft_rest.png",GROUP:"rotateleft_grouphover.png",HOVER:"rotateleft_hover.png",DOWN:"rotateleft_pressed.png"},rotateright:{REST:"rotateright_rest.png",GROUP:"rotateright_grouphover.png",HOVER:"rotateright_hover.png",DOWN:"rotateright_pressed.png"},previous:{REST:"previous_rest.png",GROUP:"previous_grouphover.png",HOVER:"previous_hover.png",DOWN:"previous_pressed.png"},next:{REST:"next_rest.png",GROUP:"next_grouphover.png",HOVER:"next_hover.png",DOWN:"next_pressed.png"}},debugMode:!1,debugGridColor:"#437AB2"},SIGNAL:"----seadragon----",delegate:function(a,b){return function(){var c=arguments;void 0===c&&(c=[]);return b.apply(a,c)}},BROWSERS:{UNKNOWN:0,IE:1,FIREFOX:2,SAFARI:3,CHROME:4,OPERA:5},getElement:function(a){"string"==typeof a&&(a=document.getElementById(a));return a},getElementPosition:function(a){var b,c,d=new $.Point;a=$.getElement(a);b="fixed"==$.getElementStyle(a).position;c=getOffsetParent(a,b);for(;c;){d.x+=a.offsetLeft;d.y+=a.offsetTop;b&&(d=d.plus($.getPageScroll()));a=c;b="fixed"==$.getElementStyle(a).position;c=getOffsetParent(a,b)}return d},getElementOffset:function(a){a=$.getElement(a);var b,c,d=a&&a.ownerDocument,e={top:0,left:0};if(!d)return new $.Point;b=d.documentElement;"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect());c=d==d.window?d:9===d.nodeType?d.defaultView||d.parentWindow:!1;return new $.Point(e.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0),e.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0))},getElementSize:function(a){a=$.getElement(a);return new $.Point(a.clientWidth,a.clientHeight)},getElementStyle:document.documentElement.currentStyle?function(a){a=$.getElement(a);return a.currentStyle}:function(a){a=$.getElement(a);return window.getComputedStyle(a,"")},getCssPropertyWithVendorPrefix:function(a){var b={};$.getCssPropertyWithVendorPrefix=function(a){if(void 0!==b[a])return b[a];var c=document.createElement("div").style;var d=null;if(void 0!==c[a])d=a;else{var e=["Webkit","Moz","MS","O","webkit","moz","ms","o"];var f=$.capitalizeFirstLetter(a);for(var g=0;g<e.length;g++){var h=e[g]+f;if(void 0!==c[h]){d=h;break}}}b[a]=d;return d};return $.getCssPropertyWithVendorPrefix(a)},capitalizeFirstLetter:function(a){return a.charAt(0).toUpperCase()+a.slice(1)},pointInElement:function(a,b){a=$.getElement(a);var c=$.getElementOffset(a),d=$.getElementSize(a);return b.x>=c.x&&b.x<c.x+d.x&&b.y<c.y+d.y&&b.y>=c.y},getEvent:function(a){a?$.getEvent=function(a){return a}:$.getEvent=function(){return window.event};return $.getEvent(a)},getMousePosition:function(a){if("number"==typeof a.pageX)$.getMousePosition=function(a){var b=new $.Point;a=$.getEvent(a);b.x=a.pageX;b.y=a.pageY;return b};else{if("number"!=typeof a.clientX)throw new Error("Unknown event mouse position, no known technique.");$.getMousePosition=function(a){var b=new $.Point;a=$.getEvent(a);b.x=a.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;b.y=a.clientY+document.body.scrollTop+document.documentElement.scrollTop;return b}}return $.getMousePosition(a)},getPageScroll:function(){var a=document.documentElement||{},b=document.body||{};if("number"==typeof window.pageXOffset)$.getPageScroll=function(){return new $.Point(window.pageXOffset,window.pageYOffset)};else if(b.scrollLeft||b.scrollTop)$.getPageScroll=function(){return new $.Point(document.body.scrollLeft,document.body.scrollTop)};else{if(!a.scrollLeft&&!a.scrollTop)return new $.Point(0,0);$.getPageScroll=function(){return new $.Point(document.documentElement.scrollLeft,document.documentElement.scrollTop)}}return $.getPageScroll()},setPageScroll:function(a){if("undefined"!=typeof window.scrollTo)$.setPageScroll=function(a){window.scrollTo(a.x,a.y)};else{var b=$.getPageScroll();if(b.x===a.x&&b.y===a.y)return;document.body.scrollLeft=a.x;document.body.scrollTop=a.y;var c=$.getPageScroll();if(c.x!==b.x&&c.y!==b.y){$.setPageScroll=function(a){document.body.scrollLeft=a.x;document.body.scrollTop=a.y};return}document.documentElement.scrollLeft=a.x;document.documentElement.scrollTop=a.y;c=$.getPageScroll();if(c.x!==b.x&&c.y!==b.y){$.setPageScroll=function(a){document.documentElement.scrollLeft=a.x;document.documentElement.scrollTop=a.y};return}$.setPageScroll=function(a){}}return $.setPageScroll(a)},getWindowSize:function(){var a=document.documentElement||{},b=document.body||{};if("number"==typeof window.innerWidth)$.getWindowSize=function(){return new $.Point(window.innerWidth,window.innerHeight)};else if(a.clientWidth||a.clientHeight)$.getWindowSize=function(){return new $.Point(document.documentElement.clientWidth,document.documentElement.clientHeight)};else{if(!b.clientWidth&&!b.clientHeight)throw new Error("Unknown window size, no known technique.");$.getWindowSize=function(){return new $.Point(document.body.clientWidth,document.body.clientHeight)}}return $.getWindowSize()},makeCenteredNode:function(a){a=$.getElement(a);var b=[$.makeNeutralElement("div"),$.makeNeutralElement("div"),$.makeNeutralElement("div")];$.extend(b[0].style,{display:"table",height:"100%",width:"100%"});$.extend(b[1].style,{display:"table-row"});$.extend(b[2].style,{display:"table-cell",verticalAlign:"middle",textAlign:"center"});b[0].appendChild(b[1]);b[1].appendChild(b[2]);b[2].appendChild(a);return b[0]},makeNeutralElement:function(a){var b=document.createElement(a),c=b.style;c.background="transparent none";c.border="none";c.margin="0px";c.padding="0px";c.position="static";return b},now:function(){Date.now?$.now=Date.now:$.now=function(){return(new Date).getTime()};return $.now()},makeTransparentImage:function(a){$.makeTransparentImage=function(a){var b=$.makeNeutralElement("img");b.src=a;return b};$.Browser.vendor==$.BROWSERS.IE&&$.Browser.version<7&&($.makeTransparentImage=function(a){var b=$.makeNeutralElement("img"),c=null;c=$.makeNeutralElement("span");c.style.display="inline-block";b.onload=function(){c.style.width=c.style.width||b.width+"px";c.style.height=c.style.height||b.height+"px";b.onload=null;b=null};b.src=a;c.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+a+"', sizingMethod='scale')";return c});return $.makeTransparentImage(a)},setElementOpacity:function(a,b,c){var d,e;a=$.getElement(a);c&&!$.Browser.alpha&&(b=Math.round(b));if($.Browser.opacity)a.style.opacity=1>b?b:"";else if(1>b){d=Math.round(100*b);e="alpha(opacity="+d+")";a.style.filter=e}else a.style.filter=""},setElementTouchActionNone:function(a){a=$.getElement(a);"undefined"!=typeof a.style.touchAction?a.style.touchAction="none":"undefined"!=typeof a.style.msTouchAction&&(a.style.msTouchAction="none")},addClass:function(a,b){a=$.getElement(a);a.className?-1===(" "+a.className+" ").indexOf(" "+b+" ")&&(a.className+=" "+b):a.className=b},indexOf:function(a,b,c){Array.prototype.indexOf?this.indexOf=function(a,b,c){return a.indexOf(b,c)}:this.indexOf=function(a,b,c){var d,e,f=c?c:0;if(!a)throw new TypeError;e=a.length;if(0===e||f>=e)return-1;0>f&&(f=e-Math.abs(f));for(d=f;e>d;d++)if(a[d]===b)return d;return-1};return this.indexOf(a,b,c)},removeClass:function(a,b){var c,d,e=[];a=$.getElement(a);c=a.className.split(/\s+/);for(d=0;d<c.length;d++)c[d]&&c[d]!==b&&e.push(c[d]);a.className=e.join(" ")},addEvent:function(){if(window.addEventListener)return function(a,b,c,d){a=$.getElement(a);a.addEventListener(b,c,d)};if(window.attachEvent)return function(a,b,c,d){a=$.getElement(a);a.attachEvent("on"+b,c)};throw new Error("No known event model.")}(),removeEvent:function(){if(window.removeEventListener)return function(a,b,c,d){a=$.getElement(a);a.removeEventListener(b,c,d)};if(window.detachEvent)return function(a,b,c,d){a=$.getElement(a);a.detachEvent("on"+b,c)};throw new Error("No known event model.")}(),cancelEvent:function(a){a=$.getEvent(a);a.preventDefault?$.cancelEvent=function(a){a.preventDefault()}:$.cancelEvent=function(a){a=$.getEvent(a);a.cancel=!0;a.returnValue=!1};$.cancelEvent(a)},stopEvent:function(a){a=$.getEvent(a);a.stopPropagation?$.stopEvent=function(a){a.stopPropagation()}:$.stopEvent=function(a){a=$.getEvent(a);a.cancelBubble=!0};$.stopEvent(a)},createCallback:function(a,b){var c,d=[];for(c=2;c<arguments.length;c++)d.push(arguments[c]);return function(){var c,e=d.concat([]);for(c=0;c<arguments.length;c++)e.push(arguments[c]);return b.apply(a,e)}},getUrlParameter:function(a){var b=URLPARAMS[a];return b?b:null},getUrlProtocol:function(a){var b=a.match(/^([a-z]+:)\/\//i);return null===b?window.location.protocol:b[1].toLowerCase()},createAjaxRequest:function(a){var b;try{b=!!new ActiveXObject("Microsoft.XMLHTTP")}catch(c){b=!1}if(b)window.XMLHttpRequest?$.createAjaxRequest=function(a){return a?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest}:$.createAjaxRequest=function(){return new ActiveXObject("Microsoft.XMLHTTP")};else{if(!window.XMLHttpRequest)throw new Error("Browser doesn't support XMLHttpRequest.");$.createAjaxRequest=function(){return new XMLHttpRequest}}return $.createAjaxRequest(a)},makeAjaxRequest:function(a,b,c){var d;if($.isPlainObject(a)){b=a.success;c=a.error;d=a.withCredentials;a=a.url}var e=$.getUrlProtocol(a);var f=$.createAjaxRequest("file:"===e);if(!$.isFunction(b))throw new Error("makeAjaxRequest requires a success callback");f.onreadystatechange=function(){if(4==f.readyState){f.onreadystatechange=function(){};if(200===f.status||0===f.status&&"http:"!==e&&"https:"!==e)b(f);else{$.console.log("AJAX request returned %d: %s",f.status,a);$.isFunction(c)&&c(f)}}};d&&(f.withCredentials=!0);try{f.open("GET",a,!0);f.send(null)}catch(g){var h=g.message;var i=$.Browser.vendor==$.BROWSERS.IE&&$.Browser.version<10;i&&"undefined"!=typeof g.number&&-2147024891==g.number&&(h+="\nSee http://msdn.microsoft.com/en-us/library/ms537505(v=vs.85).aspx#xdomain");$.console.log("%s while making AJAX request: %s",g.name,h);f.onreadystatechange=function(){};if(window.XDomainRequest){var j=new XDomainRequest;if(j){j.onload=function(a){$.isFunction(b)&&b({responseText:j.responseText,status:200,statusText:"OK"})};j.onerror=function(a){$.isFunction(c)&&c({responseText:j.responseText,status:444,statusText:"An error happened. Due to an XDomainRequest deficiency we can not extract any information about this error. Upgrade your browser."})};try{j.open("GET",a);j.send()}catch(k){$.isFunction(c)&&c(f,g)}}}else $.isFunction(c)&&c(f,g)}},jsonp:function(a){var b,c=a.url,d=document.head||document.getElementsByTagName("head")[0]||document.documentElement,e=a.callbackName||"openseadragon"+$.now(),f=window[e],g="$1"+e+"$2",h=a.param||"callback",i=a.callback;c=c.replace(/(\=)\?(&|$)|\?\?/i,g);c+=(/\?/.test(c)?"&":"?")+h+"="+e;window[e]=function(a){if(f)window[e]=f;else try{delete window[e]}catch(b){}i&&$.isFunction(i)&&i(a)};b=document.createElement("script");(void 0!==a.async||!1!==a.async)&&(b.async="async");a.scriptCharset&&(b.charset=a.scriptCharset);b.src=c;b.onload=b.onreadystatechange=function(a,c){if(c||!b.readyState||/loaded|complete/.test(b.readyState)){b.onload=b.onreadystatechange=null;d&&b.parentNode&&d.removeChild(b);b=void 0}};d.insertBefore(b,d.firstChild)},createFromDZI:function(){throw"OpenSeadragon.createFromDZI is deprecated, use Viewer.open."},parseXml:function(a){if(window.DOMParser)$.parseXml=function(a){var b,c=null;b=new DOMParser;c=b.parseFromString(a,"text/xml");return c};else{if(!window.ActiveXObject)throw new Error("Browser doesn't support XML DOM.");$.parseXml=function(a){var b=null;b=new ActiveXObject("Microsoft.XMLDOM");b.async=!1;b.loadXML(a);return b}}return $.parseXml(a)},parseJSON:function(string){window.JSON&&window.JSON.parse?$.parseJSON=window.JSON.parse:$.parseJSON=function(string){return eval("("+string+")")};return $.parseJSON(string)},imageFormatSupported:function(a){a=a?a:"";return!!FILEFORMATS[a.toLowerCase()]}});$.Browser={vendor:$.BROWSERS.UNKNOWN,version:0,alpha:!0};var FILEFORMATS={bmp:!1,jpeg:!0,jpg:!0,png:!0,tif:!1,wdp:!1},URLPARAMS={};!function(){var a,b=(navigator.appName,navigator.appVersion),c=navigator.userAgent;switch(navigator.appName){case"Microsoft Internet Explorer":if(window.attachEvent&&window.ActiveXObject){$.Browser.vendor=$.BROWSERS.IE;$.Browser.version=parseFloat(c.substring(c.indexOf("MSIE")+5,c.indexOf(";",c.indexOf("MSIE"))))}break;case"Netscape":if(window.addEventListener)if(c.indexOf("Firefox")>=0){$.Browser.vendor=$.BROWSERS.FIREFOX;$.Browser.version=parseFloat(c.substring(c.indexOf("Firefox")+8))}else if(c.indexOf("Safari")>=0){$.Browser.vendor=c.indexOf("Chrome")>=0?$.BROWSERS.CHROME:$.BROWSERS.SAFARI;$.Browser.version=parseFloat(c.substring(c.substring(0,c.indexOf("Safari")).lastIndexOf("/")+1,c.indexOf("Safari")))}else{a=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");if(null!==a.exec(c)){$.Browser.vendor=$.BROWSERS.IE;$.Browser.version=parseFloat(RegExp.$1)}}break;case"Opera":$.Browser.vendor=$.BROWSERS.OPERA;$.Browser.version=parseFloat(b)}var d,e,f,g=window.location.search.substring(1),h=g.split("&");for(f=0;f<h.length;f++){d=h[f];e=d.indexOf("=");e>0&&(URLPARAMS[d.substring(0,e)]=decodeURIComponent(d.substring(e+1)))}$.Browser.alpha=!($.Browser.vendor==$.BROWSERS.IE&&$.Browser.version<9||$.Browser.vendor==$.BROWSERS.CHROME&&$.Browser.version<2);$.Browser.opacity=!($.Browser.vendor==$.BROWSERS.IE&&$.Browser.version<9)}();var nullfunction=function(a){};$.console=window.console||{log:nullfunction,debug:nullfunction,info:nullfunction,warn:nullfunction,error:nullfunction,assert:nullfunction};!function(a){var b=a.requestAnimationFrame||a.mozRequestAnimationFrame||a.webkitRequestAnimationFrame||a.msRequestAnimationFrame;var c=a.cancelAnimationFrame||a.mozCancelAnimationFrame||a.webkitCancelAnimationFrame||a.msCancelAnimationFrame;if(b&&c){$.requestAnimationFrame=function(){return b.apply(a,arguments)};$.cancelAnimationFrame=function(){return c.apply(a,arguments)}}else{var d,e=[],f=[],g=0;$.requestAnimationFrame=function(a){e.push([++g,a]);d||(d=setInterval(function(){if(e.length){var a=$.now();var b=f;f=e;e=b;for(;f.length;)f.shift()[1](a)}else{clearInterval(d);d=void 0}},20));return g};$.cancelAnimationFrame=function(a){var b,c;for(b=0,c=e.length;c>b;b+=1)if(e[b][0]===a){e.splice(b,1);return}for(b=0,c=f.length;c>b;b+=1)if(f[b][0]===a){f.splice(b,1);return}}}}(window)}(OpenSeadragon);!function(a){var b={supportsFullScreen:!1,isFullScreen:function(){return!1},getFullScreenElement:function(){return null},requestFullScreen:function(){},exitFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",fullScreenErrorEventName:""};if(document.exitFullscreen){b.supportsFullScreen=!0;b.getFullScreenElement=function(){return document.fullscreenElement};b.requestFullScreen=function(a){return a.requestFullscreen()};b.exitFullScreen=function(){document.exitFullscreen()};b.fullScreenEventName="fullscreenchange";b.fullScreenErrorEventName="fullscreenerror"}else if(document.msExitFullscreen){b.supportsFullScreen=!0;b.getFullScreenElement=function(){return document.msFullscreenElement};b.requestFullScreen=function(a){return a.msRequestFullscreen()};b.exitFullScreen=function(){document.msExitFullscreen()};b.fullScreenEventName="MSFullscreenChange";b.fullScreenErrorEventName="MSFullscreenError"}else if(document.webkitExitFullscreen){b.supportsFullScreen=!0;b.getFullScreenElement=function(){return document.webkitFullscreenElement};b.requestFullScreen=function(a){return a.webkitRequestFullscreen()};b.exitFullScreen=function(){document.webkitExitFullscreen()};b.fullScreenEventName="webkitfullscreenchange";b.fullScreenErrorEventName="webkitfullscreenerror"}else if(document.webkitCancelFullScreen){b.supportsFullScreen=!0;b.getFullScreenElement=function(){return document.webkitCurrentFullScreenElement};b.requestFullScreen=function(a){return a.webkitRequestFullScreen()};b.exitFullScreen=function(){document.webkitCancelFullScreen()};b.fullScreenEventName="webkitfullscreenchange";b.fullScreenErrorEventName="webkitfullscreenerror"}else if(document.mozCancelFullScreen){b.supportsFullScreen=!0;b.getFullScreenElement=function(){return document.mozFullScreenElement};b.requestFullScreen=function(a){return a.mozRequestFullScreen()};b.exitFullScreen=function(){document.mozCancelFullScreen()};b.fullScreenEventName="mozfullscreenchange";b.fullScreenErrorEventName="mozfullscreenerror"}b.isFullScreen=function(){return null!==b.getFullScreenElement()};b.cancelFullScreen=function(){a.console.error("cancelFullScreen is deprecated. Use exitFullScreen instead.");b.exitFullScreen()};a.extend(a,b)}(OpenSeadragon);!function(a){a.EventSource=function(){this.events={}};a.EventSource.prototype={addOnceHandler:function(a,b,c,d){var e=this;d=d||1;var f=0;var g=function(c){f++;f===d&&e.removeHandler(a,g);b(c)};this.addHandler(a,g,c)},addHandler:function(b,c,d){var e=this.events[b];e||(this.events[b]=e=[]);c&&a.isFunction(c)&&(e[e.length]={handler:c,userData:d||null})},removeHandler:function(b,c){var d,e=this.events[b],f=[];if(e&&a.isArray(e)){for(d=0;d<e.length;d++)e[d].handler!==c&&f.push(e[d]);this.events[b]=f}},removeAllHandlers:function(a){if(a)this.events[a]=[];else for(var b in this.events)this.events[b]=[]},getHandler:function(a){var b=this.events[a];if(!b||!b.length)return null;b=1===b.length?[b[0]]:Array.apply(null,b);return function(a,c){var d,e=b.length;for(d=0;e>d;d++)if(b[d]){c.eventSource=a;c.userData=b[d].userData;b[d].handler(c)}}},raiseEvent:function(a,b){var c=this.getHandler(a);if(c){b||(b={});c(this,b)}}}}(OpenSeadragon);!function(a){function b(b){var c,d=pa[b.hash],e=d.activePointersLists.length;for(c=0;e>c;c++)if(d.activePointersLists[c].captureCount>0){a.removeEvent(a.MouseTracker.captureElement,"mousemove",d.mousemovecaptured,!0);a.removeEvent(a.MouseTracker.captureElement,"mouseup",d.mouseupcaptured,!0);a.removeEvent(a.MouseTracker.captureElement,a.MouseTracker.unprefixedPointerEvents?"pointermove":"MSPointerMove",d.pointermovecaptured,!0);a.removeEvent(a.MouseTracker.captureElement,a.MouseTracker.unprefixedPointerEvents?"pointerup":"MSPointerUp",d.pointerupcaptured,!0);a.removeEvent(a.MouseTracker.captureElement,"touchmove",d.touchmovecaptured,!0);a.removeEvent(a.MouseTracker.captureElement,"touchend",d.touchendcaptured,!0);d.activePointersLists[c].captureCount=0}for(c=0;e>c;c++)d.activePointersLists.pop()}function c(c){var d,e,f=pa[c.hash];if(!f.tracking){for(e=0;e<a.MouseTracker.subscribeEvents.length;e++){d=a.MouseTracker.subscribeEvents[e];a.addEvent(c.element,d,f[d],!1)}b(c);f.tracking=!0}}function d(c){var d,e,f=pa[c.hash];if(f.tracking){for(e=0;e<a.MouseTracker.subscribeEvents.length;e++){d=a.MouseTracker.subscribeEvents[e];a.removeEvent(c.element,d,f[d],!1)}b(c);f.tracking=!1}}function e(b,c){var d=pa[b.hash];if("pointerevent"===c)return{upName:a.MouseTracker.unprefixedPointerEvents?"pointerup":"MSPointerUp",upHandler:d.pointerupcaptured,moveName:a.MouseTracker.unprefixedPointerEvents?"pointermove":"MSPointerMove",moveHandler:d.pointermovecaptured};if("mouse"===c)return{upName:"mouseup",upHandler:d.mouseupcaptured,moveName:"mousemove",moveHandler:d.mousemovecaptured};if("touch"===c)return{upName:"touchend",upHandler:d.touchendcaptured,moveName:"touchmove",moveHandler:d.touchmovecaptured};throw new Error("MouseTracker.getCaptureEventParams: Unknown pointer type.")}function f(b,c,d){var f,g=b.getActivePointersListByType(c);g.captureCount+=d||1;if(1===g.captureCount)if(a.Browser.vendor===a.BROWSERS.IE&&a.Browser.version<9)b.element.setCapture(!0);else{f=e(b,a.MouseTracker.havePointerEvents?"pointerevent":c);qa&&na(window.top)&&a.addEvent(window.top,f.upName,f.upHandler,!0);a.addEvent(a.MouseTracker.captureElement,f.upName,f.upHandler,!0);a.addEvent(a.MouseTracker.captureElement,f.moveName,f.moveHandler,!0)}}function g(b,c,d){var f,g=b.getActivePointersListByType(c);g.captureCount-=d||1;if(0===g.captureCount)if(a.Browser.vendor===a.BROWSERS.IE&&a.Browser.version<9)b.element.releaseCapture();else{f=e(b,a.MouseTracker.havePointerEvents?"pointerevent":c);qa&&na(window.top)&&a.removeEvent(window.top,f.upName,f.upHandler,!0);a.removeEvent(a.MouseTracker.captureElement,f.moveName,f.moveHandler,!0);a.removeEvent(a.MouseTracker.captureElement,f.upName,f.upHandler,!0)}}function h(b){var c;if(a.MouseTracker.unprefixedPointerEvents)c=b.pointerType;else switch(b.pointerType){case 2:c="touch";break;case 3:c="pen";break;case 4:c="mouse";break;default:c=""}return c}function i(b){return a.getMousePosition(b)}function j(a,b){return k(i(a),b)}function k(b,c){var d=a.getElementOffset(c);return b.minus(d)}function l(b,c){return new a.Point((b.x+c.x)/2,(b.y+c.y)/2)}function m(b,c){b.clickHandler&&a.cancelEvent(c)}function n(b,c){b.dblClickHandler&&a.cancelEvent(c)}function o(b,c){var d;if(b.keyDownHandler){c=a.getEvent(c);d=b.keyDownHandler({eventSource:b,keyCode:c.keyCode?c.keyCode:c.charCode,ctrl:c.ctrlKey,shift:c.shiftKey,alt:c.altKey,meta:c.metaKey,originalEvent:c,preventDefaultAction:!1,userData:b.userData});d||a.cancelEvent(c)}}function p(b,c){var d;if(b.keyUpHandler){c=a.getEvent(c);d=b.keyUpHandler({eventSource:b,keyCode:c.keyCode?c.keyCode:c.charCode,ctrl:c.ctrlKey,shift:c.shiftKey,alt:c.altKey,meta:c.metaKey,originalEvent:c,preventDefaultAction:!1,userData:b.userData});d||a.cancelEvent(c)}}function q(b,c){var d;if(b.keyHandler){c=a.getEvent(c);d=b.keyHandler({eventSource:b,keyCode:c.keyCode?c.keyCode:c.charCode,ctrl:c.ctrlKey,shift:c.shiftKey,alt:c.altKey,meta:c.metaKey,originalEvent:c,preventDefaultAction:!1,userData:b.userData});d||a.cancelEvent(c)}}function r(b,c){var d;if(b.focusHandler){c=a.getEvent(c);d=b.focusHandler({eventSource:b,originalEvent:c,preventDefaultAction:!1,userData:b.userData});d===!1&&a.cancelEvent(c)}}function s(b,c){var d;if(b.blurHandler){c=a.getEvent(c);d=b.blurHandler({eventSource:b,originalEvent:c,preventDefaultAction:!1,userData:b.userData});d===!1&&a.cancelEvent(c)}}function t(a,b){v(a,b,b)}function u(b,c){c=a.getEvent(c);var d={target:c.target||c.srcElement,type:"wheel",shiftKey:c.shiftKey||!1,clientX:c.clientX,clientY:c.clientY,pageX:c.pageX?c.pageX:c.clientX,pageY:c.pageY?c.pageY:c.clientY,deltaMode:"MozMousePixelScroll"==c.type?0:1,deltaX:0,deltaZ:0};"mousewheel"==a.MouseTracker.wheelEventName?d.deltaY=-1/a.DEFAULT_SETTINGS.pixelsPerWheelLine*c.wheelDelta:d.deltaY=c.detail;v(b,d,c)}function v(b,c,d){var e,f=0;f=c.deltaY<0?1:-1;if(b.scrollHandler){e=b.scrollHandler({eventSource:b,pointerType:"mouse",position:j(c,b.element),scroll:f,shift:c.shiftKey,isTouchEvent:!1,originalEvent:d,preventDefaultAction:!1,userData:b.userData});e===!1&&a.cancelEvent(d)}}function w(a,b){if(a===b)return!1;for(;b&&b!==a;)b=b.parentNode;return b===a}function x(b,c){c=a.getEvent(c);z(b,c)}function y(b,c){c=a.getEvent(c);c.currentTarget===c.relatedTarget||w(c.currentTarget,c.relatedTarget)||z(b,c)}function z(b,c){var d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:i(c),currentTime:a.now()};ga(b,c,[d])}function A(b,c){c=a.getEvent(c);C(b,c)}function B(b,c){c=a.getEvent(c);c.currentTarget===c.relatedTarget||w(c.currentTarget,c.relatedTarget)||C(b,c)}function C(b,c){var d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:i(c),currentTime:a.now()};ha(b,c,[d])}function D(b){return a.Browser.vendor===a.BROWSERS.IE&&a.Browser.version<9?1===b?0:2===b?2:4===b?1:-1:b}function E(b,c){var d;c=a.getEvent(c);d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:i(c),currentTime:a.now()};if(ia(b,c,[d],D(c.button))){a.stopEvent(c);f(b,"mouse")}(b.clickHandler||b.dblClickHandler||b.pressHandler||b.dragHandler||b.dragEndHandler)&&a.cancelEvent(c)}function F(a,b){H(a,b)}function G(b,c){H(b,c);a.stopEvent(c)}function H(b,c){var d;c=a.getEvent(c);d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:i(c),currentTime:a.now()};ja(b,c,[d],D(c.button))&&g(b,"mouse")}function I(a,b){K(a,b)}function J(b,c){K(b,c);a.stopEvent(c)}function K(b,c){var d;c=a.getEvent(c);d={id:a.MouseTracker.mousePointerId,type:"mouse",isPrimary:!0,currentPos:i(c),currentTime:a.now()};ka(b,c,[d])}function L(a,b,c){var d,e=c.getLength(),f=[];for(d=0;e>d;d++)f.push(c.getByIndex(d));if(f.length>0){ja(a,b,f,0);c.captureCount=1;g(a,"touch");ha(a,b,f)}}function M(b,c){var d,e,g,h,j=c.changedTouches.length,k=[],l=b.getActivePointersListByType("touch");d=a.now();if(l.getLength()>c.touches.length-j){a.console.warn("Tracked touch contact count doesn't match event.touches.length. Removing all tracked touch pointers.");L(b,c,l)}for(e=0;j>e;e++)k.push({id:c.changedTouches[e].identifier,type:"touch",currentPos:i(c.changedTouches[e]),currentTime:d});ga(b,c,k);for(e=0;e<oa.length;e++)if(oa[e]!==b&&oa[e].isTracking()&&w(oa[e].element,b.element)){h=[];for(g=0;j>g;g++)h.push({id:c.changedTouches[g].identifier,type:"touch",currentPos:i(c.changedTouches[g]),currentTime:d});ga(oa[e],c,h)}if(ia(b,c,k,0)){a.stopEvent(c);f(b,"touch",j)}a.cancelEvent(c)}function N(a,b){P(a,b)}function O(b,c){P(b,c);a.stopEvent(c)}function P(b,c){var d,e,f,h,j=c.changedTouches.length,k=[];d=a.now();for(e=0;j>e;e++)k.push({id:c.changedTouches[e].identifier,type:"touch",currentPos:i(c.changedTouches[e]),currentTime:d});ja(b,c,k,0)&&g(b,"touch",j);ha(b,c,k);for(e=0;e<oa.length;e++)if(oa[e]!==b&&oa[e].isTracking()&&w(oa[e].element,b.element)){h=[];for(f=0;j>f;f++)h.push({id:c.changedTouches[f].identifier,type:"touch",currentPos:i(c.changedTouches[f]),currentTime:d});ha(oa[e],c,h)}a.cancelEvent(c)}function Q(a,b){S(a,b)}function R(b,c){S(b,c);a.stopEvent(c)}function S(b,c){var d,e=c.changedTouches.length,f=[];for(d=0;e>d;d++)f.push({id:c.changedTouches[d].identifier,type:"touch",currentPos:i(c.changedTouches[d]),currentTime:a.now()});ka(b,c,f);a.cancelEvent(c)}function T(a,b){var c=(b.changedTouches.length,a.getActivePointersListByType("touch"));L(a,b,c)}function U(a,b){b.stopPropagation();b.preventDefault();return!1}function V(a,b){b.stopPropagation();b.preventDefault();return!1}function W(b,c){var d;if(c.currentTarget!==c.relatedTarget&&!w(c.currentTarget,c.relatedTarget)){d={id:c.pointerId,type:h(c),isPrimary:c.isPrimary,currentPos:i(c),currentTime:a.now()};ga(b,c,[d])}}function X(b,c){var d;if(c.currentTarget!==c.relatedTarget&&!w(c.currentTarget,c.relatedTarget)){d={id:c.pointerId,type:h(c),isPrimary:c.isPrimary,currentPos:i(c),currentTime:a.now()};ha(b,c,[d])}}function Y(b,c){var d;d={id:c.pointerId,type:h(c),isPrimary:c.isPrimary,currentPos:i(c),currentTime:a.now()};if(ia(b,c,[d],c.button)){
a.stopEvent(c);f(b,d.type)}(b.clickHandler||b.dblClickHandler||b.pressHandler||b.dragHandler||b.dragEndHandler||b.pinchHandler)&&a.cancelEvent(c)}function Z(a,b){_(a,b)}function $(b,c){var d=b.getActivePointersListByType(h(c));d.getById(c.pointerId)&&_(b,c);a.stopEvent(c)}function _(b,c){var d;d={id:c.pointerId,type:h(c),isPrimary:c.isPrimary,currentPos:i(c),currentTime:a.now()};ja(b,c,[d],c.button)&&g(b,d.type)}function aa(a,b){ca(a,b)}function ba(b,c){var d=b.getActivePointersListByType(h(c));d.getById(c.pointerId)&&ca(b,c);a.stopEvent(c)}function ca(b,c){var d;d={id:c.pointerId,type:h(c),isPrimary:c.isPrimary,currentPos:i(c),currentTime:a.now()};ka(b,c,[d])}function da(a,b){var c;c={id:b.pointerId,type:h(b)};la(a,b,[c])}function ea(a,b){b.hasOwnProperty("isPrimary")||(0===a.getLength()?b.isPrimary=!0:b.isPrimary=!1);b.speed=0;b.direction=0;b.contactPos=b.currentPos;b.contactTime=b.currentTime;b.lastPos=b.currentPos;b.lastTime=b.currentTime;return a.add(b)}function fa(a,b){var c,d;if(a.getById(b.id)){c=a.removeById(b.id);if(!b.hasOwnProperty("isPrimary")){d=a.getPrimary();if(!d){d=a.getByIndex(0);d&&(d.isPrimary=!0)}}}else c=a.getLength();return c}function ga(b,c,d){var e,f,g,h,i=b.getActivePointersListByType(d[0].type),j=d.length;for(e=0;j>e;e++){f=d[e];g=i.getById(f.id);if(g){g.insideElement=!0;g.lastPos=g.currentPos;g.lastTime=g.currentTime;g.currentPos=f.currentPos;g.currentTime=f.currentTime;f=g}else{f.captured=!1;f.insideElementPressed=!1;f.insideElement=!0;ea(i,f)}if(b.enterHandler){h=b.enterHandler({eventSource:b,pointerType:f.type,position:k(f.currentPos,b.element),buttons:i.buttons,pointers:b.getActivePointerCount(),insideElementPressed:f.insideElementPressed,buttonDownAny:0!==i.buttons,isTouchEvent:"touch"===f.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});h===!1&&a.cancelEvent(c)}}}function ha(b,c,d){var e,f,g,h,i=(pa[b.hash],b.getActivePointersListByType(d[0].type)),j=d.length;for(e=0;j>e;e++){f=d[e];g=i.getById(f.id);if(g){if(g.captured){g.insideElement=!1;g.lastPos=g.currentPos;g.lastTime=g.currentTime;g.currentPos=f.currentPos;g.currentTime=f.currentTime}else fa(i,g);f=g}if(b.exitHandler){h=b.exitHandler({eventSource:b,pointerType:f.type,position:k(f.currentPos,b.element),buttons:i.buttons,pointers:b.getActivePointerCount(),insideElementPressed:g?g.insideElementPressed:!1,buttonDownAny:0!==i.buttons,isTouchEvent:"touch"===f.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});h===!1&&a.cancelEvent(c)}}}function ia(b,c,d,e){var f,g,h,i,j=pa[b.hash],m=b.getActivePointersListByType(d[0].type),n=d.length;"undefined"!=typeof c.buttons?m.buttons=c.buttons:a.Browser.vendor===a.BROWSERS.IE&&a.Browser.version<9?0===e?m.buttons+=1:1===e?m.buttons+=4:2===e?m.buttons+=2:3===e?m.buttons+=8:4===e?m.buttons+=16:5===e&&(m.buttons+=32):0===e?m.buttons|=1:1===e?m.buttons|=4:2===e?m.buttons|=2:3===e?m.buttons|=8:4===e?m.buttons|=16:5===e&&(m.buttons|=32);if(0!==e){if(b.nonPrimaryPressHandler){f=b.nonPrimaryPressHandler({eventSource:b,pointerType:d[0].type,position:k(d[0].currentPos,b.element),button:e,buttons:m.buttons,isTouchEvent:"touch"===d[0].type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});f===!1&&a.cancelEvent(c)}return!1}for(g=0;n>g;g++){h=d[g];i=m.getById(h.id);if(i){i.captured=!0;i.insideElementPressed=!0;i.insideElement=!0;i.contactPos=h.currentPos;i.contactTime=h.currentTime;i.lastPos=i.currentPos;i.lastTime=i.currentTime;i.currentPos=h.currentPos;i.currentTime=h.currentTime;h=i}else{h.captured=!0;h.insideElementPressed=!0;h.insideElement=!0;ea(m,h)}m.contacts++;(b.dragHandler||b.dragEndHandler||b.pinchHandler)&&a.MouseTracker.gesturePointVelocityTracker.addPoint(b,h);if(1===m.contacts){if(b.pressHandler){f=b.pressHandler({eventSource:b,pointerType:h.type,position:k(h.contactPos,b.element),buttons:m.buttons,isTouchEvent:"touch"===h.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});f===!1&&a.cancelEvent(c)}}else if(2===m.contacts&&b.pinchHandler&&"touch"===h.type){j.pinchGPoints=m.asArray();j.lastPinchDist=j.currentPinchDist=j.pinchGPoints[0].currentPos.distanceTo(j.pinchGPoints[1].currentPos);j.lastPinchCenter=j.currentPinchCenter=l(j.pinchGPoints[0].currentPos,j.pinchGPoints[1].currentPos)}}return!0}function ja(b,c,d,e){var f,g,h,i,j,m,n,o=pa[b.hash],p=b.getActivePointersListByType(d[0].type),q=d.length,r=!1,s=!1;"undefined"!=typeof c.buttons?p.buttons=c.buttons:a.Browser.vendor===a.BROWSERS.IE&&a.Browser.version<9?0===e?p.buttons-=1:1===e?p.buttons-=4:2===e?p.buttons-=2:3===e?p.buttons-=8:4===e?p.buttons-=16:5===e&&(p.buttons-=32):0===e?p.buttons^=-2:1===e?p.buttons^=-5:2===e?p.buttons^=-3:3===e?p.buttons^=-9:4===e?p.buttons^=-17:5===e&&(p.buttons^=-33);if(0!==e){if(b.nonPrimaryReleaseHandler){f=b.nonPrimaryReleaseHandler({eventSource:b,pointerType:d[0].type,position:k(d[0].currentPos,b.element),button:e,buttons:p.buttons,isTouchEvent:"touch"===d[0].type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});f===!1&&a.cancelEvent(c)}return!1}for(i=0;q>i;i++){j=d[i];m=p.getById(j.id);if(m){if(m.captured){m.captured=!1;r=!0;s=!0}m.lastPos=m.currentPos;m.lastTime=m.currentTime;m.currentPos=j.currentPos;m.currentTime=j.currentTime;m.insideElement||fa(p,m);g=m.currentPos;h=m.currentTime;if(s){p.contacts--;(b.dragHandler||b.dragEndHandler||b.pinchHandler)&&a.MouseTracker.gesturePointVelocityTracker.removePoint(b,m);if(0===p.contacts){if(b.releaseHandler){f=b.releaseHandler({eventSource:b,pointerType:m.type,position:k(g,b.element),buttons:p.buttons,insideElementPressed:m.insideElementPressed,insideElementReleased:m.insideElement,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});f===!1&&a.cancelEvent(c)}if(b.dragEndHandler&&!m.currentPos.equals(m.contactPos)){f=b.dragEndHandler({eventSource:b,pointerType:m.type,position:k(m.currentPos,b.element),speed:m.speed,direction:m.direction,shift:c.shiftKey,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});f===!1&&a.cancelEvent(c)}if((b.clickHandler||b.dblClickHandler)&&m.insideElement){n=h-m.contactTime<=b.clickTimeThreshold&&m.contactPos.distanceTo(g)<=b.clickDistThreshold;if(b.clickHandler){f=b.clickHandler({eventSource:b,pointerType:m.type,position:k(m.currentPos,b.element),quick:n,shift:c.shiftKey,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});f===!1&&a.cancelEvent(c)}if(b.dblClickHandler&&n){p.clicks++;if(1===p.clicks){o.lastClickPos=g;o.dblClickTimeOut=setTimeout(function(){p.clicks=0},b.dblClickTimeThreshold)}else if(2===p.clicks){clearTimeout(o.dblClickTimeOut);p.clicks=0;if(o.lastClickPos.distanceTo(g)<=b.dblClickDistThreshold){f=b.dblClickHandler({eventSource:b,pointerType:m.type,position:k(m.currentPos,b.element),shift:c.shiftKey,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});f===!1&&a.cancelEvent(c)}o.lastClickPos=null}}}}else if(2===p.contacts&&b.pinchHandler&&"touch"===m.type){o.pinchGPoints=p.asArray();o.lastPinchDist=o.currentPinchDist=o.pinchGPoints[0].currentPos.distanceTo(o.pinchGPoints[1].currentPos);o.lastPinchCenter=o.currentPinchCenter=l(o.pinchGPoints[0].currentPos,o.pinchGPoints[1].currentPos)}}else if(b.releaseHandler){f=b.releaseHandler({eventSource:b,pointerType:m.type,position:k(g,b.element),buttons:p.buttons,insideElementPressed:m.insideElementPressed,insideElementReleased:m.insideElement,isTouchEvent:"touch"===m.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});f===!1&&a.cancelEvent(c)}}}return r}function ka(b,c,d){var e,f,g,h,i,j,m=pa[b.hash],n=b.getActivePointersListByType(d[0].type),o=d.length;"undefined"!=typeof c.buttons&&(n.buttons=c.buttons);for(e=0;o>e;e++){f=d[e];g=n.getById(f.id);if(g){f.hasOwnProperty("isPrimary")&&(g.isPrimary=f.isPrimary);g.lastPos=g.currentPos;g.lastTime=g.currentTime;g.currentPos=f.currentPos;g.currentTime=f.currentTime}else{f.captured=!1;f.insideElementPressed=!1;f.insideElement=!0;ea(n,f)}}if(b.stopHandler&&"mouse"===d[0].type){clearTimeout(b.stopTimeOut);b.stopTimeOut=setTimeout(function(){ma(b,c,d[0].type)},b.stopDelay)}if(0===n.contacts){if(b.moveHandler){j=b.moveHandler({eventSource:b,pointerType:d[0].type,position:k(d[0].currentPos,b.element),buttons:n.buttons,isTouchEvent:"touch"===d[0].type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});j===!1&&a.cancelEvent(c)}}else if(1===n.contacts){if(b.moveHandler){g=n.asArray()[0];j=b.moveHandler({eventSource:b,pointerType:g.type,position:k(g.currentPos,b.element),buttons:n.buttons,isTouchEvent:"touch"===g.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});j===!1&&a.cancelEvent(c)}if(b.dragHandler){g=n.asArray()[0];i=g.currentPos.minus(g.lastPos);j=b.dragHandler({eventSource:b,pointerType:g.type,position:k(g.currentPos,b.element),buttons:n.buttons,delta:i,speed:g.speed,direction:g.direction,shift:c.shiftKey,isTouchEvent:"touch"===g.type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});j===!1&&a.cancelEvent(c)}}else if(2===n.contacts){if(b.moveHandler){h=n.asArray();j=b.moveHandler({eventSource:b,pointerType:h[0].type,position:k(l(h[0].currentPos,h[1].currentPos),b.element),buttons:n.buttons,isTouchEvent:"touch"===h[0].type,originalEvent:c,preventDefaultAction:!1,userData:b.userData});j===!1&&a.cancelEvent(c)}if(b.pinchHandler&&"touch"===d[0].type){i=m.pinchGPoints[0].currentPos.distanceTo(m.pinchGPoints[1].currentPos);if(i!=m.currentPinchDist){m.lastPinchDist=m.currentPinchDist;m.currentPinchDist=i;m.lastPinchCenter=m.currentPinchCenter;m.currentPinchCenter=l(m.pinchGPoints[0].currentPos,m.pinchGPoints[1].currentPos);j=b.pinchHandler({eventSource:b,pointerType:"touch",gesturePoints:m.pinchGPoints,lastCenter:k(m.lastPinchCenter,b.element),center:k(m.currentPinchCenter,b.element),lastDistance:m.lastPinchDist,distance:m.currentPinchDist,shift:c.shiftKey,originalEvent:c,preventDefaultAction:!1,userData:b.userData});j===!1&&a.cancelEvent(c)}}}}function la(a,b,c){ja(a,b,c,0);ha(a,b,c)}function ma(a,b,c){a.stopHandler&&a.stopHandler({eventSource:a,pointerType:c,position:j(b,a.element),buttons:a.getActivePointersListByType(c).buttons,isTouchEvent:"touch"===c,originalEvent:b,preventDefaultAction:!1,userData:a.userData})}function na(a){try{return a.addEventListener&&a.removeEventListener}catch(b){return!1}}var oa=[];var pa={};a.MouseTracker=function(b){oa.push(this);var c=arguments;a.isPlainObject(b)||(b={element:c[0],clickTimeThreshold:c[1],clickDistThreshold:c[2]});this.hash=Math.random();this.element=a.getElement(b.element);this.clickTimeThreshold=b.clickTimeThreshold||a.DEFAULT_SETTINGS.clickTimeThreshold;this.clickDistThreshold=b.clickDistThreshold||a.DEFAULT_SETTINGS.clickDistThreshold;this.dblClickTimeThreshold=b.dblClickTimeThreshold||a.DEFAULT_SETTINGS.dblClickTimeThreshold;this.dblClickDistThreshold=b.dblClickDistThreshold||a.DEFAULT_SETTINGS.dblClickDistThreshold;this.userData=b.userData||null;this.stopDelay=b.stopDelay||50;this.enterHandler=b.enterHandler||null;this.exitHandler=b.exitHandler||null;this.pressHandler=b.pressHandler||null;this.nonPrimaryPressHandler=b.nonPrimaryPressHandler||null;this.releaseHandler=b.releaseHandler||null;this.nonPrimaryReleaseHandler=b.nonPrimaryReleaseHandler||null;this.moveHandler=b.moveHandler||null;this.scrollHandler=b.scrollHandler||null;this.clickHandler=b.clickHandler||null;this.dblClickHandler=b.dblClickHandler||null;this.dragHandler=b.dragHandler||null;this.dragEndHandler=b.dragEndHandler||null;this.pinchHandler=b.pinchHandler||null;this.stopHandler=b.stopHandler||null;this.keyDownHandler=b.keyDownHandler||null;this.keyUpHandler=b.keyUpHandler||null;this.keyHandler=b.keyHandler||null;this.focusHandler=b.focusHandler||null;this.blurHandler=b.blurHandler||null;var d=this;pa[this.hash]={click:function(a){m(d,a)},dblclick:function(a){n(d,a)},keydown:function(a){o(d,a)},keyup:function(a){p(d,a)},keypress:function(a){q(d,a)},focus:function(a){r(d,a)},blur:function(a){s(d,a)},wheel:function(a){t(d,a)},mousewheel:function(a){u(d,a)},DOMMouseScroll:function(a){u(d,a)},MozMousePixelScroll:function(a){u(d,a)},mouseenter:function(a){x(d,a)},mouseleave:function(a){A(d,a)},mouseover:function(a){y(d,a)},mouseout:function(a){B(d,a)},mousedown:function(a){E(d,a)},mouseup:function(a){F(d,a)},mouseupcaptured:function(a){G(d,a)},mousemove:function(a){I(d,a)},mousemovecaptured:function(a){J(d,a)},touchstart:function(a){M(d,a)},touchend:function(a){N(d,a)},touchendcaptured:function(a){O(d,a)},touchmove:function(a){Q(d,a)},touchmovecaptured:function(a){R(d,a)},touchcancel:function(a){T(d,a)},gesturestart:function(a){U(d,a)},gesturechange:function(a){V(d,a)},pointerover:function(a){W(d,a)},MSPointerOver:function(a){W(d,a)},pointerout:function(a){X(d,a)},MSPointerOut:function(a){X(d,a)},pointerdown:function(a){Y(d,a)},MSPointerDown:function(a){Y(d,a)},pointerup:function(a){Z(d,a)},MSPointerUp:function(a){Z(d,a)},pointermove:function(a){aa(d,a)},MSPointerMove:function(a){aa(d,a)},pointercancel:function(a){da(d,a)},MSPointerCancel:function(a){da(d,a)},pointerupcaptured:function(a){$(d,a)},pointermovecaptured:function(a){ba(d,a)},tracking:!1,activePointersLists:[],lastClickPos:null,dblClickTimeOut:null,pinchGPoints:[],lastPinchDist:0,currentPinchDist:0,lastPinchCenter:null,currentPinchCenter:null};b.startDisabled||this.setTracking(!0)};a.MouseTracker.prototype={destroy:function(){var a;d(this);this.element=null;for(a=0;a<oa.length;a++)if(oa[a]===this){oa.splice(a,1);break}pa[this.hash]=null;delete pa[this.hash]},isTracking:function(){return pa[this.hash].tracking},setTracking:function(a){a?c(this):d(this);return this},getActivePointersListByType:function(b){var c,d,e=pa[this.hash],f=e.activePointersLists.length;for(c=0;f>c;c++)if(e.activePointersLists[c].type===b)return e.activePointersLists[c];d=new a.MouseTracker.GesturePointList(b);e.activePointersLists.push(d);return d},getActivePointerCount:function(){var a,b=pa[this.hash],c=b.activePointersLists.length,d=0;for(a=0;c>a;a++)d+=b.activePointersLists[a].getLength();return d},enterHandler:function(){},exitHandler:function(){},pressHandler:function(){},nonPrimaryPressHandler:function(){},releaseHandler:function(){},nonPrimaryReleaseHandler:function(){},moveHandler:function(){},scrollHandler:function(){},clickHandler:function(){},dblClickHandler:function(){},dragHandler:function(){},dragEndHandler:function(){},pinchHandler:function(){},stopHandler:function(){},keyDownHandler:function(){},keyUpHandler:function(){},keyHandler:function(){},focusHandler:function(){},blurHandler:function(){}};a.MouseTracker.gesturePointVelocityTracker=function(){var b=[],c=0,d=0;var e=function(a,b){return a.hash.toString()+b.type+b.id.toString()};var f=function(){var c,e,f,g,h,i,j=b.length,k=a.now();g=k-d;d=k;for(c=0;j>c;c++){e=b[c];f=e.gPoint;f.direction=Math.atan2(f.currentPos.y-e.lastPos.y,f.currentPos.x-e.lastPos.x);h=e.lastPos.distanceTo(f.currentPos);e.lastPos=f.currentPos;i=1e3*h/(g+1);f.speed=.75*i+.25*f.speed}};var g=function(g,h){var i=e(g,h);b.push({guid:i,gPoint:h,lastPos:h.currentPos});if(1===b.length){d=a.now();c=window.setInterval(f,50)}};var h=function(a,d){var f,g=e(a,d),h=b.length;for(f=0;h>f;f++)if(b[f].guid===g){b.splice(f,1);h--;0===h&&window.clearInterval(c);break}};return{addPoint:g,removePoint:h}}();a.MouseTracker.captureElement=document;a.MouseTracker.wheelEventName=a.Browser.vendor==a.BROWSERS.IE&&a.Browser.version>8||"onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll";a.MouseTracker.supportsMouseCapture=function(){var b=document.createElement("div");return a.isFunction(b.setCapture)&&a.isFunction(b.releaseCapture)}();a.MouseTracker.subscribeEvents=["click","dblclick","keydown","keyup","keypress","focus","blur",a.MouseTracker.wheelEventName];"DOMMouseScroll"==a.MouseTracker.wheelEventName&&a.MouseTracker.subscribeEvents.push("MozMousePixelScroll");if(window.PointerEvent&&(window.navigator.pointerEnabled||a.Browser.vendor!==a.BROWSERS.IE)){a.MouseTracker.havePointerEvents=!0;a.MouseTracker.subscribeEvents.push("pointerover","pointerout","pointerdown","pointerup","pointermove","pointercancel");a.MouseTracker.unprefixedPointerEvents=!0;navigator.maxTouchPoints?a.MouseTracker.maxTouchPoints=navigator.maxTouchPoints:a.MouseTracker.maxTouchPoints=0;a.MouseTracker.haveMouseEnter=!1}else if(window.MSPointerEvent&&window.navigator.msPointerEnabled){a.MouseTracker.havePointerEvents=!0;a.MouseTracker.subscribeEvents.push("MSPointerOver","MSPointerOut","MSPointerDown","MSPointerUp","MSPointerMove","MSPointerCancel");a.MouseTracker.unprefixedPointerEvents=!1;navigator.msMaxTouchPoints?a.MouseTracker.maxTouchPoints=navigator.msMaxTouchPoints:a.MouseTracker.maxTouchPoints=0;a.MouseTracker.haveMouseEnter=!1}else{a.MouseTracker.havePointerEvents=!1;if(a.Browser.vendor===a.BROWSERS.IE&&a.Browser.version<9){a.MouseTracker.subscribeEvents.push("mouseenter","mouseleave");a.MouseTracker.haveMouseEnter=!0}else{a.MouseTracker.subscribeEvents.push("mouseover","mouseout");a.MouseTracker.haveMouseEnter=!1}a.MouseTracker.subscribeEvents.push("mousedown","mouseup","mousemove");"ontouchstart"in window&&a.MouseTracker.subscribeEvents.push("touchstart","touchend","touchmove","touchcancel");"ongesturestart"in window&&a.MouseTracker.subscribeEvents.push("gesturestart","gesturechange");a.MouseTracker.mousePointerId="legacy-mouse";a.MouseTracker.maxTouchPoints=10}a.MouseTracker.GesturePointList=function(a){this._gPoints=[];this.type=a;this.buttons=0;this.contacts=0;this.clicks=0;this.captureCount=0};a.MouseTracker.GesturePointList.prototype={getLength:function(){return this._gPoints.length},asArray:function(){return this._gPoints},add:function(a){return this._gPoints.push(a)},removeById:function(a){var b,c=this._gPoints.length;for(b=0;c>b;b++)if(this._gPoints[b].id===a){this._gPoints.splice(b,1);break}return this._gPoints.length},getByIndex:function(a){return a<this._gPoints.length?this._gPoints[a]:null},getById:function(a){var b,c=this._gPoints.length;for(b=0;c>b;b++)if(this._gPoints[b].id===a)return this._gPoints[b];return null},getPrimary:function(a){var b,c=this._gPoints.length;for(b=0;c>b;b++)if(this._gPoints[b].isPrimary)return this._gPoints[b];return null}};var qa=function(){try{return window.self!==window.top}catch(a){return!0}}()}(OpenSeadragon);!function(a){a.ControlAnchor={NONE:0,TOP_LEFT:1,TOP_RIGHT:2,BOTTOM_RIGHT:3,BOTTOM_LEFT:4,ABSOLUTE:5};a.Control=function(b,c,d){var e=b.parentNode;if("number"==typeof c){a.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; please use an options object instead.  Support for this deprecated variant is scheduled for removal in December 2013");c={anchor:c}}c.attachToViewer="undefined"==typeof c.attachToViewer?!0:c.attachToViewer;this.autoFade="undefined"==typeof c.autoFade?!0:c.autoFade;this.element=b;this.anchor=c.anchor;this.container=d;if(this.anchor==a.ControlAnchor.ABSOLUTE){this.wrapper=a.makeNeutralElement("div");this.wrapper.style.position="absolute";this.wrapper.style.top="number"==typeof c.top?c.top+"px":c.top;this.wrapper.style.left="number"==typeof c.left?c.left+"px":c.left;this.wrapper.style.height="number"==typeof c.height?c.height+"px":c.height;this.wrapper.style.width="number"==typeof c.width?c.width+"px":c.width;this.wrapper.style.margin="0px";this.wrapper.style.padding="0px";this.element.style.position="relative";this.element.style.top="0px";this.element.style.left="0px";this.element.style.height="100%";this.element.style.width="100%"}else{this.wrapper=a.makeNeutralElement("div");this.wrapper.style.display="inline-block";this.anchor==a.ControlAnchor.NONE&&(this.wrapper.style.width=this.wrapper.style.height="100%")}this.wrapper.appendChild(this.element);c.attachToViewer?this.anchor==a.ControlAnchor.TOP_RIGHT||this.anchor==a.ControlAnchor.BOTTOM_RIGHT?this.container.insertBefore(this.wrapper,this.container.firstChild):this.container.appendChild(this.wrapper):e.appendChild(this.wrapper)};a.Control.prototype={destroy:function(){this.wrapper.removeChild(this.element);this.container.removeChild(this.wrapper)},isVisible:function(){return"none"!=this.wrapper.style.display},setVisible:function(b){this.wrapper.style.display=b?this.anchor==a.ControlAnchor.ABSOLUTE?"block":"inline-block":"none"},setOpacity:function(b){this.element[a.SIGNAL]&&a.Browser.vendor==a.BROWSERS.IE?a.setElementOpacity(this.element,b,!0):a.setElementOpacity(this.wrapper,b,!0)}}}(OpenSeadragon);!function(a){function b(a,b){var c,d=a.controls;for(c=d.length-1;c>=0;c--)if(d[c].element==b)return c;return-1}a.ControlDock=function(b){var c,d,e=["topleft","topright","bottomright","bottomleft"];a.extend(!0,this,{id:"controldock-"+a.now()+"-"+Math.floor(1e6*Math.random()),container:a.makeNeutralElement("div"),controls:[]},b);this.container.onsubmit=function(){return!1};if(this.element){this.element=a.getElement(this.element);this.element.appendChild(this.container);this.element.style.position="relative";this.container.style.width="100%";this.container.style.height="100%"}for(d=0;d<e.length;d++){c=e[d];this.controls[c]=a.makeNeutralElement("div");this.controls[c].style.position="absolute";c.match("left")&&(this.controls[c].style.left="0px");c.match("right")&&(this.controls[c].style.right="0px");c.match("top")&&(this.controls[c].style.top="0px");c.match("bottom")&&(this.controls[c].style.bottom="0px")}this.container.appendChild(this.controls.topleft);this.container.appendChild(this.controls.topright);this.container.appendChild(this.controls.bottomright);this.container.appendChild(this.controls.bottomleft)};a.ControlDock.prototype={addControl:function(c,d){c=a.getElement(c);var e=null;if(!(b(this,c)>=0)){switch(d.anchor){case a.ControlAnchor.TOP_RIGHT:e=this.controls.topright;c.style.position="relative";c.style.paddingRight="0px";c.style.paddingTop="0px";break;case a.ControlAnchor.BOTTOM_RIGHT:e=this.controls.bottomright;c.style.position="relative";c.style.paddingRight="0px";c.style.paddingBottom="0px";break;case a.ControlAnchor.BOTTOM_LEFT:e=this.controls.bottomleft;c.style.position="relative";c.style.paddingLeft="0px";c.style.paddingBottom="0px";break;case a.ControlAnchor.TOP_LEFT:e=this.controls.topleft;c.style.position="relative";c.style.paddingLeft="0px";c.style.paddingTop="0px";break;case a.ControlAnchor.ABSOLUTE:e=this.container;c.style.margin="0px";c.style.padding="0px";break;default:case a.ControlAnchor.NONE:e=this.container;c.style.margin="0px";c.style.padding="0px"}this.controls.push(new a.Control(c,d,e));c.style.display="inline-block"}},removeControl:function(c){c=a.getElement(c);var d=b(this,c);if(d>=0){this.controls[d].destroy();this.controls.splice(d,1)}return this},clearControls:function(){for(;this.controls.length>0;)this.controls.pop().destroy();return this},areControlsEnabled:function(){var a;for(a=this.controls.length-1;a>=0;a--)if(this.controls[a].isVisible())return!0;return!1},setControlsEnabled:function(a){var b;for(b=this.controls.length-1;b>=0;b--)this.controls[b].setVisible(a);return this}}}(OpenSeadragon);!function(a){a.Placement=a.freezeObject({CENTER:0,TOP_LEFT:1,TOP:2,TOP_RIGHT:3,RIGHT:4,BOTTOM_RIGHT:5,BOTTOM:6,BOTTOM_LEFT:7,LEFT:8,properties:{0:{isLeft:!1,isHorizontallyCentered:!0,isRight:!1,isTop:!1,isVerticallyCentered:!0,isBottom:!1},1:{isLeft:!0,isHorizontallyCentered:!1,isRight:!1,isTop:!0,isVerticallyCentered:!1,isBottom:!1},2:{isLeft:!1,isHorizontallyCentered:!0,isRight:!1,isTop:!0,isVerticallyCentered:!1,isBottom:!1},3:{isLeft:!1,isHorizontallyCentered:!1,isRight:!0,isTop:!0,isVerticallyCentered:!1,isBottom:!1},4:{isLeft:!1,isHorizontallyCentered:!1,isRight:!0,isTop:!1,isVerticallyCentered:!0,isBottom:!1},5:{isLeft:!1,isHorizontallyCentered:!1,isRight:!0,isTop:!1,isVerticallyCentered:!1,isBottom:!0},6:{isLeft:!1,isHorizontallyCentered:!0,isRight:!1,isTop:!1,isVerticallyCentered:!1,isBottom:!0},7:{isLeft:!0,isHorizontallyCentered:!1,isRight:!1,isTop:!1,isVerticallyCentered:!1,isBottom:!0},8:{isLeft:!0,isHorizontallyCentered:!1,isRight:!1,isTop:!1,isVerticallyCentered:!0,isBottom:!1}}})}(OpenSeadragon);!function(a){function b(b){b=a.getElement(b);return new a.Point(0===b.clientWidth?1:b.clientWidth,0===b.clientHeight?1:b.clientHeight)}function c(b,c,d,e){function f(a,b){if(a.ready)d(a);else{a.addHandler("ready",function(){d(a)});a.addHandler("open-failed",function(a){e({message:a.message,source:b})})}}var g=b;"string"==a.type(c)&&(c.match(/\s*<.*/)?c=a.parseXml(c):c.match(/\s*[\{\[].*/)&&(c=a.parseJSON(c)));setTimeout(function(){if("string"==a.type(c)){c=new a.TileSource({url:c,crossOriginPolicy:b.crossOriginPolicy,ajaxWithCredentials:b.ajaxWithCredentials,useCanvas:b.useCanvas,success:function(a){d(a.tileSource)}});c.addHandler("open-failed",function(a){e(a)})}else if(a.isPlainObject(c)||c.nodeType){!c.crossOriginPolicy&&b.crossOriginPolicy&&(c.crossOriginPolicy=b.crossOriginPolicy);void 0===c.ajaxWithCredentials&&(c.ajaxWithCredentials=b.ajaxWithCredentials);void 0===c.useCanvas&&(c.useCanvas=b.useCanvas);if(a.isFunction(c.getTileUrl)){var h=new a.TileSource(c);h.getTileUrl=c.getTileUrl;d(h)}else{var i=a.TileSource.determineType(g,c);if(!i){e({message:"Unable to load TileSource",source:c});return}var j=i.prototype.configure.apply(g,[c]);f(new i(j),c)}}else f(c,c)})}function d(b,c){if(c instanceof a.Overlay)return c;var d=null;if(c.element)d=a.getElement(c.element);else{var e=c.id?c.id:"openseadragon-overlay-"+Math.floor(1e7*Math.random());d=a.getElement(c.id);if(!d){d=document.createElement("a");d.href="#/overlay/"+e}d.id=e;a.addClass(d,c.className?c.className:"openseadragon-overlay")}var f=c.location;var g=c.width;var h=c.height;if(!f){var i=c.x;var j=c.y;if(void 0!==c.px){var k=b.viewport.imageToViewportRectangle(new a.Rect(c.px,c.py,g||0,h||0));i=k.x;j=k.y;g=void 0!==g?k.width:void 0;h=void 0!==h?k.height:void 0}f=new a.Point(i,j)}var l=c.placement;l&&"string"===a.type(l)&&(l=a.Placement[c.placement.toUpperCase()]);return new a.Overlay({element:d,location:f,placement:l,onDraw:c.onDraw,checkResize:c.checkResize,width:g,height:h,rotationMode:c.rotationMode})}function e(a,b){var c;for(c=a.length-1;c>=0;c--)if(a[c].element===b)return c;return-1}function f(b,c){return a.requestAnimationFrame(function(){c(b)})}function g(b){a.requestAnimationFrame(function(){i(b)})}function h(b){if(b.autoHideControls){b.controlsShouldFade=!0;b.controlsFadeBeginTime=a.now()+b.controlsFadeDelay;window.setTimeout(function(){g(b)},b.controlsFadeDelay)}}function i(b){var c,d,e,f;if(b.controlsShouldFade){c=a.now();d=c-b.controlsFadeBeginTime;e=1-d/b.controlsFadeLength;e=Math.min(1,e);e=Math.max(0,e);for(f=b.controls.length-1;f>=0;f--)b.controls[f].autoFade&&b.controls[f].setOpacity(e);e>0&&g(b)}}function j(a){var b;a.controlsShouldFade=!1;for(b=a.controls.length-1;b>=0;b--)a.controls[b].setOpacity(1)}function k(){j(this)}function l(){h(this)}function m(b){if(b.preventDefaultAction||b.ctrl||b.alt||b.meta)return!0;switch(b.keyCode){case 38:b.shift?this.viewport.zoomBy(1.1):this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0,-40)));this.viewport.applyConstraints();return!1;case 40:b.shift?this.viewport.zoomBy(.9):this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0,40)));this.viewport.applyConstraints();return!1;case 37:this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(-40,0)));this.viewport.applyConstraints();return!1;case 39:this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(40,0)));this.viewport.applyConstraints();return!1;default:return!0}}function n(b){if(b.preventDefaultAction||b.ctrl||b.alt||b.meta)return!0;switch(b.keyCode){case 43:case 61:this.viewport.zoomBy(1.1);this.viewport.applyConstraints();return!1;case 45:this.viewport.zoomBy(.9);this.viewport.applyConstraints();return!1;case 48:this.viewport.goHome();this.viewport.applyConstraints();return!1;case 119:case 87:b.shift?this.viewport.zoomBy(1.1):this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0,-40)));this.viewport.applyConstraints();return!1;case 115:case 83:b.shift?this.viewport.zoomBy(.9):this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(0,40)));this.viewport.applyConstraints();return!1;case 97:this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(-40,0)));this.viewport.applyConstraints();return!1;case 100:this.viewport.panBy(this.viewport.deltaPointsFromPixels(new a.Point(40,0)));this.viewport.applyConstraints();return!1;default:return!0}}function o(a){var b;var c=document.activeElement==this.canvas;c||this.canvas.focus();if(!a.preventDefaultAction&&this.viewport&&a.quick){b=this.gestureSettingsByDeviceType(a.pointerType);if(b.clickToZoom){this.viewport.zoomBy(a.shift?1/this.zoomPerClick:this.zoomPerClick,this.viewport.pointFromPixel(a.position,!0));this.viewport.applyConstraints()}}this.raiseEvent("canvas-click",{tracker:a.eventSource,position:a.position,quick:a.quick,shift:a.shift,originalEvent:a.originalEvent})}function p(a){var b;if(!a.preventDefaultAction&&this.viewport){b=this.gestureSettingsByDeviceType(a.pointerType);if(b.dblClickToZoom){this.viewport.zoomBy(a.shift?1/this.zoomPerClick:this.zoomPerClick,this.viewport.pointFromPixel(a.position,!0));this.viewport.applyConstraints()}}this.raiseEvent("canvas-double-click",{tracker:a.eventSource,position:a.position,shift:a.shift,originalEvent:a.originalEvent})}function q(a){var b;if(!a.preventDefaultAction&&this.viewport){b=this.gestureSettingsByDeviceType(a.pointerType);this.panHorizontal||(a.delta.x=0);this.panVertical||(a.delta.y=0);this.viewport.panBy(this.viewport.deltaPointsFromPixels(a.delta.negate()),b.flickEnabled);this.constrainDuringPan&&this.viewport.applyConstraints()}this.raiseEvent("canvas-drag",{tracker:a.eventSource,position:a.position,delta:a.delta,speed:a.speed,direction:a.direction,shift:a.shift,originalEvent:a.originalEvent})}function r(b){if(!b.preventDefaultAction&&this.viewport){var c=this.gestureSettingsByDeviceType(b.pointerType);if(c.flickEnabled&&b.speed>=c.flickMinSpeed){var d=0;this.panHorizontal&&(d=c.flickMomentum*b.speed*Math.cos(b.direction));var e=0;this.panVertical&&(e=c.flickMomentum*b.speed*Math.sin(b.direction));var f=this.viewport.pixelFromPoint(this.viewport.getCenter(!0));var g=this.viewport.pointFromPixel(new a.Point(f.x-d,f.y-e));this.viewport.panTo(g,!1)}this.viewport.applyConstraints()}this.raiseEvent("canvas-drag-end",{tracker:b.eventSource,position:b.position,speed:b.speed,direction:b.direction,shift:b.shift,originalEvent:b.originalEvent})}function s(a){this.raiseEvent("canvas-enter",{tracker:a.eventSource,pointerType:a.pointerType,position:a.position,buttons:a.buttons,pointers:a.pointers,insideElementPressed:a.insideElementPressed,buttonDownAny:a.buttonDownAny,originalEvent:a.originalEvent})}function t(a){this.raiseEvent("canvas-exit",{tracker:a.eventSource,pointerType:a.pointerType,position:a.position,buttons:a.buttons,pointers:a.pointers,insideElementPressed:a.insideElementPressed,buttonDownAny:a.buttonDownAny,originalEvent:a.originalEvent})}function u(a){this.raiseEvent("canvas-press",{tracker:a.eventSource,pointerType:a.pointerType,position:a.position,insideElementPressed:a.insideElementPressed,insideElementReleased:a.insideElementReleased,originalEvent:a.originalEvent})}function v(a){this.raiseEvent("canvas-release",{tracker:a.eventSource,pointerType:a.pointerType,position:a.position,insideElementPressed:a.insideElementPressed,insideElementReleased:a.insideElementReleased,originalEvent:a.originalEvent})}function w(a){this.raiseEvent("canvas-nonprimary-press",{tracker:a.eventSource,position:a.position,pointerType:a.pointerType,button:a.button,buttons:a.buttons,originalEvent:a.originalEvent})}function x(a){this.raiseEvent("canvas-nonprimary-release",{tracker:a.eventSource,position:a.position,pointerType:a.pointerType,button:a.button,buttons:a.buttons,originalEvent:a.originalEvent})}function y(a){var b,c,d,e;if(!a.preventDefaultAction&&this.viewport){b=this.gestureSettingsByDeviceType(a.pointerType);
if(b.pinchToZoom){c=this.viewport.pointFromPixel(a.center,!0);d=this.viewport.pointFromPixel(a.lastCenter,!0);e=d.minus(c);this.panHorizontal||(e.x=0);this.panVertical||(e.y=0);this.viewport.zoomBy(a.distance/a.lastDistance,c,!0);this.viewport.panBy(e,!0);this.viewport.applyConstraints()}if(b.pinchRotate){var f=Math.atan2(a.gesturePoints[0].currentPos.y-a.gesturePoints[1].currentPos.y,a.gesturePoints[0].currentPos.x-a.gesturePoints[1].currentPos.x);var g=Math.atan2(a.gesturePoints[0].lastPos.y-a.gesturePoints[1].lastPos.y,a.gesturePoints[0].lastPos.x-a.gesturePoints[1].lastPos.x);this.viewport.setRotation(this.viewport.getRotation()+(f-g)*(180/Math.PI))}}this.raiseEvent("canvas-pinch",{tracker:a.eventSource,gesturePoints:a.gesturePoints,lastCenter:a.lastCenter,center:a.center,lastDistance:a.lastDistance,distance:a.distance,shift:a.shift,originalEvent:a.originalEvent});return!1}function z(b){var c,d,e,f;e=a.now();f=e-this._lastScrollTime;if(f>this.minScrollDeltaTime){this._lastScrollTime=e;if(!b.preventDefaultAction&&this.viewport){c=this.gestureSettingsByDeviceType(b.pointerType);if(c.scrollToZoom){d=Math.pow(this.zoomPerScroll,b.scroll);this.viewport.zoomBy(d,this.viewport.pointFromPixel(b.position,!0));this.viewport.applyConstraints()}}this.raiseEvent("canvas-scroll",{tracker:b.eventSource,position:b.position,scroll:b.scroll,shift:b.shift,originalEvent:b.originalEvent});if(c&&c.scrollToZoom)return!1}else{c=this.gestureSettingsByDeviceType(b.pointerType);if(c&&c.scrollToZoom)return!1}}function A(a){U[this.hash].mouseInside=!0;j(this);this.raiseEvent("container-enter",{tracker:a.eventSource,position:a.position,buttons:a.buttons,pointers:a.pointers,insideElementPressed:a.insideElementPressed,buttonDownAny:a.buttonDownAny,originalEvent:a.originalEvent})}function B(a){if(a.pointers<1){U[this.hash].mouseInside=!1;U[this.hash].animating||h(this)}this.raiseEvent("container-exit",{tracker:a.eventSource,position:a.position,buttons:a.buttons,pointers:a.pointers,insideElementPressed:a.insideElementPressed,buttonDownAny:a.buttonDownAny,originalEvent:a.originalEvent})}function C(a){D(a);a.isOpen()?a._updateRequestId=f(a,C):a._updateRequestId=!1}function D(a){if(!a._opening){if(a.autoResize){var c=b(a.container);var d=U[a.hash].prevContainerSize;if(!c.equals(d)){var e=a.viewport;if(a.preserveImageSizeOnResize){var f=d.x/c.x;var g=e.getZoom()*f;var i=e.getCenter();e.resize(c,!1);e.zoomTo(g,null,!0);e.panTo(i,!0)}else{var k=e.getBounds();e.resize(c,!0);e.fitBoundsWithConstraints(k,!0)}U[a.hash].prevContainerSize=c;U[a.hash].forceRedraw=!0}}var l=a.viewport.update();var m=a.world.update()||l;l&&a.raiseEvent("viewport-change");a.referenceStrip&&(m=a.referenceStrip.update(a.viewport)||m);if(!U[a.hash].animating&&m){a.raiseEvent("animation-start");j(a)}if(m||U[a.hash].forceRedraw||a.world.needsDraw()){E(a);a._drawOverlays();a.navigator&&a.navigator.update(a.viewport);U[a.hash].forceRedraw=!1;m&&a.raiseEvent("animation")}if(U[a.hash].animating&&!m){a.raiseEvent("animation-finish");U[a.hash].mouseInside||h(a)}U[a.hash].animating=m}}function E(a){a.imageLoader.clear();a.drawer.clear();a.world.draw();a.raiseEvent("update-viewport",{})}function F(a,b){return a?a+b:b}function G(){U[this.hash].lastZoomTime=a.now();U[this.hash].zoomFactor=this.zoomPerSecond;U[this.hash].zooming=!0;J(this)}function H(){U[this.hash].lastZoomTime=a.now();U[this.hash].zoomFactor=1/this.zoomPerSecond;U[this.hash].zooming=!0;J(this)}function I(){U[this.hash].zooming=!1}function J(b){a.requestAnimationFrame(a.delegate(b,K))}function K(){var b,c,d;if(U[this.hash].zooming&&this.viewport){b=a.now();c=b-U[this.hash].lastZoomTime;d=Math.pow(U[this.hash].zoomFactor,c/1e3);this.viewport.zoomBy(d);this.viewport.applyConstraints();U[this.hash].lastZoomTime=b;J(this)}}function L(){if(this.viewport){U[this.hash].zooming=!1;this.viewport.zoomBy(this.zoomPerClick/1);this.viewport.applyConstraints()}}function M(){if(this.viewport){U[this.hash].zooming=!1;this.viewport.zoomBy(1/this.zoomPerClick);this.viewport.applyConstraints()}}function N(){this.buttons.emulateEnter();this.buttons.emulateExit()}function O(){this.viewport&&this.viewport.goHome()}function P(){this.isFullPage()&&!a.isFullScreen()?this.setFullPage(!1):this.setFullScreen(!this.isFullPage());this.buttons&&this.buttons.emulateExit();this.fullPageButton.element.focus();this.viewport&&this.viewport.applyConstraints()}function Q(){if(this.viewport){var a=this.viewport.getRotation();0===a?a=270:a-=90;this.viewport.setRotation(a)}}function R(){if(this.viewport){var a=this.viewport.getRotation();270===a?a=0:a+=90;this.viewport.setRotation(a)}}function S(){var a=this._sequenceIndex-1;this.navPrevNextWrap&&0>a&&(a+=this.tileSources.length);this.goToPage(a)}function T(){var a=this._sequenceIndex+1;this.navPrevNextWrap&&a>=this.tileSources.length&&(a=0);this.goToPage(a)}var U={};var V=1;a.Viewer=function(c){var d,e=arguments,g=this;a.isPlainObject(c)||(c={id:e[0],xmlPath:e.length>1?e[1]:void 0,prefixUrl:e.length>2?e[2]:void 0,controls:e.length>3?e[3]:void 0,overlays:e.length>4?e[4]:void 0});if(c.config){a.extend(!0,c,c.config);delete c.config}a.extend(!0,this,{id:c.id,hash:c.hash||V++,element:null,container:null,canvas:null,overlays:[],overlaysContainer:null,previousBody:[],customControls:[],source:null,drawer:null,world:null,viewport:null,navigator:null,collectionViewport:null,collectionDrawer:null,navImages:null,buttons:null,profiler:null},a.DEFAULT_SETTINGS,c);if("undefined"==typeof this.hash)throw new Error("A hash must be defined, either by specifying options.id or options.hash.");"undefined"!=typeof U[this.hash]&&a.console.warn("Hash "+this.hash+" has already been used.");U[this.hash]={fsBoundsDelta:new a.Point(1,1),prevContainerSize:null,animating:!1,forceRedraw:!1,mouseInside:!1,group:null,zooming:!1,zoomFactor:null,lastZoomTime:null,fullPage:!1,onfullscreenchange:null};this._sequenceIndex=0;this._firstOpen=!0;this._updateRequestId=null;this._loadQueue=[];this.currentOverlays=[];this._lastScrollTime=a.now();a.EventSource.call(this);this.addHandler("open-failed",function(b){var c=a.getString("Errors.OpenFailed",b.eventSource,b.message);g._showMessage(c)});a.ControlDock.call(this,c);this.xmlPath&&(this.tileSources=[this.xmlPath]);this.element=this.element||document.getElementById(this.id);this.canvas=a.makeNeutralElement("div");this.canvas.className="openseadragon-canvas";!function(a){a.width="100%";a.height="100%";a.overflow="hidden";a.position="absolute";a.top="0px";a.left="0px"}(this.canvas.style);a.setElementTouchActionNone(this.canvas);""!==c.tabIndex&&(this.canvas.tabIndex=void 0===c.tabIndex?0:c.tabIndex);this.container.className="openseadragon-container";!function(a){a.width="100%";a.height="100%";a.position="relative";a.overflow="hidden";a.left="0px";a.top="0px";a.textAlign="left"}(this.container.style);this.container.insertBefore(this.canvas,this.container.firstChild);this.element.appendChild(this.container);this.bodyWidth=document.body.style.width;this.bodyHeight=document.body.style.height;this.bodyOverflow=document.body.style.overflow;this.docOverflow=document.documentElement.style.overflow;this.innerTracker=new a.MouseTracker({element:this.canvas,startDisabled:this.mouseNavEnabled?!1:!0,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,dblClickTimeThreshold:this.dblClickTimeThreshold,dblClickDistThreshold:this.dblClickDistThreshold,keyDownHandler:a.delegate(this,m),keyHandler:a.delegate(this,n),clickHandler:a.delegate(this,o),dblClickHandler:a.delegate(this,p),dragHandler:a.delegate(this,q),dragEndHandler:a.delegate(this,r),enterHandler:a.delegate(this,s),exitHandler:a.delegate(this,t),pressHandler:a.delegate(this,u),releaseHandler:a.delegate(this,v),nonPrimaryPressHandler:a.delegate(this,w),nonPrimaryReleaseHandler:a.delegate(this,x),scrollHandler:a.delegate(this,z),pinchHandler:a.delegate(this,y)});this.outerTracker=new a.MouseTracker({element:this.container,startDisabled:this.mouseNavEnabled?!1:!0,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,dblClickTimeThreshold:this.dblClickTimeThreshold,dblClickDistThreshold:this.dblClickDistThreshold,enterHandler:a.delegate(this,A),exitHandler:a.delegate(this,B)});this.toolbar&&(this.toolbar=new a.ControlDock({element:this.toolbar}));this.bindStandardControls();U[this.hash].prevContainerSize=b(this.container);this.world=new a.World({viewer:this});this.world.addHandler("add-item",function(a){g.source=g.world.getItemAt(0).source;U[g.hash].forceRedraw=!0;g._updateRequestId||(g._updateRequestId=f(g,C))});this.world.addHandler("remove-item",function(a){g.world.getItemCount()?g.source=g.world.getItemAt(0).source:g.source=null;U[g.hash].forceRedraw=!0});this.world.addHandler("metrics-change",function(a){g.viewport&&g.viewport._setContentBounds(g.world.getHomeBounds(),g.world.getContentFactor())});this.world.addHandler("item-index-change",function(a){g.source=g.world.getItemAt(0).source});this.viewport=new a.Viewport({containerSize:U[this.hash].prevContainerSize,springStiffness:this.springStiffness,animationTime:this.animationTime,minZoomImageRatio:this.minZoomImageRatio,maxZoomPixelRatio:this.maxZoomPixelRatio,visibilityRatio:this.visibilityRatio,wrapHorizontal:this.wrapHorizontal,wrapVertical:this.wrapVertical,defaultZoomLevel:this.defaultZoomLevel,minZoomLevel:this.minZoomLevel,maxZoomLevel:this.maxZoomLevel,viewer:this,degrees:this.degrees,navigatorRotate:this.navigatorRotate,homeFillsViewer:this.homeFillsViewer,margins:this.viewportMargins});this.viewport._setContentBounds(this.world.getHomeBounds(),this.world.getContentFactor());this.imageLoader=new a.ImageLoader({jobLimit:this.imageLoaderLimit});this.tileCache=new a.TileCache({maxImageCacheCount:this.maxImageCacheCount});this.drawer=new a.Drawer({viewer:this,viewport:this.viewport,element:this.canvas,debugGridColor:this.debugGridColor});this.overlaysContainer=a.makeNeutralElement("div");this.canvas.appendChild(this.overlaysContainer);if(!this.drawer.canRotate()){if(this.rotateLeft){d=this.buttons.buttons.indexOf(this.rotateLeft);this.buttons.buttons.splice(d,1);this.buttons.element.removeChild(this.rotateLeft.element)}if(this.rotateRight){d=this.buttons.buttons.indexOf(this.rotateRight);this.buttons.buttons.splice(d,1);this.buttons.element.removeChild(this.rotateRight.element)}}this.showNavigator&&(this.navigator=new a.Navigator({id:this.navigatorId,position:this.navigatorPosition,sizeRatio:this.navigatorSizeRatio,maintainSizeRatio:this.navigatorMaintainSizeRatio,top:this.navigatorTop,left:this.navigatorLeft,width:this.navigatorWidth,height:this.navigatorHeight,autoResize:this.navigatorAutoResize,autoFade:this.navigatorAutoFade,prefixUrl:this.prefixUrl,viewer:this,navigatorRotate:this.navigatorRotate,crossOriginPolicy:this.crossOriginPolicy}));this.sequenceMode&&this.bindSequenceControls();this.tileSources&&this.open(this.tileSources);for(d=0;d<this.customControls.length;d++)this.addControl(this.customControls[d].id,{anchor:this.customControls[d].anchor});a.requestAnimationFrame(function(){h(g)})};a.extend(a.Viewer.prototype,a.EventSource.prototype,a.ControlDock.prototype,{isOpen:function(){return!!this.world.getItemCount()},openDzi:function(b){a.console.error("[Viewer.openDzi] this function is deprecated; use Viewer.open() instead.");return this.open(b)},openTileSource:function(b){a.console.error("[Viewer.openTileSource] this function is deprecated; use Viewer.open() instead.");return this.open(b)},open:function(b){var c=this;this.close();if(b)if(this.sequenceMode&&a.isArray(b)){if(this.referenceStrip){this.referenceStrip.destroy();this.referenceStrip=null}this.tileSources=b;this._sequenceIndex=Math.max(0,Math.min(this.tileSources.length-1,this.initialPage));if(this.tileSources.length){this.open(this.tileSources[this._sequenceIndex]);this.showReferenceStrip&&(this.referenceStrip=new a.ReferenceStrip({id:this.referenceStripElement,position:this.referenceStripPosition,sizeRatio:this.referenceStripSizeRatio,scroll:this.referenceStripScroll,height:this.referenceStripHeight,width:this.referenceStripWidth,tileSources:this.tileSources,prefixUrl:this.prefixUrl,viewer:this}))}this._updateSequenceButtons(this._sequenceIndex)}else{a.isArray(b)||(b=[b]);if(b.length){this._opening=!0;var e=b.length;var f=0;var g=0;var h;var i=function(){if(f+g===e)if(f){if(c._firstOpen||!c.preserveViewport){c.viewport.goHome(!0);c.viewport.update()}c._firstOpen=!1;var a=b[0];a.tileSource&&(a=a.tileSource);if(c.overlays&&!c.preserveOverlays)for(var i=0;i<c.overlays.length;i++)c.currentOverlays[i]=d(c,c.overlays[i]);c._drawOverlays();c._opening=!1;c.raiseEvent("open",{source:a})}else{c._opening=!1;c.raiseEvent("open-failed",h)}};var j=function(b){a.isPlainObject(b)&&b.tileSource||(b={tileSource:b});if(void 0!==b.index){a.console.error("[Viewer.open] setting indexes here is not supported; use addTiledImage instead");delete b.index}void 0===b.collectionImmediately&&(b.collectionImmediately=!0);var d=b.success;b.success=function(a){f++;if(b.tileSource.overlays)for(var e=0;e<b.tileSource.overlays.length;e++)c.addOverlay(b.tileSource.overlays[e]);d&&d(a);i()};var e=b.error;b.error=function(a){g++;h||(h=a);e&&e(a);i()};c.addTiledImage(b)};for(var k=0;k<b.length;k++)j(b[k]);return this}}},close:function(){if(!U[this.hash])return this;this._opening=!1;this.navigator&&this.navigator.close();if(!this.preserveOverlays){this.clearOverlays();this.overlaysContainer.innerHTML=""}U[this.hash].animating=!1;this.world.removeAll();this.imageLoader.clear();this.raiseEvent("close");return this},destroy:function(){if(U[this.hash]){this.close();this.clearOverlays();this.overlaysContainer.innerHTML="";if(this.referenceStrip){this.referenceStrip.destroy();this.referenceStrip=null}if(null!==this._updateRequestId){a.cancelAnimationFrame(this._updateRequestId);this._updateRequestId=null}this.drawer&&this.drawer.destroy();this.removeAllHandlers();if(this.element)for(;this.element.firstChild;)this.element.removeChild(this.element.firstChild);this.innerTracker&&this.innerTracker.destroy();this.outerTracker&&this.outerTracker.destroy();U[this.hash]=null;delete U[this.hash];this.canvas=null;this.container=null;this.element=null}},isMouseNavEnabled:function(){return this.innerTracker.isTracking()},setMouseNavEnabled:function(a){this.innerTracker.setTracking(a);this.outerTracker.setTracking(a);this.raiseEvent("mouse-enabled",{enabled:a});return this},areControlsEnabled:function(){var a,b=this.controls.length;for(a=0;a<this.controls.length;a++)b=b&&this.controls[a].isVisibile();return b},setControlsEnabled:function(a){a?j(this):h(this);this.raiseEvent("controls-enabled",{enabled:a});return this},isFullPage:function(){return U[this.hash].fullPage},setFullPage:function(b){var c,d,e=document.body,f=e.style,g=document.documentElement.style,h=this;if(b==this.isFullPage())return this;var i={fullPage:b,preventDefaultAction:!1};this.raiseEvent("pre-full-page",i);if(i.preventDefaultAction)return this;if(b){this.elementSize=a.getElementSize(this.element);this.pageScroll=a.getPageScroll();this.elementMargin=this.element.style.margin;this.element.style.margin="0";this.elementPadding=this.element.style.padding;this.element.style.padding="0";this.bodyMargin=f.margin;this.docMargin=g.margin;f.margin="0";g.margin="0";this.bodyPadding=f.padding;this.docPadding=g.padding;f.padding="0";g.padding="0";this.bodyWidth=f.width;this.docWidth=g.width;f.width="100%";g.width="100%";this.bodyHeight=f.height;this.docHeight=g.height;f.height="100%";g.height="100%";this.previousBody=[];U[this.hash].prevElementParent=this.element.parentNode;U[this.hash].prevNextSibling=this.element.nextSibling;U[this.hash].prevElementWidth=this.element.style.width;U[this.hash].prevElementHeight=this.element.style.height;c=e.childNodes.length;for(d=0;c>d;d++){this.previousBody.push(e.childNodes[0]);e.removeChild(e.childNodes[0])}if(this.toolbar&&this.toolbar.element){this.toolbar.parentNode=this.toolbar.element.parentNode;this.toolbar.nextSibling=this.toolbar.element.nextSibling;e.appendChild(this.toolbar.element);a.addClass(this.toolbar.element,"fullpage")}a.addClass(this.element,"fullpage");e.appendChild(this.element);this.element.style.height=a.getWindowSize().y+"px";this.element.style.width=a.getWindowSize().x+"px";this.toolbar&&this.toolbar.element&&(this.element.style.height=a.getElementSize(this.element).y-a.getElementSize(this.toolbar.element).y+"px");U[this.hash].fullPage=!0;a.delegate(this,A)({})}else{this.element.style.margin=this.elementMargin;this.element.style.padding=this.elementPadding;f.margin=this.bodyMargin;g.margin=this.docMargin;f.padding=this.bodyPadding;g.padding=this.docPadding;f.width=this.bodyWidth;g.width=this.docWidth;f.height=this.bodyHeight;g.height=this.docHeight;e.removeChild(this.element);c=this.previousBody.length;for(d=0;c>d;d++)e.appendChild(this.previousBody.shift());a.removeClass(this.element,"fullpage");U[this.hash].prevElementParent.insertBefore(this.element,U[this.hash].prevNextSibling);if(this.toolbar&&this.toolbar.element){e.removeChild(this.toolbar.element);a.removeClass(this.toolbar.element,"fullpage");this.toolbar.parentNode.insertBefore(this.toolbar.element,this.toolbar.nextSibling);delete this.toolbar.parentNode;delete this.toolbar.nextSibling}this.element.style.width=U[this.hash].prevElementWidth;this.element.style.height=U[this.hash].prevElementHeight;var j=0;var k=function(){a.setPageScroll(h.pageScroll);var b=a.getPageScroll();j++;(10>j&&b.x!==h.pageScroll.x||b.y!==h.pageScroll.y)&&a.requestAnimationFrame(k)};a.requestAnimationFrame(k);U[this.hash].fullPage=!1;a.delegate(this,B)({})}this.navigator&&this.viewport&&this.navigator.update(this.viewport);this.raiseEvent("full-page",{fullPage:b});return this},setFullScreen:function(b){var c=this;if(!a.supportsFullScreen)return this.setFullPage(b);if(a.isFullScreen()===b)return this;var d={fullScreen:b,preventDefaultAction:!1};this.raiseEvent("pre-full-screen",d);if(d.preventDefaultAction)return this;if(b){this.setFullPage(!0);if(!this.isFullPage())return this;this.fullPageStyleWidth=this.element.style.width;this.fullPageStyleHeight=this.element.style.height;this.element.style.width="100%";this.element.style.height="100%";var e=function(){var b=a.isFullScreen();if(!b){a.removeEvent(document,a.fullScreenEventName,e);a.removeEvent(document,a.fullScreenErrorEventName,e);c.setFullPage(!1);if(c.isFullPage()){c.element.style.width=c.fullPageStyleWidth;c.element.style.height=c.fullPageStyleHeight}}c.navigator&&c.viewport&&c.navigator.update(c.viewport);c.raiseEvent("full-screen",{fullScreen:b})};a.addEvent(document,a.fullScreenEventName,e);a.addEvent(document,a.fullScreenErrorEventName,e);a.requestFullScreen(document.body)}else a.exitFullScreen();return this},isVisible:function(){return"hidden"!=this.container.style.visibility},setVisible:function(a){this.container.style.visibility=a?"":"hidden";this.raiseEvent("visible",{visible:a});return this},addTiledImage:function(b){function d(a){for(var c=0;c<f._loadQueue.length;c++)if(f._loadQueue[c]===g){f._loadQueue.splice(c,1);break}0===f._loadQueue.length&&e(g);f.raiseEvent("add-item-failed",a);b.error&&b.error(a)}function e(a){if(f.collectionMode){f.world.arrange({immediately:a.options.collectionImmediately,rows:f.collectionRows,columns:f.collectionColumns,layout:f.collectionLayout,tileSize:f.collectionTileSize,tileMargin:f.collectionTileMargin});f.world.setAutoRefigureSizes(!0)}}a.console.assert(b,"[Viewer.addTiledImage] options is required");a.console.assert(b.tileSource,"[Viewer.addTiledImage] options.tileSource is required");a.console.assert(!b.replace||b.index>-1&&b.index<this.world.getItemCount(),"[Viewer.addTiledImage] if options.replace is used, options.index must be a valid index in Viewer.world");var f=this;b.replace&&(b.replaceItem=f.world.getItemAt(b.index));this._hideMessage();void 0===b.placeholderFillStyle&&(b.placeholderFillStyle=this.placeholderFillStyle);void 0===b.opacity&&(b.opacity=this.opacity);void 0===b.compositeOperation&&(b.compositeOperation=this.compositeOperation);var g={options:b};if(a.isArray(b.tileSource))setTimeout(function(){d({message:"[Viewer.addTiledImage] Sequences can not be added; add them one at a time instead.",source:b.tileSource,options:b})});else{this._loadQueue.push(g);c(this,b.tileSource,function(b){g.tileSource=b;var c,d,h;for(;f._loadQueue.length;){c=f._loadQueue[0];if(!c.tileSource)break;f._loadQueue.splice(0,1);if(c.options.replace){var i=f.world.getIndexOfItem(c.options.replaceItem);-1!=i&&(c.options.index=i);f.world.removeItem(c.options.replaceItem)}d=new a.TiledImage({viewer:f,source:c.tileSource,viewport:f.viewport,drawer:f.drawer,tileCache:f.tileCache,imageLoader:f.imageLoader,x:c.options.x,y:c.options.y,width:c.options.width,height:c.options.height,fitBounds:c.options.fitBounds,fitBoundsPlacement:c.options.fitBoundsPlacement,clip:c.options.clip,placeholderFillStyle:c.options.placeholderFillStyle,opacity:c.options.opacity,compositeOperation:c.options.compositeOperation,springStiffness:f.springStiffness,animationTime:f.animationTime,minZoomImageRatio:f.minZoomImageRatio,wrapHorizontal:f.wrapHorizontal,wrapVertical:f.wrapVertical,immediateRender:f.immediateRender,blendTime:f.blendTime,alwaysBlend:f.alwaysBlend,minPixelRatio:f.minPixelRatio,smoothTileEdgesMinZoom:f.smoothTileEdgesMinZoom,iOSDevice:f.iOSDevice,crossOriginPolicy:f.crossOriginPolicy,debugMode:f.debugMode});f.collectionMode&&f.world.setAutoRefigureSizes(!1);f.world.addItem(d,{index:c.options.index});0===f._loadQueue.length&&e(c);1!==f.world.getItemCount()||f.preserveViewport||f.viewport.goHome(!0);if(f.navigator){h=a.extend({},c.options,{replace:!1,originalTiledImage:d,tileSource:c.tileSource});f.navigator.addTiledImage(h)}c.options.success&&c.options.success({item:d})}},function(a){a.options=b;d(a)})}},addSimpleImage:function(b){a.console.assert(b,"[Viewer.addSimpleImage] options is required");a.console.assert(b.url,"[Viewer.addSimpleImage] options.url is required");var c=a.extend({},b,{tileSource:{type:"image",url:b.url}});delete c.url;this.addTiledImage(c)},addLayer:function(b){var c=this;a.console.error("[Viewer.addLayer] this function is deprecated; use Viewer.addTiledImage() instead.");var d=a.extend({},b,{success:function(a){c.raiseEvent("add-layer",{options:b,drawer:a.item})},error:function(a){c.raiseEvent("add-layer-failed",a)}});this.addTiledImage(d);return this},getLayerAtLevel:function(b){a.console.error("[Viewer.getLayerAtLevel] this function is deprecated; use World.getItemAt() instead.");return this.world.getItemAt(b)},getLevelOfLayer:function(b){a.console.error("[Viewer.getLevelOfLayer] this function is deprecated; use World.getIndexOfItem() instead.");return this.world.getIndexOfItem(b)},getLayersCount:function(){a.console.error("[Viewer.getLayersCount] this function is deprecated; use World.getItemCount() instead.");return this.world.getItemCount()},setLayerLevel:function(b,c){a.console.error("[Viewer.setLayerLevel] this function is deprecated; use World.setItemIndex() instead.");return this.world.setItemIndex(b,c)},removeLayer:function(b){a.console.error("[Viewer.removeLayer] this function is deprecated; use World.removeItem() instead.");return this.world.removeItem(b)},forceRedraw:function(){U[this.hash].forceRedraw=!0;return this},bindSequenceControls:function(){var b=a.delegate(this,k),c=a.delegate(this,l),d=a.delegate(this,T),e=a.delegate(this,S),f=this.navImages,g=!0;if(this.showSequenceControl){(this.previousButton||this.nextButton)&&(g=!1);this.previousButton=new a.Button({element:this.previousButton?a.getElement(this.previousButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:a.getString("Tooltips.PreviousPage"),srcRest:F(this.prefixUrl,f.previous.REST),srcGroup:F(this.prefixUrl,f.previous.GROUP),srcHover:F(this.prefixUrl,f.previous.HOVER),srcDown:F(this.prefixUrl,f.previous.DOWN),onRelease:e,onFocus:b,onBlur:c});this.nextButton=new a.Button({element:this.nextButton?a.getElement(this.nextButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:a.getString("Tooltips.NextPage"),srcRest:F(this.prefixUrl,f.next.REST),srcGroup:F(this.prefixUrl,f.next.GROUP),srcHover:F(this.prefixUrl,f.next.HOVER),srcDown:F(this.prefixUrl,f.next.DOWN),onRelease:d,onFocus:b,onBlur:c});this.navPrevNextWrap||this.previousButton.disable();this.tileSources&&this.tileSources.length||this.nextButton.disable();if(g){this.paging=new a.ButtonGroup({buttons:[this.previousButton,this.nextButton],clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold});this.pagingControl=this.paging.element;this.toolbar?this.toolbar.addControl(this.pagingControl,{anchor:a.ControlAnchor.BOTTOM_RIGHT}):this.addControl(this.pagingControl,{anchor:this.sequenceControlAnchor||a.ControlAnchor.TOP_LEFT})}}return this},bindStandardControls:function(){var b=a.delegate(this,G),c=a.delegate(this,I),d=a.delegate(this,L),e=a.delegate(this,H),f=a.delegate(this,M),g=a.delegate(this,O),h=a.delegate(this,P),i=a.delegate(this,Q),j=a.delegate(this,R),m=a.delegate(this,k),n=a.delegate(this,l),o=this.navImages,p=[],q=!0;if(this.showNavigationControl){(this.zoomInButton||this.zoomOutButton||this.homeButton||this.fullPageButton||this.rotateLeftButton||this.rotateRightButton)&&(q=!1);if(this.showZoomControl){p.push(this.zoomInButton=new a.Button({element:this.zoomInButton?a.getElement(this.zoomInButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:a.getString("Tooltips.ZoomIn"),srcRest:F(this.prefixUrl,o.zoomIn.REST),srcGroup:F(this.prefixUrl,o.zoomIn.GROUP),srcHover:F(this.prefixUrl,o.zoomIn.HOVER),srcDown:F(this.prefixUrl,o.zoomIn.DOWN),onPress:b,onRelease:c,onClick:d,onEnter:b,onExit:c,onFocus:m,onBlur:n}));p.push(this.zoomOutButton=new a.Button({element:this.zoomOutButton?a.getElement(this.zoomOutButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:a.getString("Tooltips.ZoomOut"),srcRest:F(this.prefixUrl,o.zoomOut.REST),srcGroup:F(this.prefixUrl,o.zoomOut.GROUP),srcHover:F(this.prefixUrl,o.zoomOut.HOVER),srcDown:F(this.prefixUrl,o.zoomOut.DOWN),onPress:e,onRelease:c,onClick:f,onEnter:e,onExit:c,onFocus:m,onBlur:n}))}this.showHomeControl&&p.push(this.homeButton=new a.Button({element:this.homeButton?a.getElement(this.homeButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:a.getString("Tooltips.Home"),srcRest:F(this.prefixUrl,o.home.REST),srcGroup:F(this.prefixUrl,o.home.GROUP),srcHover:F(this.prefixUrl,o.home.HOVER),srcDown:F(this.prefixUrl,o.home.DOWN),onRelease:g,onFocus:m,onBlur:n}));this.showFullPageControl&&p.push(this.fullPageButton=new a.Button({element:this.fullPageButton?a.getElement(this.fullPageButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:a.getString("Tooltips.FullPage"),srcRest:F(this.prefixUrl,o.fullpage.REST),srcGroup:F(this.prefixUrl,o.fullpage.GROUP),srcHover:F(this.prefixUrl,o.fullpage.HOVER),srcDown:F(this.prefixUrl,o.fullpage.DOWN),onRelease:h,onFocus:m,onBlur:n}));if(this.showRotationControl){p.push(this.rotateLeftButton=new a.Button({element:this.rotateLeftButton?a.getElement(this.rotateLeftButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:a.getString("Tooltips.RotateLeft"),srcRest:F(this.prefixUrl,o.rotateleft.REST),srcGroup:F(this.prefixUrl,o.rotateleft.GROUP),srcHover:F(this.prefixUrl,o.rotateleft.HOVER),srcDown:F(this.prefixUrl,o.rotateleft.DOWN),onRelease:i,onFocus:m,onBlur:n}));p.push(this.rotateRightButton=new a.Button({element:this.rotateRightButton?a.getElement(this.rotateRightButton):null,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,tooltip:a.getString("Tooltips.RotateRight"),srcRest:F(this.prefixUrl,o.rotateright.REST),srcGroup:F(this.prefixUrl,o.rotateright.GROUP),srcHover:F(this.prefixUrl,o.rotateright.HOVER),srcDown:F(this.prefixUrl,o.rotateright.DOWN),onRelease:j,onFocus:m,onBlur:n}))}if(q){this.buttons=new a.ButtonGroup({buttons:p,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold});this.navControl=this.buttons.element;this.addHandler("open",a.delegate(this,N));this.toolbar?this.toolbar.addControl(this.navControl,{anchor:a.ControlAnchor.TOP_LEFT}):this.addControl(this.navControl,{anchor:this.navigationControlAnchor||a.ControlAnchor.TOP_LEFT})}}return this},currentPage:function(){return this._sequenceIndex},goToPage:function(a){if(this.tileSources&&a>=0&&a<this.tileSources.length){this.raiseEvent("page",{page:a});this._sequenceIndex=a;this._updateSequenceButtons(a);this.open(this.tileSources[a]);this.referenceStrip&&this.referenceStrip.setFocus(a)}return this},addOverlay:function(b,c,f,g){var h;h=a.isPlainObject(b)?b:{element:b,location:c,placement:f,onDraw:g};b=a.getElement(h.element);if(e(this.currentOverlays,b)>=0)return this;var i=d(this,h);this.currentOverlays.push(i);i.drawHTML(this.overlaysContainer,this.viewport);this.raiseEvent("add-overlay",{element:b,location:h.location,placement:h.placement});return this},updateOverlay:function(b,c,d){var f;b=a.getElement(b);f=e(this.currentOverlays,b);if(f>=0){this.currentOverlays[f].update(c,d);U[this.hash].forceRedraw=!0;this.raiseEvent("update-overlay",{element:b,location:c,placement:d})}return this},removeOverlay:function(b){var c;b=a.getElement(b);c=e(this.currentOverlays,b);if(c>=0){this.currentOverlays[c].destroy();this.currentOverlays.splice(c,1);U[this.hash].forceRedraw=!0;this.raiseEvent("remove-overlay",{element:b})}return this},clearOverlays:function(){for(;this.currentOverlays.length>0;)this.currentOverlays.pop().destroy();U[this.hash].forceRedraw=!0;this.raiseEvent("clear-overlay",{});return this},getOverlayById:function(b){var c;b=a.getElement(b);c=e(this.currentOverlays,b);return c>=0?this.currentOverlays[c]:null},_updateSequenceButtons:function(a){this.nextButton&&(this.tileSources&&this.tileSources.length-1!==a?this.nextButton.enable():this.navPrevNextWrap||this.nextButton.disable());this.previousButton&&(a>0?this.previousButton.enable():this.navPrevNextWrap||this.previousButton.disable())},_showMessage:function(b){this._hideMessage();var c=a.makeNeutralElement("div");c.appendChild(document.createTextNode(b));this.messageDiv=a.makeCenteredNode(c);a.addClass(this.messageDiv,"openseadragon-message");this.container.appendChild(this.messageDiv)},_hideMessage:function(){var a=this.messageDiv;if(a){a.parentNode.removeChild(a);delete this.messageDiv}},gestureSettingsByDeviceType:function(a){switch(a){case"mouse":return this.gestureSettingsMouse;case"touch":return this.gestureSettingsTouch;case"pen":return this.gestureSettingsPen;default:return this.gestureSettingsUnknown}},_drawOverlays:function(){var a,b=this.currentOverlays.length;for(a=0;b>a;a++)this.currentOverlays[a].drawHTML(this.overlaysContainer,this.viewport)},_cancelPendingImages:function(){this._loadQueue=[]}})}(OpenSeadragon);!function(a){function b(a){if(a.quick&&this.viewer.viewport){this.viewer.viewport.panTo(this.viewport.pointFromPixel(a.position));this.viewer.viewport.applyConstraints()}}function c(a){if(this.viewer.viewport){this.panHorizontal||(a.delta.x=0);this.panVertical||(a.delta.y=0);this.viewer.viewport.panBy(this.viewport.deltaPointsFromPixels(a.delta))}}function d(a){a.insideElementPressed&&this.viewer.viewport&&this.viewer.viewport.applyConstraints()}function e(a){this.viewer.raiseEvent("navigator-scroll",{tracker:a.eventSource,position:a.position,scroll:a.scroll,shift:a.shift,originalEvent:a.originalEvent});return!1}function f(a,b){a.style.webkitTransform="rotate("+b+"deg)";a.style.mozTransform="rotate("+b+"deg)";a.style.msTransform="rotate("+b+"deg)";a.style.oTransform="rotate("+b+"deg)";a.style.transform="rotate("+b+"deg)"}a.Navigator=function(g){function h(a){f(l.displayRegionContainer,a);
f(l.displayRegion,-a);l.viewport.setRotation(a)}var i,j,k=g.viewer,l=this;if(g.id){this.element=document.getElementById(g.id);g.controlOptions={anchor:a.ControlAnchor.NONE,attachToViewer:!1,autoFade:!1}}else{g.id="navigator-"+a.now();this.element=a.makeNeutralElement("div");g.controlOptions={anchor:a.ControlAnchor.TOP_RIGHT,attachToViewer:!0,autoFade:g.autoFade};if(g.position)if("BOTTOM_RIGHT"==g.position)g.controlOptions.anchor=a.ControlAnchor.BOTTOM_RIGHT;else if("BOTTOM_LEFT"==g.position)g.controlOptions.anchor=a.ControlAnchor.BOTTOM_LEFT;else if("TOP_RIGHT"==g.position)g.controlOptions.anchor=a.ControlAnchor.TOP_RIGHT;else if("TOP_LEFT"==g.position)g.controlOptions.anchor=a.ControlAnchor.TOP_LEFT;else if("ABSOLUTE"==g.position){g.controlOptions.anchor=a.ControlAnchor.ABSOLUTE;g.controlOptions.top=g.top;g.controlOptions.left=g.left;g.controlOptions.height=g.height;g.controlOptions.width=g.width}}this.element.id=g.id;this.element.className+=" navigator";g=a.extend(!0,{sizeRatio:a.DEFAULT_SETTINGS.navigatorSizeRatio},g,{element:this.element,tabIndex:-1,showNavigator:!1,mouseNavEnabled:!1,showNavigationControl:!1,showSequenceControl:!1,immediateRender:!0,blendTime:0,animationTime:0,autoResize:g.autoResize,minZoomImageRatio:1});g.minPixelRatio=this.minPixelRatio=k.minPixelRatio;a.setElementTouchActionNone(this.element);this.borderWidth=2;this.fudge=new a.Point(1,1);this.totalBorderWidths=new a.Point(2*this.borderWidth,2*this.borderWidth).minus(this.fudge);g.controlOptions.anchor!=a.ControlAnchor.NONE&&!function(a,b){a.margin="0px";a.border=b+"px solid #555";a.padding="0px";a.background="#000";a.opacity=.8;a.overflow="hidden"}(this.element.style,this.borderWidth);this.displayRegion=a.makeNeutralElement("div");this.displayRegion.id=this.element.id+"-displayregion";this.displayRegion.className="displayregion";!function(a,b){a.position="relative";a.top="0px";a.left="0px";a.fontSize="0px";a.overflow="hidden";a.border=b+"px solid #900";a.margin="0px";a.padding="0px";a.background="transparent";a["float"]="left";a.cssFloat="left";a.styleFloat="left";a.zIndex=999999999;a.cursor="default"}(this.displayRegion.style,this.borderWidth);this.displayRegionContainer=a.makeNeutralElement("div");this.displayRegionContainer.id=this.element.id+"-displayregioncontainer";this.displayRegionContainer.className="displayregioncontainer";this.displayRegionContainer.style.width="100%";this.displayRegionContainer.style.height="100%";k.addControl(this.element,g.controlOptions);this._resizeWithViewer=g.controlOptions.anchor!=a.ControlAnchor.ABSOLUTE&&g.controlOptions.anchor!=a.ControlAnchor.NONE;if(this._resizeWithViewer){if(g.width&&g.height){this.element.style.height="number"==typeof g.height?g.height+"px":g.height;this.element.style.width="number"==typeof g.width?g.width+"px":g.width}else{i=a.getElementSize(k.element);this.element.style.height=Math.round(i.y*g.sizeRatio)+"px";this.element.style.width=Math.round(i.x*g.sizeRatio)+"px";this.oldViewerSize=i}j=a.getElementSize(this.element);this.elementArea=j.x*j.y}this.oldContainerSize=new a.Point(0,0);a.Viewer.apply(this,[g]);this.displayRegionContainer.appendChild(this.displayRegion);this.element.getElementsByTagName("div")[0].appendChild(this.displayRegionContainer);if(g.navigatorRotate){var m=g.viewer.viewport?g.viewer.viewport.getRotation():g.viewer.degrees||0;h(m);g.viewer.addHandler("rotate",function(a){h(a.degrees)})}this.innerTracker.destroy();this.innerTracker=new a.MouseTracker({element:this.element,dragHandler:a.delegate(this,c),clickHandler:a.delegate(this,b),releaseHandler:a.delegate(this,d),scrollHandler:a.delegate(this,e)});this.addHandler("reset-size",function(){l.viewport&&l.viewport.goHome(!0)});k.world.addHandler("item-index-change",function(a){var b=l.world.getItemAt(a.previousIndex);l.world.setItemIndex(b,a.newIndex)});k.world.addHandler("remove-item",function(a){var b=a.item;var c=l._getMatchingItem(b);c&&l.world.removeItem(c)});this.update(k.viewport)};a.extend(a.Navigator.prototype,a.EventSource.prototype,a.Viewer.prototype,{updateSize:function(){if(this.viewport){var b=new a.Point(0===this.container.clientWidth?1:this.container.clientWidth,0===this.container.clientHeight?1:this.container.clientHeight);if(!b.equals(this.oldContainerSize)){this.viewport.resize(b,!0);this.viewport.goHome(!0);this.oldContainerSize=b;this.drawer.clear();this.world.draw()}}},update:function(b){var c,d,e,f,g,h;c=a.getElementSize(this.viewer.element);if(this._resizeWithViewer&&c.x&&c.y&&!c.equals(this.oldViewerSize)){this.oldViewerSize=c;if(this.maintainSizeRatio||!this.elementArea){d=c.x*this.sizeRatio;e=c.y*this.sizeRatio}else{d=Math.sqrt(this.elementArea*(c.x/c.y));e=this.elementArea/d}this.element.style.width=Math.round(d)+"px";this.element.style.height=Math.round(e)+"px";this.elementArea||(this.elementArea=d*e);this.updateSize()}if(b&&this.viewport){f=b.getBoundsNoRotate(!0);g=this.viewport.pixelFromPointNoRotate(f.getTopLeft(),!1);h=this.viewport.pixelFromPointNoRotate(f.getBottomRight(),!1).minus(this.totalBorderWidths);var i=this.displayRegion.style;i.display=this.world.getItemCount()?"block":"none";i.top=Math.round(g.y)+"px";i.left=Math.round(g.x)+"px";var j=Math.abs(g.x-h.x);var k=Math.abs(g.y-h.y);i.width=Math.round(Math.max(j,0))+"px";i.height=Math.round(Math.max(k,0))+"px"}},addTiledImage:function(b){var c=this;var d=b.originalTiledImage;delete b.original;var e=a.extend({},b,{success:function(a){var b=a.item;b._originalForNavigator=d;c._matchBounds(b,d,!0);d.addHandler("bounds-change",function(){c._matchBounds(b,d)})}});return a.Viewer.prototype.addTiledImage.apply(this,[e])},_getMatchingItem:function(a){var b=this.world.getItemCount();var c;for(var d=0;b>d;d++){c=this.world.getItemAt(d);if(c._originalForNavigator===a)return c}return null},_matchBounds:function(a,b,c){var d=b.getBounds();a.setPosition(d.getTopLeft(),c);a.setWidth(d.width,c)}})}(OpenSeadragon);!function(a){var b={Errors:{Dzc:"Sorry, we don't support Deep Zoom Collections!",Dzi:"Hmm, this doesn't appear to be a valid Deep Zoom Image.",Xml:"Hmm, this doesn't appear to be a valid Deep Zoom Image.",ImageFormat:"Sorry, we don't support {0}-based Deep Zoom Images.",Security:"It looks like a security restriction stopped us from loading this Deep Zoom Image.",Status:"This space unintentionally left blank ({0} {1}).",OpenFailed:"Unable to open {0}: {1}"},Tooltips:{FullPage:"Toggle full page",Home:"Go home",ZoomIn:"Zoom in",ZoomOut:"Zoom out",NextPage:"Next page",PreviousPage:"Previous page",RotateLeft:"Rotate left",RotateRight:"Rotate right"}};a.extend(a,{getString:function(c){var d,e=c.split("."),f=null,g=arguments,h=b;for(d=0;d<e.length-1;d++)h=h[e[d]]||{};f=h[e[d]];if("string"!=typeof f){a.console.debug("Untranslated source string:",c);f=""}return f.replace(/\{\d+\}/g,function(a){var b=parseInt(a.match(/\d+/),10)+1;return b<g.length?g[b]:""})},setString:function(a,c){var d,e=a.split("."),f=b;for(d=0;d<e.length-1;d++){f[e[d]]||(f[e[d]]={});f=f[e[d]]}f[e[d]]=c}})}(OpenSeadragon);!function(a){a.Point=function(a,b){this.x="number"==typeof a?a:0;this.y="number"==typeof b?b:0};a.Point.prototype={clone:function(){return new a.Point(this.x,this.y)},plus:function(b){return new a.Point(this.x+b.x,this.y+b.y)},minus:function(b){return new a.Point(this.x-b.x,this.y-b.y)},times:function(b){return new a.Point(this.x*b,this.y*b)},divide:function(b){return new a.Point(this.x/b,this.y/b)},negate:function(){return new a.Point(-this.x,-this.y)},distanceTo:function(a){return Math.sqrt(Math.pow(this.x-a.x,2)+Math.pow(this.y-a.y,2))},apply:function(b){return new a.Point(b(this.x),b(this.y))},equals:function(b){return b instanceof a.Point&&this.x===b.x&&this.y===b.y},rotate:function(b,c){c=c||new a.Point(0,0);var d;var e;if(b%90===0){var f=b%360;0>f&&(f+=360);switch(f){case 0:d=1;e=0;break;case 90:d=0;e=1;break;case 180:d=-1;e=0;break;case 270:d=0;e=-1}}else{var g=b*Math.PI/180;d=Math.cos(g);e=Math.sin(g)}var h=d*(this.x-c.x)-e*(this.y-c.y)+c.x;var i=e*(this.x-c.x)+d*(this.y-c.y)+c.y;return new a.Point(h,i)},toString:function(){return"("+Math.round(100*this.x)/100+","+Math.round(100*this.y)/100+")"}}}(OpenSeadragon);!function(a){function b(b){var c,d,e=b.responseText,f=b.status;if(!b)throw new Error(a.getString("Errors.Security"));if(200!==b.status&&0!==b.status){f=b.status;c=404==f?"Not Found":b.statusText;throw new Error(a.getString("Errors.Status",f,c))}if(e.match(/\s*<.*/))try{d=b.responseXML&&b.responseXML.documentElement?b.responseXML:a.parseXml(e)}catch(g){d=b.responseText}else d=e.match(/\s*[\{\[].*/)?a.parseJSON(e):e;return d}a.TileSource=function(b,c,d,e,f,g){var h=this;var i,j,k=arguments;i=a.isPlainObject(b)?b:{width:k[0],height:k[1],tileSize:k[2],tileOverlap:k[3],minLevel:k[4],maxLevel:k[5]};a.EventSource.call(this);a.extend(!0,this,i);if(!this.success)for(j=0;j<arguments.length;j++)if(a.isFunction(arguments[j])){this.success=arguments[j];break}this.success&&this.addHandler("ready",function(a){h.success(a)});"string"==a.type(arguments[0])&&(this.url=arguments[0]);if(this.url){this.aspectRatio=1;this.dimensions=new a.Point(10,10);this._tileWidth=0;this._tileHeight=0;this.tileOverlap=0;this.minLevel=0;this.maxLevel=0;this.ready=!1;this.getImageInfo(this.url)}else{this.ready=!0;this.aspectRatio=i.width&&i.height?i.width/i.height:1;this.dimensions=new a.Point(i.width,i.height);if(this.tileSize){this._tileWidth=this._tileHeight=this.tileSize;delete this.tileSize}else{if(this.tileWidth){this._tileWidth=this.tileWidth;delete this.tileWidth}else this._tileWidth=0;if(this.tileHeight){this._tileHeight=this.tileHeight;delete this.tileHeight}else this._tileHeight=0}this.tileOverlap=i.tileOverlap?i.tileOverlap:0;this.minLevel=i.minLevel?i.minLevel:0;this.maxLevel=void 0!==i.maxLevel&&null!==i.maxLevel?i.maxLevel:i.width&&i.height?Math.ceil(Math.log(Math.max(i.width,i.height))/Math.log(2)):0;this.success&&a.isFunction(this.success)&&this.success(this)}};a.TileSource.prototype={getTileSize:function(b){a.console.error("[TileSource.getTileSize] is deprecated.Use TileSource.getTileWidth() and TileSource.getTileHeight() instead");return this._tileWidth},getTileWidth:function(a){return this._tileWidth?this._tileWidth:this.getTileSize(a)},getTileHeight:function(a){return this._tileHeight?this._tileHeight:this.getTileSize(a)},getLevelScale:function(a){var b,c={};for(b=0;b<=this.maxLevel;b++)c[b]=1/Math.pow(2,this.maxLevel-b);this.getLevelScale=function(a){return c[a]};return this.getLevelScale(a)},getNumTiles:function(b){var c=this.getLevelScale(b),d=Math.ceil(c*this.dimensions.x/this.getTileWidth(b)),e=Math.ceil(c*this.dimensions.y/this.getTileHeight(b));return new a.Point(d,e)},getPixelRatio:function(b){var c=this.dimensions.times(this.getLevelScale(b)),d=1/c.x,e=1/c.y;return new a.Point(d,e)},getClosestLevel:function(b){var c,d,e;for(c=this.minLevel;c<this.maxLevel;c++){e=this.getNumTiles(c);d=new a.Point(Math.floor(b.x/this.getTileWidth(c)),Math.floor(b.y/this.getTileHeight(c)));if(e.x+1>=d.x&&e.y+1>=d.y)break}return Math.max(0,c-1)},getTileAtPoint:function(b,c){var d=c.times(this.dimensions.x).times(this.getLevelScale(b)),e=Math.floor(d.x/this.getTileWidth(b)),f=Math.floor(d.y/this.getTileHeight(b));return new a.Point(e,f)},getTileBounds:function(b,c,d){var e=this.dimensions.times(this.getLevelScale(b)),f=this.getTileWidth(b),g=this.getTileHeight(b),h=0===c?0:f*c-this.tileOverlap,i=0===d?0:g*d-this.tileOverlap,j=f+(0===c?1:2)*this.tileOverlap,k=g+(0===d?1:2)*this.tileOverlap,l=1/e.x;j=Math.min(j,e.x-h);k=Math.min(k,e.y-i);return new a.Rect(h*l,i*l,j*l,k*l)},getImageInfo:function(c){var d,e,f,g,h,i,j,k=this;if(c){h=c.split("/");i=h[h.length-1];j=i.lastIndexOf(".");j>-1&&(h[h.length-1]=i.slice(0,j))}e=function(b){"string"==typeof b&&(b=a.parseXml(b));var d=a.TileSource.determineType(k,b,c);if(d){g=d.prototype.configure.apply(k,[b,c]);void 0===g.ajaxWithCredentials&&(g.ajaxWithCredentials=k.ajaxWithCredentials);f=new d(g);k.ready=!0;k.raiseEvent("ready",{tileSource:f})}else k.raiseEvent("open-failed",{message:"Unable to load TileSource",source:c})};if(c.match(/\.js$/)){d=c.split("/").pop().replace(".js","");a.jsonp({url:c,async:!1,callbackName:d,callback:e})}else a.makeAjaxRequest({url:c,withCredentials:this.ajaxWithCredentials,success:function(a){var c=b(a);e(c)},error:function(a,b){var d;try{d="HTTP "+a.status+" attempting to load TileSource"}catch(e){var f;f="undefined"!=typeof b&&b.toString?b.toString():"Unknown error";d=f+" attempting to load TileSource"}k.raiseEvent("open-failed",{message:d,source:c})}})},supports:function(a,b){return!1},configure:function(a,b){throw new Error("Method not implemented.")},getTileUrl:function(a,b,c){throw new Error("Method not implemented.")},tileExists:function(a,b,c){var d=this.getNumTiles(a);return a>=this.minLevel&&a<=this.maxLevel&&b>=0&&c>=0&&b<d.x&&c<d.y}};a.extend(!0,a.TileSource.prototype,a.EventSource.prototype);a.TileSource.determineType=function(b,c,d){var e;for(e in OpenSeadragon)if(e.match(/.+TileSource$/)&&a.isFunction(OpenSeadragon[e])&&a.isFunction(OpenSeadragon[e].prototype.supports)&&OpenSeadragon[e].prototype.supports.call(b,c,d))return OpenSeadragon[e];a.console.error("No TileSource was able to open %s %s",d,c)}}(OpenSeadragon);!function(a){function b(b,d){if(!d||!d.documentElement)throw new Error(a.getString("Errors.Xml"));var e,f,g,h,i,j=d.documentElement,k=j.localName||j.tagName,l=d.documentElement.namespaceURI,m=null,n=[];if("Image"==k)try{h=j.getElementsByTagName("Size")[0];void 0===h&&(h=j.getElementsByTagNameNS(l,"Size")[0]);m={Image:{xmlns:"http://schemas.microsoft.com/deepzoom/2008",Url:j.getAttribute("Url"),Format:j.getAttribute("Format"),DisplayRect:null,Overlap:parseInt(j.getAttribute("Overlap"),10),TileSize:parseInt(j.getAttribute("TileSize"),10),Size:{Height:parseInt(h.getAttribute("Height"),10),Width:parseInt(h.getAttribute("Width"),10)}}};if(!a.imageFormatSupported(m.Image.Format))throw new Error(a.getString("Errors.ImageFormat",m.Image.Format.toUpperCase()));e=j.getElementsByTagName("DisplayRect");void 0===e&&(e=j.getElementsByTagNameNS(l,"DisplayRect")[0]);for(i=0;i<e.length;i++){f=e[i];g=f.getElementsByTagName("Rect")[0];void 0===g&&(g=f.getElementsByTagNameNS(l,"Rect")[0]);n.push({Rect:{X:parseInt(g.getAttribute("X"),10),Y:parseInt(g.getAttribute("Y"),10),Width:parseInt(g.getAttribute("Width"),10),Height:parseInt(g.getAttribute("Height"),10),MinLevel:parseInt(f.getAttribute("MinLevel"),10),MaxLevel:parseInt(f.getAttribute("MaxLevel"),10)}})}n.length&&(m.Image.DisplayRect=n);return c(b,m)}catch(o){throw o instanceof Error?o:new Error(a.getString("Errors.Dzi"))}else{if("Collection"==k)throw new Error(a.getString("Errors.Dzc"));if("Error"==k){var p=j.getElementsByTagName("Message")[0];var q=p.firstChild.nodeValue;throw new Error(q)}}throw new Error(a.getString("Errors.Dzi"))}function c(b,c){var d,e,f=c.Image,g=f.Url,h=f.Format,i=f.Size,j=f.DisplayRect||[],k=parseInt(i.Width,10),l=parseInt(i.Height,10),m=parseInt(f.TileSize,10),n=parseInt(f.Overlap,10),o=[];for(e=0;e<j.length;e++){d=j[e].Rect;o.push(new a.DisplayRect(parseInt(d.X,10),parseInt(d.Y,10),parseInt(d.Width,10),parseInt(d.Height,10),parseInt(d.MinLevel,10),parseInt(d.MaxLevel,10)))}return a.extend(!0,{width:k,height:l,tileSize:m,tileOverlap:n,minLevel:null,maxLevel:null,tilesUrl:g,fileFormat:h,displayRects:o},c)}a.DziTileSource=function(b,c,d,e,f,g,h,i,j){var k,l,m,n;n=a.isPlainObject(b)?b:{width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4],fileFormat:arguments[5],displayRects:arguments[6],minLevel:arguments[7],maxLevel:arguments[8]};this._levelRects={};this.tilesUrl=n.tilesUrl;this.fileFormat=n.fileFormat;this.displayRects=n.displayRects;if(this.displayRects)for(k=this.displayRects.length-1;k>=0;k--){l=this.displayRects[k];for(m=l.minLevel;m<=l.maxLevel;m++){this._levelRects[m]||(this._levelRects[m]=[]);this._levelRects[m].push(l)}}a.TileSource.apply(this,[n])};a.extend(a.DziTileSource.prototype,a.TileSource.prototype,{supports:function(a,b){var c;a.Image?c=a.Image.xmlns:a.documentElement&&("Image"==a.documentElement.localName||"Image"==a.documentElement.tagName)&&(c=a.documentElement.namespaceURI);return"http://schemas.microsoft.com/deepzoom/2008"==c||"http://schemas.microsoft.com/deepzoom/2009"==c},configure:function(d,e){var f;f=a.isPlainObject(d)?c(this,d):b(this,d);if(e&&!f.tilesUrl){f.tilesUrl=e.replace(/([^\/]+?)(\.(dzi|xml|js))?\/?(\?.*)?$/,"$1_files/");-1!=e.search(/\.(dzi|xml|js)\?/)?f.queryParams=e.match(/\?.*/):f.queryParams=""}return f},getTileUrl:function(a,b,c){return[this.tilesUrl,a,"/",b,"_",c,".",this.fileFormat,this.queryParams].join("")},tileExists:function(a,b,c){var d,e,f,g,h,i,j,k=this._levelRects[a];if(!k||!k.length)return!0;for(j=k.length-1;j>=0;j--){d=k[j];if(!(a<d.minLevel||a>d.maxLevel)){e=this.getLevelScale(a);f=d.x*e;g=d.y*e;h=f+d.width*e;i=g+d.height*e;f=Math.floor(f/this.tileSize);g=Math.floor(g/this.tileSize);h=Math.ceil(h/this.tileSize);i=Math.ceil(i/this.tileSize);if(b>=f&&h>b&&c>=g&&i>c)return!0}}return!1}})}(OpenSeadragon);!function(a){function b(a){var b=["http://library.stanford.edu/iiif/image-api/compliance.html#level0","http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0","http://iiif.io/api/image/2/level0.json"];var c=-1!=b.indexOf(a[0]);return!c||-1!=a.indexOf("sizeByW")}function c(a){var b=[];for(var c=0;c<a.sizes.length;c++)b.push({url:a["@id"]+"/full/"+a.sizes[c].width+",/0/default.jpg",width:a.sizes[c].width,height:a.sizes[c].height});return b.sort(function(a,b){return a.width-b.width})}function d(b){if(!b||!b.documentElement)throw new Error(a.getString("Errors.Xml"));var c=b.documentElement,d=c.tagName,f=null;if("info"==d)try{f={};e(c,f);return f}catch(g){throw g instanceof Error?g:new Error(a.getString("Errors.IIIF"))}throw new Error(a.getString("Errors.IIIF"))}function e(b,c,d){var f,g;if(3==b.nodeType&&d){g=b.nodeValue.trim();g.match(/^\d*$/)&&(g=Number(g));if(c[d]){a.isArray(c[d])||(c[d]=[c[d]]);c[d].push(g)}else c[d]=g}else if(1==b.nodeType)for(f=0;f<b.childNodes.length;f++)e(b.childNodes[f],c,b.nodeName)}a.IIIFTileSource=function(d){a.extend(!0,this,d);if(!(this.height&&this.width&&this["@id"]))throw new Error("IIIF required parameters not provided.");d.tileSizePerScaleFactor={};if(this.tile_width&&this.tile_height){d.tileWidth=this.tile_width;d.tileHeight=this.tile_height}else if(this.tile_width)d.tileSize=this.tile_width;else if(this.tile_height)d.tileSize=this.tile_height;else if(this.tiles)if(1==this.tiles.length){d.tileWidth=this.tiles[0].width;d.tileHeight=this.tiles[0].height||this.tiles[0].width;this.scale_factors=this.tiles[0].scaleFactors}else{this.scale_factors=[];for(var e=0;e<this.tiles.length;e++)for(var f=0;f<this.tiles[e].scaleFactors.length;f++){var g=this.tiles[e].scaleFactors[f];this.scale_factors.push(g);d.tileSizePerScaleFactor[g]={width:this.tiles[e].width,height:this.tiles[e].height||this.tiles[e].width}}}else if(b(d.profile)){var h=Math.min(this.height,this.width),i=[256,512,1024],j=[];for(var k=0;k<i.length;k++)i[k]<=h&&j.push(i[k]);j.length>0?d.tileSize=Math.max.apply(null,j):d.tileSize=h}else if(this.sizes&&this.sizes.length>0){this.emulateLegacyImagePyramid=!0;d.levels=c(this);a.extend(!0,d,{width:d.levels[d.levels.length-1].width,height:d.levels[d.levels.length-1].height,tileSize:Math.max(d.height,d.width),tileOverlap:0,minLevel:0,maxLevel:d.levels.length-1});this.levels=d.levels}else a.console.error("Nothing in the info.json to construct image pyramids from");d.maxLevel||this.emulateLegacyImagePyramid||(this.scale_factors?d.maxLevel=Math.floor(Math.pow(Math.max.apply(null,this.scale_factors),.5)):d.maxLevel=Number(Math.ceil(Math.log(Math.max(this.width,this.height),2))));a.TileSource.apply(this,[d])};a.extend(a.IIIFTileSource.prototype,a.TileSource.prototype,{supports:function(a,b){return a.protocol&&"http://iiif.io/api/image"==a.protocol?!0:!a["@context"]||"http://library.stanford.edu/iiif/image-api/1.1/context.json"!=a["@context"]&&"http://iiif.io/api/image/1/context.json"!=a["@context"]?a.profile&&0===a.profile.indexOf("http://library.stanford.edu/iiif/image-api/compliance.html")?!0:a.identifier&&a.width&&a.height?!0:a.documentElement&&"info"==a.documentElement.tagName&&"http://library.stanford.edu/iiif/image-api/ns/"==a.documentElement.namespaceURI?!0:!1:!0},configure:function(b,c){if(a.isPlainObject(b)){if(b["@context"])return b;b["@context"]="http://iiif.io/api/image/1.0/context.json";b["@id"]=c.replace("/info.json","");return b}var e=d(b);e["@context"]="http://iiif.io/api/image/1.0/context.json";e["@id"]=c.replace("/info.xml","");return e},getTileWidth:function(b){if(this.emulateLegacyImagePyramid)return a.TileSource.prototype.getTileWidth.call(this,b);var c=Math.pow(2,this.maxLevel-b);return this.tileSizePerScaleFactor&&this.tileSizePerScaleFactor[c]?this.tileSizePerScaleFactor[c].width:this._tileWidth},getTileHeight:function(b){if(this.emulateLegacyImagePyramid)return a.TileSource.prototype.getTileHeight.call(this,b);var c=Math.pow(2,this.maxLevel-b);return this.tileSizePerScaleFactor&&this.tileSizePerScaleFactor[c]?this.tileSizePerScaleFactor[c].height:this._tileHeight},getLevelScale:function(b){if(this.emulateLegacyImagePyramid){var c=NaN;this.levels.length>0&&b>=this.minLevel&&b<=this.maxLevel&&(c=this.levels[b].width/this.levels[this.maxLevel].width);return c}return a.TileSource.prototype.getLevelScale.call(this,b)},getNumTiles:function(b){if(this.emulateLegacyImagePyramid){var c=this.getLevelScale(b);return c?new a.Point(1,1):new a.Point(0,0)}return a.TileSource.prototype.getNumTiles.call(this,b)},getTileAtPoint:function(b,c){return this.emulateLegacyImagePyramid?new a.Point(0,0):a.TileSource.prototype.getTileAtPoint.call(this,b,c)},getTileUrl:function(a,b,c){if(this.emulateLegacyImagePyramid){var d=null;this.levels.length>0&&a>=this.minLevel&&a<=this.maxLevel&&(d=this.levels[a].url);return d}var e,f,g,h,i,j,k,l,m,n,o,p,q="0",r=Math.pow(.5,this.maxLevel-a),s=Math.ceil(this.width*r),t=Math.ceil(this.height*r);e=this.getTileWidth(a);f=this.getTileHeight(a);g=Math.ceil(e/r);h=Math.ceil(f/r);o=this["@context"].indexOf("/1.0/context.json")>-1||this["@context"].indexOf("/1.1/context.json")>-1||this["@context"].indexOf("/1/context.json")>-1?"native.jpg":"default.jpg";if(e>s&&f>t){n=s+",";i="full"}else{j=b*g;k=c*h;l=Math.min(g,this.width-j);m=Math.min(h,this.height-k);n=Math.ceil(l*r)+",";i=[j,k,l,m].join(",")}p=[this["@id"],i,n,q,o].join("/");return p}})}(OpenSeadragon);!function(a){a.OsmTileSource=function(b,c,d,e,f){var g;g=a.isPlainObject(b)?b:{width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4]};if(!g.width||!g.height){g.width=65572864;g.height=65572864}if(!g.tileSize){g.tileSize=256;g.tileOverlap=0}g.tilesUrl||(g.tilesUrl="http://tile.openstreetmap.org/");g.minLevel=8;a.TileSource.apply(this,[g])};a.extend(a.OsmTileSource.prototype,a.TileSource.prototype,{supports:function(a,b){return a.type&&"openstreetmaps"==a.type},configure:function(a,b){return a},getTileUrl:function(a,b,c){return this.tilesUrl+(a-8)+"/"+b+"/"+c+".png"}})}(OpenSeadragon);!function(a){a.TmsTileSource=function(b,c,d,e,f){var g;g=a.isPlainObject(b)?b:{width:arguments[0],height:arguments[1],tileSize:arguments[2],tileOverlap:arguments[3],tilesUrl:arguments[4]};var h,i=256*Math.ceil(g.width/256),j=256*Math.ceil(g.height/256);h=i>j?i/256:j/256;g.maxLevel=Math.ceil(Math.log(h)/Math.log(2))-1;g.tileSize=256;g.width=i;g.height=j;a.TileSource.apply(this,[g])};a.extend(a.TmsTileSource.prototype,a.TileSource.prototype,{supports:function(a,b){return a.type&&"tiledmapservice"==a.type},configure:function(a,b){return a},getTileUrl:function(a,b,c){var d=this.getNumTiles(a).y-1;return this.tilesUrl+a+"/"+b+"/"+(d-c)+".png"}})}(OpenSeadragon);!function(a){function b(b){var c,d,e=[];for(d=0;d<b.length;d++){c=b[d];c.height&&c.width&&c.url&&(c.url.toLowerCase().match(/^.*\.(png|jpg|jpeg|gif)(?:\?.*)?$/)||c.mimetype&&c.mimetype.toLowerCase().match(/^.*\/(png|jpg|jpeg|gif)$/))?e.push({url:c.url,width:Number(c.width),height:Number(c.height)}):a.console.error("Unsupported image format: %s",c.url?c.url:"<no URL>")}return e.sort(function(a,b){return a.height-b.height})}function c(b,c){if(!c||!c.documentElement)throw new Error(a.getString("Errors.Xml"));var e,f,g=c.documentElement,h=g.tagName,i=null,j=[];if("image"==h)try{i={type:g.getAttribute("type"),levels:[]};j=g.getElementsByTagName("level");for(f=0;f<j.length;f++){e=j[f];i.levels.push({url:e.getAttribute("url"),width:parseInt(e.getAttribute("width"),10),height:parseInt(e.getAttribute("height"),10)})}return d(b,i)}catch(k){throw k instanceof Error?k:new Error("Unknown error parsing Legacy Image Pyramid XML.")}else{if("collection"==h)throw new Error("Legacy Image Pyramid Collections not yet supported.");if("error"==h)throw new Error("Error: "+c)}throw new Error("Unknown element "+h)}function d(a,b){return b.levels}a.LegacyTileSource=function(c){var d,e,f;a.isArray(c)&&(d={type:"legacy-image-pyramid",levels:c});d.levels=b(d.levels);if(d.levels.length>0){e=d.levels[d.levels.length-1].width;f=d.levels[d.levels.length-1].height}else{e=0;f=0;a.console.error("No supported image formats found")}a.extend(!0,d,{width:e,height:f,tileSize:Math.max(f,e),tileOverlap:0,minLevel:0,maxLevel:d.levels.length>0?d.levels.length-1:0});a.TileSource.apply(this,[d]);this.levels=d.levels};a.extend(a.LegacyTileSource.prototype,a.TileSource.prototype,{supports:function(a,b){return a.type&&"legacy-image-pyramid"==a.type||a.documentElement&&"legacy-image-pyramid"==a.documentElement.getAttribute("type")},configure:function(b,e){var f;f=a.isPlainObject(b)?d(this,b):c(this,b);return f},getLevelScale:function(a){var b=NaN;this.levels.length>0&&a>=this.minLevel&&a<=this.maxLevel&&(b=this.levels[a].width/this.levels[this.maxLevel].width);return b},getNumTiles:function(b){var c=this.getLevelScale(b);return c?new a.Point(1,1):new a.Point(0,0)},getTileAtPoint:function(b,c){return new a.Point(0,0)},getTileUrl:function(a,b,c){var d=null;this.levels.length>0&&a>=this.minLevel&&a<=this.maxLevel&&(d=this.levels[a].url);return d}})}(OpenSeadragon);!function(a){a.ImageTileSource=function(b){b=a.extend({buildPyramid:!0,crossOriginPolicy:!1,ajaxWithCredentials:!1,useCanvas:!0},b);a.TileSource.apply(this,[b])};a.extend(a.ImageTileSource.prototype,a.TileSource.prototype,{supports:function(a,b){return a.type&&"image"===a.type},configure:function(a,b){return a},getImageInfo:function(b){var c=this._image=new Image;var d=this;this.crossOriginPolicy&&(c.crossOrigin=this.crossOriginPolicy);this.ajaxWithCredentials&&(c.useCredentials=this.ajaxWithCredentials);a.addEvent(c,"load",function(){d.width=c.naturalWidth;d.height=c.naturalHeight;d.aspectRatio=d.width/d.height;d.dimensions=new a.Point(d.width,d.height);d._tileWidth=d.width;d._tileHeight=d.height;d.tileOverlap=0;d.minLevel=0;d.levels=d._buildLevels();d.maxLevel=d.levels.length-1;d.ready=!0;d.raiseEvent("ready",{tileSource:d})});a.addEvent(c,"error",function(){d.raiseEvent("open-failed",{message:"Error loading image at "+b,source:b})});c.src=b},getLevelScale:function(a){var b=NaN;a>=this.minLevel&&a<=this.maxLevel&&(b=this.levels[a].width/this.levels[this.maxLevel].width);return b},getNumTiles:function(b){var c=this.getLevelScale(b);return c?new a.Point(1,1):new a.Point(0,0)},getTileAtPoint:function(b,c){return new a.Point(0,0)},getTileUrl:function(a,b,c){var d=null;a>=this.minLevel&&a<=this.maxLevel&&(d=this.levels[a].url);return d},getContext2D:function(a,b,c){var d=null;a>=this.minLevel&&a<=this.maxLevel&&(d=this.levels[a].context2D);return d},_buildLevels:function(){var b=[{url:this._image.src,width:this._image.naturalWidth,height:this._image.naturalHeight}];if(!this.buildPyramid||!a.supportsCanvas||!this.useCanvas){delete this._image;return b}var c=this._image.naturalWidth;var d=this._image.naturalHeight;var e=document.createElement("canvas");var f=e.getContext("2d");e.width=c;e.height=d;f.drawImage(this._image,0,0,c,d);b[0].context2D=f;delete this._image;if(a.isCanvasTainted(e))return b;for(;c>=2&&d>=2;){c=Math.floor(c/2);d=Math.floor(d/2);var g=document.createElement("canvas");var h=g.getContext("2d");g.width=c;g.height=d;h.drawImage(e,0,0,c,d);b.splice(0,0,{context2D:h,width:c,height:d});e=g;f=h}return b}})}(OpenSeadragon);!function(a){a.TileSourceCollection=function(b,c,d,e){a.console.error("TileSourceCollection is deprecated; use World instead")}}(OpenSeadragon);!function(a){function b(b){a.requestAnimationFrame(function(){c(b)})}function c(c){var d,e,f;if(c.shouldFade){d=a.now();e=d-c.fadeBeginTime;f=1-e/c.fadeLength;f=Math.min(1,f);f=Math.max(0,f);c.imgGroup&&a.setElementOpacity(c.imgGroup,f,!0);f>0&&b(c)}}function d(c){c.shouldFade=!0;c.fadeBeginTime=a.now()+c.fadeDelay;window.setTimeout(function(){b(c)},c.fadeDelay)}function e(b){b.shouldFade=!1;b.imgGroup&&a.setElementOpacity(b.imgGroup,1,!0)}function f(b,c){if(!b.element.disabled){if(c>=a.ButtonState.GROUP&&b.currentState==a.ButtonState.REST){e(b);b.currentState=a.ButtonState.GROUP}if(c>=a.ButtonState.HOVER&&b.currentState==a.ButtonState.GROUP){b.imgHover&&(b.imgHover.style.visibility="");b.currentState=a.ButtonState.HOVER}if(c>=a.ButtonState.DOWN&&b.currentState==a.ButtonState.HOVER){b.imgDown&&(b.imgDown.style.visibility="");b.currentState=a.ButtonState.DOWN}}}function g(b,c){if(!b.element.disabled){if(c<=a.ButtonState.HOVER&&b.currentState==a.ButtonState.DOWN){b.imgDown&&(b.imgDown.style.visibility="hidden");b.currentState=a.ButtonState.HOVER}if(c<=a.ButtonState.GROUP&&b.currentState==a.ButtonState.HOVER){b.imgHover&&(b.imgHover.style.visibility="hidden");b.currentState=a.ButtonState.GROUP}if(c<=a.ButtonState.REST&&b.currentState==a.ButtonState.GROUP){d(b);b.currentState=a.ButtonState.REST}}}a.ButtonState={REST:0,GROUP:1,HOVER:2,DOWN:3};a.Button=function(b){var c=this;a.EventSource.call(this);a.extend(!0,this,{tooltip:null,srcRest:null,srcGroup:null,srcHover:null,srcDown:null,clickTimeThreshold:a.DEFAULT_SETTINGS.clickTimeThreshold,clickDistThreshold:a.DEFAULT_SETTINGS.clickDistThreshold,fadeDelay:0,fadeLength:2e3,onPress:null,onRelease:null,onClick:null,onEnter:null,onExit:null,onFocus:null,onBlur:null},b);this.element=b.element||a.makeNeutralElement("div");if(!b.element){this.imgRest=a.makeTransparentImage(this.srcRest);this.imgGroup=a.makeTransparentImage(this.srcGroup);this.imgHover=a.makeTransparentImage(this.srcHover);this.imgDown=a.makeTransparentImage(this.srcDown);this.imgRest.alt=this.imgGroup.alt=this.imgHover.alt=this.imgDown.alt=this.tooltip;this.element.style.position="relative";a.setElementTouchActionNone(this.element);this.imgGroup.style.position=this.imgHover.style.position=this.imgDown.style.position="absolute";this.imgGroup.style.top=this.imgHover.style.top=this.imgDown.style.top="0px";this.imgGroup.style.left=this.imgHover.style.left=this.imgDown.style.left="0px";this.imgHover.style.visibility=this.imgDown.style.visibility="hidden";a.Browser.vendor==a.BROWSERS.FIREFOX&&a.Browser.version<3&&(this.imgGroup.style.top=this.imgHover.style.top=this.imgDown.style.top="");this.element.appendChild(this.imgRest);this.element.appendChild(this.imgGroup);this.element.appendChild(this.imgHover);this.element.appendChild(this.imgDown)}this.addHandler("press",this.onPress);this.addHandler("release",this.onRelease);this.addHandler("click",this.onClick);this.addHandler("enter",this.onEnter);this.addHandler("exit",this.onExit);this.addHandler("focus",this.onFocus);this.addHandler("blur",this.onBlur);this.currentState=a.ButtonState.GROUP;this.fadeBeginTime=null;this.shouldFade=!1;this.element.style.display="inline-block";this.element.style.position="relative";this.element.title=this.tooltip;this.tracker=new a.MouseTracker({element:this.element,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,enterHandler:function(b){if(b.insideElementPressed){f(c,a.ButtonState.DOWN);c.raiseEvent("enter",{originalEvent:b.originalEvent})}else b.buttonDownAny||f(c,a.ButtonState.HOVER);
},focusHandler:function(a){this.enterHandler(a);c.raiseEvent("focus",{originalEvent:a.originalEvent})},exitHandler:function(b){g(c,a.ButtonState.GROUP);b.insideElementPressed&&c.raiseEvent("exit",{originalEvent:b.originalEvent})},blurHandler:function(a){this.exitHandler(a);c.raiseEvent("blur",{originalEvent:a.originalEvent})},pressHandler:function(b){f(c,a.ButtonState.DOWN);c.raiseEvent("press",{originalEvent:b.originalEvent})},releaseHandler:function(b){if(b.insideElementPressed&&b.insideElementReleased){g(c,a.ButtonState.HOVER);c.raiseEvent("release",{originalEvent:b.originalEvent})}else b.insideElementPressed?g(c,a.ButtonState.GROUP):f(c,a.ButtonState.HOVER)},clickHandler:function(a){a.quick&&c.raiseEvent("click",{originalEvent:a.originalEvent})},keyHandler:function(a){if(13===a.keyCode){c.raiseEvent("click",{originalEvent:a.originalEvent});c.raiseEvent("release",{originalEvent:a.originalEvent});return!1}return!0}});g(this,a.ButtonState.REST)};a.extend(a.Button.prototype,a.EventSource.prototype,{notifyGroupEnter:function(){f(this,a.ButtonState.GROUP)},notifyGroupExit:function(){g(this,a.ButtonState.REST)},disable:function(){this.notifyGroupExit();this.element.disabled=!0;a.setElementOpacity(this.element,.2,!0)},enable:function(){this.element.disabled=!1;a.setElementOpacity(this.element,1,!0);this.notifyGroupEnter()}})}(OpenSeadragon);!function(a){a.ButtonGroup=function(b){a.extend(!0,this,{buttons:[],clickTimeThreshold:a.DEFAULT_SETTINGS.clickTimeThreshold,clickDistThreshold:a.DEFAULT_SETTINGS.clickDistThreshold,labelText:""},b);var c,d=this.buttons.concat([]),e=this;this.element=b.element||a.makeNeutralElement("div");if(!b.group){this.label=a.makeNeutralElement("label");this.element.style.display="inline-block";this.element.appendChild(this.label);for(c=0;c<d.length;c++)this.element.appendChild(d[c].element)}a.setElementTouchActionNone(this.element);this.tracker=new a.MouseTracker({element:this.element,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,enterHandler:function(a){var b;for(b=0;b<e.buttons.length;b++)e.buttons[b].notifyGroupEnter()},exitHandler:function(a){var b;if(!a.insideElementPressed)for(b=0;b<e.buttons.length;b++)e.buttons[b].notifyGroupExit()}})};a.ButtonGroup.prototype={emulateEnter:function(){this.tracker.enterHandler({eventSource:this.tracker})},emulateExit:function(){this.tracker.exitHandler({eventSource:this.tracker})}}}(OpenSeadragon);!function(a){a.Rect=function(a,b,c,d,e){this.x="number"==typeof a?a:0;this.y="number"==typeof b?b:0;this.width="number"==typeof c?c:0;this.height="number"==typeof d?d:0;this.degrees="number"==typeof e?e:0;this.degrees=this.degrees%360;this.degrees<0&&(this.degrees+=360);var f,g;if(this.degrees>=270){f=this.getTopRight();this.x=f.x;this.y=f.y;g=this.height;this.height=this.width;this.width=g;this.degrees-=270}else if(this.degrees>=180){f=this.getBottomRight();this.x=f.x;this.y=f.y;this.degrees-=180}else if(this.degrees>=90){f=this.getBottomLeft();this.x=f.x;this.y=f.y;g=this.height;this.height=this.width;this.width=g;this.degrees-=90}};a.Rect.fromSummits=function(b,c,d){var e=b.distanceTo(c);var f=b.distanceTo(d);var g=c.minus(b);var h=Math.atan(g.y/g.x);g.x<0?h+=Math.PI:g.y<0&&(h+=2*Math.PI);return new a.Rect(b.x,b.y,e,f,h/Math.PI*180)};a.Rect.prototype={clone:function(){return new a.Rect(this.x,this.y,this.width,this.height,this.degrees)},getAspectRatio:function(){return this.width/this.height},getTopLeft:function(){return new a.Point(this.x,this.y)},getBottomRight:function(){return new a.Point(this.x+this.width,this.y+this.height).rotate(this.degrees,this.getTopLeft())},getTopRight:function(){return new a.Point(this.x+this.width,this.y).rotate(this.degrees,this.getTopLeft())},getBottomLeft:function(){return new a.Point(this.x,this.y+this.height).rotate(this.degrees,this.getTopLeft())},getCenter:function(){return new a.Point(this.x+this.width/2,this.y+this.height/2).rotate(this.degrees,this.getTopLeft())},getSize:function(){return new a.Point(this.width,this.height)},equals:function(b){return b instanceof a.Rect&&this.x===b.x&&this.y===b.y&&this.width===b.width&&this.height===b.height&&this.degrees===b.degrees},times:function(b){return new a.Rect(this.x*b,this.y*b,this.width*b,this.height*b,this.degrees)},translate:function(b){return new a.Rect(this.x+b.x,this.y+b.y,this.width,this.height,this.degrees)},union:function(b){var c=this.getBoundingBox();var d=b.getBoundingBox();var e=Math.min(c.x,d.x);var f=Math.min(c.y,d.y);var g=Math.max(c.x+c.width,d.x+d.width);var h=Math.max(c.y+c.height,d.y+d.height);return new a.Rect(e,f,g-e,h-f)},intersection:function(b){function c(b,c,e,f){var g=c.minus(b);var h=f.minus(e);var i=-h.x*g.y+g.x*h.y;if(0===i)return null;var j=(g.x*(b.y-e.y)-g.y*(b.x-e.x))/i;var k=(h.x*(b.y-e.y)-h.y*(b.x-e.x))/i;return j>=-d&&1-d>=j&&k>=-d&&1-d>=k?new a.Point(b.x+k*g.x,b.y+k*g.y):null}var d=1e-10;var e=[];var f=this.getTopLeft();b.containsPoint(f,d)&&e.push(f);var g=this.getTopRight();b.containsPoint(g,d)&&e.push(g);var h=this.getBottomLeft();b.containsPoint(h,d)&&e.push(h);var i=this.getBottomRight();b.containsPoint(i,d)&&e.push(i);var j=b.getTopLeft();this.containsPoint(j,d)&&e.push(j);var k=b.getTopRight();this.containsPoint(k,d)&&e.push(k);var l=b.getBottomLeft();this.containsPoint(l,d)&&e.push(l);var m=b.getBottomRight();this.containsPoint(m,d)&&e.push(m);var n=this._getSegments();var o=b._getSegments();for(var p=0;p<n.length;p++){var q=n[p];for(var r=0;r<o.length;r++){var s=o[r];var t=c(q[0],q[1],s[0],s[1]);t&&e.push(t)}}if(0===e.length)return null;var u=e[0].x;var v=e[0].x;var w=e[0].y;var x=e[0].y;for(var y=1;y<e.length;y++){var z=e[y];z.x<u&&(u=z.x);z.x>v&&(v=z.x);z.y<w&&(w=z.y);z.y>x&&(x=z.y)}return new a.Rect(u,w,v-u,x-w)},_getSegments:function(){var a=this.getTopLeft();var b=this.getTopRight();var c=this.getBottomLeft();var d=this.getBottomRight();return[[a,b],[b,d],[d,c],[c,a]]},rotate:function(b,c){b%=360;if(0===b)return this.clone();0>b&&(b+=360);c=c||this.getCenter();var d=this.getTopLeft().rotate(b,c);var e=this.getTopRight().rotate(b,c);var f=e.minus(d);var g=Math.atan(f.y/f.x);f.x<0?g+=Math.PI:f.y<0&&(g+=2*Math.PI);return new a.Rect(d.x,d.y,this.width,this.height,g/Math.PI*180)},getBoundingBox:function(){if(0===this.degrees)return this.clone();var b=this.getTopLeft();var c=this.getTopRight();var d=this.getBottomLeft();var e=this.getBottomRight();var f=Math.min(b.x,c.x,d.x,e.x);var g=Math.max(b.x,c.x,d.x,e.x);var h=Math.min(b.y,c.y,d.y,e.y);var i=Math.max(b.y,c.y,d.y,e.y);return new a.Rect(f,h,g-f,i-h)},getIntegerBoundingBox:function(){var b=this.getBoundingBox();var c=Math.floor(b.x);var d=Math.floor(b.y);var e=Math.ceil(b.width+b.x-c);var f=Math.ceil(b.height+b.y-d);return new a.Rect(c,d,e,f)},containsPoint:function(a,b){b=b||0;var c=this.getTopLeft();var d=this.getTopRight();var e=this.getBottomLeft();var f=d.minus(c);var g=e.minus(c);return(a.x-c.x)*f.x+(a.y-c.y)*f.y>=-b&&(a.x-d.x)*f.x+(a.y-d.y)*f.y<=b&&(a.x-c.x)*g.x+(a.y-c.y)*g.y>=-b&&(a.x-e.x)*g.x+(a.y-e.y)*g.y<=b},toString:function(){return"["+Math.round(100*this.x)/100+", "+Math.round(100*this.y)/100+", "+Math.round(100*this.width)/100+"x"+Math.round(100*this.height)/100+", "+Math.round(100*this.degrees)/100+"deg]"}}}(OpenSeadragon);!function(a){function b(b){var c=Number(this.element.style.marginLeft.replace("px","")),e=Number(this.element.style.marginTop.replace("px","")),f=Number(this.element.style.width.replace("px","")),g=Number(this.element.style.height.replace("px","")),h=a.getElementSize(this.viewer.canvas);this.dragging=!0;if(this.element)if("horizontal"==this.scroll){if(-b.delta.x>0){if(c>-(f-h.x)){this.element.style.marginLeft=c+2*b.delta.x+"px";d(this,h.x,c+2*b.delta.x)}}else if(-b.delta.x<0&&0>c){this.element.style.marginLeft=c+2*b.delta.x+"px";d(this,h.x,c+2*b.delta.x)}}else if(-b.delta.y>0){if(e>-(g-h.y)){this.element.style.marginTop=e+2*b.delta.y+"px";d(this,h.y,e+2*b.delta.y)}}else if(-b.delta.y<0&&0>e){this.element.style.marginTop=e+2*b.delta.y+"px";d(this,h.y,e+2*b.delta.y)}return!1}function c(b){var c=Number(this.element.style.marginLeft.replace("px","")),e=Number(this.element.style.marginTop.replace("px","")),f=Number(this.element.style.width.replace("px","")),g=Number(this.element.style.height.replace("px","")),h=a.getElementSize(this.viewer.canvas);if(this.element)if("horizontal"==this.scroll){if(b.scroll>0){if(c>-(f-h.x)){this.element.style.marginLeft=c-60*b.scroll+"px";d(this,h.x,c-60*b.scroll)}}else if(b.scroll<0&&0>c){this.element.style.marginLeft=c-60*b.scroll+"px";d(this,h.x,c-60*b.scroll)}}else if(b.scroll<0){if(e>h.y-g){this.element.style.marginTop=e+60*b.scroll+"px";d(this,h.y,e+60*b.scroll)}}else if(b.scroll>0&&0>e){this.element.style.marginTop=e+60*b.scroll+"px";d(this,h.y,e+60*b.scroll)}return!1}function d(b,c,d){var e,f,g,h,i,j,k;e="horizontal"==b.scroll?b.panelWidth:b.panelHeight;f=Math.ceil(c/e)+5;g=Math.ceil((Math.abs(d)+c)/e)+1;f=g-f;f=0>f?0:f;for(j=f;g>j&&j<b.panels.length;j++){k=b.panels[j];if(!k.activePanel){h=new a.Viewer({id:k.id,tileSources:[b.viewer.tileSources[j]],element:k,navigatorSizeRatio:b.sizeRatio,showNavigator:!1,mouseNavEnabled:!1,showNavigationControl:!1,showSequenceControl:!1,immediateRender:!0,blendTime:0,animationTime:0});h.displayRegion=a.makeNeutralElement("div");h.displayRegion.id=k.id+"-displayregion";h.displayRegion.className="displayregion";i=h.displayRegion.style;i.position="relative";i.top="0px";i.left="0px";i.fontSize="0px";i.overflow="hidden";i["float"]="left";i.cssFloat="left";i.styleFloat="left";i.zIndex=999999999;i.cursor="default";i.width=b.panelWidth-4+"px";i.height=b.panelHeight-4+"px";h.displayRegion.innerTracker=new a.MouseTracker({element:h.displayRegion,startDisabled:!0});k.getElementsByTagName("div")[0].appendChild(h.displayRegion);k.activePanel=!0}}}function e(a){var b=a.eventSource.element;"horizontal"==this.scroll?b.style.marginBottom="0px":b.style.marginLeft="0px";return!1}function f(b){var c=b.eventSource.element;"horizontal"==this.scroll?c.style.marginBottom="-"+a.getElementSize(c).y/2+"px":c.style.marginLeft="-"+a.getElementSize(c).x/2+"px";return!1}function g(a){if(a.preventDefaultAction||a.ctrl||a.alt||a.meta)return!0;switch(a.keyCode){case 38:c.call(this,{eventSource:this.tracker,position:null,scroll:1,shift:null});return!1;case 40:c.call(this,{eventSource:this.tracker,position:null,scroll:-1,shift:null});return!1;case 37:c.call(this,{eventSource:this.tracker,position:null,scroll:-1,shift:null});return!1;case 39:c.call(this,{eventSource:this.tracker,position:null,scroll:1,shift:null});return!1;default:return!0}}function h(a){if(a.preventDefaultAction||a.ctrl||a.alt||a.meta)return!0;switch(a.keyCode){case 61:c.call(this,{eventSource:this.tracker,position:null,scroll:1,shift:null});return!1;case 45:c.call(this,{eventSource:this.tracker,position:null,scroll:-1,shift:null});return!1;case 48:case 119:case 87:c.call(this,{eventSource:this.tracker,position:null,scroll:1,shift:null});return!1;case 115:case 83:c.call(this,{eventSource:this.tracker,position:null,scroll:-1,shift:null});return!1;case 97:c.call(this,{eventSource:this.tracker,position:null,scroll:-1,shift:null});return!1;case 100:c.call(this,{eventSource:this.tracker,position:null,scroll:1,shift:null});return!1;default:return!0}}var i={};a.ReferenceStrip=function(j){var k,l,m,n=this,o=j.viewer,p=a.getElementSize(o.element);if(!j.id){j.id="referencestrip-"+a.now();this.element=a.makeNeutralElement("div");this.element.id=j.id;this.element.className="referencestrip"}j=a.extend(!0,{sizeRatio:a.DEFAULT_SETTINGS.referenceStripSizeRatio,position:a.DEFAULT_SETTINGS.referenceStripPosition,scroll:a.DEFAULT_SETTINGS.referenceStripScroll,clickTimeThreshold:a.DEFAULT_SETTINGS.clickTimeThreshold},j,{element:this.element,showNavigator:!1,mouseNavEnabled:!1,showNavigationControl:!1,showSequenceControl:!1});a.extend(this,j);i[this.id]={animating:!1};this.minPixelRatio=this.viewer.minPixelRatio;l=this.element.style;l.marginTop="0px";l.marginRight="0px";l.marginBottom="0px";l.marginLeft="0px";l.left="0px";l.bottom="0px";l.border="0px";l.background="#000";l.position="relative";a.setElementTouchActionNone(this.element);a.setElementOpacity(this.element,.8);this.viewer=o;this.innerTracker=new a.MouseTracker({element:this.element,dragHandler:a.delegate(this,b),scrollHandler:a.delegate(this,c),enterHandler:a.delegate(this,e),exitHandler:a.delegate(this,f),keyDownHandler:a.delegate(this,g),keyHandler:a.delegate(this,h)});if(j.width&&j.height){this.element.style.width=j.width+"px";this.element.style.height=j.height+"px";o.addControl(this.element,{anchor:a.ControlAnchor.BOTTOM_LEFT})}else if("horizontal"==j.scroll){this.element.style.width=p.x*j.sizeRatio*o.tileSources.length+12*o.tileSources.length+"px";this.element.style.height=p.y*j.sizeRatio+"px";o.addControl(this.element,{anchor:a.ControlAnchor.BOTTOM_LEFT})}else{this.element.style.height=p.y*j.sizeRatio*o.tileSources.length+12*o.tileSources.length+"px";this.element.style.width=p.x*j.sizeRatio+"px";o.addControl(this.element,{anchor:a.ControlAnchor.TOP_LEFT})}this.panelWidth=p.x*this.sizeRatio+8;this.panelHeight=p.y*this.sizeRatio+8;this.panels=[];for(m=0;m<o.tileSources.length;m++){k=a.makeNeutralElement("div");k.id=this.element.id+"-"+m;k.style.width=n.panelWidth+"px";k.style.height=n.panelHeight+"px";k.style.display="inline";k.style["float"]="left";k.style.cssFloat="left";k.style.styleFloat="left";k.style.padding="2px";a.setElementTouchActionNone(k);k.innerTracker=new a.MouseTracker({element:k,clickTimeThreshold:this.clickTimeThreshold,clickDistThreshold:this.clickDistThreshold,pressHandler:function(b){b.eventSource.dragging=a.now()},releaseHandler:function(b){var c=b.eventSource,d=c.element.id,e=Number(d.split("-")[2]),f=a.now();if(b.insideElementPressed&&b.insideElementReleased&&c.dragging&&f-c.dragging<c.clickTimeThreshold){c.dragging=null;o.goToPage(e)}}});this.element.appendChild(k);k.activePanel=!1;this.panels.push(k)}d(this,"vertical"==this.scroll?p.y:p.x,0);this.setFocus(0)};a.extend(a.ReferenceStrip.prototype,a.EventSource.prototype,a.Viewer.prototype,{setFocus:function(b){var c,f=a.getElement(this.element.id+"-"+b),g=a.getElementSize(this.viewer.canvas),h=Number(this.element.style.width.replace("px","")),i=Number(this.element.style.height.replace("px","")),j=-Number(this.element.style.marginLeft.replace("px","")),k=-Number(this.element.style.marginTop.replace("px",""));if(this.currentSelected!==f){this.currentSelected&&(this.currentSelected.style.background="#000");this.currentSelected=f;this.currentSelected.style.background="#999";if("horizontal"==this.scroll){c=Number(b)*(this.panelWidth+3);if(c>j+g.x-this.panelWidth){c=Math.min(c,h-g.x);this.element.style.marginLeft=-c+"px";d(this,g.x,-c)}else if(j>c){c=Math.max(0,c-g.x/2);this.element.style.marginLeft=-c+"px";d(this,g.x,-c)}}else{c=Number(b)*(this.panelHeight+3);if(c>k+g.y-this.panelHeight){c=Math.min(c,i-g.y);this.element.style.marginTop=-c+"px";d(this,g.y,-c)}else if(k>c){c=Math.max(0,c-g.y/2);this.element.style.marginTop=-c+"px";d(this,g.y,-c)}}this.currentPage=b;e.call(this,{eventSource:this.innerTracker})}},update:function(){if(i[this.id].animating){a.console.log("image reference strip update");return!0}return!1},destroy:function(){this.element&&this.element.parentNode.removeChild(this.element)}})}(OpenSeadragon);!function(a){a.DisplayRect=function(b,c,d,e,f,g){a.Rect.apply(this,[b,c,d,e]);this.minLevel=f;this.maxLevel=g};a.extend(a.DisplayRect.prototype,a.Rect.prototype)}(OpenSeadragon);!function(a){function b(a,b){return(1-Math.exp(a*-b))/(1-Math.exp(-a))}a.Spring=function(b){var c=arguments;"object"!=typeof b&&(b={initial:c.length&&"number"==typeof c[0]?c[0]:void 0,springStiffness:c.length>1?c[1].springStiffness:5,animationTime:c.length>1?c[1].animationTime:1.5});a.console.assert("number"==typeof b.springStiffness&&0!==b.springStiffness,"[OpenSeadragon.Spring] options.springStiffness must be a non-zero number");a.console.assert("number"==typeof b.animationTime&&b.animationTime>=0,"[OpenSeadragon.Spring] options.animationTime must be a number greater than or equal to 0");if(b.exponential){this._exponential=!0;delete b.exponential}a.extend(!0,this,b);this.current={value:"number"==typeof this.initial?this.initial:this._exponential?0:1,time:a.now()};a.console.assert(!this._exponential||0!==this.current.value,"[OpenSeadragon.Spring] value must be non-zero for exponential springs");this.start={value:this.current.value,time:this.current.time};this.target={value:this.current.value,time:this.current.time};if(this._exponential){this.start._logValue=Math.log(this.start.value);this.target._logValue=Math.log(this.target.value);this.current._logValue=Math.log(this.current.value)}};a.Spring.prototype={resetTo:function(b){a.console.assert(!this._exponential||0!==b,"[OpenSeadragon.Spring.resetTo] target must be non-zero for exponential springs");this.start.value=this.target.value=this.current.value=b;this.start.time=this.target.time=this.current.time=a.now();if(this._exponential){this.start._logValue=Math.log(this.start.value);this.target._logValue=Math.log(this.target.value);this.current._logValue=Math.log(this.current.value)}},springTo:function(b){a.console.assert(!this._exponential||0!==b,"[OpenSeadragon.Spring.springTo] target must be non-zero for exponential springs");this.start.value=this.current.value;this.start.time=this.current.time;this.target.value=b;this.target.time=this.start.time+1e3*this.animationTime;if(this._exponential){this.start._logValue=Math.log(this.start.value);this.target._logValue=Math.log(this.target.value)}},shiftBy:function(b){this.start.value+=b;this.target.value+=b;if(this._exponential){a.console.assert(0!==this.target.value&&0!==this.start.value,"[OpenSeadragon.Spring.shiftBy] spring value must be non-zero for exponential springs");this.start._logValue=Math.log(this.start.value);this.target._logValue=Math.log(this.target.value)}},setExponential:function(b){this._exponential=b;if(this._exponential){a.console.assert(0!==this.current.value&&0!==this.target.value&&0!==this.start.value,"[OpenSeadragon.Spring.setExponential] spring value must be non-zero for exponential springs");this.start._logValue=Math.log(this.start.value);this.target._logValue=Math.log(this.target.value);this.current._logValue=Math.log(this.current.value)}},update:function(){this.current.time=a.now();var c,d;if(this._exponential){c=this.start._logValue;d=this.target._logValue}else{c=this.start.value;d=this.target.value}var e=this.current.time>=this.target.time?d:c+(d-c)*b(this.springStiffness,(this.current.time-this.start.time)/(this.target.time-this.start.time));this._exponential?this.current.value=Math.exp(e):this.current.value=e},isAtTargetValue:function(){return this.current.value===this.target.value}}}(OpenSeadragon);!function(a){function b(b){a.extend(!0,this,{timeout:a.DEFAULT_SETTINGS.timeout,jobId:null},b);this.image=null}function c(a,b,c){var d;a.jobsInProgress--;if((!a.jobLimit||a.jobsInProgress<a.jobLimit)&&a.jobQueue.length>0){d=a.jobQueue.shift();d.start();a.jobsInProgress++}c(b.image,b.errorMsg)}b.prototype={errorMsg:null,start:function(){var a=this;this.image=new Image;this.crossOriginPolicy!==!1&&(this.image.crossOrigin=this.crossOriginPolicy);this.image.onload=function(){a.finish(!0)};this.image.onabort=this.image.onerror=function(){a.errorMsg="Image load aborted";a.finish(!1)};this.jobId=window.setTimeout(function(){a.errorMsg="Image load exceeded timeout";a.finish(!1)},this.timeout);this.image.src=this.src},finish:function(a){this.image.onload=this.image.onerror=this.image.onabort=null;a||(this.image=null);this.jobId&&window.clearTimeout(this.jobId);this.callback(this)}};a.ImageLoader=function(b){a.extend(!0,this,{jobLimit:a.DEFAULT_SETTINGS.imageLoaderLimit,jobQueue:[],jobsInProgress:0},b)};a.ImageLoader.prototype={addJob:function(a){var d=this,e=function(b){c(d,b,a.callback)},f={src:a.src,crossOriginPolicy:a.crossOriginPolicy,callback:e,abort:a.abort},g=new b(f);if(!this.jobLimit||this.jobsInProgress<this.jobLimit){g.start();this.jobsInProgress++}else this.jobQueue.push(g)},clear:function(){for(var a=0;a<this.jobQueue.length;a++){var b=this.jobQueue[a];"function"==typeof b.abort&&b.abort()}this.jobQueue=[]}}}(OpenSeadragon);!function(a){a.Tile=function(a,b,c,d,e,f,g){this.level=a;this.x=b;this.y=c;this.bounds=d;this.exists=e;this.url=f;this.context2D=g;this.loaded=!1;this.loading=!1;this.element=null;this.imgElement=null;this.image=null;this.style=null;this.position=null;this.size=null;this.blendStart=null;this.opacity=null;this.distance=null;this.visibility=null;this.beingDrawn=!1;this.lastTouchTime=0};a.Tile.prototype={toString:function(){return this.level+"/"+this.x+"_"+this.y},_hasTransparencyChannel:function(){return!!this.context2D||this.url.match(".png")},drawHTML:function(b){if(this.cacheImageRecord)if(this.loaded){if(!this.element){this.element=a.makeNeutralElement("div");this.imgElement=this.cacheImageRecord.getImage().cloneNode();this.imgElement.style.msInterpolationMode="nearest-neighbor";this.imgElement.style.width="100%";this.imgElement.style.height="100%";this.style=this.element.style;this.style.position="absolute"}this.element.parentNode!=b&&b.appendChild(this.element);this.imgElement.parentNode!=this.element&&this.element.appendChild(this.imgElement);this.style.top=this.position.y+"px";this.style.left=this.position.x+"px";this.style.height=this.size.y+"px";this.style.width=this.size.x+"px";a.setElementOpacity(this.element,this.opacity)}else a.console.warn("Attempting to draw tile %s when it's not yet loaded.",this.toString());else a.console.warn("[Tile.drawHTML] attempting to draw tile %s when it's not cached",this.toString())},drawCanvas:function(b,c,d,e){var f,g=this.position.times(a.pixelDensityRatio),h=this.size.times(a.pixelDensityRatio);if(this.context2D||this.cacheImageRecord){f=this.context2D||this.cacheImageRecord.getRenderedContext();if(this.loaded&&f){b.save();b.globalAlpha=this.opacity;if("number"==typeof d&&1!==d){g=g.times(d);h=h.times(d)}e instanceof a.Point&&(g=g.plus(e));1===b.globalAlpha&&this._hasTransparencyChannel()&&b.clearRect(g.x+1,g.y+1,h.x-2,h.y-2);c({context:b,tile:this,rendered:f});b.drawImage(f.canvas,0,0,f.canvas.width,f.canvas.height,g.x,g.y,h.x,h.y);b.restore()}else a.console.warn("Attempting to draw tile %s when it's not yet loaded.",this.toString())}else a.console.warn("[Tile.drawCanvas] attempting to draw tile %s when it's not cached",this.toString())},getScaleForEdgeSmoothing:function(){var b;if(this.cacheImageRecord)b=this.cacheImageRecord.getRenderedContext();else{if(!this.context2D){a.console.warn("[Tile.drawCanvas] attempting to get tile scale %s when tile's not cached",this.toString());return 1}b=this.context2D}return b.canvas.width/(this.size.x*a.pixelDensityRatio)},getTranslationForEdgeSmoothing:function(b,c,d){var e=Math.max(1,Math.ceil((d.x-c.x)/2));var f=Math.max(1,Math.ceil((d.y-c.y)/2));return new a.Point(e,f).minus(this.position.times(a.pixelDensityRatio).times(b||1).apply(function(a){return a%1}))},unload:function(){this.imgElement&&this.imgElement.parentNode&&this.imgElement.parentNode.removeChild(this.imgElement);this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element);this.element=null;this.imgElement=null;this.loaded=!1;this.loading=!1}}}(OpenSeadragon);!function(a){a.OverlayPlacement=a.Placement;a.OverlayRotationMode=a.freezeObject({NO_ROTATION:1,EXACT:2,BOUNDING_BOX:3});a.Overlay=function(b,c,d){var e;e=a.isPlainObject(b)?b:{element:b,location:c,placement:d};this.element=e.element;this.style=e.element.style;this._init(e)};a.Overlay.prototype={_init:function(b){this.location=b.location;this.placement=void 0===b.placement?a.Placement.TOP_LEFT:b.placement;this.onDraw=b.onDraw;this.checkResize=void 0===b.checkResize?!0:b.checkResize;this.width=void 0===b.width?null:b.width;this.height=void 0===b.height?null:b.height;this.rotationMode=b.rotationMode||a.OverlayRotationMode.EXACT;if(this.location instanceof a.Rect){this.width=this.location.width;this.height=this.location.height;this.location=this.location.getTopLeft();this.placement=a.Placement.TOP_LEFT}this.scales=null!==this.width&&null!==this.height;this.bounds=new a.Rect(this.location.x,this.location.y,this.width,this.height);this.position=this.location},adjust:function(b,c){var d=a.Placement.properties[this.placement];if(d){d.isHorizontallyCentered?b.x-=c.x/2:d.isRight&&(b.x-=c.x);d.isVerticallyCentered?b.y-=c.y/2:d.isBottom&&(b.y-=c.y)}},destroy:function(){var b=this.element;var c=this.style;if(b.parentNode){b.parentNode.removeChild(b);if(b.prevElementParent){c.display="none";document.body.appendChild(b)}}this.onDraw=null;c.top="";c.left="";c.position="";null!==this.width&&(c.width="");null!==this.height&&(c.height="");var d=a.getCssPropertyWithVendorPrefix("transformOrigin");var e=a.getCssPropertyWithVendorPrefix("transform");if(d&&e){c[d]="";c[e]=""}},drawHTML:function(b,c){var d=this.element;if(d.parentNode!==b){d.prevElementParent=d.parentNode;d.prevNextSibling=d.nextSibling;b.appendChild(d);this.size=a.getElementSize(d)}var e=this._getOverlayPositionAndSize(c);var f=e.position;var g=this.size=e.size;var h=e.rotate;if(this.onDraw)this.onDraw(f,g,this.element);else{var i=this.style;i.left=f.x+"px";i.top=f.y+"px";null!==this.width&&(i.width=g.x+"px");null!==this.height&&(i.height=g.y+"px");var j=a.getCssPropertyWithVendorPrefix("transformOrigin");var k=a.getCssPropertyWithVendorPrefix("transform");if(j&&k)if(h){i[j]=this._getTransformOrigin();i[k]="rotate("+h+"deg)"}else{i[j]="";i[k]=""}i.position="absolute";"none"!==i.display&&(i.display="block")}},_getOverlayPositionAndSize:function(b){var c=b.pixelFromPoint(this.location,!0);var d=this._getSizeInPixels(b);this.adjust(c,d);var e=0;if(b.degrees&&this.rotationMode!==a.OverlayRotationMode.NO_ROTATION)if(this.rotationMode===a.OverlayRotationMode.BOUNDING_BOX&&null!==this.width&&null!==this.height){var f=new a.Rect(c.x,c.y,d.x,d.y);var g=this._getBoundingBox(f,b.degrees);c=g.getTopLeft();d=g.getSize()}else e=b.degrees;return{position:c,size:d,rotate:e}},_getSizeInPixels:function(b){var c=this.size.x;var d=this.size.y;if(null!==this.width||null!==this.height){var e=b.deltaPixelsFromPointsNoRotate(new a.Point(this.width||0,this.height||0),!0);null!==this.width&&(c=e.x);null!==this.height&&(d=e.y)}if(this.checkResize&&(null===this.width||null===this.height)){var f=this.size=a.getElementSize(this.element);null===this.width&&(c=f.x);null===this.height&&(d=f.y)}return new a.Point(c,d)},_getBoundingBox:function(a,b){var c=this._getPlacementPoint(a);return a.rotate(b,c).getBoundingBox()},_getPlacementPoint:function(b){var c=new a.Point(b.x,b.y);var d=a.Placement.properties[this.placement];if(d){d.isHorizontallyCentered?c.x+=b.width/2:d.isRight&&(c.x+=b.width);d.isVerticallyCentered?c.y+=b.height/2:d.isBottom&&(c.y+=b.height)}return c},_getTransformOrigin:function(){var b="";var c=a.Placement.properties[this.placement];if(!c)return b;c.isLeft?b="left":c.isRight&&(b="right");c.isTop?b+=" top":c.isBottom&&(b+=" bottom");return b},update:function(b,c){var d=a.isPlainObject(b)?b:{location:b,placement:c};this._init({location:d.location||this.location,placement:void 0!==d.placement?d.placement:this.placement,onDraw:d.onDraw||this.onDraw,checkResize:d.checkResize||this.checkResize,width:void 0!==d.width?d.width:this.width,height:void 0!==d.height?d.height:this.height,rotationMode:d.rotationMode||this.rotationMode})},getBounds:function(b){a.console.assert(b,"A viewport must now be passed to Overlay.getBounds.");var c=this.width;var d=this.height;if(null===c||null===d){var e=b.deltaPointsFromPixelsNoRotate(this.size,!0);null===c&&(c=e.x);null===d&&(d=e.y)}var f=this.location.clone();this.adjust(f,new a.Point(c,d));return this._adjustBoundsForRotation(b,new a.Rect(f.x,f.y,c,d))},_adjustBoundsForRotation:function(b,c){if(!b||0===b.degrees||this.rotationMode===a.OverlayRotationMode.EXACT)return c;if(this.rotationMode===a.OverlayRotationMode.BOUNDING_BOX){if(null===this.width||null===this.height)return c;var d=this._getOverlayPositionAndSize(b);return b.viewerElementToViewportRectangle(new a.Rect(d.position.x,d.position.y,d.size.x,d.size.y))}return c.rotate(-b.degrees,this._getPlacementPoint(c))}}}(OpenSeadragon);!function(a){a.Drawer=function(b){a.console.assert(b.viewer,"[Drawer] options.viewer is required");var c=arguments;a.isPlainObject(b)||(b={source:c[0],viewport:c[1],element:c[2]});a.console.assert(b.viewport,"[Drawer] options.viewport is required");a.console.assert(b.element,"[Drawer] options.element is required");b.source&&a.console.error("[Drawer] options.source is no longer accepted; use TiledImage instead");this.viewer=b.viewer;this.viewport=b.viewport;this.debugGridColor=b.debugGridColor||a.DEFAULT_SETTINGS.debugGridColor;b.opacity&&a.console.error("[Drawer] options.opacity is no longer accepted; set the opacity on the TiledImage instead");this.useCanvas=a.supportsCanvas&&(this.viewer?this.viewer.useCanvas:!0);this.container=a.getElement(b.element);this.canvas=a.makeNeutralElement(this.useCanvas?"canvas":"div");this.context=this.useCanvas?this.canvas.getContext("2d"):null;this.sketchCanvas=null;this.sketchContext=null;this.element=this.container;this.container.dir="ltr";if(this.useCanvas){var d=this._calculateCanvasSize();this.canvas.width=d.x;this.canvas.height=d.y}this.canvas.style.width="100%";this.canvas.style.height="100%";this.canvas.style.position="absolute";a.setElementOpacity(this.canvas,this.opacity,!0);this.container.style.textAlign="left";this.container.appendChild(this.canvas)};a.Drawer.prototype={addOverlay:function(b,c,d,e){a.console.error("drawer.addOverlay is deprecated. Use viewer.addOverlay instead.");this.viewer.addOverlay(b,c,d,e);return this},updateOverlay:function(b,c,d){a.console.error("drawer.updateOverlay is deprecated. Use viewer.updateOverlay instead.");this.viewer.updateOverlay(b,c,d);return this},removeOverlay:function(b){a.console.error("drawer.removeOverlay is deprecated. Use viewer.removeOverlay instead.");this.viewer.removeOverlay(b);return this},clearOverlays:function(){a.console.error("drawer.clearOverlays is deprecated. Use viewer.clearOverlays instead.");this.viewer.clearOverlays();return this},setOpacity:function(b){a.console.error("drawer.setOpacity is deprecated. Use tiledImage.setOpacity instead.");var c=this.viewer.world;for(var d=0;d<c.getItemCount();d++)c.getItemAt(d).setOpacity(b);return this},getOpacity:function(){a.console.error("drawer.getOpacity is deprecated. Use tiledImage.getOpacity instead.");var b=this.viewer.world;var c=0;for(var d=0;d<b.getItemCount();d++){var e=b.getItemAt(d).getOpacity();e>c&&(c=e)}return c},needsUpdate:function(){a.console.error("[Drawer.needsUpdate] this function is deprecated. Use World.needsDraw instead.");return this.viewer.world.needsDraw()},numTilesLoaded:function(){a.console.error("[Drawer.numTilesLoaded] this function is deprecated. Use TileCache.numTilesLoaded instead.");return this.viewer.tileCache.numTilesLoaded()},reset:function(){a.console.error("[Drawer.reset] this function is deprecated. Use World.resetItems instead.");this.viewer.world.resetItems();return this},update:function(){a.console.error("[Drawer.update] this function is deprecated. Use Drawer.clear and World.draw instead.");this.clear();this.viewer.world.draw();return this},canRotate:function(){return this.useCanvas},destroy:function(){this.canvas.width=1;this.canvas.height=1;this.sketchCanvas=null;this.sketchContext=null},clear:function(){this.canvas.innerHTML="";if(this.useCanvas){var a=this._calculateCanvasSize();if(this.canvas.width!=a.x||this.canvas.height!=a.y){this.canvas.width=a.x;this.canvas.height=a.y;if(null!==this.sketchCanvas){var b=this._calculateSketchCanvasSize();this.sketchCanvas.width=b.x;this.sketchCanvas.height=b.y}}this._clear()}},_clear:function(a,b){if(this.useCanvas){var c=this._getContext(a);if(b)c.clearRect(b.x,b.y,b.width,b.height);else{var d=c.canvas;c.clearRect(0,0,d.width,d.height);
}}},viewportToDrawerRectangle:function(b){var c=this.viewport.pixelFromPointNoRotate(b.getTopLeft(),!0);var d=this.viewport.deltaPixelsFromPointsNoRotate(b.getSize(),!0);return new a.Rect(c.x*a.pixelDensityRatio,c.y*a.pixelDensityRatio,d.x*a.pixelDensityRatio,d.y*a.pixelDensityRatio)},drawTile:function(b,c,d,e,f){a.console.assert(b,"[Drawer.drawTile] tile is required");a.console.assert(c,"[Drawer.drawTile] drawingHandler is required");if(this.useCanvas){var g=this._getContext(d);e=e||1;b.drawCanvas(g,c,e,f)}else b.drawHTML(this.canvas)},_getContext:function(a){var b=this.context;if(a){if(null===this.sketchCanvas){this.sketchCanvas=document.createElement("canvas");var c=this._calculateSketchCanvasSize();this.sketchCanvas.width=c.x;this.sketchCanvas.height=c.y;this.sketchContext=this.sketchCanvas.getContext("2d");if(0===this.viewport.getRotation()){var d=this;this.viewer.addHandler("rotate",function e(){d.viewer.removeHandler("rotate",e);var a=d._calculateSketchCanvasSize();d.sketchCanvas.width=a.x;d.sketchCanvas.height=a.y})}}b=this.sketchContext}return b},saveContext:function(a){this.useCanvas&&this._getContext(a).save()},restoreContext:function(a){this.useCanvas&&this._getContext(a).restore()},setClip:function(a,b){if(this.useCanvas){var c=this._getContext(b);c.beginPath();c.rect(a.x,a.y,a.width,a.height);c.clip()}},drawRectangle:function(a,b,c){if(this.useCanvas){var d=this._getContext(c);d.save();d.fillStyle=b;d.fillRect(a.x,a.y,a.width,a.height);d.restore()}},blendSketch:function(b,c,d,e){var f=b;a.isPlainObject(f)||(f={opacity:b,scale:c,translate:d,compositeOperation:e});if(this.useCanvas&&this.sketchCanvas){b=f.opacity;e=f.compositeOperation;var g=f.bounds;this.context.save();this.context.globalAlpha=b;e&&(this.context.globalCompositeOperation=e);if(g)this.context.drawImage(this.sketchCanvas,g.x,g.y,g.width,g.height,g.x,g.y,g.width,g.height);else{c=f.scale||1;d=f.translate;var h=d instanceof a.Point?d:new a.Point(0,0);var i=0;var j=0;if(d){var k=this.sketchCanvas.width-this.canvas.width;var l=this.sketchCanvas.height-this.canvas.height;i=Math.round(k/2);j=Math.round(l/2)}this.context.drawImage(this.sketchCanvas,h.x-i*c,h.y-j*c,(this.canvas.width+2*i)*c,(this.canvas.height+2*j)*c,-i,-j,this.canvas.width+2*i,this.canvas.height+2*j)}this.context.restore()}},drawDebugInfo:function(b,c,d){if(this.useCanvas){var e=this.context;e.save();e.lineWidth=2*a.pixelDensityRatio;e.font="small-caps bold "+13*a.pixelDensityRatio+"px arial";e.strokeStyle=this.debugGridColor;e.fillStyle=this.debugGridColor;0!==this.viewport.degrees&&this._offsetForRotation(this.viewport.degrees);e.strokeRect(b.position.x*a.pixelDensityRatio,b.position.y*a.pixelDensityRatio,b.size.x*a.pixelDensityRatio,b.size.y*a.pixelDensityRatio);var f=(b.position.x+b.size.x/2)*a.pixelDensityRatio;var g=(b.position.y+b.size.y/2)*a.pixelDensityRatio;e.translate(f,g);e.rotate(Math.PI/180*-this.viewport.degrees);e.translate(-f,-g);if(0===b.x&&0===b.y){e.fillText("Zoom: "+this.viewport.getZoom(),b.position.x*a.pixelDensityRatio,(b.position.y-30)*a.pixelDensityRatio);e.fillText("Pan: "+this.viewport.getBounds().toString(),b.position.x*a.pixelDensityRatio,(b.position.y-20)*a.pixelDensityRatio)}e.fillText("Level: "+b.level,(b.position.x+10)*a.pixelDensityRatio,(b.position.y+20)*a.pixelDensityRatio);e.fillText("Column: "+b.x,(b.position.x+10)*a.pixelDensityRatio,(b.position.y+30)*a.pixelDensityRatio);e.fillText("Row: "+b.y,(b.position.x+10)*a.pixelDensityRatio,(b.position.y+40)*a.pixelDensityRatio);e.fillText("Order: "+d+" of "+c,(b.position.x+10)*a.pixelDensityRatio,(b.position.y+50)*a.pixelDensityRatio);e.fillText("Size: "+b.size.toString(),(b.position.x+10)*a.pixelDensityRatio,(b.position.y+60)*a.pixelDensityRatio);e.fillText("Position: "+b.position.toString(),(b.position.x+10)*a.pixelDensityRatio,(b.position.y+70)*a.pixelDensityRatio);0!==this.viewport.degrees&&this._restoreRotationChanges();e.restore()}},debugRect:function(b){if(this.useCanvas){var c=this.context;c.save();c.lineWidth=2*a.pixelDensityRatio;c.strokeStyle=this.debugGridColor;c.fillStyle=this.debugGridColor;c.strokeRect(b.x*a.pixelDensityRatio,b.y*a.pixelDensityRatio,b.width*a.pixelDensityRatio,b.height*a.pixelDensityRatio);c.restore()}},getCanvasSize:function(b){var c=this._getContext(b).canvas;return new a.Point(c.width,c.height)},_offsetForRotation:function(a,b){var c=this.canvas.width/2;var d=this.canvas.height/2;var e=this._getContext(b);e.save();e.translate(c,d);e.rotate(Math.PI/180*a);e.translate(-c,-d)},_restoreRotationChanges:function(a){var b=this._getContext(a);b.restore()},_calculateCanvasSize:function(){var b=a.pixelDensityRatio;var c=this.viewport.getContainerSize();return{x:c.x*b,y:c.y*b}},_calculateSketchCanvasSize:function(){var a=this._calculateCanvasSize();if(0===this.viewport.getRotation())return a;var b=Math.ceil(Math.sqrt(a.x*a.x+a.y*a.y));return{x:b,y:b}}}}(OpenSeadragon);!function(a){a.Viewport=function(b){var c=arguments;c.length&&c[0]instanceof a.Point&&(b={containerSize:c[0],contentSize:c[1],config:c[2]});if(b.config){a.extend(!0,b,b.config);delete b.config}this._margins=a.extend({left:0,top:0,right:0,bottom:0},b.margins||{});delete b.margins;a.extend(!0,this,{containerSize:null,contentSize:null,zoomPoint:null,viewer:null,springStiffness:a.DEFAULT_SETTINGS.springStiffness,animationTime:a.DEFAULT_SETTINGS.animationTime,minZoomImageRatio:a.DEFAULT_SETTINGS.minZoomImageRatio,maxZoomPixelRatio:a.DEFAULT_SETTINGS.maxZoomPixelRatio,visibilityRatio:a.DEFAULT_SETTINGS.visibilityRatio,wrapHorizontal:a.DEFAULT_SETTINGS.wrapHorizontal,wrapVertical:a.DEFAULT_SETTINGS.wrapVertical,defaultZoomLevel:a.DEFAULT_SETTINGS.defaultZoomLevel,minZoomLevel:a.DEFAULT_SETTINGS.minZoomLevel,maxZoomLevel:a.DEFAULT_SETTINGS.maxZoomLevel,degrees:a.DEFAULT_SETTINGS.degrees,homeFillsViewer:a.DEFAULT_SETTINGS.homeFillsViewer},b);this._updateContainerInnerSize();this.centerSpringX=new a.Spring({initial:0,springStiffness:this.springStiffness,animationTime:this.animationTime});this.centerSpringY=new a.Spring({initial:0,springStiffness:this.springStiffness,animationTime:this.animationTime});this.zoomSpring=new a.Spring({exponential:!0,initial:1,springStiffness:this.springStiffness,animationTime:this.animationTime});this._oldCenterX=this.centerSpringX.current.value;this._oldCenterY=this.centerSpringY.current.value;this._oldZoom=this.zoomSpring.current.value;this._setContentBounds(new a.Rect(0,0,1,1),1);this.goHome(!0);this.update()};a.Viewport.prototype={resetContentSize:function(b){a.console.assert(b,"[Viewport.resetContentSize] contentSize is required");a.console.assert(b instanceof a.Point,"[Viewport.resetContentSize] contentSize must be an OpenSeadragon.Point");a.console.assert(b.x>0,"[Viewport.resetContentSize] contentSize.x must be greater than 0");a.console.assert(b.y>0,"[Viewport.resetContentSize] contentSize.y must be greater than 0");this._setContentBounds(new a.Rect(0,0,1,b.y/b.x),b.x);return this},setHomeBounds:function(b,c){a.console.error("[Viewport.setHomeBounds] this function is deprecated; The content bounds should not be set manually.");this._setContentBounds(b,c)},_setContentBounds:function(b,c){a.console.assert(b,"[Viewport._setContentBounds] bounds is required");a.console.assert(b instanceof a.Rect,"[Viewport._setContentBounds] bounds must be an OpenSeadragon.Rect");a.console.assert(b.width>0,"[Viewport._setContentBounds] bounds.width must be greater than 0");a.console.assert(b.height>0,"[Viewport._setContentBounds] bounds.height must be greater than 0");this._contentBoundsNoRotate=b.clone();this._contentSizeNoRotate=this._contentBoundsNoRotate.getSize().times(c);this._contentBounds=b.rotate(this.degrees).getBoundingBox();this._contentSize=this._contentBounds.getSize().times(c);this._contentAspectRatio=this._contentSize.x/this._contentSize.y;this.viewer&&this.viewer.raiseEvent("reset-size",{contentSize:this._contentSizeNoRotate.clone(),contentFactor:c,homeBounds:this._contentBoundsNoRotate.clone(),contentBounds:this._contentBounds.clone()})},getHomeZoom:function(){if(this.defaultZoomLevel)return this.defaultZoomLevel;var a=this._contentAspectRatio/this.getAspectRatio();var b;b=this.homeFillsViewer?a>=1?a:1:a>=1?1:a;return b/this._contentBounds.width},getHomeBounds:function(){return this.getHomeBoundsNoRotate().rotate(-this.getRotation())},getHomeBoundsNoRotate:function(){var b=this._contentBounds.getCenter();var c=1/this.getHomeZoom();var d=c/this.getAspectRatio();return new a.Rect(b.x-c/2,b.y-d/2,c,d)},goHome:function(a){this.viewer&&this.viewer.raiseEvent("home",{immediately:a});return this.fitBounds(this.getHomeBounds(),a)},getMinZoom:function(){var a=this.getHomeZoom(),b=this.minZoomLevel?this.minZoomLevel:this.minZoomImageRatio*a;return b},getMaxZoom:function(){var a=this.maxZoomLevel;if(!a){a=this._contentSize.x*this.maxZoomPixelRatio/this._containerInnerSize.x;a/=this._contentBounds.width}return Math.max(a,this.getHomeZoom())},getAspectRatio:function(){return this._containerInnerSize.x/this._containerInnerSize.y},getContainerSize:function(){return new a.Point(this.containerSize.x,this.containerSize.y)},getMargins:function(){return a.extend({},this._margins)},setMargins:function(b){a.console.assert("object"===a.type(b),"[Viewport.setMargins] margins must be an object");this._margins=a.extend({left:0,top:0,right:0,bottom:0},b);this._updateContainerInnerSize();this.viewer&&this.viewer.forceRedraw()},getBounds:function(a){return this.getBoundsNoRotate(a).rotate(-this.getRotation())},getBoundsNoRotate:function(b){var c=this.getCenter(b);var d=1/this.getZoom(b);var e=d/this.getAspectRatio();return new a.Rect(c.x-d/2,c.y-e/2,d,e)},getBoundsWithMargins:function(a){return this.getBoundsNoRotateWithMargins(a).rotate(-this.getRotation(),this.getCenter(a))},getBoundsNoRotateWithMargins:function(a){var b=this.getBoundsNoRotate(a);var c=this._containerInnerSize.x*this.getZoom(a);b.x-=this._margins.left/c;b.y-=this._margins.top/c;b.width+=(this._margins.left+this._margins.right)/c;b.height+=(this._margins.top+this._margins.bottom)/c;return b},getCenter:function(b){var c,d,e,f,g,h,i,j,k=new a.Point(this.centerSpringX.current.value,this.centerSpringY.current.value),l=new a.Point(this.centerSpringX.target.value,this.centerSpringY.target.value);if(b)return k;if(!this.zoomPoint)return l;c=this.pixelFromPoint(this.zoomPoint,!0);d=this.getZoom();e=1/d;f=e/this.getAspectRatio();g=new a.Rect(k.x-e/2,k.y-f/2,e,f);h=this._pixelFromPoint(this.zoomPoint,g);i=h.minus(c);j=i.divide(this._containerInnerSize.x*d);return l.plus(j)},getZoom:function(a){return a?this.zoomSpring.current.value:this.zoomSpring.target.value},_applyZoomConstraints:function(a){return Math.max(Math.min(a,this.getMaxZoom()),this.getMinZoom())},_applyBoundaryConstraints:function(b,c){var d=new a.Rect(b.x,b.y,b.width,b.height);if(this.wrapHorizontal);else{var e=this.visibilityRatio*d.width;var f=d.x+d.width;var g=this._contentBoundsNoRotate.x+this._contentBoundsNoRotate.width;var h=this._contentBoundsNoRotate.x-f+e;var i=g-d.x-e;e>this._contentBoundsNoRotate.width?d.x+=(h+i)/2:0>i?d.x+=i:h>0&&(d.x+=h)}if(this.wrapVertical);else{var j=this.visibilityRatio*d.height;var k=d.y+d.height;var l=this._contentBoundsNoRotate.y+this._contentBoundsNoRotate.height;var m=this._contentBoundsNoRotate.y-k+j;var n=l-d.y-j;j>this._contentBoundsNoRotate.height?d.y+=(m+n)/2:0>n?d.y+=n:m>0&&(d.y+=m)}this.viewer&&this.viewer.raiseEvent("constrain",{immediately:c});return d},applyConstraints:function(a){var b=this.getZoom();var c=this._applyZoomConstraints(b);b!==c&&this.zoomTo(c,this.zoomPoint,a);var d=this.getBoundsNoRotate();var e=this._applyBoundaryConstraints(d,a);(d.x!==e.x||d.y!==e.y||a)&&this.fitBounds(e.rotate(-this.getRotation()),a);return this},ensureVisible:function(a){return this.applyConstraints(a)},_fitBounds:function(b,c){c=c||{};var d=c.immediately||!1;var e=c.constraints||!1;var f=this.getAspectRatio();var g=b.getCenter();var h=new a.Rect(b.x,b.y,b.width,b.height,b.degrees+this.getRotation()).getBoundingBox();h.getAspectRatio()>=f?h.height=h.width/f:h.width=h.height*f;h.x=g.x-h.width/2;h.y=g.y-h.height/2;var i=1/h.width;if(e){var j=h.getAspectRatio();var k=this._applyZoomConstraints(i);if(i!==k){i=k;h.width=1/i;h.x=g.x-h.width/2;h.height=h.width/j;h.y=g.y-h.height/2}h=this._applyBoundaryConstraints(h,d);g=h.getCenter()}if(d){this.panTo(g,!0);return this.zoomTo(i,null,!0)}this.panTo(this.getCenter(!0),!0);this.zoomTo(this.getZoom(!0),null,!0);var l=this.getBounds();var m=this.getZoom();if(0===m||Math.abs(i/m-1)<1e-8){this.zoomTo(i,!0);return this.panTo(g,d)}h=h.rotate(-this.getRotation());var n=h.getTopLeft().times(i).minus(l.getTopLeft().times(m)).divide(i-m);return this.zoomTo(i,n,d)},fitBounds:function(a,b){return this._fitBounds(a,{immediately:b,constraints:!1})},fitBoundsWithConstraints:function(a,b){return this._fitBounds(a,{immediately:b,constraints:!0})},fitVertically:function(b){var c=new a.Rect(this._contentBounds.x+this._contentBounds.width/2,this._contentBounds.y,0,this._contentBounds.height);return this.fitBounds(c,b)},fitHorizontally:function(b){var c=new a.Rect(this._contentBounds.x,this._contentBounds.y+this._contentBounds.height/2,this._contentBounds.width,0);return this.fitBounds(c,b)},panBy:function(b,c){var d=new a.Point(this.centerSpringX.target.value,this.centerSpringY.target.value);return this.panTo(d.plus(b),c)},panTo:function(a,b){if(b){this.centerSpringX.resetTo(a.x);this.centerSpringY.resetTo(a.y)}else{this.centerSpringX.springTo(a.x);this.centerSpringY.springTo(a.y)}this.viewer&&this.viewer.raiseEvent("pan",{center:a,immediately:b});return this},zoomBy:function(a,b,c){return this.zoomTo(this.zoomSpring.target.value*a,b,c)},zoomTo:function(b,c,d){this.zoomPoint=c instanceof a.Point&&!isNaN(c.x)&&!isNaN(c.y)?c:null;d?this.zoomSpring.resetTo(b):this.zoomSpring.springTo(b);this.viewer&&this.viewer.raiseEvent("zoom",{zoom:b,refPoint:c,immediately:d});return this},setRotation:function(a){if(!this.viewer||!this.viewer.drawer.canRotate())return this;a%=360;0>a&&(a+=360);this.degrees=a;this._setContentBounds(this.viewer.world.getHomeBounds(),this.viewer.world.getContentFactor());this.viewer.forceRedraw();this.viewer.raiseEvent("rotate",{degrees:a});return this},getRotation:function(){return this.degrees},resize:function(a,b){var c,d=this.getBoundsNoRotate(),e=d;this.containerSize.x=a.x;this.containerSize.y=a.y;this._updateContainerInnerSize();if(b){c=a.x/this.containerSize.x;e.width=d.width*c;e.height=e.width/this.getAspectRatio()}this.viewer&&this.viewer.raiseEvent("resize",{newContainerSize:a,maintain:b});return this.fitBounds(e,!0)},_updateContainerInnerSize:function(){this._containerInnerSize=new a.Point(Math.max(1,this.containerSize.x-(this._margins.left+this._margins.right)),Math.max(1,this.containerSize.y-(this._margins.top+this._margins.bottom)))},update:function(){if(this.zoomPoint){var a=this.pixelFromPoint(this.zoomPoint,!0);this.zoomSpring.update();var b=this.pixelFromPoint(this.zoomPoint,!0);var c=b.minus(a);var d=this.deltaPointsFromPixels(c,!0);this.centerSpringX.shiftBy(d.x);this.centerSpringY.shiftBy(d.y);this.zoomSpring.isAtTargetValue()&&(this.zoomPoint=null)}else this.zoomSpring.update();this.centerSpringX.update();this.centerSpringY.update();var e=this.centerSpringX.current.value!==this._oldCenterX||this.centerSpringY.current.value!==this._oldCenterY||this.zoomSpring.current.value!==this._oldZoom;this._oldCenterX=this.centerSpringX.current.value;this._oldCenterY=this.centerSpringY.current.value;this._oldZoom=this.zoomSpring.current.value;return e},deltaPixelsFromPointsNoRotate:function(a,b){return a.times(this._containerInnerSize.x*this.getZoom(b))},deltaPixelsFromPoints:function(a,b){return this.deltaPixelsFromPointsNoRotate(a.rotate(this.getRotation()),b)},deltaPointsFromPixelsNoRotate:function(a,b){return a.divide(this._containerInnerSize.x*this.getZoom(b))},deltaPointsFromPixels:function(a,b){return this.deltaPointsFromPixelsNoRotate(a,b).rotate(-this.getRotation())},pixelFromPointNoRotate:function(a,b){return this._pixelFromPointNoRotate(a,this.getBoundsNoRotate(b))},pixelFromPoint:function(a,b){return this._pixelFromPoint(a,this.getBoundsNoRotate(b))},_pixelFromPointNoRotate:function(b,c){return b.minus(c.getTopLeft()).times(this._containerInnerSize.x/c.width).plus(new a.Point(this._margins.left,this._margins.top))},_pixelFromPoint:function(a,b){return this._pixelFromPointNoRotate(a.rotate(this.getRotation(),this.getCenter(!0)),b)},pointFromPixelNoRotate:function(b,c){var d=this.getBoundsNoRotate(c);return b.minus(new a.Point(this._margins.left,this._margins.top)).divide(this._containerInnerSize.x/d.width).plus(d.getTopLeft())},pointFromPixel:function(a,b){return this.pointFromPixelNoRotate(a,b).rotate(-this.getRotation(),this.getCenter(!0))},_viewportToImageDelta:function(b,c){var d=this._contentBoundsNoRotate.width;return new a.Point(b*this._contentSizeNoRotate.x/d,c*this._contentSizeNoRotate.x/d)},viewportToImageCoordinates:function(b,c){if(b instanceof a.Point)return this.viewportToImageCoordinates(b.x,b.y);if(this.viewer){var d=this.viewer.world.getItemCount();if(d>1)a.console.error("[Viewport.viewportToImageCoordinates] is not accurate with multi-image; use TiledImage.viewportToImageCoordinates instead.");else if(1===d){var e=this.viewer.world.getItemAt(0);return e.viewportToImageCoordinates(b,c,!0)}}return this._viewportToImageDelta(b-this._contentBoundsNoRotate.x,c-this._contentBoundsNoRotate.y)},_imageToViewportDelta:function(b,c){var d=this._contentBoundsNoRotate.width;return new a.Point(b/this._contentSizeNoRotate.x*d,c/this._contentSizeNoRotate.x*d)},imageToViewportCoordinates:function(b,c){if(b instanceof a.Point)return this.imageToViewportCoordinates(b.x,b.y);if(this.viewer){var d=this.viewer.world.getItemCount();if(d>1)a.console.error("[Viewport.imageToViewportCoordinates] is not accurate with multi-image; use TiledImage.imageToViewportCoordinates instead.");else if(1===d){var e=this.viewer.world.getItemAt(0);return e.imageToViewportCoordinates(b,c,!0)}}var f=this._imageToViewportDelta(b,c);f.x+=this._contentBoundsNoRotate.x;f.y+=this._contentBoundsNoRotate.y;return f},imageToViewportRectangle:function(b,c,d,e){var f=b;f instanceof a.Rect||(f=new a.Rect(b,c,d,e));if(this.viewer){var g=this.viewer.world.getItemCount();if(g>1)a.console.error("[Viewport.imageToViewportRectangle] is not accurate with multi-image; use TiledImage.imageToViewportRectangle instead.");else if(1===g){var h=this.viewer.world.getItemAt(0);return h.imageToViewportRectangle(b,c,d,e,!0)}}var i=this.imageToViewportCoordinates(f.x,f.y);var j=this._imageToViewportDelta(f.width,f.height);return new a.Rect(i.x,i.y,j.x,j.y,f.degrees)},viewportToImageRectangle:function(b,c,d,e){var f=b;f instanceof a.Rect||(f=new a.Rect(b,c,d,e));if(this.viewer){var g=this.viewer.world.getItemCount();if(g>1)a.console.error("[Viewport.viewportToImageRectangle] is not accurate with multi-image; use TiledImage.viewportToImageRectangle instead.");else if(1===g){var h=this.viewer.world.getItemAt(0);return h.viewportToImageRectangle(b,c,d,e,!0)}}var i=this.viewportToImageCoordinates(f.x,f.y);var j=this._viewportToImageDelta(f.width,f.height);return new a.Rect(i.x,i.y,j.x,j.y,f.degrees)},viewerElementToImageCoordinates:function(a){var b=this.pointFromPixel(a,!0);return this.viewportToImageCoordinates(b)},imageToViewerElementCoordinates:function(a){var b=this.imageToViewportCoordinates(a);return this.pixelFromPoint(b,!0)},windowToImageCoordinates:function(b){a.console.assert(this.viewer,"[Viewport.windowToImageCoordinates] the viewport must have a viewer.");var c=b.minus(a.getElementPosition(this.viewer.element));return this.viewerElementToImageCoordinates(c)},imageToWindowCoordinates:function(b){a.console.assert(this.viewer,"[Viewport.imageToWindowCoordinates] the viewport must have a viewer.");var c=this.imageToViewerElementCoordinates(b);return c.plus(a.getElementPosition(this.viewer.element))},viewerElementToViewportCoordinates:function(a){return this.pointFromPixel(a,!0)},viewportToViewerElementCoordinates:function(a){return this.pixelFromPoint(a,!0)},viewerElementToViewportRectangle:function(b){return a.Rect.fromSummits(this.pointFromPixel(b.getTopLeft(),!0),this.pointFromPixel(b.getTopRight(),!0),this.pointFromPixel(b.getBottomLeft(),!0))},viewportToViewerElementRectangle:function(b){return a.Rect.fromSummits(this.pixelFromPoint(b.getTopLeft(),!0),this.pixelFromPoint(b.getTopRight(),!0),this.pixelFromPoint(b.getBottomLeft(),!0))},windowToViewportCoordinates:function(b){a.console.assert(this.viewer,"[Viewport.windowToViewportCoordinates] the viewport must have a viewer.");var c=b.minus(a.getElementPosition(this.viewer.element));return this.viewerElementToViewportCoordinates(c)},viewportToWindowCoordinates:function(b){a.console.assert(this.viewer,"[Viewport.viewportToWindowCoordinates] the viewport must have a viewer.");var c=this.viewportToViewerElementCoordinates(b);return c.plus(a.getElementPosition(this.viewer.element))},viewportToImageZoom:function(b){if(this.viewer){var c=this.viewer.world.getItemCount();if(c>1)a.console.error("[Viewport.viewportToImageZoom] is not accurate with multi-image.");else if(1===c){var d=this.viewer.world.getItemAt(0);return d.viewportToImageZoom(b)}}var e=this._contentSizeNoRotate.x;var f=this._containerInnerSize.x;var g=this._contentBoundsNoRotate.width;var h=f/e*g;return b*h},imageToViewportZoom:function(b){if(this.viewer){var c=this.viewer.world.getItemCount();if(c>1)a.console.error("[Viewport.imageToViewportZoom] is not accurate with multi-image.");else if(1===c){var d=this.viewer.world.getItemAt(0);return d.imageToViewportZoom(b)}}var e=this._contentSizeNoRotate.x;var f=this._containerInnerSize.x;var g=this._contentBoundsNoRotate.width;var h=e/f/g;return b*h}}}(OpenSeadragon);!function(a){function b(b){b._needsDraw=!1;var d,e,g,h,i,j,l,m,n=null,o=!1,q=a.now(),r=b.viewport.getBoundsWithMargins(!0),s=b.viewport.deltaPixelsFromPointsNoRotate(b.source.getPixelRatio(0),!0).x*b._scaleSpring.current.value,t=Math.max(b.source.minLevel,Math.floor(Math.log(b.minZoomImageRatio)/Math.log(2))),u=Math.min(Math.abs(b.source.maxLevel),Math.abs(Math.floor(Math.log(s/b.minPixelRatio)/Math.log(2))));for(;b.lastDrawn.length>0;){d=b.lastDrawn.pop();d.beingDrawn=!1}if(!b.wrapHorizontal&&!b.wrapVertical){var v=b.getClippedBounds(!0);var w=r.intersection(v);if(null===w)return;r=w}r=r.getBoundingBox();r.x-=b._xSpring.current.value;r.y-=b._ySpring.current.value;var x=r.getTopLeft();var y=r.getBottomRight();if((b.wrapHorizontal||!(y.x<0||x.x>b._worldWidthCurrent))&&(b.wrapVertical||!(y.y<0||x.y>b._worldHeightCurrent))){if(!b.wrapHorizontal){x.x=Math.max(x.x,0);y.x=Math.min(y.x,b._worldWidthCurrent)}if(!b.wrapVertical){x.y=Math.max(x.y,0);y.y=Math.min(y.y,b._worldHeightCurrent)}t=Math.min(t,u);var z;for(e=u;e>=t;e--){z=!1;g=b.viewport.deltaPixelsFromPointsNoRotate(b.source.getPixelRatio(e),!0).x*b._scaleSpring.current.value;if(!o&&g>=b.minPixelRatio||e==t){z=!0;o=!0}else if(!o)continue;h=b.viewport.deltaPixelsFromPointsNoRotate(b.source.getPixelRatio(e),!1).x*b._scaleSpring.current.value;i=b.viewport.deltaPixelsFromPointsNoRotate(b.source.getPixelRatio(Math.max(b.source.getClosestLevel(b.viewport.containerSize)-1,0)),!1).x*b._scaleSpring.current.value;j=b.immediateRender?1:i;l=Math.min(1,(g-.5)/.5);m=j/Math.abs(j-h);n=c(b,o,z,e,l,m,x,y,q,n);if(k(b.coverage,e))break}p(b,b.lastDrawn);n&&!n.context2D&&f(b,n,q)}}function c(a,b,c,e,f,g,h,i,j,k){var l,m,o,p,q,r=a.viewport.pixelFromPoint(a.viewport.getCenter());a.viewer&&a.viewer.raiseEvent("update-level",{tiledImage:a,havedrawn:b,level:e,opacity:f,visibility:g,topleft:h,bottomright:i,currenttime:j,best:k});o=a.source.getTileAtPoint(e,h.divide(a._scaleSpring.current.value));p=a.source.getTileAtPoint(e,i.divide(a._scaleSpring.current.value));q=a.source.getNumTiles(e);n(a.coverage,e);a.wrapHorizontal||(p.x=Math.min(p.x,q.x-1));a.wrapVertical||(p.y=Math.min(p.y,q.y-1));for(l=o.x;l<=p.x;l++)for(m=o.y;m<=p.y;m++)k=d(a,c,b,l,m,e,f,g,r,q,j,k);return k}function d(a,b,c,d,f,g,k,n,p,q,r,s){var t=e(d,f,g,a.source,a.tilesMatrix,r,q,a._worldWidthCurrent,a._worldHeightCurrent),u=b;a.viewer&&a.viewer.raiseEvent("update-tile",{tiledImage:a,tile:t});m(a.coverage,g,d,f,!1);if(!t.exists)return s;c&&!u&&(l(a.coverage,g,d,f)?m(a.coverage,g,d,f,!0):u=!0);if(!u)return s;i(t,a.source.tileOverlap,a.viewport,p,n,a);if(!t.loaded)if(t.context2D)h(a,t);else{var v=a._tileCache.getImageRecord(t.url);if(v){var w=v.getImage();h(a,t,w)}}if(t.loaded){var x=j(a,t,d,f,g,k,r);x&&(a._needsDraw=!0)}else t.loading||(s=o(s,t));return s}function e(b,c,d,e,f,g,h,i,j){var k,l,m,n,o,p,q;f[d]||(f[d]={});f[d][b]||(f[d][b]={});if(!f[d][b][c]){k=(h.x+b%h.x)%h.x;l=(h.y+c%h.y)%h.y;m=e.getTileBounds(d,k,l);n=e.tileExists(d,k,l);o=e.getTileUrl(d,k,l);p=e.getContext2D?e.getContext2D(d,k,l):void 0;m.x+=(b-k)/h.x;m.y+=j/i*((c-l)/h.y);f[d][b][c]=new a.Tile(d,b,c,m,n,o,p)}q=f[d][b][c];q.lastTouchTime=g;return q}function f(a,b,c){b.loading=!0;a._imageLoader.addJob({src:b.url,crossOriginPolicy:a.crossOriginPolicy,callback:function(d,e){g(a,b,c,d,e)},abort:function(){b.loading=!1}})}function g(b,c,d,e,f){if(e)if(d<b.lastResetTime){a.console.log("Ignoring tile %s loaded before reset: %s",c,c.url);c.loading=!1}else{var g=function(){var a=Math.ceil(Math.log(b.source.getTileWidth(c.level))/Math.log(2));h(b,c,e,a)};b._midDraw?window.setTimeout(g,1):g()}else{a.console.log("Tile %s failed to load: %s - error: %s",c,c.url,f);b.viewer.raiseEvent("tile-load-failed",{tile:c,tiledImage:b,time:d,message:f});c.loading=!1;c.exists=!1}}function h(a,b,c,d){function e(){g++;return f}function f(){g--;if(0===g){b.loading=!1;b.loaded=!0;b.context2D||a._tileCache.cacheTile({image:c,tile:b,cutoff:d,tiledImage:a});a._needsDraw=!0}}var g=0;a.viewer.raiseEvent("tile-loaded",{tile:b,tiledImage:a,image:c,getCompletionCallback:e});e()()}function i(b,c,d,e,f,g){var h=b.bounds.getTopLeft();h.x*=g._scaleSpring.current.value;h.y*=g._scaleSpring.current.value;h.x+=g._xSpring.current.value;h.y+=g._ySpring.current.value;var i=b.bounds.getSize();i.x*=g._scaleSpring.current.value;i.y*=g._scaleSpring.current.value;var j=d.pixelFromPointNoRotate(h,!0),k=d.pixelFromPointNoRotate(h,!1),l=d.deltaPixelsFromPointsNoRotate(i,!0),m=d.deltaPixelsFromPointsNoRotate(i,!1),n=k.plus(m.divide(2)),o=e.distanceTo(n);c||(l=l.plus(new a.Point(1,1)));b.position=j;b.size=l;b.distance=o;b.visibility=f}function j(a,b,c,d,e,f,g){var h,i,j=1e3*a.blendTime;b.blendStart||(b.blendStart=g);h=g-b.blendStart;i=j?Math.min(1,h/j):1;a.alwaysBlend&&(i*=f);b.opacity=i;a.lastDrawn.push(b);if(1==i){m(a.coverage,e,c,d,!0);a._hasOpaqueTile=!0}else if(j>h)return!0;return!1}function k(a,b,c,d){var e,f,g,h;if(!a[b])return!1;if(void 0===c||void 0===d){e=a[b];for(g in e)if(e.hasOwnProperty(g)){f=e[g];for(h in f)if(f.hasOwnProperty(h)&&!f[h])return!1}return!0}return void 0===a[b][c]||void 0===a[b][c][d]||a[b][c][d]===!0}function l(a,b,c,d){return void 0===c||void 0===d?k(a,b+1):k(a,b+1,2*c,2*d)&&k(a,b+1,2*c,2*d+1)&&k(a,b+1,2*c+1,2*d)&&k(a,b+1,2*c+1,2*d+1)}function m(b,c,d,e,f){if(b[c]){b[c][d]||(b[c][d]={});b[c][d][e]=f}else a.console.warn("Setting coverage for a tile before its level's coverage has been reset: %s",c)}function n(a,b){a[b]={}}function o(a,b){return a?b.visibility>a.visibility?b:b.visibility==a.visibility&&b.distance<a.distance?b:a:b}function p(b,c){if(0!==c.length){var d=c[0];var e=b.opacity<1||b.compositeOperation&&"source-over"!==b.compositeOperation||!b._isBottomItem()&&d._hasTransparencyChannel();var f;var g;var h=b.viewport.getZoom(!0);var i=b.viewportToImageZoom(h);if(i>b.smoothTileEdgesMinZoom&&!b.iOSDevice){e=!0;f=d.getScaleForEdgeSmoothing();g=d.getTranslationForEdgeSmoothing(f,b._drawer.getCanvasSize(!1),b._drawer.getCanvasSize(!0))}var j;if(e){f||(j=b.viewport.viewportToViewerElementRectangle(b.getClippedBounds(!0)).getIntegerBoundingBox().times(a.pixelDensityRatio));b._drawer._clear(!0,j)}0===b.viewport.degrees||f||b._drawer._offsetForRotation(b.viewport.degrees,e);var k=!1;if(b._clip){b._drawer.saveContext(e);var l=b.imageToViewportRectangle(b._clip,!0);var m=b._drawer.viewportToDrawerRectangle(l);f&&(m=m.times(f));g&&(m=m.translate(g));b._drawer.setClip(m,e);k=!0}if(b.placeholderFillStyle&&b._hasOpaqueTile===!1){var n=b._drawer.viewportToDrawerRectangle(b.getBounds(!0));f&&(n=n.times(f));g&&(n=n.translate(g));var o=null;o="function"==typeof b.placeholderFillStyle?b.placeholderFillStyle(b,b._drawer.context):b.placeholderFillStyle;b._drawer.drawRectangle(n,o,e)}for(var p=c.length-1;p>=0;p--){d=c[p];b._drawer.drawTile(d,b._drawingHandler,e,f,g);d.beingDrawn=!0;b.viewer&&b.viewer.raiseEvent("tile-drawn",{tiledImage:b,tile:d})}k&&b._drawer.restoreContext(e);0===b.viewport.degrees||f||b._drawer._restoreRotationChanges(e);if(e){var r=0!==b.viewport.degrees&&f;r&&b._drawer._offsetForRotation(b.viewport.degrees,!1);b._drawer.blendSketch({opacity:b.opacity,scale:f,translate:g,compositeOperation:b.compositeOperation,bounds:j});r&&b._drawer._restoreRotationChanges(!1)}q(b,c)}}function q(b,c){if(b.debugMode)for(var d=c.length-1;d>=0;d--){var e=c[d];try{b._drawer.drawDebugInfo(e,c.length,d)}catch(f){a.console.error(f)}}}a.TiledImage=function(b){var c=this;a.console.assert(b.tileCache,"[TiledImage] options.tileCache is required");a.console.assert(b.drawer,"[TiledImage] options.drawer is required");a.console.assert(b.viewer,"[TiledImage] options.viewer is required");a.console.assert(b.imageLoader,"[TiledImage] options.imageLoader is required");a.console.assert(b.source,"[TiledImage] options.source is required");a.console.assert(!b.clip||b.clip instanceof a.Rect,"[TiledImage] options.clip must be an OpenSeadragon.Rect if present");a.EventSource.call(this);this._tileCache=b.tileCache;delete b.tileCache;this._drawer=b.drawer;delete b.drawer;this._imageLoader=b.imageLoader;delete b.imageLoader;b.clip instanceof a.Rect&&(this._clip=b.clip.clone());delete b.clip;var d=b.x||0;delete b.x;var e=b.y||0;delete b.y;this.normHeight=b.source.dimensions.y/b.source.dimensions.x;this.contentAspectX=b.source.dimensions.x/b.source.dimensions.y;var f=1;if(b.width){f=b.width;delete b.width;if(b.height){a.console.error("specifying both width and height to a tiledImage is not supported");delete b.height}}else if(b.height){f=b.height/this.normHeight;delete b.height}var g=b.fitBounds;delete b.fitBounds;var h=b.fitBoundsPlacement||OpenSeadragon.Placement.CENTER;delete b.fitBoundsPlacement;a.extend(!0,this,{viewer:null,tilesMatrix:{},coverage:{},lastDrawn:[],lastResetTime:0,_midDraw:!1,_needsDraw:!0,_hasOpaqueTile:!1,springStiffness:a.DEFAULT_SETTINGS.springStiffness,animationTime:a.DEFAULT_SETTINGS.animationTime,minZoomImageRatio:a.DEFAULT_SETTINGS.minZoomImageRatio,wrapHorizontal:a.DEFAULT_SETTINGS.wrapHorizontal,wrapVertical:a.DEFAULT_SETTINGS.wrapVertical,immediateRender:a.DEFAULT_SETTINGS.immediateRender,blendTime:a.DEFAULT_SETTINGS.blendTime,alwaysBlend:a.DEFAULT_SETTINGS.alwaysBlend,minPixelRatio:a.DEFAULT_SETTINGS.minPixelRatio,smoothTileEdgesMinZoom:a.DEFAULT_SETTINGS.smoothTileEdgesMinZoom,iOSDevice:a.DEFAULT_SETTINGS.iOSDevice,debugMode:a.DEFAULT_SETTINGS.debugMode,crossOriginPolicy:a.DEFAULT_SETTINGS.crossOriginPolicy,placeholderFillStyle:a.DEFAULT_SETTINGS.placeholderFillStyle,opacity:a.DEFAULT_SETTINGS.opacity,compositeOperation:a.DEFAULT_SETTINGS.compositeOperation},b);this._xSpring=new a.Spring({initial:d,springStiffness:this.springStiffness,animationTime:this.animationTime});this._ySpring=new a.Spring({initial:e,springStiffness:this.springStiffness,animationTime:this.animationTime});this._scaleSpring=new a.Spring({initial:f,springStiffness:this.springStiffness,animationTime:this.animationTime});this._updateForScale();g&&this.fitBounds(g,h,!0);this._drawingHandler=function(b){c.viewer.raiseEvent("tile-drawing",a.extend({tiledImage:c},b))}};a.extend(a.TiledImage.prototype,a.EventSource.prototype,{needsDraw:function(){return this._needsDraw},reset:function(){this._tileCache.clearTilesFor(this);this.lastResetTime=a.now();
this._needsDraw=!0},update:function(){var a=this._xSpring.current.value;var b=this._ySpring.current.value;var c=this._scaleSpring.current.value;this._xSpring.update();this._ySpring.update();this._scaleSpring.update();if(this._xSpring.current.value!==a||this._ySpring.current.value!==b||this._scaleSpring.current.value!==c){this._updateForScale();this._needsDraw=!0;return!0}return!1},draw:function(){if(0!==this.opacity){this._midDraw=!0;b(this);this._midDraw=!1}},destroy:function(){this.reset()},getBounds:function(b){return b?new a.Rect(this._xSpring.current.value,this._ySpring.current.value,this._worldWidthCurrent,this._worldHeightCurrent):new a.Rect(this._xSpring.target.value,this._ySpring.target.value,this._worldWidthTarget,this._worldHeightTarget)},getWorldBounds:function(){a.console.error("[TiledImage.getWorldBounds] is deprecated; use TiledImage.getBounds instead");return this.getBounds()},getClippedBounds:function(b){var c=this.getBounds(b);if(this._clip){var d=this._worldWidthCurrent/this.source.dimensions.x;var e=this._clip.times(d);c=new a.Rect(c.x+e.x,c.y+e.y,e.width,e.height)}return c},getContentSize:function(){return new a.Point(this.source.dimensions.x,this.source.dimensions.y)},_viewportToImageDelta:function(b,c,d){var e=d?this._scaleSpring.current.value:this._scaleSpring.target.value;return new a.Point(b*(this.source.dimensions.x/e),c*(this.source.dimensions.y*this.contentAspectX/e))},viewportToImageCoordinates:function(b,c,d){if(b instanceof a.Point){d=c;c=b.y;b=b.x}return d?this._viewportToImageDelta(b-this._xSpring.current.value,c-this._ySpring.current.value):this._viewportToImageDelta(b-this._xSpring.target.value,c-this._ySpring.target.value)},_imageToViewportDelta:function(b,c,d){var e=d?this._scaleSpring.current.value:this._scaleSpring.target.value;return new a.Point(b/this.source.dimensions.x*e,c/this.source.dimensions.y/this.contentAspectX*e)},imageToViewportCoordinates:function(b,c,d){if(b instanceof a.Point){d=c;c=b.y;b=b.x}var e=this._imageToViewportDelta(b,c);if(d){e.x+=this._xSpring.current.value;e.y+=this._ySpring.current.value}else{e.x+=this._xSpring.target.value;e.y+=this._ySpring.target.value}return e},imageToViewportRectangle:function(b,c,d,e,f){var g=b;g instanceof a.Rect?f=c:g=new a.Rect(b,c,d,e);var h=this.imageToViewportCoordinates(g.getTopLeft(),f);var i=this._imageToViewportDelta(g.width,g.height,f);return new a.Rect(h.x,h.y,i.x,i.y,g.degrees)},viewportToImageRectangle:function(b,c,d,e,f){var g=b;b instanceof a.Rect?f=c:g=new a.Rect(b,c,d,e);var h=this.viewportToImageCoordinates(g.getTopLeft(),f);var i=this._viewportToImageDelta(g.width,g.height,f);return new a.Rect(h.x,h.y,i.x,i.y,g.degrees)},viewerElementToImageCoordinates:function(a){var b=this.viewport.pointFromPixel(a,!0);return this.viewportToImageCoordinates(b)},imageToViewerElementCoordinates:function(a){var b=this.imageToViewportCoordinates(a);return this.viewport.pixelFromPoint(b,!0)},windowToImageCoordinates:function(a){var b=a.minus(OpenSeadragon.getElementPosition(this.viewer.element));return this.viewerElementToImageCoordinates(b)},imageToWindowCoordinates:function(a){var b=this.imageToViewerElementCoordinates(a);return b.plus(OpenSeadragon.getElementPosition(this.viewer.element))},viewportToImageZoom:function(a){var b=this._scaleSpring.current.value*this.viewport._containerInnerSize.x/this.source.dimensions.x;return b*a},imageToViewportZoom:function(a){var b=this._scaleSpring.current.value*this.viewport._containerInnerSize.x/this.source.dimensions.x;return a/b},setPosition:function(a,b){var c=this._xSpring.target.value===a.x&&this._ySpring.target.value===a.y;if(b){if(c&&this._xSpring.current.value===a.x&&this._ySpring.current.value===a.y)return;this._xSpring.resetTo(a.x);this._ySpring.resetTo(a.y);this._needsDraw=!0}else{if(c)return;this._xSpring.springTo(a.x);this._ySpring.springTo(a.y);this._needsDraw=!0}c||this._raiseBoundsChange()},setWidth:function(a,b){this._setScale(a,b)},setHeight:function(a,b){this._setScale(a/this.normHeight,b)},fitBounds:function(b,c,d){c=c||a.Placement.CENTER;var e=a.Placement.properties[c];var f=this.contentAspectX;var g=0;var h=0;var i=1;var j=1;if(this._clip){f=this._clip.getAspectRatio();i=this._clip.width/this.source.dimensions.x;j=this._clip.height/this.source.dimensions.y;if(b.getAspectRatio()>f){g=this._clip.x/this._clip.height*b.height;h=this._clip.y/this._clip.height*b.height}else{g=this._clip.x/this._clip.width*b.width;h=this._clip.y/this._clip.width*b.width}}if(b.getAspectRatio()>f){var k=b.height/j;var l=0;e.isHorizontallyCentered?l=(b.width-b.height*f)/2:e.isRight&&(l=b.width-b.height*f);this.setPosition(new a.Point(b.x-g+l,b.y-h),d);this.setHeight(k,d)}else{var m=b.width/i;var n=0;e.isVerticallyCentered?n=(b.height-b.width/f)/2:e.isBottom&&(n=b.height-b.width/f);this.setPosition(new a.Point(b.x-g,b.y-h+n),d);this.setWidth(m,d)}},getClip:function(){return this._clip?this._clip.clone():null},setClip:function(b){a.console.assert(!b||b instanceof a.Rect,"[TiledImage.setClip] newClip must be an OpenSeadragon.Rect or null");b instanceof a.Rect?this._clip=b.clone():this._clip=null;this._needsDraw=!0},getOpacity:function(){return this.opacity},setOpacity:function(a){this.opacity=a;this._needsDraw=!0},getCompositeOperation:function(){return this.compositeOperation},setCompositeOperation:function(a){this.compositeOperation=a;this._needsDraw=!0},_setScale:function(a,b){var c=this._scaleSpring.target.value===a;if(b){if(c&&this._scaleSpring.current.value===a)return;this._scaleSpring.resetTo(a);this._updateForScale();this._needsDraw=!0}else{if(c)return;this._scaleSpring.springTo(a);this._updateForScale();this._needsDraw=!0}c||this._raiseBoundsChange()},_updateForScale:function(){this._worldWidthTarget=this._scaleSpring.target.value;this._worldHeightTarget=this.normHeight*this._scaleSpring.target.value;this._worldWidthCurrent=this._scaleSpring.current.value;this._worldHeightCurrent=this.normHeight*this._scaleSpring.current.value},_raiseBoundsChange:function(){this.raiseEvent("bounds-change")},_isBottomItem:function(){return this.viewer.world.getItemAt(0)===this}})}(OpenSeadragon);!function(a){var b=function(b){a.console.assert(b,"[TileCache.cacheTile] options is required");a.console.assert(b.tile,"[TileCache.cacheTile] options.tile is required");a.console.assert(b.tiledImage,"[TileCache.cacheTile] options.tiledImage is required");this.tile=b.tile;this.tiledImage=b.tiledImage};var c=function(b){a.console.assert(b,"[ImageRecord] options is required");a.console.assert(b.image,"[ImageRecord] options.image is required");this._image=b.image;this._tiles=[]};c.prototype={destroy:function(){this._image=null;this._renderedContext=null;this._tiles=null},getImage:function(){return this._image},getRenderedContext:function(){if(!this._renderedContext){var a=document.createElement("canvas");a.width=this._image.width;a.height=this._image.height;this._renderedContext=a.getContext("2d");this._renderedContext.drawImage(this._image,0,0);this._image=null}return this._renderedContext},setRenderedContext:function(b){a.console.error("ImageRecord.setRenderedContext is deprecated. The rendered context should be created by the ImageRecord itself when calling ImageRecord.getRenderedContext.");this._renderedContext=b},addTile:function(b){a.console.assert(b,"[ImageRecord.addTile] tile is required");this._tiles.push(b)},removeTile:function(b){for(var c=0;c<this._tiles.length;c++)if(this._tiles[c]===b){this._tiles.splice(c,1);return}a.console.warn("[ImageRecord.removeTile] trying to remove unknown tile",b)},getTileCount:function(){return this._tiles.length}};a.TileCache=function(b){b=b||{};this._maxImageCacheCount=b.maxImageCacheCount||a.DEFAULT_SETTINGS.maxImageCacheCount;this._tilesLoaded=[];this._imagesLoaded=[];this._imagesLoadedCount=0};a.TileCache.prototype={numTilesLoaded:function(){return this._tilesLoaded.length},cacheTile:function(d){a.console.assert(d,"[TileCache.cacheTile] options is required");a.console.assert(d.tile,"[TileCache.cacheTile] options.tile is required");a.console.assert(d.tile.url,"[TileCache.cacheTile] options.tile.url is required");a.console.assert(d.tiledImage,"[TileCache.cacheTile] options.tiledImage is required");var e=d.cutoff||0;var f=this._tilesLoaded.length;var g=this._imagesLoaded[d.tile.url];if(!g){a.console.assert(d.image,"[TileCache.cacheTile] options.image is required to create an ImageRecord");g=this._imagesLoaded[d.tile.url]=new c({image:d.image});this._imagesLoadedCount++}g.addTile(d.tile);d.tile.cacheImageRecord=g;if(this._imagesLoadedCount>this._maxImageCacheCount){var h=null;var i=-1;var j=null;var k,l,m,n,o,p;for(var q=this._tilesLoaded.length-1;q>=0;q--){p=this._tilesLoaded[q];k=p.tile;if(!(k.level<=e||k.beingDrawn))if(h){n=k.lastTouchTime;l=h.lastTouchTime;o=k.level;m=h.level;if(l>n||n==l&&o>m){h=k;i=q;j=p}}else{h=k;i=q;j=p}}if(h&&i>=0){this._unloadTile(j);f=i}}this._tilesLoaded[f]=new b({tile:d.tile,tiledImage:d.tiledImage})},clearTilesFor:function(b){a.console.assert(b,"[TileCache.clearTilesFor] tiledImage is required");var c;for(var d=0;d<this._tilesLoaded.length;++d){c=this._tilesLoaded[d];if(c.tiledImage===b){this._unloadTile(c);this._tilesLoaded.splice(d,1);d--}}},getImageRecord:function(b){a.console.assert(b,"[TileCache.getImageRecord] url is required");return this._imagesLoaded[b]},_unloadTile:function(b){a.console.assert(b,"[TileCache._unloadTile] tileRecord is required");var c=b.tile;var d=b.tiledImage;c.unload();c.cacheImageRecord=null;var e=this._imagesLoaded[c.url];e.removeTile(c);if(!e.getTileCount()){e.destroy();delete this._imagesLoaded[c.url];this._imagesLoadedCount--}d.viewer.raiseEvent("tile-unloaded",{tile:c,tiledImage:d})}}}(OpenSeadragon);!function(a){a.World=function(b){var c=this;a.console.assert(b.viewer,"[World] options.viewer is required");a.EventSource.call(this);this.viewer=b.viewer;this._items=[];this._needsDraw=!1;this._autoRefigureSizes=!0;this._needsSizesFigured=!1;this._delegatedFigureSizes=function(a){c._autoRefigureSizes?c._figureSizes():c._needsSizesFigured=!0};this._figureSizes()};a.extend(a.World.prototype,a.EventSource.prototype,{addItem:function(b,c){a.console.assert(b,"[World.addItem] item is required");a.console.assert(b instanceof a.TiledImage,"[World.addItem] only TiledImages supported at this time");c=c||{};if(void 0!==c.index){var d=Math.max(0,Math.min(this._items.length,c.index));this._items.splice(d,0,b)}else this._items.push(b);this._autoRefigureSizes?this._figureSizes():this._needsSizesFigured=!0;this._needsDraw=!0;b.addHandler("bounds-change",this._delegatedFigureSizes);this.raiseEvent("add-item",{item:b})},getItemAt:function(b){a.console.assert(void 0!==b,"[World.getItemAt] index is required");return this._items[b]},getIndexOfItem:function(b){a.console.assert(b,"[World.getIndexOfItem] item is required");return a.indexOf(this._items,b)},getItemCount:function(){return this._items.length},setItemIndex:function(b,c){a.console.assert(b,"[World.setItemIndex] item is required");a.console.assert(void 0!==c,"[World.setItemIndex] index is required");var d=this.getIndexOfItem(b);if(c>=this._items.length)throw new Error("Index bigger than number of layers.");if(c!==d&&-1!==d){this._items.splice(d,1);this._items.splice(c,0,b);this._needsDraw=!0;this.raiseEvent("item-index-change",{item:b,previousIndex:d,newIndex:c})}},removeItem:function(b){a.console.assert(b,"[World.removeItem] item is required");var c=a.indexOf(this._items,b);if(-1!==c){b.removeHandler("bounds-change",this._delegatedFigureSizes);b.destroy();this._items.splice(c,1);this._figureSizes();this._needsDraw=!0;this._raiseRemoveItem(b)}},removeAll:function(){this.viewer._cancelPendingImages();var a;for(var b=0;b<this._items.length;b++){a=this._items[b];a.removeHandler("bounds-change",this._delegatedFigureSizes);a.destroy()}var c=this._items;this._items=[];this._figureSizes();this._needsDraw=!0;for(b=0;b<c.length;b++){a=c[b];this._raiseRemoveItem(a)}},resetItems:function(){for(var a=0;a<this._items.length;a++)this._items[a].reset()},update:function(){var a=!1;for(var b=0;b<this._items.length;b++)a=this._items[b].update()||a;return a},draw:function(){for(var a=0;a<this._items.length;a++)this._items[a].draw();this._needsDraw=!1},needsDraw:function(){for(var a=0;a<this._items.length;a++)if(this._items[a].needsDraw())return!0;return this._needsDraw},getHomeBounds:function(){return this._homeBounds.clone()},getContentFactor:function(){return this._contentFactor},setAutoRefigureSizes:function(a){this._autoRefigureSizes=a;if(a&this._needsSizesFigured){this._figureSizes();this._needsSizesFigured=!1}},arrange:function(b){b=b||{};var c=b.immediately||!1;var d=b.layout||a.DEFAULT_SETTINGS.collectionLayout;var e=b.rows||a.DEFAULT_SETTINGS.collectionRows;var f=b.columns||a.DEFAULT_SETTINGS.collectionColumns;var g=b.tileSize||a.DEFAULT_SETTINGS.collectionTileSize;var h=b.tileMargin||a.DEFAULT_SETTINGS.collectionTileMargin;var i=g+h;var j;j=!b.rows&&f?f:Math.ceil(this._items.length/e);var k=0;var l=0;var m,n,o,p,q;this.setAutoRefigureSizes(!1);for(var r=0;r<this._items.length;r++){if(r&&r%j===0)if("horizontal"===d){l+=i;k=0}else{k+=i;l=0}m=this._items[r];n=m.getBounds();o=n.width>n.height?g:g*(n.width/n.height);p=o*(n.height/n.width);q=new a.Point(k+(g-o)/2,l+(g-p)/2);m.setPosition(q,c);m.setWidth(o,c);"horizontal"===d?k+=i:l+=i}this.setAutoRefigureSizes(!0)},_figureSizes:function(){var b=this._homeBounds?this._homeBounds.clone():null;var c=this._contentSize?this._contentSize.clone():null;var d=this._contentFactor||0;if(this._items.length){var e=this._items[0];var f=e.getBounds();this._contentFactor=e.getContentSize().x/f.width;var g=e.getClippedBounds();var h=g.x;var i=g.y;var j=g.x+g.width;var k=g.y+g.height;for(var l=1;l<this._items.length;l++){e=this._items[l];f=e.getBounds();this._contentFactor=Math.max(this._contentFactor,e.getContentSize().x/f.width);g=e.getClippedBounds();h=Math.min(h,g.x);i=Math.min(i,g.y);j=Math.max(j,g.x+g.width);k=Math.max(k,g.y+g.height)}this._homeBounds=new a.Rect(h,i,j-h,k-i);this._contentSize=new a.Point(this._homeBounds.width*this._contentFactor,this._homeBounds.height*this._contentFactor)}else{this._homeBounds=new a.Rect(0,0,1,1);this._contentSize=new a.Point(1,1);this._contentFactor=1}this._contentFactor===d&&this._homeBounds.equals(b)&&this._contentSize.equals(c)||this.raiseEvent("metrics-change",{})},_raiseRemoveItem:function(a){this.raiseEvent("remove-item",{item:a})}})}(OpenSeadragon);
//# sourceMappingURL=openseadragon.min.js.map
;
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



// Required by Blacklight



// i'm overwriting blacklight/autocomplete.js because there is a bug where it is re-initializing multiple times





$(document).ready(function () {

  // switch image/iiif viewer on thumbnail click on item page
  $('.preview-thumbnail').click(function (event) {
    var src = $(this).data('src')
    var iiif = $(this).data('iiif')

    if (iiif){
    	$('#openseadragon').css('display','block')
    	$('#main-image-link').css('display','none')
    }else{
    	$('#main-image-link').css('display','block')
    	$('#openseadragon').css('display','none')
      $('#main-image-link').attr('href',$(this).attr('href'))
    }
    $('#main-image').attr('src', src)
    $('#main-image-label').html('<i>' + $(this).data('label') + '</i>')

    event.preventDefault()
    return false
  })

  // init opensea dragon
  if (window.iiifData){
    var viewer = OpenSeadragon({
        id: "openseadragon",
        prefixUrl: '/assets/openseadragon/',
	    sequenceMode: true,
	    tileSources: [iiifData]
    });
  }


  // in the search results page if the image oculd not load it hide it
  $(".document-thumbnail.col-md-3 img")
      .on('error', function() { $(this).toggle(); })


})
;
