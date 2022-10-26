import * as THREE from "three";
import { Vector3 } from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import spaceBackground from '../img/Background.jpeg';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';


var height = window.innerHeight;
var width = window.innerWidth;

const starUrl = new URL('../assets/gold_star.glb', import.meta.url);
//the planets are accurate in size, and the distance is meant to appear similar to how they would normally, to prevent the last two planets from being hard to find i did bring them closer to the other planets.

//renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width,height);
renderer.shadowMap = true;

document.body.appendChild(renderer.domElement);

const texureLoader = new THREE.TextureLoader();
const background = texureLoader.load(spaceBackground);



//Scene
const scene = new THREE.Scene();
scene.background = background;

//camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,.1,1000);
camera.updateProjectionMatrix();

//ORBIT
const orbit = new OrbitControls(camera, renderer.domElement);


//camera and orbit
camera.position.set(-10,30,30);
orbit.update();

//light

const assetLoader = new GLTFLoader();
assetLoader.load(
    starUrl.href,
    function(gltf){
        const model = gltf.scene;
        scene.add(model);
        model.position.set(-12,4,10);
        model.scale.set(4,4,4);
    },
    undefined,
    function(error){
        console.error(error);
    }
);




const axisVector = new THREE.Vector3(1,0,0);

//Sun
const sunGeo = new THREE.SphereGeometry(5, 30,30);
const sunMat = new THREE.MeshStandardMaterial({color: 0xFFFF00});
const sun = new THREE.Mesh(sunGeo,sunMat);
sun.position.y = -10;
scene.add(sun);
//Mercury
const mercGeo = new THREE.SphereGeometry(.15,20,20);
const merMat = new THREE.MeshStandardMaterial({color: 0x808080});
const mercury = new THREE.Mesh(mercGeo, merMat);
mercury.position.set(sun.position.x+6.75,sun.position.y,sun.position.z);
mercury.castShadow = true;
const mercObj = new THREE.Object3D();
mercObj.add(mercury);
scene.add(mercObj);
//Venus
const venGeo = new THREE.SphereGeometry(.37,20,20);
const venMat = new THREE.MeshStandardMaterial({color: 0xFFC649});
const venus = new THREE.Mesh(venGeo, venMat);
venus.position.set(sun.position.x+8.35,sun.position.y,sun.position.z);
venus.castShadow = true;
venus.rotateOnAxis(axisVector, 3);
const venObj = new THREE.Object3D();
venObj.add(venus);
scene.add(venObj);
//Earth
const earthGeo = new THREE.SphereGeometry(.39,20,20);
const earthMat = new THREE.MeshStandardMaterial({color: 0x006994});
const earth = new THREE.Mesh(earthGeo, earthMat);
earth.position.set(sun.position.x+9.65,sun.position.y,sun.position.z);
earth.castShadow = true;
earth.rotateOnAxis(axisVector, .4);
const earthObj = new THREE.Object3D();
earthObj.add(earth);
scene.add(earthObj);
//Mars
const marsGeo = new THREE.SphereGeometry(.21,20,20);
const marsMat = new THREE.MeshStandardMaterial({color: 0xa1251b});
const mars = new THREE.Mesh(marsGeo, marsMat);
mars.position.set(sun.position.x+12.1,sun.position.y,sun.position.z);
mars.castShadow = true;
mars.rotateOnAxis(axisVector, .43);
const marsObj = new THREE.Object3D();
marsObj.add(mars);
scene.add(marsObj);
//Jupiter
const jupGeo = new THREE.SphereGeometry(4.3,20,20);
const jupMat = new THREE.MeshStandardMaterial({color: 0xFFA500});
const jupiter = new THREE.Mesh(jupGeo, jupMat);
jupiter.position.set(sun.position.x+29.2,sun.position.y,sun.position.z);
jupiter.castShadow = true;
const jupObj = new THREE.Object3D();
jupObj.add(jupiter);
scene.add(jupObj);
//Saturn
const satGeo = new THREE.SphereGeometry(3.6,20,20);
const satMat = new THREE.MeshStandardMaterial({color: 0xF9E4B7});
const saturn = new THREE.Mesh(satGeo, satMat);
saturn.position.set(sun.position.x+49.45,sun.position.y,sun.position.z);
saturn.castShadow = true;
saturn.rotateOnAxis(axisVector, .47);
const satObj = new THREE.Object3D();
satObj.add(saturn);
scene.add(satObj);
//Uranus
const urnGeo = new THREE.SphereGeometry(.15,20,20);
const urnMat = new THREE.MeshStandardMaterial({color: 0x4FD0E7});
const uranus = new THREE.Mesh(urnGeo, urnMat);
uranus.position.set(sun.position.x+55,sun.position.y,sun.position.z);
uranus.castShadow = true;
uranus.rotateOnAxis(axisVector, 1.7);
const urnObj = new THREE.Object3D();
urnObj.add(uranus);
scene.add(urnObj);
//Neptune
const nepGeo = new THREE.SphereGeometry(.15,20,20);
const nepMat = new THREE.MeshStandardMaterial({color: 0x4b70dd});
const neptune = new THREE.Mesh(nepGeo, nepMat);
neptune.position.set(sun.position.x+60,sun.position.y,sun.position.z);
neptune.castShadow = true;
neptune.rotateOnAxis(axisVector, .52);
const nepObj = new THREE.Object3D();
nepObj.add(neptune);
scene.add(nepObj);


const ambLight = new THREE.AmbientLight({color: 0x708090});
const pointLight = new THREE.PointLight({color: 0xFFFF00}, 1,0,2);
scene.add(ambLight);
sun.add(pointLight);

//rings of saturn
const ring1Geo = new THREE.RingGeometry(4,5);
const ring1Mat = new THREE.MeshBasicMaterial({color: 0xFFFDD1, side: THREE.DoubleSide});
const ring1 = new THREE.Mesh(ring1Geo,ring1Mat);
ring1.rotateOnAxis(axisVector, 1.5);
saturn.add(ring1);

const ring2Geo = new THREE.RingGeometry(6,5);
const ring2Mat = new THREE.MeshBasicMaterial({color: 0xD4CAA3, side: THREE.DoubleSide});
const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
ring2.rotateOnAxis(axisVector, 1.5);
saturn.add(ring2);

const ring3Geo = new THREE.RingGeometry(6,7);
const ring3Mat = new THREE.MeshBasicMaterial({color: 0xF8F0C6, side: THREE.DoubleSide});
const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
ring3.rotateOnAxis(axisVector, 1.5);
saturn.add(ring3);

const lastZPos = sun.geometry.attributes.position.array.length-1;

const halfZPos = (sun.geometry.attributes.position.array.length-1)/2;

const moreFire = halfZPos + 30;

const moreFire2 = halfZPos + 60;

function animate(time){

    sun.rotateY(.01);
    mercObj.rotateY(.0107);
    mercury.rotateY(0.00001);
    venObj.rotateY(0.0078);
    venus.rotateY(-0.006);
    earthObj.rotateY(.0066);
    earth.rotateY(.0001);
    marsObj.rotateY(.0053);
    mars.rotateY(.00008);
    jupObj.rotateY(.0029);
    jupiter.rotateY(.0045);
    satObj.rotateY(.0021);
    saturn.rotateY(.0036);
    urnObj.rotateY(.0012);
    uranus.rotateY(-.0014);
    nepObj.rotateY(.001);
    neptune.rotateY(.009);
    sun.geometry.attributes.position.array[lastZPos] = 5 * Math.random();

    sun.geometry.attributes.position.array[halfZPos] = 5 * Math.random();

    sun.geometry.attributes.position.array[moreFire] = 5 * Math.random();

    sun.geometry.attributes.position.array[moreFire2] = 5 *Math.random();

    sun.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);
renderer.render(scene,camera);