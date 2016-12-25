/* global THREE
 *
 *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
 *	@author centerionware / http://www.centerionware.com
 *
 *	Subdivision Geometry Modifier
 *		using Loop Subdivision Scheme
 *
 *	References:
 *		http://graphics.stanford.edu/~mdfisher/subdivision.html
 *		http://www.holmes3d.net/graphics/subdivision/
 *		http://www.cs.rutgers.edu/~decarlo/readings/subdiv-sg00c.pdf
 *
 *	Known Issues:
 *		- currently doesn't handle "Sharp Edges"
 */

THREE.SubdivisionModifier = function ( subdivisions ) {

  this.subdivisions = ( subdivisions === undefined ) ? 1 : subdivisions;

};

// Applies the "modify" pattern
THREE.SubdivisionModifier.prototype.modify = function ( geometry ) {

  var repeats = this.subdivisions;

  while ( repeats -- > 0 ) {

    this.smooth( geometry );

  }

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

};

( function() {

  // Some constants
  var WARNINGS = ! true; // Set to true for development
  var ABC = [ 'a', 'b', 'c' ];


  function getEdge( a, b, map ) {

    var vertexIndexA = Math.min( a, b );
    var vertexIndexB = Math.max( a, b );

    var key = vertexIndexA + "_" + vertexIndexB;

    return map[ key ];

  }


  function processEdge( a, b, vertices, map, face, metaVertices ) {

    var vertexIndexA = Math.min( a, b );
    var vertexIndexB = Math.max( a, b );

    var key = vertexIndexA + "_" + vertexIndexB;

    var edge;

    if ( key in map ) {

      edge = map[ key ];

    } else {

      var vertexA = vertices[ vertexIndexA ];
      var vertexB = vertices[ vertexIndexB ];

      edge = {

	a: vertexA, // pointer reference
	b: vertexB,
	newEdge: null,
	// aIndex: a, // numbered reference
	// bIndex: b,
	faces: [] // pointers to face

      };

      map[ key ] = edge;

    }

    edge.faces.push( face );

    metaVertices[ a ].edges.push( edge );
    metaVertices[ b ].edges.push( edge );


  }

  function generateLookups( vertices, faces, metaVertices, edges ) {

    var i, il, face, edge;

    for ( i = 0, il = vertices.length; i < il; i ++ ) {

      metaVertices[ i ] = { edges: [] };

    }

    for ( i = 0, il = faces.length; i < il; i ++ ) {

      face = faces[ i ];

      processEdge( face.a, face.b, vertices, edges, face, metaVertices );
      processEdge( face.b, face.c, vertices, edges, face, metaVertices );
      processEdge( face.c, face.a, vertices, edges, face, metaVertices );

    }

  }

  function newFace( newFaces, a, b, c ) {

    newFaces.push( new THREE.Face3( a, b, c ) );

  }

  function midpoint( a, b ) {

    return ( Math.abs( b - a ) / 2 ) + Math.min( a, b );

  }

  function newUv( newUvs, a, b, c ) {

    newUvs.push( [ a.clone(), b.clone(), c.clone() ] );

  }

  /////////////////////////////

  // Performs one iteration of Subdivision
  THREE.SubdivisionModifier.prototype.smooth = function ( geometry ) {

    var tmp = new THREE.Vector3();

    var oldVertices, oldFaces, oldUvs;
    var newVertices, newFaces, newUVs = [];

    var n, l, i, il, j, k;
    var metaVertices;

    // new stuff.
    var sourceEdges, newEdgeVertices;

    oldVertices = geometry.vertices; // { x, y, z}
    oldFaces = geometry.faces; // { a: oldVertex1, b: oldVertex2, c: oldVertex3 }
    oldUvs = geometry.faceVertexUvs[ 0 ];

    var hasUvs = oldUvs !== undefined && oldUvs.length > 0;

    /******************************************************
     *
     * Step 0: Preprocess Geometry to Generate edges Lookup
     *
     *******************************************************/

    metaVertices = new Array( oldVertices.length );
    sourceEdges = {}; // Edge => { oldVertex1, oldVertex2, faces[]  }

    generateLookups( oldVertices, oldFaces, metaVertices, sourceEdges );


    /******************************************************
     *
     *	Step 1.
     *	For each edge, create a new Edge Vertex,
     *	then position it.
     *
     *******************************************************/

    newEdgeVertices = [];
    var maxEdgeSq = this.maxEdgeLength * this.maxEdgeLength;
    for (i in sourceEdges) {
      var currentEdge = sourceEdges[i];
      if (currentEdge.a.distanceToSquared(currentEdge.b) < this.maxEdgeSq) {
        continue;
      }

      var newVertex = new THREE.Vector3();
      var edgeVertexWeight = .5;
      newVertex.addVectors(currentEdge.a, currentEdge.b)
        .multiplyScalar(edgeVertexWeight);

      currentEdge.newEdge = newEdgeVertices.length;
      newEdgeVertices.push(newVertex);
    }

    /******************************************************
     *
     *	Step 2.
     *	Reposition each source vertices.
     *
     *******************************************************/
    var beta;
    var sourceVertexWeight = .5;
    var connectingVertexWeight = .5;
    var connectingEdge, connectingEdges;
    var newSourceVertices = [];
    for (i = 0; i < oldVertices.length; i++) {
      var oldVertex = oldVertices[i];
      newSourceVertices.push(oldVertex);
    }


    /******************************************************
     *
     *	Step 3.
     *	Generate Faces between source vertices
     *	and edge vertices.
     *
     *******************************************************/
    newVertices = newSourceVertices.concat(newEdgeVertices);
    var sl = newSourceVertices.length, edge1, edge2, edge3;
    newFaces = [];

    var uv, x0, x1, x2;
    var x3 = new THREE.Vector2();
    var x4 = new THREE.Vector2();
    var x5 = new THREE.Vector2();

    for ( i = 0, il = oldFaces.length; i < il; i ++ ) {
      var face = oldFaces[ i ];

      // find the 3 new edges vertex of each old face
      edge1 = getEdge( face.a, face.b, sourceEdges ).newEdge + sl;
      edge2 = getEdge( face.b, face.c, sourceEdges ).newEdge + sl;
      edge3 = getEdge( face.c, face.a, sourceEdges ).newEdge + sl;

      // create 4 faces.
      newFace( newFaces, edge1, edge2, edge3 );
      newFace( newFaces, face.a, edge1, edge3 );
      newFace( newFaces, face.b, edge2, edge1 );
      newFace( newFaces, face.c, edge3, edge2 );

      // create 4 new uv's
      if ( hasUvs ) {
	uv = oldUvs[i];

	x0 = uv[ 0 ];
	x1 = uv[ 1 ];
	x2 = uv[ 2 ];

	x3.set( midpoint( x0.x, x1.x ), midpoint( x0.y, x1.y ) );
	x4.set( midpoint( x1.x, x2.x ), midpoint( x1.y, x2.y ) );
	x5.set( midpoint( x0.x, x2.x ), midpoint( x0.y, x2.y ) );

	newUv( newUVs, x3, x4, x5 );
	newUv( newUVs, x0, x3, x5 );

	newUv( newUVs, x1, x4, x3 );
	newUv( newUVs, x2, x5, x4 );
      }
    }

    // Overwrite old arrays
    geometry.vertices = newVertices;
    geometry.faces = newFaces;
    if (hasUvs) {
      geometry.faceVertexUvs[ 0 ] = newUVs;
    }
  };
} )();
