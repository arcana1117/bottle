import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128/examples/jsm/loaders/GLTFLoader.js';

// シーンを作成
const scene = new THREE.Scene();

// カメラを設定
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// 環境光を追加
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// 3Dモデルを読み込む
const loader = new GLTFLoader();
loader.load('bottle_model.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, -1, 0);
    scene.add(model);
}, undefined, (error) => {
    console.error('3Dモデルの読み込みに失敗しました', error);
});

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// ウィンドウリサイズ対応
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
