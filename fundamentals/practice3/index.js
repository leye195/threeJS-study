import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

const main = () => {

  const canvas = document.querySelector('#c');

  //create renderer, it takes all data and rendering to the canvas
  //WebGLRenderer is thate use WebGL to render 3d to the canvas
  const renderer = new THREE.WebGLRenderer({canvas});
  
  const gui = new GUI();

  //create a camera through PerspectiveCamera
  const fov = 70; // field of view, 75deg in the vertical dimention (카메라 시야각)
  const aspect = 10; // 시야의 가로세로비 
  const near = 10; // 랜더링할 물체 거리의 하한 값, 너무 가까이 있는 물체를 그리는 것을 막기 위해 사용
  const far = 100; // 랜더링할 물체의 상한 값, 너무 멀리 있는 물체를 그리는 것을 막이 위해 사용
  const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
  camera.position.set(0,50,0);
  camera.up.set(0,0,1);
  camera.lookAt(0,0,0)
  //create a sceme
  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color,intensity);
    scene.add(light);
  }

  //create a basic material and set color
  //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
  
  //MeshPhongMaterial is affected by lights
  //const material = new THREE.MeshPhongMaterial({color: 0x44aa88}); 

  const objects = [];
  
  //soloarSystem
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  //geometry
  const radius = 1;
  const widthSegments = 6;
  const heightSegments = 6;
  const sphere = new THREE.SphereGeometry(radius,widthSegments,heightSegments);

  //sun
  const sunMaterial = new THREE.MeshPhongMaterial({emissive:0xFFFF00}); //emissive: 방사성
  const sunMesh = new THREE.Mesh(sphere,sunMaterial);
  sunMesh.scale.set(4,4,4);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);


  //earthOrbit
  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 15;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  //earth
  const earthMaterial = new THREE.MeshPhongMaterial({color:0x2233FF,emissive:0x112244});
  const earthMesh = new THREE.Mesh(sphere,earthMaterial);
  earthMesh.scale.set(2,2,2);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);
    
  //moonOrbit
  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 4;
  earthOrbit.add(moonOrbit);
  objects.push(moonOrbit);

  //moon
  const moonMaterial = new THREE.MeshPhongMaterial({color:0xE3E3E3, emissive:0xEE3355});
  const moonMesh = new THREE.Mesh(sphere,moonMaterial);
  moonMesh.scale.set(0.5,0.5,0.5);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  class AxisGridHelper {
    constructor(node, units = 10) {
      const axes = new THREE.AxesHelper();
      axes.material.depthTest = false;
      axes.renderOrder = 2;
      node.add(axes);

      const grid = new THREE.GridHelper(units,units);
      grid.material.depthTest = false;
      grid.renderOrder = 1;
      node.add(grid);

      this.grid = grid;
      this.axes = axes;
      this.visible = false;
    }

    get visible() {
      return this._visible;
    }

    set visible(v) {
      this._visible = v;
      this.grid.visible = v;
      this.axes.visible = v;
    }
  }

  const makeAxisGrid = (node,label,units) => {
    const helper = new AxisGridHelper(node,units);
    gui.add(helper,'visible').name(label);
  }

  makeAxisGrid(solarSystem, 'solarSystem', 26);
  makeAxisGrid(sunMesh, 'sunMesh');
  makeAxisGrid(earthOrbit, 'earthOrbit');
  makeAxisGrid(earthMesh, 'earthMesh');
  makeAxisGrid(moonOrbit, 'moonOrbit');
  makeAxisGrid(moonMesh, 'moonMesh');

  const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const isResize = width!==canvas.width || height !== canvas.height;
    if(isResize) {
      renderer.setSize(width,height,false);
    }
    return isResize;
  }
  const render = (time) => {
    time*=0.001;
  
    if(resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
    objects.forEach((obj,idx)=>{
      const speed = 1 + idx * .1;
      const rot = time * speed;
      obj.rotation.y = rot;
    })
    
    // render the scene
    renderer.render(scene,camera);

    //requestAnimationFrame을 활용한 3D animate
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

main();