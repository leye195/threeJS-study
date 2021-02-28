import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  
  const fov = 40;
  const aspect = 2;
  const near = 10;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
  camera.position.z = 20;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth,boxHeight,boxDepth);

  const makeCube = (geometry,color,x) => {
    const material = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry,material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
  };

  const cubes = [
    makeCube(geometry,0xca8a99,0),
    makeCube(geometry,0x99aaca,-2),
    makeCube(geometry,0xaa6c55,2),
  ]
  
  const resizeRendererToDisplay = (renderer) => {
    const canvas = renderer.domElement;
    const pixelRation = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRation | 0;
    const height = canvas.clientHeight * pixelRation | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const render = (time) => {
    time *= 0.001;
    /*const canvas = renderer.domElement;

    // adjust aspect of camera
    camera.aspect = canvas.clientWidth / canvas.clientHeight;

    //update render loop
    camera.updateProjectionMatrix(); */
    if(resizeRendererToDisplay(renderer)){
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube,idx) => {
      const speed = 1 + idx * .1;
      const rot = speed * time;

      cube.rotation.x = rot;
      cube.rotation.y = rot;
    })

    renderer.render(scene,camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
