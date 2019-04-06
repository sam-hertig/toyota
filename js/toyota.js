var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff);
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var ambLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambLight);

var pointLight = new THREE.PointLight(0xffffff, 0.4);
pointLight.position.copy(camera.position); 
scene.add(pointLight);



var animate = function () {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();

////////

window.addEventListener("wheel", event => {
	event.preventDefault()
    const delta = Math.sign(event.deltaY);
    console.info(delta);
    cube.rotation.x += 0.01*delta;
	cube.rotation.y += 0.01*delta;
});
//https://bugs.webkit.org/show_bug.cgi?id=149526

// window.addEventListener('scroll', function() {
//   document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
// });