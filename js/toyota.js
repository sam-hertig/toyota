let scene;
let camera;
let renderer;

let spine;
const spheres = [];
let rod;

let progress;
const progressSpeed = 2;
const maxProgress = 100;

(function run() {
	createEssentials();
	createSpine();
	createSpheres();
	createRod();
	initScrolling();
	animate();
})();

function createEssentials() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.z = 10;

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xffffff);
	document.body.appendChild(renderer.domElement);

	const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
	scene.add(ambLight);

	const pointLight = new THREE.PointLight(0xffffff, 0.4);
	pointLight.position.z = 10;
	pointLight.position.y = 10;
	pointLight.position.x = -10;
	scene.add(pointLight);
}

function createSpine() {
	const geometry = new THREE.BoxGeometry(5, 1, 1);
	const material = new THREE.MeshLambertMaterial({color: 0xcccccc});
	spine = new THREE.Mesh(geometry, material);
	spine.rotation.x = -3;
	spine.rotation.y = -0.7;
	spine.rotation.z = -0.1;
	scene.add(spine);
}

function createSpheres() {
	for (let i = 0; i < 4; i++) {
		const geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
		const material = new THREE.MeshPhongMaterial({color: 0xffff00});
		const sphere = new THREE.Mesh(geometry, material);
		sphere.visible = false;
		sphere.position.x = -3 + 3*i/2;
		sphere.position.y = -1.7 + 0.3*i;
		sphere.position.z = -2 * 4*Math.random();
		scene.add(sphere);
		spheres.push(sphere);
	}
}

function createRod() {
	const material = new THREE.MeshLambertMaterial({color: 0x4444ff, transparent: true, opacity: 0});
	const curve = new THREE.CatmullRomCurve3(spheres.map(s => s.position));
	const geometry = new THREE.TubeGeometry(curve, 128, 0.1, 32, false);
	rod = new THREE.Mesh(geometry, material);
	spheres.forEach(s => {
		scene.remove(s);
		rod.add(s);
	});
	scene.add(rod);
}

function initScrolling() {
	progress = 0;
	window.addEventListener("wheel", event => {
		event.preventDefault();
		const delta = Math.sign(event.deltaY);
		progress += delta * progressSpeed;
		progress = progress < 0 ? 0 : progress;
		progress = progress > maxProgress ? maxProgress : progress;
		console.info(progress);
	});
}

function animate() {
	requestAnimationFrame( animate );
	update();
	renderer.render( scene, camera );
}

function update() {
	updateSpine();
	updateSpheres();
	updateRod();
	updateCamera();
}

function updateSpine() {
	spine.position.y = Math.min(-7 + progress/4, -2);
}

function updateSpheres() {
	spheres.forEach((s, i) => s.visible = (5*i) + 25 < progress);
}

function updateRod() {
	let value = progress > 50 ? 0.05*(progress - 50) : 0;
	value = Math.min(value, 1);
	rod.material.opacity = value;
	rod.position.y = progress > 70 ? 0.15*(progress - 70) : 0;
}

function updateCamera() {
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	//continue here...
}



