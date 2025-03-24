import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128/examples/jsm/loaders/GLTFLoader.js';

// シーンの作成
const scene = new THREE.Scene();

// カメラの設定
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

// レンダラーの作成
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 環境光と方向光を追加
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 3Dモデルの読み込み
const loader = new GLTFLoader();
loader.load('bottle_model.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, -1, 0);
    scene.add(model);
}, undefined, (error) => {
    console.error('3Dモデルのロードに失敗しました', error);
});

// マウス操作（OrbitControls）の追加
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// ウィンドウサイズ変更対応
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
