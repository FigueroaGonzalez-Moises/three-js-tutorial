import { useEffect } from "react";
import {
  AmbientLight,
  BoxGeometry,
  Clock,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  SpotLight,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

const App = () => {
  useEffect(() => {
    const renderer = new WebGLRenderer({
      canvas: document.getElementById("three-js-canvas")!,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new Scene();

    const camera = new PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    const stats = Stats();
    document.body.appendChild(stats.dom);

    const box = new BoxGeometry(16, 16, 16);
    const boxMaterial = new MeshNormalMaterial();
    const boxMesh = new Mesh(box, boxMaterial);
    scene.add(boxMesh);

    const clock = new Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // boxMesh.rotation.x = time;
      // boxMesh.rotation.y = time;

      stats.update();
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <>
      <canvas id='three-js-canvas'></canvas>
    </>
  );
};

export default App;
