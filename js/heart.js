// js
// 导入 three.js 模块
import * as THREE from 'three';

// 基础初始化
const app = document.getElementById('app');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(60, app.clientWidth / app.clientHeight, 0.1, 1000);
camera.position.set(0, 2, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(app.clientWidth, app.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
app.appendChild(renderer.domElement);

// 心形轮廓：使用贝塞尔曲线绘制 2D 形状
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0.8);
heartShape.bezierCurveTo(0, 1.4, -1.2, 1.4, -1.2, 0.8);
heartShape.bezierCurveTo(-1.2, 0.2, -0.6, -0.2, 0, -0.8);
heartShape.bezierCurveTo(0.6, -0.2, 1.2, 0.2, 1.2, 0.8);
heartShape.bezierCurveTo(1.2, 1.4, 0, 1.4, 0, 0.8);

// 选择二维或三维：二选一
// 1) 二维心形
// const geometry = new THREE.ShapeGeometry(heartShape);

// 2) 三维心形（拉伸厚度）
const geometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 0.5,
  bevelEnabled: true,
  bevelSegments: 12,
  steps: 2,
  bevelSize: 0.12,
  bevelThickness: 0.08
});

// 材质与网格
const material = new THREE.MeshPhysicalMaterial({
  color: 0xff2d55,
  metalness: 0.1,
  roughness: 0.4,
  clearcoat: 0.6,
  clearcoatRoughness: 0.2
});
const heart = new THREE.Mesh(geometry, material);
heart.rotation.x = -Math.PI / 6;
scene.add(heart);

// 光源
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(5, 5, 5);
scene.add(dir);

// 自适应窗口
function onResize() {
  const w = app.clientWidth;
  const h = app.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', onResize);

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  heart.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();