import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { writable } from "svelte/store";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
type HoverType = {
  name: string;
  pos: number[];
};
import { hover } from "./gameStore";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

const material2 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const material4 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const material3 = new THREE.MeshNormalMaterial();

material2.side = THREE.DoubleSide;
material3.side = THREE.DoubleSide;
material4.side = THREE.DoubleSide;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let gltfLoader: GLTFLoader;
let controls: OrbitControls;
let composer: EffectComposer;
let bloomComposer: EffectComposer;
let finalComposer: EffectComposer;
const pointer = new THREE.Vector2();

// let controls: OrbitControls;
var raycaster = new THREE.Raycaster();

let prevInterSect: THREE.Mesh | null;

const render = () => {
  if (!camera || !composer) return;
  camera.updateMatrixWorld();
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length) {
    if (prevInterSect !== intersects[0].object) {
      if (prevInterSect) {
        let obj = prevInterSect as THREE.Mesh;

        let mat = new THREE.MeshStandardMaterial();
        mat.copy(obj.material as THREE.MeshStandardMaterial);
        mat.emissive = new THREE.Color("#FFFFFF");
        mat.emissiveIntensity = 0;

        prevInterSect.material = mat;
      }
      let position = new THREE.Vector3();
      position.copy(intersects[0].object.position);
      var vector = new THREE.Vector3();
      intersects[0].object.updateMatrixWorld();
      let obj = intersects[0].object as THREE.Mesh;

      let mat = new THREE.MeshStandardMaterial();
      mat.copy(obj.material as THREE.MeshStandardMaterial);
      mat.emissive = new THREE.Color("#FF00FF");
      mat.emissiveIntensity = 0.4;

      obj.material = mat;

      vector.setFromMatrixPosition(intersects[0].object.matrixWorld);
      // let vector = position.project(camera);

      vector.project(camera);
      vector.x = ((vector.x + 1) * window.innerWidth) / 2;
      vector.y = ((-vector.y + 1) * window.innerHeight) / 2;

      hover.set({ name: intersects[0].object.name, pos: [vector.x, vector.y] });

      const pos = new THREE.Vector3();
      prevInterSect = intersects[0].object as THREE.Mesh;
      prevInterSect.getWorldPosition(pos);

      document.documentElement.style.cursor = "pointer";

      //   (intersects[0].object as THREE.Mesh).material = material2;
    }
  } else {
    if (!prevInterSect) return;
    let obj = prevInterSect as THREE.Mesh;

    let mat = new THREE.MeshStandardMaterial();
    mat.copy(obj.material as THREE.MeshStandardMaterial);
    mat.emissive = new THREE.Color("#FFFFFF");
    mat.emissiveIntensity = 0;

    prevInterSect.material = mat;
    prevInterSect = null;
    hover.update((state: HoverType) => {
      state.name = "";
      state.pos = [0, 0];
      return state;
    });

    scene.traverse((child) => {
      if ((child as THREE.PointLight).isLight) {
        var pointLight: THREE.PointLight = child as THREE.PointLight;
        // pointLight.intensity = 1;
      }
    });
    // if (prevInterSect) prevInterSect.material = material3;
    // prevInterSect = null;
    document.documentElement.style.cursor = "default";
  }
  // renderer.render(scene, camera);
};

const animate = () => {
  requestAnimationFrame(() => animate());
  render();
  renderer.setClearColor(0x000000, 0);
  renderer.setClearAlpha(0);

  // let bg = scene.background;
  // scene.background = new THREE.Color("#000")
  // bloomComposer.render();
  // scene.background = bg
  finalComposer.render();
  // composer.render();
  // renderer.render(scene, camera);
};

const onResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  finalComposer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);

  if (!camera) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera?.updateProjectionMatrix();
};

function onPointerMove(event: MouseEvent) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

export const createScene = (
  el: HTMLCanvasElement
  // updateHover: (name: string, pos: [number, number]) => void
) => {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: el,
    alpha: true,
  });
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  const light = new THREE.AmbientLight("#FFFFFF", 1.0);
  const gltfLoader = new GLTFLoader();
  scene = new THREE.Scene();
  scene.add(light);
  const loader = new THREE.CubeTextureLoader();
  const cubeText = loader.load([
    "/px.png",
    "/nx.png",
    "/py.png",
    "ny.png",
    "pz.png",
    "nz.png",
  ]);

  scene.background = cubeText;

  const playerGeometry = new THREE.SphereGeometry(0.3);
  const playerMesh = new THREE.Mesh(playerGeometry, material2);
  playerMesh.position.z = -1.5;
  playerMesh.position.y = 0.3;
  scene.add(playerMesh);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.set(-11, 11, 18);
  // camera.lookAt(0, -8.3, 0 );
  // const pointLight = new THREE.PointLight(0xffffff, 1);
  // camera.add(pointLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 8.5, 0);
  controls.autoRotate = true;

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.3
  );
  const renderScene = new RenderPass(scene, camera);

  bloomComposer = new EffectComposer(renderer);
  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(bloomPass);

  finalComposer = new EffectComposer(renderer);
  finalComposer.addPass(renderScene);
  // const material = new THREE.ShaderMaterial({
  //   uniforms: {
  //     baseTexture: { value: null },
  //     bloomTexture: { value: bloomComposer.renderTarget2.texture },
  //   },
  //   vertexShader:
  //     "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }",
  //   fragmentShader:
  //     "uniform sampler2D baseTexture; uniform sampler2D bloomTexture; varying vec2 vUv; vec4 getTexture( sampler2D texelToLinearTexture ) { return mapTexelToLinear( texture2D( texelToLinearTexture , vUv ) ); } void main() { gl_FragColor = ( getTexture( baseTexture ) + vec4( 1.0 ) * getTexture( bloomTexture ) ); }",
  // });
  // material.needsUpdate = true
  // const finalPass = new ShaderPass(material, "baseTexture");
  // finalPass.needsSwap = true;
  // finalComposer.addPass(bloomPass);

  gltfLoader.load(
    "/dualInTheDark.glb",
    function (gltf) {
      gltf.scene.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.receiveShadow = true;
          m.castShadow = true;
          m.updateMatrixWorld();
          var localMesh = m.worldToLocal(playerMesh.position.clone());
          if (m.geometry.boundingBox?.containsPoint(localMesh)) {
            // m.material = material4;
          }
        }
        if ((child as THREE.PointLight).isLight) {
          const l = child as THREE.PointLight;
          l.castShadow = true;
          l.intensity = 0.5;
        }
      });
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );

  onResize();
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("resize", onResize);
  animate();
};
