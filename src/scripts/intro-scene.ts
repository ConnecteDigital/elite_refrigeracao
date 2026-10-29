// Abertura 3D da home: "a geladeira parou". Cozinha à noite, geladeira inox com o
// painel subindo para 15 °C e água pingando no piso; a câmera dá a volta até o
// compressor, o manifold é ligado, o gás entra e o tubo de sucção congela; de volta
// à frente o painel cai para 4 °C, a porta abre e o site surge de dentro da luz da
// geladeira. Feita para ser gravada em vídeo (scripts/gravar-abertura.mjs).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';

export type IntroStage = 'leak' | 'fix' | 'ok';

export interface IntroHandle {
  done: Promise<void>;
  skip: () => void;
  dispose: () => void;
}

export interface IntroCallbacks {
  onReady: () => void;
  onStage: (stage: IntroStage) => void;
  // Raio do furo de revelação no centro da tela, como fração da altura do quadro
  onReveal: (frac: number) => void;
}

export interface IntroOptions {
  // Gravação offline: passo fixo de 1/fps, qualidade máxima (vidro com refração e
  // desfoque de lente) e cada quadro avançado de fora.
  record?: { fps: number; preview?: boolean };
}

// Ritmo da abertura: 1 = roteiro original (6,5 s). Maior = mais devagar.
const LENTO = 1.6;

// Roteiro em segundos (no ritmo original; multiplicado por LENTO)
const T = {
  leakStart: 0.25 * LENTO,
  toBack: 1.35 * LENTO,
  toolsIn: 1.75 * LENTO,
  grip: 2.35 * LENTO,
  compressorOn: 2.75 * LENTO,
  fixed: 3.65 * LENTO,
  cooling: 4.05 * LENTO,
  open: 4.95 * LENTO,
  reveal: 5.45 * LENTO,
  end: 6.5 * LENTO,
};

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const phase = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const dummyObj = new THREE.Object3D();

// ---------- texturas procedurais ----------
function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, srgb = false) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d')!, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Pseudoaleatório com semente: a cena sai sempre igual, quadro a quadro
let seed = 0;
function rand() {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Piso cerâmico (bump=true gera o relevo do rejunte)
function floorTiles(g: CanvasRenderingContext2D, s: number, bump = false) {
  const cols = 2;
  const step = s / cols;
  const grout = 6;
  g.fillStyle = bump ? '#000' : '#6f665c';
  g.fillRect(0, 0, s, s);
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < cols; x++) {
      const v = bump ? 0 : (rand() - 0.5) * 12;
      g.fillStyle = bump ? '#fff' : `rgb(${176 + v},${166 + v},${150 + v})`;
      g.fillRect(x * step + grout / 2, y * step + grout / 2, step - grout, step - grout);
      if (bump) continue;
      // manchas suaves de cerâmica
      for (let k = 0; k < 40; k++) {
        g.fillStyle = `rgba(${rand() < 0.5 ? '255,250,240' : '90,80,70'},${0.03 + rand() * 0.04})`;
        g.beginPath();
        g.arc(x * step + rand() * step, y * step + rand() * step, 4 + rand() * 26, 0, Math.PI * 2);
        g.fill();
      }
    }
  }
}

// Azulejo de metrô (retangular) da parede da pia
function subwayTiles(g: CanvasRenderingContext2D, w: number, h: number, bump = false) {
  const rows = 8;
  const cols = 4;
  const th = h / rows;
  const tw = w / cols;
  g.fillStyle = bump ? '#000' : '#9aa1a6';
  g.fillRect(0, 0, w, h);
  for (let r = 0; r < rows; r++) {
    const off = r % 2 ? tw / 2 : 0;
    for (let c = -1; c < cols + 1; c++) {
      const v = bump ? 0 : (rand() - 0.5) * 8;
      g.fillStyle = bump ? '#fff' : `rgb(${226 + v},${230 + v},${232 + v})`;
      g.fillRect(c * tw + off + 2, r * th + 2, tw - 4, th - 4);
    }
  }
}

function granite(g: CanvasRenderingContext2D, s: number) {
  g.fillStyle = '#1b1b1d';
  g.fillRect(0, 0, s, s);
  for (let i = 0; i < 9000; i++) {
    const c = rand();
    g.fillStyle = c < 0.6 ? `rgba(60,58,60,${0.5 + rand() * 0.5})` : c < 0.9 ? `rgba(110,105,100,${0.4 + rand() * 0.5})` : `rgba(200,195,185,${0.5 + rand() * 0.4})`;
    g.fillRect(rand() * s, rand() * s, 1 + rand() * 3, 1 + rand() * 3);
  }
}

function plaster(g: CanvasRenderingContext2D, s: number) {
  g.fillStyle = '#b9b1a5';
  g.fillRect(0, 0, s, s);
  for (let i = 0; i < 2500; i++) {
    g.fillStyle = `rgba(${rand() < 0.5 ? '255,255,255' : '120,110,100'},${rand() * 0.05})`;
    g.fillRect(rand() * s, rand() * s, 2 + rand() * 6, 2 + rand() * 6);
  }
}

// Inox escovado: riscos verticais finos (usado como mapa de rugosidade)
function brushed(g: CanvasRenderingContext2D, w: number, h: number) {
  g.fillStyle = '#7a7a7a';
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 1400; i++) {
    const v = 90 + rand() * 90;
    g.strokeStyle = `rgba(${v},${v},${v},${0.25 + rand() * 0.35})`;
    g.lineWidth = 0.6 + rand() * 1.2;
    const x = rand() * w;
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x + (rand() - 0.5) * 3, h);
    g.stroke();
  }
}

// Céu noturno com luzes da cidade vistas pela janela
function nightWindow(g: CanvasRenderingContext2D, w: number, h: number) {
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#05080f');
  sky.addColorStop(0.6, '#0d1a33');
  sky.addColorStop(1, '#1d2a44');
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);
  // prédios
  let x = 0;
  while (x < w) {
    const bw = 30 + rand() * 60;
    const bh = h * (0.2 + rand() * 0.45);
    g.fillStyle = '#060a12';
    g.fillRect(x, h - bh, bw, bh);
    for (let wy = h - bh + 8; wy < h - 6; wy += 12) {
      for (let wx = x + 5; wx < x + bw - 6; wx += 10) {
        if (rand() < 0.28) {
          g.fillStyle = rand() < 0.7 ? 'rgba(255,205,120,0.9)' : 'rgba(170,210,255,0.85)';
          g.fillRect(wx, wy, 5, 6);
        }
      }
    }
    x += bw + 4;
  }
}

// Mostrador do manômetro (azul = baixa, vermelho = alta)
function gaugeFace(color: string) {
  return canvasTexture(256, 256, (g, s) => {
    g.fillStyle = '#f4f4f0';
    g.beginPath();
    g.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
    g.fill();
    g.lineWidth = 14;
    g.strokeStyle = color;
    g.beginPath();
    g.arc(s / 2, s / 2, s / 2 - 7, 0, Math.PI * 2);
    g.stroke();
    g.strokeStyle = '#222';
    for (let i = 0; i <= 30; i++) {
      const a = Math.PI * 0.75 + (i / 30) * Math.PI * 1.5;
      const r1 = s * 0.4;
      const r2 = i % 5 === 0 ? s * 0.31 : s * 0.36;
      g.lineWidth = i % 5 === 0 ? 4 : 2;
      g.beginPath();
      g.moveTo(s / 2 + Math.cos(a) * r1, s / 2 + Math.sin(a) * r1);
      g.lineTo(s / 2 + Math.cos(a) * r2, s / 2 + Math.sin(a) * r2);
      g.stroke();
    }
    g.fillStyle = color;
    g.beginPath();
    g.arc(s / 2, s / 2, s * 0.12, Math.PI * 0.9, Math.PI * 1.6);
    g.lineTo(s / 2, s / 2);
    g.fill();
  }, true);
}

export function startIntro(canvas: HTMLCanvasElement, cb: IntroCallbacks, opts: IntroOptions = {}): IntroHandle {
  const record = opts.record;
  // prévia rápida (sem vidro com refração nem desfoque), para revisar enquadramentos
  const hq = !!record && !record.preview;
  const params = new URLSearchParams(location.search);
  const speed = Number(params.get('introSpeed')) || 1;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    preserveDrawingBuffer: !!record,
    outputBufferType: hq ? THREE.HalfFloatType : THREE.UnsignedByteType,
  });
  seed = 11;
  renderer.setPixelRatio(record ? 1 : Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const BG = 0x07090d;
  scene.background = new THREE.Color(BG);
  scene.fog = new THREE.FogExp2(BG, 0.045);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.24;

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.03, 60);

  // ---------- medidas (2 unidades = 1 metro) ----------
  const FW = 1.4; // largura da geladeira
  const FD = 1.36; // profundidade do gabinete
  const FH = 3.6; // altura
  const FRONT = FD / 2; // frente do gabinete
  const DOOR_T = 0.1; // espessura das portas
  const WALL_Z = -2.5;
  const SPLIT = 2.62; // divisa entre porta do refrigerador (baixo) e do freezer (cima)

  // ---------- luzes ----------
  // luz de teto da cozinha, quente
  const key = new THREE.SpotLight(0xffd2a0, 46, 16, 0.6, 0.75, 1.5);
  key.position.set(1.6, 5.6, 3.4);
  key.target.position.set(0, 1.4, 0.4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0003;
  key.shadow.normalBias = 0.02;
  scene.add(key, key.target);
  // luar azulado entrando pela janela
  const moon = new THREE.DirectionalLight(0x8fb3ff, 0.9);
  moon.position.set(5, 4, -1);
  scene.add(moon);
  // contraluz frio para recortar o inox
  const rim = new THREE.PointLight(0x7fb6ff, 6, 10, 1.6);
  rim.position.set(-2.2, 3.2, -1.2);
  scene.add(rim);
  // lanterna de trabalho do técnico, no chão, apontada para o compressor
  const work = new THREE.SpotLight(0xe8f1ff, 0, 7, 0.65, 0.5, 1.4);
  work.position.set(1.7, 0.35, -2.05);
  work.target.position.set(0.1, 0.4, -0.95);
  work.castShadow = true;
  work.shadow.mapSize.set(1024, 1024);
  work.shadow.bias = -0.0004;
  scene.add(work, work.target);
  scene.add(new THREE.HemisphereLight(0xa9c2ff, 0x2a241e, 0.06));

  // ---------- cozinha ----------
  const floorMap = canvasTexture(512, 512, (g, s) => floorTiles(g, s), true);
  const floorBump = canvasTexture(512, 512, (g, s) => floorTiles(g, s, true));
  for (const tx of [floorMap, floorBump]) tx.repeat.set(40 / 2.4, 30 / 2.4);
  const floorMat = new THREE.MeshStandardMaterial({ map: floorMap, bumpMap: floorBump, bumpScale: 0.9, roughness: 0.32 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const wallMap = canvasTexture(512, 512, (g, s) => plaster(g, s), true);
  wallMap.repeat.set(6, 2);
  const wallMat = new THREE.MeshStandardMaterial({ map: wallMap, roughness: 0.92 });
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(40, 12), wallMat);
  wall.position.set(0, 6, WALL_Z);
  wall.receiveShadow = true;
  scene.add(wall);
  // parede lateral direita (com a janela) e esquerda, para não aparecer vazio
  const sideR = new THREE.Mesh(new THREE.PlaneGeometry(30, 12), wallMat);
  sideR.rotation.y = -Math.PI / 2;
  sideR.position.set(4.2, 6, 0);
  sideR.receiveShadow = true;
  scene.add(sideR);
  const sideL = sideR.clone();
  sideL.rotation.y = Math.PI / 2;
  sideL.position.x = -6.5;
  scene.add(sideL);
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), new THREE.MeshStandardMaterial({ color: 0x4a4641, roughness: 1 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 5.4;
  scene.add(ceiling);

  // janela com a cidade à noite
  const winTex = canvasTexture(512, 384, nightWindow, true);
  winTex.wrapS = winTex.wrapT = THREE.ClampToEdgeWrapping;
  const win = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.9), new THREE.MeshBasicMaterial({ map: winTex, toneMapped: false, color: 0x8a8a8a }));
  win.rotation.y = -Math.PI / 2;
  win.position.set(4.19, 3.1, -0.6);
  scene.add(win);
  const frameMat = new THREE.MeshStandardMaterial({ color: 0xe9e6df, roughness: 0.5 });
  for (const [w, h, y, z] of [
    [0.08, 2.06, 3.1, -1.93],
    [0.08, 2.06, 3.1, 0.73],
    [0.08, 2.06, 3.1, -0.6],
  ] as const) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.08, h, w), frameMat);
    bar.position.set(4.16, y, z);
    scene.add(bar);
  }
  for (const y of [2.12, 4.08]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 2.74), frameMat);
    bar.position.set(4.15, y, -0.6);
    scene.add(bar);
  }

  // bancada com armários à esquerda
  const counterX0 = -1.35;
  const counterX1 = -6.4;
  const cw = counterX0 - counterX1;
  const cx = (counterX0 + counterX1) / 2;
  const cabMat = new THREE.MeshStandardMaterial({ color: 0xece9e3, roughness: 0.35 });
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2c, metalness: 0.9, roughness: 0.3 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(cw, 1.72, 1.2), cabMat);
  base.position.set(cx, 0.86 + 0.08, WALL_Z + 0.6);
  base.castShadow = base.receiveShadow = true;
  scene.add(base);
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(cw, 0.16, 1.1), new THREE.MeshStandardMaterial({ color: 0x1c1c1e, roughness: 0.8 }));
  plinth.position.set(cx, 0.08, WALL_Z + 0.55);
  scene.add(plinth);
  for (let i = 0; i < 5; i++) {
    const x = counterX0 - 0.5 - i * 1.0;
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.012, 1.66, 0.01), new THREE.MeshStandardMaterial({ color: 0x9c978e }));
    seam.position.set(x - 0.5, 0.94, WALL_Z + 1.206);
    const h = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.04), handleMat);
    h.position.set(x, 1.6, WALL_Z + 1.23);
    scene.add(seam, h);
  }
  const graniteTex = canvasTexture(512, 512, (g, s) => granite(g, s), true);
  graniteTex.repeat.set(3, 1);
  const top = new THREE.Mesh(new THREE.BoxGeometry(cw + 0.05, 0.08, 1.3), new THREE.MeshStandardMaterial({ map: graniteTex, roughness: 0.15, metalness: 0.1 }));
  top.position.set(cx, 1.84, WALL_Z + 0.65);
  top.castShadow = top.receiveShadow = true;
  scene.add(top);
  // azulejo de metrô atrás da bancada
  const subMap = canvasTexture(512, 512, (g, w, h) => subwayTiles(g, w, h), true);
  const subBump = canvasTexture(512, 512, (g, w, h) => subwayTiles(g, w, h, true));
  for (const tx of [subMap, subBump]) tx.repeat.set(cw / 1.2, 1.4 / 1.2);
  const splash = new THREE.Mesh(new THREE.PlaneGeometry(cw, 1.4), new THREE.MeshStandardMaterial({ map: subMap, bumpMap: subBump, bumpScale: 0.6, roughness: 0.12 }));
  splash.position.set(cx, 1.88 + 0.7, WALL_Z + 0.005);
  splash.receiveShadow = true;
  scene.add(splash);
  // armário aéreo
  const upper = new THREE.Mesh(new THREE.BoxGeometry(cw, 1.4, 0.7), cabMat);
  upper.position.set(cx, 3.3 + 0.7, WALL_Z + 0.35);
  upper.castShadow = true;
  scene.add(upper);
  // fita de LED quente embaixo do aéreo
  const led = new THREE.Mesh(new THREE.BoxGeometry(cw - 0.2, 0.015, 0.04), new THREE.MeshBasicMaterial({ color: 0xffd7a0 }));
  led.position.set(cx, 3.29, WALL_Z + 0.6);
  scene.add(led);
  const underLight = new THREE.PointLight(0xffcf96, 3, 4, 1.6);
  underLight.position.set(counterX0 - 1.1, 3.1, WALL_Z + 0.7);
  scene.add(underLight);
  // potes na bancada
  const jarMat = new THREE.MeshStandardMaterial({ color: 0x3b3f44, roughness: 0.4, metalness: 0.2 });
  for (let i = 0; i < 3; i++) {
    const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.32 + i * 0.06, 32), jarMat);
    jar.position.set(counterX0 - 0.45 - i * 0.32, 1.88 + (0.32 + i * 0.06) / 2, WALL_Z + 0.35);
    jar.castShadow = true;
    scene.add(jar);
  }

  // ---------- geladeira ----------
  const fridge = new THREE.Group();
  scene.add(fridge);
  const brushTex = canvasTexture(256, 512, brushed);
  const inox = new THREE.MeshPhysicalMaterial({
    color: 0xd4d8dc,
    metalness: 1,
    roughness: 0.42,
    envMapIntensity: 2.4,
    roughnessMap: brushTex,
    clearcoat: 0.25,
    clearcoatRoughness: 0.3,
    anisotropy: 0.6,
  });
  const sideMat = new THREE.MeshStandardMaterial({ color: 0x7d8288, metalness: 0.9, roughness: 0.4 });
  const blackPlastic = new THREE.MeshStandardMaterial({ color: 0x111214, roughness: 0.55 });
  const liner = new THREE.MeshStandardMaterial({ color: 0xf3f5f7, roughness: 0.35, emissive: 0xe8f2ff, emissiveIntensity: 0 });

  // gabinete: paredes laterais, topo, fundo e base (oco, com o interior visível ao abrir)
  const shell = new THREE.Group();
  fridge.add(shell);
  const W = FW;
  const wallT = 0.07;
  const addBox = (w: number, h: number, d: number, x: number, y: number, z: number, m: THREE.Material, parent: THREE.Object3D = shell) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    b.position.set(x, y, z);
    b.castShadow = b.receiveShadow = true;
    parent.add(b);
    return b;
  };
  addBox(wallT, FH - 0.06, FD, -W / 2 + wallT / 2, 0.06 + (FH - 0.06) / 2, 0, sideMat);
  addBox(wallT, FH - 0.06, FD, W / 2 - wallT / 2, 0.06 + (FH - 0.06) / 2, 0, sideMat);
  addBox(W, wallT, FD, 0, FH - wallT / 2, 0, sideMat);
  addBox(W, 0.22, FD, 0, 0.06 + 0.11, 0, blackPlastic);
  addBox(W, FH - 0.06, wallT, 0, 0.06 + (FH - 0.06) / 2, -FD / 2 + wallT / 2, sideMat);
  // divisória entre freezer e refrigerador
  addBox(W, 0.1, FD - 0.1, 0, SPLIT, 0.05, liner);
  // pés
  for (const x of [-0.58, 0.58]) for (const z of [-0.55, 0.55]) addBox(0.1, 0.06, 0.1, x, 0.03, z, blackPlastic);
  // grade frontal da base
  const kick = addBox(W - 0.04, 0.18, 0.02, 0, 0.17, FRONT + 0.005, blackPlastic);
  for (let i = 0; i < 12; i++) {
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.022), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    slot.position.set(-0.55 + i * 0.1, 0, 0.002);
    kick.add(slot);
  }

  // interior do refrigerador
  const inner = new THREE.Group();
  fridge.add(inner);
  const IW = W - 2 * wallT;
  const IH = SPLIT - 0.05 - 0.28;
  const IY0 = 0.28;
  const IZ0 = -FD / 2 + wallT;
  const ID = FD - wallT - 0.02;
  addBox(IW, IH, 0.02, 0, IY0 + IH / 2, IZ0 + 0.01, liner, inner);
  addBox(0.02, IH, ID, -IW / 2 + 0.01, IY0 + IH / 2, IZ0 + ID / 2, liner, inner);
  addBox(0.02, IH, ID, IW / 2 - 0.01, IY0 + IH / 2, IZ0 + ID / 2, liner, inner);
  addBox(IW, 0.02, ID, 0, IY0 + 0.01, IZ0 + ID / 2, liner, inner);
  addBox(IW, 0.02, ID, 0, IY0 + IH - 0.01, IZ0 + ID / 2, liner, inner);
  // painel de luz no teto interno
  const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.2), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  lamp.position.set(0, IY0 + IH - 0.03, 0.1);
  inner.add(lamp);
  const fridgeLight = new THREE.PointLight(0xeaf4ff, 0, 5, 1.3);
  fridgeLight.position.set(0, IY0 + IH - 0.25, 0.35);
  fridge.add(fridgeLight);

  // prateleiras de vidro
  const glass: THREE.Material = hq
    ? new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, transmission: 1, thickness: 0.02, ior: 1.5, attenuationColor: new THREE.Color(0xbfe8e0), attenuationDistance: 0.4 })
    : new THREE.MeshStandardMaterial({ color: 0xdff4f0, roughness: 0.05, transparent: true, opacity: 0.25 });
  const shelfYs = [0.95, 1.55, 2.12];
  for (const y of shelfYs) {
    addBox(IW - 0.04, 0.02, ID - 0.12, 0, y, IZ0 + (ID - 0.12) / 2, glass, inner);
    addBox(IW - 0.04, 0.04, 0.02, 0, y + 0.01, IZ0 + ID - 0.12, new THREE.MeshStandardMaterial({ color: 0xcfd6dc, roughness: 0.3 }), inner);
  }
  // gavetas de legumes embaixo
  const drawerMat = new THREE.MeshStandardMaterial({ color: 0xe9f6f1, roughness: 0.15, transparent: true, opacity: 0.55 });
  addBox(IW - 0.06, 0.5, ID - 0.15, 0, IY0 + 0.27, IZ0 + (ID - 0.15) / 2, drawerMat, inner);

  // comida: garrafas, potes, frutas, caixa de leite
  const foodGroup = new THREE.Group();
  inner.add(foodGroup);
  const bottleProfile = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.07, 0),
    new THREE.Vector2(0.075, 0.02),
    new THREE.Vector2(0.075, 0.3),
    new THREE.Vector2(0.04, 0.4),
    new THREE.Vector2(0.028, 0.46),
    new THREE.Vector2(0.03, 0.5),
    new THREE.Vector2(0, 0.5),
  ];
  const bottleGeo = new THREE.LatheGeometry(bottleProfile, 32);
  const bottleColors = [0x2f8f4e, 0xc0392b, 0x2a5aa8, 0xf0b429];
  for (let i = 0; i < 4; i++) {
    const b = new THREE.Mesh(bottleGeo, new THREE.MeshPhysicalMaterial({ color: bottleColors[i], roughness: 0.1, transmission: hq ? 0.6 : 0, transparent: !hq, opacity: hq ? 1 : 0.85, thickness: 0.05 }));
    b.position.set(-0.42 + i * 0.17, shelfYs[0] + 0.01, -0.35);
    b.castShadow = true;
    foodGroup.add(b);
  }
  const fruitMat = [0xd93a2b, 0xf29d1f, 0x5fae3a, 0xe8c22a].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.45 }));
  for (let i = 0; i < 9; i++) {
    const r = 0.06 + rand() * 0.025;
    const f = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), fruitMat[i % 4]);
    f.position.set(-0.45 + (i % 5) * 0.2 + rand() * 0.05, IY0 + 0.1 + (i > 4 ? 0.1 : 0), -0.2 + rand() * 0.4);
    foodGroup.add(f);
  }
  const boxColors = [0xffffff, 0x2b6cb0, 0xf6e05e];
  for (let i = 0; i < 3; i++) {
    const box = new THREE.Mesh(new RoundedBoxGeometry(0.2, 0.36, 0.14, 2, 0.015), new THREE.MeshStandardMaterial({ color: boxColors[i], roughness: 0.5 }));
    box.position.set(0.12 + i * 0.2, shelfYs[1] + 0.19, -0.3 + i * 0.05);
    box.castShadow = true;
    foodGroup.add(box);
  }
  const potMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, transparent: true, opacity: 0.8 });
  for (let i = 0; i < 3; i++) {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.14, 32), potMat);
    pot.position.set(-0.4 + i * 0.27, shelfYs[2] + 0.08, -0.2);
    foodGroup.add(pot);
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.03, 32), new THREE.MeshStandardMaterial({ color: [0xe53e3e, 0x38a169, 0x3182ce][i], roughness: 0.4 }));
    lid.position.set(pot.position.x, pot.position.y + 0.08, pot.position.z);
    foodGroup.add(lid);
  }
  const eggMat = new THREE.MeshStandardMaterial({ color: 0xf2e3c9, roughness: 0.6 });
  for (let i = 0; i < 6; i++) {
    const egg = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 12), eggMat);
    egg.scale.y = 1.3;
    egg.position.set(0.15 + (i % 3) * 0.08, shelfYs[0] + 0.05, 0.05 + Math.floor(i / 3) * 0.08);
    foodGroup.add(egg);
  }

  // portas
  function buildDoor(h: number, withPanel: boolean) {
    const pivot = new THREE.Group();
    const door = new THREE.Group();
    pivot.add(door);
    const panel = new THREE.Mesh(new RoundedBoxGeometry(W - 0.01, h, DOOR_T, 3, 0.025), inox);
    panel.position.set((W - 0.01) / 2, h / 2, DOOR_T / 2);
    panel.castShadow = panel.receiveShadow = true;
    door.add(panel);
    // borracha de vedação (aparece quando a porta abre)
    const gasketMat = new THREE.MeshStandardMaterial({ color: 0x1a1c1f, roughness: 0.8 });
    const g1 = new THREE.Mesh(new THREE.BoxGeometry(W - 0.08, 0.05, 0.03), gasketMat);
    g1.position.set(W / 2, 0.04, -0.012);
    const g2 = g1.clone();
    g2.position.y = h - 0.04;
    const g3 = new THREE.Mesh(new THREE.BoxGeometry(0.05, h - 0.06, 0.03), gasketMat);
    g3.position.set(0.04, h / 2, -0.012);
    const g4 = g3.clone();
    g4.position.x = W - 0.05;
    door.add(g1, g2, g3, g4);
    // forro interno da porta
    const back = new THREE.Mesh(new THREE.BoxGeometry(W - 0.16, h - 0.14, 0.02), liner);
    back.position.set(W / 2, h / 2, -0.01);
    door.add(back);
    // puxador vertical
    const barLen = Math.min(h - 0.3, 1.25);
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, barLen, 24), inox);
    const by = withPanel ? h - 0.25 - barLen / 2 : h / 2;
    bar.position.set(W - 0.14, by, DOOR_T + 0.1);
    door.add(bar);
    for (const dy of [-barLen / 2 + 0.06, barLen / 2 - 0.06]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.1, 16), inox);
      post.rotation.x = Math.PI / 2;
      post.position.set(W - 0.14, by + dy, DOOR_T + 0.05);
      door.add(post);
    }
    bar.castShadow = true;
    return { pivot, door };
  }
  const lowerDoor = buildDoor(SPLIT - 0.27, true);
  lowerDoor.pivot.position.set(-W / 2 + 0.005, 0.27, FRONT);
  fridge.add(lowerDoor.pivot);
  const upperDoor = buildDoor(FH - SPLIT - 0.02, false);
  upperDoor.pivot.position.set(-W / 2 + 0.005, SPLIT + 0.01, FRONT);
  fridge.add(upperDoor.pivot);

  // prateleiras internas da porta com garrafas (vão junto com a porta)
  const binMat = new THREE.MeshStandardMaterial({ color: 0xeef2f5, roughness: 0.25, transparent: true, opacity: 0.85 });
  for (const y of [0.55, 1.25, 1.85]) {
    const bin = new THREE.Mesh(new THREE.BoxGeometry(W - 0.26, 0.16, 0.16), binMat);
    bin.position.set(W / 2, y, -0.1);
    lowerDoor.door.add(bin);
  }
  for (let i = 0; i < 4; i++) {
    const b = new THREE.Mesh(bottleGeo, new THREE.MeshStandardMaterial({ color: [0x9b2c2c, 0xe2e8f0, 0x276749, 0xd69e2e][i], roughness: 0.2 }));
    b.scale.setScalar(0.9);
    b.position.set(0.32 + i * 0.24, 0.48, -0.1);
    lowerDoor.door.add(b);
  }

  // painel digital na porta (temperatura)
  const dispCanvas = document.createElement('canvas');
  dispCanvas.width = 512;
  dispCanvas.height = 256;
  const dispTex = new THREE.CanvasTexture(dispCanvas);
  dispTex.colorSpace = THREE.SRGBColorSpace;
  dispTex.anisotropy = 8;
  let lastDisp = '';
  function drawDisplay(temp: number, warn: boolean, blinkOn: boolean) {
    const key = `${temp}|${warn}|${blinkOn}`;
    if (key === lastDisp) return;
    lastDisp = key;
    const g = dispCanvas.getContext('2d')!;
    g.fillStyle = '#04060a';
    g.fillRect(0, 0, 512, 256);
    const color = warn ? '#ff3b30' : '#35c8ff';
    g.shadowColor = color;
    g.shadowBlur = 24;
    g.fillStyle = color;
    g.textAlign = 'right';
    g.textBaseline = 'middle';
    g.font = '800 170px Arial, sans-serif';
    g.fillText(String(temp), 330, 140);
    g.font = '700 70px Arial, sans-serif';
    g.textAlign = 'left';
    g.fillText('°C', 340, 100);
    g.shadowBlur = 12;
    if (warn) {
      // triângulo de alerta piscando
      if (blinkOn) {
        g.beginPath();
        g.moveTo(420, 175);
        g.lineTo(470, 175);
        g.lineTo(445, 130);
        g.closePath();
        g.fill();
        g.fillStyle = '#04060a';
        g.fillRect(442, 145, 6, 16);
        g.fillRect(442, 165, 6, 5);
      }
    } else {
      // floco de neve
      g.strokeStyle = color;
      g.lineWidth = 6;
      g.lineCap = 'round';
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI) / 3;
        g.beginPath();
        g.moveTo(445 - Math.cos(a) * 26, 165 - Math.sin(a) * 26);
        g.lineTo(445 + Math.cos(a) * 26, 165 + Math.sin(a) * 26);
        g.stroke();
      }
    }
    dispTex.needsUpdate = true;
  }
  const dispMat = new THREE.MeshBasicMaterial({ map: dispTex, toneMapped: false });
  const display = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.21), dispMat);
  const lowerH = SPLIT - 0.27;
  display.position.set(W * 0.5, lowerH - 0.34, DOOR_T + 0.007);
  lowerDoor.door.add(display);
  const bezel = new THREE.Mesh(new RoundedBoxGeometry(0.48, 0.27, 0.012, 2, 0.02), new THREE.MeshStandardMaterial({ color: 0x0b0c0e, roughness: 0.15, metalness: 0.3 }));
  bezel.position.set(display.position.x, display.position.y, DOOR_T - 0.004);
  lowerDoor.door.add(bezel);
  const dispGlow = new THREE.PointLight(0xff3b30, 0.25, 0.7, 2);
  dispGlow.position.set(display.position.x, display.position.y, DOOR_T + 0.12);
  lowerDoor.door.add(dispGlow);

  // ---------- traseira: condensador, compressor, tubos ----------
  const BACK = -FD / 2;
  const copper = new THREE.MeshStandardMaterial({ color: 0xc27a4a, metalness: 1, roughness: 0.28 });
  const coilMat = new THREE.MeshStandardMaterial({ color: 0x141517, metalness: 0.6, roughness: 0.5 });
  // serpentina do condensador
  const coilPts: THREE.Vector3[] = [];
  const rows = 14;
  for (let i = 0; i < rows; i++) {
    const y = 0.75 + i * 0.18;
    const xa = i % 2 ? 0.52 : -0.52;
    coilPts.push(new THREE.Vector3(-xa, y, BACK - 0.08), new THREE.Vector3(xa, y, BACK - 0.08));
  }
  const coilPath = new THREE.CurvePath<THREE.Vector3>();
  for (let i = 0; i < coilPts.length - 1; i++) coilPath.add(new THREE.LineCurve3(coilPts[i], coilPts[i + 1]));
  for (let i = 1; i < coilPts.length - 1; i += 2) {
    // curvas nas pontas
    const a = coilPts[i];
    const b = coilPts[i + 1];
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(a, new THREE.Vector3(a.x + Math.sign(a.x) * 0.1, (a.y + b.y) / 2, a.z), b), 12, 0.018, 8),
      coilMat,
    );
    shell.add(tube);
  }
  for (let i = 0; i < coilPts.length; i += 2) {
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(coilPts[i], coilPts[i + 1]), 2, 0.018, 8), coilMat);
    tube.castShadow = true;
    shell.add(tube);
  }
  // arames verticais da grade
  const wireGeo = new THREE.CylinderGeometry(0.006, 0.006, 2.6, 6);
  const wires = new THREE.InstancedMesh(wireGeo, coilMat, 34);
  for (let i = 0; i < 34; i++) {
    dummyObj.position.set(-0.6 + i * (1.2 / 33), 0.7 + 1.3, BACK - 0.1);
    dummyObj.updateMatrix();
    wires.setMatrixAt(i, dummyObj.matrix);
  }
  wires.castShadow = true;
  shell.add(wires);
  // suportes da grade
  addBox(0.04, 2.7, 0.08, -0.62, 2.05, BACK - 0.05, coilMat);
  addBox(0.04, 2.7, 0.08, 0.62, 2.05, BACK - 0.05, coilMat);

  // base do compressor
  const comp = new THREE.Group();
  const CX = 0.12;
  const CZ = BACK - 0.38;
  comp.position.set(CX, 0.1, CZ);
  scene.add(comp);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.04, 0.62), coilMat);
  plate.position.set(-CX, -0.02, 0.1);
  plate.castShadow = plate.receiveShadow = true;
  comp.add(plate);
  const compMat = new THREE.MeshPhysicalMaterial({ color: 0x0c0d0f, roughness: 0.28, metalness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.2 });
  const compBody = new THREE.Group();
  comp.add(compBody);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.29, 0.34, 48), compMat);
  body.scale.z = 0.82;
  body.position.y = 0.24;
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.27, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), compMat);
  dome.scale.set(1, 0.55, 0.82);
  dome.position.y = 0.41;
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.05, 48), compMat);
  foot.scale.z = 0.82;
  foot.position.y = 0.06;
  compBody.add(body, dome, foot);
  for (const [x, z] of [
    [-0.22, -0.15],
    [0.22, -0.15],
    [-0.22, 0.15],
    [0.22, 0.15],
  ]) {
    const rub = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.06, 16), new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 }));
    rub.position.set(x, 0.03, z);
    comp.add(rub);
  }
  // etiqueta branca do compressor
  const labelTex = canvasTexture(256, 128, (g, w, h) => {
    g.fillStyle = '#f2f2ee';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#1d7a3a';
    g.fillRect(0, 0, w, 30);
    g.fillStyle = '#222';
    g.font = 'bold 26px Arial';
    g.fillText('COMPRESSOR', 18, 70);
    g.font = '20px Arial';
    g.fillText('R134a  115-127V  60Hz', 18, 104);
  }, true);
  const label = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.13), new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.6 }));
  label.position.set(0.09, 0.27, 0.231);
  label.rotation.y = 0.25;
  compBody.add(label);
  // caixa do relé com cabo
  const relay = new THREE.Mesh(new RoundedBoxGeometry(0.14, 0.16, 0.12, 2, 0.02), new THREE.MeshStandardMaterial({ color: 0x18191b, roughness: 0.6 }));
  relay.position.set(-0.3, 0.25, 0.05);
  compBody.add(relay);
  const relayLed = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 8), new THREE.MeshBasicMaterial({ color: 0x113311 }));
  relayLed.position.set(-0.3, 0.3, 0.115);
  compBody.add(relayLed);
  compBody.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) o.castShadow = true;
  });

  // tubos de cobre: descarga (sobe para o condensador) e sucção (entra no gabinete)
  const toWorld = (x: number, y: number, z: number) => new THREE.Vector3(CX + x, 0.1 + y, CZ + z);
  const discharge = new THREE.CatmullRomCurve3([
    toWorld(0.14, 0.45, -0.05),
    toWorld(0.2, 0.62, -0.02),
    toWorld(0.3, 0.68, 0.18),
    new THREE.Vector3(0.48, 0.75, BACK - 0.08),
  ]);
  const suction = new THREE.CatmullRomCurve3([
    toWorld(-0.08, 0.48, 0.02),
    toWorld(-0.12, 0.7, 0.05),
    toWorld(-0.28, 0.95, 0.2),
    new THREE.Vector3(-0.3, 1.25, BACK - 0.14),
    new THREE.Vector3(-0.3, 1.9, BACK - 0.12),
    new THREE.Vector3(-0.3, 2.3, BACK - 0.02),
  ]);
  for (const c of [discharge, suction]) {
    const m = new THREE.Mesh(new THREE.TubeGeometry(c, 64, 0.022, 12), copper);
    m.castShadow = true;
    scene.add(m);
  }
  // camada de gelo que vai subindo pelo tubo de sucção depois da carga de gás
  const frostTex = canvasTexture(256, 64, (g, w, h) => {
    g.fillStyle = '#e8f6ff';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) {
      g.fillStyle = `rgba(${rand() < 0.5 ? '255,255,255' : '150,200,235'},${0.3 + rand() * 0.6})`;
      g.fillRect(rand() * w, rand() * h, 1 + rand() * 3, 1 + rand() * 3);
    }
  }, true);
  frostTex.repeat.set(10, 1);
  const frostBump = canvasTexture(256, 64, (g, w, h) => {
    g.fillStyle = '#000';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 1400; i++) {
      g.fillStyle = `rgba(255,255,255,${0.3 + rand() * 0.7})`;
      g.fillRect(rand() * w, rand() * h, 1 + rand() * 2, 1 + rand() * 4);
    }
  });
  frostBump.repeat.set(10, 1);
  const frostMat = new THREE.MeshPhysicalMaterial({
    map: frostTex,
    bumpMap: frostBump,
    bumpScale: 2.5,
    roughness: 0.55,
    color: 0xdcefff,
    sheen: 1,
    sheenColor: new THREE.Color(0xbfe4ff),
    emissive: 0x5d9cc9,
    emissiveIntensity: 0.12,
  });
  // o gelo só cobre o trecho de sucção que sai do compressor (até entrar no gabinete)
  const frostCurve = new THREE.CatmullRomCurve3(suction.getPoints(60).slice(0, 34));
  const frostGeo = new THREE.TubeGeometry(frostCurve, 80, 0.032, 12);
  const frost = new THREE.Mesh(frostGeo, frostMat);
  const frostTotal = frostGeo.index!.count;
  frostGeo.setDrawRange(0, 0);
  scene.add(frost);
  // tubinho de processo com a válvula onde o técnico conecta a mangueira
  const processEnd = toWorld(0.36, 0.3, 0.12);
  const processTube = new THREE.CatmullRomCurve3([toWorld(0.22, 0.28, 0.05), toWorld(0.3, 0.29, 0.09), processEnd]);
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(processTube, 16, 0.014, 10), copper));
  const brass = new THREE.MeshStandardMaterial({ color: 0xd2a84f, metalness: 1, roughness: 0.25 });
  const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.07, 16), brass);
  valve.position.copy(processEnd);
  valve.rotation.z = Math.PI / 2;
  valve.rotation.y = -0.4;
  scene.add(valve);

  // ---------- ferramentas: manifold, mangueiras, cilindro de gás, bolsa ----------
  const tools = new THREE.Group();
  scene.add(tools);
  const manifold = new THREE.Group();
  tools.add(manifold);
  const MANI = new THREE.Vector3(0.95, 0.48, -1.5);
  manifold.position.copy(MANI);
  manifold.rotation.y = 2.1;
  manifold.scale.setScalar(0.78);
  const maniBody = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.12, 0.1, 2, 0.02), brass);
  manifold.add(maniBody);
  const needles: THREE.Object3D[] = [];
  for (const [x, color] of [
    [-0.12, '#1e63d6'],
    [0.12, '#d62424'],
  ] as const) {
    const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.06, 40), new THREE.MeshStandardMaterial({ color: color === '#1e63d6' ? 0x1e63d6 : 0xd62424, roughness: 0.35, metalness: 0.2 }));
    housing.rotation.x = Math.PI / 2;
    housing.position.set(x, 0.19, 0);
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.094, 40), new THREE.MeshStandardMaterial({ map: gaugeFace(color), roughness: 0.4 }));
    face.position.set(x, 0.19, 0.031);
    const cover: THREE.Material = hq
      ? new THREE.MeshPhysicalMaterial({ roughness: 0.02, transmission: 1, thickness: 0.01, ior: 1.5 })
      : new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.02, transparent: true, opacity: 0.12 });
    const glassCover = new THREE.Mesh(new THREE.CircleGeometry(0.096, 40), cover);
    glassCover.position.set(x, 0.19, 0.036);
    const needlePivot = new THREE.Group();
    needlePivot.position.set(x, 0.19, 0.034);
    const needle = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.08, 0.003), new THREE.MeshBasicMaterial({ color: 0x111111 }));
    needle.position.y = 0.035;
    needlePivot.add(needle);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.07, 16), brass);
    stem.position.set(x, 0.09, 0);
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.05, 20), new THREE.MeshStandardMaterial({ color: color === '#1e63d6' ? 0x1e63d6 : 0xd62424, roughness: 0.5 }));
    knob.rotation.z = Math.PI / 2;
    knob.position.set(x * 2.25, 0, 0);
    manifold.add(housing, face, glassCover, needlePivot, stem, knob);
    needles.push(needlePivot);
  }
  manifold.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) o.castShadow = true;
  });
  // cilindro de gás refrigerante
  const cyl = new THREE.Group();
  const cylBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.36, 8, 32), new THREE.MeshStandardMaterial({ color: 0x5aa7d8, roughness: 0.35, metalness: 0.3 }));
  cylBody.position.y = 0.34;
  const cylHandle = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.018, 8, 24, Math.PI), new THREE.MeshStandardMaterial({ color: 0x5aa7d8, roughness: 0.35 }));
  cylHandle.position.y = 0.68;
  cyl.add(cylBody, cylHandle);
  cyl.position.set(-0.3, 0, -2.05);
  cyl.traverse((o) => ((o as THREE.Mesh).castShadow = true));
  scene.add(cyl);
  // bolsa de ferramentas preta e amarela (cores da Elite)
  const bag = new THREE.Group();
  const bagBody = new THREE.Mesh(new RoundedBoxGeometry(0.7, 0.36, 0.34, 3, 0.05), new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.85 }));
  bagBody.position.y = 0.18;
  const trim = new THREE.Mesh(new RoundedBoxGeometry(0.72, 0.05, 0.36, 2, 0.02), new THREE.MeshStandardMaterial({ color: 0xf5c400, roughness: 0.6 }));
  trim.position.y = 0.33;
  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.02, 8, 24, Math.PI), new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.8 }));
  strap.position.y = 0.36;
  bag.add(bagBody, trim, strap);
  bag.position.set(1.95, 0, -1.75);
  bag.rotation.y = 0.5;
  bag.traverse((o) => ((o as THREE.Mesh).castShadow = true));
  scene.add(bag);

  // mangueiras: refeitas a cada quadro conforme o engate se aproxima da válvula
  const hoseMats = {
    blue: new THREE.MeshStandardMaterial({ color: 0x1f5fd1, roughness: 0.45 }),
    red: new THREE.MeshStandardMaterial({ color: 0xc81e1e, roughness: 0.45 }),
    yellow: new THREE.MeshStandardMaterial({ color: 0xf2c418, roughness: 0.45 }),
  };
  const hoses: Record<'blue' | 'red' | 'yellow', THREE.Mesh> = {
    blue: new THREE.Mesh(new THREE.BufferGeometry(), hoseMats.blue),
    red: new THREE.Mesh(new THREE.BufferGeometry(), hoseMats.red),
    yellow: new THREE.Mesh(new THREE.BufferGeometry(), hoseMats.yellow),
  };
  // mangueiras e engate ficam fora do grupo do manifold: a geometria já sai em coordenadas do mundo
  const hoseGroup = new THREE.Group();
  scene.add(hoseGroup);
  for (const h of Object.values(hoses)) {
    h.castShadow = true;
    hoseGroup.add(h);
  }
  const coupler = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.08, 16), brass);
  hoseGroup.add(coupler);
  const portWorld = (dx: number) => manifold.localToWorld(new THREE.Vector3(dx, -0.07, 0));
  function hoseCurve(a: THREE.Vector3, b: THREE.Vector3, sag: number) {
    const mid = a.clone().lerp(b, 0.5);
    mid.y = Math.min(a.y, b.y) - sag;
    const m1 = a.clone().lerp(mid, 0.5);
    m1.y -= sag * 0.4;
    const m2 = mid.clone().lerp(b, 0.5);
    m2.y -= sag * 0.2;
    return new THREE.CatmullRomCurve3([a, m1, mid, m2, b]);
  }
  function setHose(h: THREE.Mesh, curve: THREE.Curve<THREE.Vector3>) {
    h.geometry.dispose();
    h.geometry = new THREE.TubeGeometry(curve, 40, 0.018, 8);
  }
  function updateHoses(connect: number) {
    manifold.updateMatrixWorld(true);
    const blueFrom = portWorld(-0.12);
    const redFrom = portWorld(0.12);
    const yelFrom = portWorld(0);
    // engate azul vai da mão do técnico até a válvula de processo
    const loose = new THREE.Vector3(0.8, 0.3, -1.3);
    const target = processEnd.clone().add(new THREE.Vector3(0.04, 0, 0.0));
    const end = loose.clone().lerp(target, connect);
    coupler.position.copy(end);
    coupler.lookAt(processEnd);
    coupler.rotateX(Math.PI / 2);
    setHose(hoses.blue, hoseCurve(blueFrom, end, 0.25));
    // vermelha solta no chão, amarela até o cilindro
    const redEnd = new THREE.Vector3(1.35, 0.04, -2.0);
    setHose(hoses.red, hoseCurve(redFrom, redEnd, 0.2));
    const yelEnd = cyl.position.clone().add(new THREE.Vector3(0, 0.72, 0));
    setHose(hoses.yellow, hoseCurve(yelFrom, yelEnd, 0.35));
    for (const h of [hoses.blue, hoses.red, hoses.yellow]) {
      const pos = h.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        if (pos.getY(i) < 0.02) pos.setY(i, 0.02);
      }
    }
  }

  // ---------- água pingando da porta e poça ----------
  const waterMat: THREE.Material = hq
    ? new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.02, transmission: 1, thickness: 0.06, ior: 1.33, attenuationColor: new THREE.Color(0x9fd8ff), attenuationDistance: 0.4 })
    : new THREE.MeshStandardMaterial({ color: 0xd6efff, roughness: 0.04, transparent: true, opacity: 0.7 });
  const MAX = 160;
  const drops = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 14, 10), waterMat, MAX);
  drops.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  drops.frustumCulled = false;
  scene.add(drops);
  const pos = new Float32Array(MAX * 3);
  const vel = new Float32Array(MAX * 3);
  const alive = new Uint8Array(MAX);
  const size = new Float32Array(MAX);
  // gotas penduradas embaixo da porta, crescendo antes de cair
  const hang = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 14, 10), waterMat, 5);
  hang.frustumCulled = false;
  scene.add(hang);
  const hangX = [-0.42, -0.12, 0.2, 0.45, 0.05];
  const hangGrow = hangX.map(() => rand());

  const puddleMat = new THREE.MeshPhysicalMaterial({ color: 0x5f7484, roughness: 0.0, metalness: 0.35, transparent: true, opacity: 0.78, clearcoat: 1, envMapIntensity: 2 });
  const puddleShape = new THREE.Shape();
  for (let i = 0; i <= 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const r = 1 + Math.sin(a * 3 + 1) * 0.12 + Math.sin(a * 5) * 0.07;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r * 0.55;
    if (i === 0) puddleShape.moveTo(x, y);
    else puddleShape.lineTo(x, y);
  }
  const puddle = new THREE.Mesh(new THREE.ShapeGeometry(puddleShape, 2), puddleMat);
  puddle.rotation.x = -Math.PI / 2;
  puddle.position.set(0.05, 0.003, FRONT + 0.35);
  puddle.receiveShadow = true;
  puddle.visible = false;
  scene.add(puddle);

  const RIPPLES = 10;
  const rippleGeo = new THREE.RingGeometry(0.92, 1, 48);
  const ripples: { mesh: THREE.Mesh; life: number; s: number }[] = [];
  for (let i = 0; i < RIPPLES; i++) {
    const m = new THREE.Mesh(rippleGeo, new THREE.MeshBasicMaterial({ color: 0xcfeaff, transparent: true, opacity: 0, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    m.visible = false;
    scene.add(m);
    ripples.push({ mesh: m, life: -1, s: 0 });
  }
  let rippleNext = 0;
  function addRipple(x: number, z: number, s: number) {
    const r = ripples[rippleNext];
    rippleNext = (rippleNext + 1) % RIPPLES;
    r.life = 0;
    r.s = s;
    r.mesh.visible = true;
    r.mesh.position.set(x, 0.006, z);
  }

  // ---------- vapor frio que escorre quando a porta abre ----------
  const fogTex = canvasTexture(128, 128, (g, w) => {
    const grad = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    grad.addColorStop(0, 'rgba(235,246,255,0.8)');
    grad.addColorStop(0.5, 'rgba(225,240,255,0.3)');
    grad.addColorStop(1, 'rgba(220,240,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, w);
  });
  const VAPOR = 70;
  const vapor: { sprite: THREE.Sprite; life: number; v: THREE.Vector3; born: number }[] = [];
  for (let i = 0; i < VAPOR; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: fogTex, transparent: true, opacity: 0, depthWrite: false, color: 0xe6f3ff }));
    s.visible = false;
    scene.add(s);
    vapor.push({ sprite: s, life: -1, v: new THREE.Vector3(), born: T.open + 0.08 + (i / VAPOR) * 1.2 * LENTO });
  }

  const dummy = new THREE.Object3D();
  const up = new THREE.Vector3(0, 1, 0);
  const dir = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  function spawnDrip(i: number) {
    const k = Math.floor(rand() * 4);
    pos[i * 3] = hangX[k];
    pos[i * 3 + 1] = 0.25;
    pos[i * 3 + 2] = FRONT + 0.03;
    vel[i * 3] = 0;
    vel[i * 3 + 1] = -0.3;
    vel[i * 3 + 2] = 0.05;
    size[i] = 0.016 + rand() * 0.01;
    alive[i] = 1;
  }
  let cursor = 0;
  function freeSlot() {
    for (let k = 0; k < MAX; k++) {
      cursor = (cursor + 1) % MAX;
      if (!alive[cursor]) return cursor;
    }
    return -1;
  }

  // ---------- câmera ----------
  type Shot = { t: number; pos: THREE.Vector3; look: THREE.Vector3 };
  function shots(): Shot[] {
    const portrait = camera.aspect < 0.9;
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    // painel da porta em close, depois a poça, a volta pelo lado direito até o
    // compressor, o retorno para a frente e o mergulho para dentro da geladeira
    const dispY = SPLIT - 0.34;
    const dispX = 0.005;
    const front = portrait ? 4.9 : 4.2;
    // no celular o painel fica no alto do quadro, longe da legenda (centro da tela)
    const lift = portrait ? 0.32 : 0.05;
    return [
      { t: 0, pos: V(dispX + 0.28, dispY + 0.02, FRONT + (portrait ? 1.35 : 1.05)), look: V(dispX + 0.05, dispY - lift, FRONT) },
      { t: 0.9, pos: V(dispX + 0.55, dispY - 0.3, FRONT + (portrait ? 1.75 : 1.4)), look: V(dispX + 0.1, dispY - (portrait ? 0.3 + lift * 1.6 : 0.22), FRONT) },
      { t: 1.55, pos: V(1.4, 0.8, FRONT + 1.8), look: V(0.15, 0.2, FRONT + 0.3) },
      { t: 2.2, pos: V(2.35, 0.95, -0.6), look: V(0.4, 0.4, -1.0) },
      { t: 2.8, pos: V(2.0, 0.85, -2.15), look: V(0.3, 0.4, -1.1) },
      { t: 3.5, pos: V(1.55, 0.95, -2.25), look: V(0.0, 0.62, -1.0) },
      { t: 3.9, pos: V(3.0, 1.3, -0.9), look: V(0.6, 1.1, 0.5) },
      { t: 4.3, pos: V(2.5, 1.65, 1.9), look: V(0.3, 1.55, 0.6) },
      { t: 4.85, pos: V(0.15, 1.75, FRONT + front), look: V(0.05, 1.65, FRONT) },
      { t: 5.45, pos: V(0.05, 1.6, FRONT + front * 0.62), look: V(0, 1.45, 0) },
      { t: 6.5, pos: V(0.0, 1.5, FRONT - 0.2), look: V(0, 1.4, -0.6) },
      { t: 99, pos: V(0.0, 1.5, FRONT - 0.3), look: V(0, 1.4, -0.6) },
    ].map((shot) => ({ ...shot, t: shot.t * LENTO }));
  }
  let plan = shots();
  let posCurve = new THREE.CatmullRomCurve3(plan.map((s) => s.pos), false, 'centripetal');
  let lookCurve = new THREE.CatmullRomCurve3(plan.map((s) => s.look), false, 'centripetal');
  function placeCamera(t: number) {
    let i = 0;
    while (i < plan.length - 2 && t > plan[i + 1].t) i++;
    const a = plan[i];
    const b = plan[i + 1];
    // a velocidade é contínua: progresso suave dentro de cada trecho, sem parar nas chaves
    const k = phase(t, a.t, b.t);
    const kk = i === 0 ? smooth(k) * 0.5 + k * 0.5 : k;
    const u = (i + kk) / (plan.length - 1);
    posCurve.getPoint(u, camera.position);
    lookCurve.getPoint(u, tmp);
    const hand = 0.004;
    camera.position.x += Math.sin(t * 2.1) * hand;
    camera.position.y += Math.sin(t * 1.7 + 1) * hand;
    camera.lookAt(tmp);
    return tmp;
  }

  function layout() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = camera.aspect < 0.9 ? 56 : 40;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    plan = shots();
    posCurve = new THREE.CatmullRomCurve3(plan.map((s) => s.pos), false, 'centripetal');
    lookCurve = new THREE.CatmullRomCurve3(plan.map((s) => s.look), false, 'centripetal');
  }
  layout();
  window.addEventListener('resize', layout);

  // ---------- loop ----------
  const timer = new THREE.Timer();
  timer.connect(document);
  let elapsed = 0;
  let frames = 0;
  let dripAcc = 0;
  let stage: IntroStage | '' = '';
  let finished = false;
  let resolveDone!: () => void;
  const done = new Promise<void>((r) => (resolveDone = r));
  const lookTmp = new THREE.Vector3();

  function setStage(s: IntroStage) {
    if (stage !== s) {
      stage = s;
      cb.onStage(s);
    }
  }

  const bokeh = hq ? new BokehPass(scene, camera, { focus: 2, aperture: 0.006, maxblur: 0.01 }) : null;
  if (bokeh) renderer.setEffects([bokeh]);

  const lowerOpenMax = 1.95;
  // a revelação precisa cobrir até os cantos do quadro
  const revealMax = Math.hypot(0.5 * Math.max(1, camera.aspect), 0.5) * 1.25;

  function frame() {
    let realDt: number;
    if (record) {
      realDt = frames++ === 0 ? 0 : 1 / record.fps;
    } else {
      timer.update();
      const raw = frames < 2 ? 0 : timer.getDelta();
      frames++;
      realDt = Math.min(raw, 1 / 20) * speed;
    }
    const dt = Math.min(realDt, 1 / 30);
    elapsed += realDt;
    const t = elapsed;
    (window as unknown as { __introT: number }).__introT = t;

    if (t > T.leakStart) setStage('leak');
    if (t > T.grip) setStage('fix');
    if (t > T.fixed) setStage('ok');

    // painel: esquentando até 15 °C (alerta), depois esfria até 4 °C
    const warm = Math.round(9 + 6 * easeOut(phase(t, 0, 1.4 * LENTO)));
    const cool = easeInOut(phase(t, T.cooling, T.open - 0.1));
    const temp = cool > 0 ? Math.round(15 - 11 * cool) : warm;
    const warn = cool < 0.5;
    drawDisplay(temp, warn, Math.floor(t * 3) % 2 === 0);
    dispGlow.color.set(warn ? 0xff3b30 : 0x35c8ff);

    // técnico: lanterna acende, manifold chega e a mangueira é engatada
    const toolsIn = easeOut(phase(t, T.toolsIn, T.grip));
    work.intensity = 26 * smooth(phase(t, T.toBack, T.toolsIn + 0.3));
    tools.position.x = (1 - toolsIn) * 1.2;
    tools.visible = t > T.toolsIn - 0.05;
    hoseGroup.visible = tools.visible;
    const connect = easeInOut(phase(t, T.grip - 0.05, T.grip + 0.45));
    if (tools.visible) updateHoses(connect);
    // ponteiros: o de baixa sobe com o gás entrando; o de alta sobe com o compressor
    const gas = easeOut(phase(t, T.grip + 0.35, T.fixed));
    const run = smooth(phase(t, T.compressorOn, T.fixed + 0.4));
    needles[0].rotation.z = 2.1 - gas * 1.9 + Math.sin(t * 40) * 0.02 * run;
    needles[1].rotation.z = 2.1 - run * 2.6 + Math.sin(t * 37) * 0.02 * run;
    // compressor liga: vibra levemente e o LED do relé acende
    const on = t > T.compressorOn;
    compBody.position.x = on ? Math.sin(t * 190) * 0.0025 : 0;
    compBody.position.z = on ? Math.cos(t * 170) * 0.0018 : 0;
    (relayLed.material as THREE.MeshBasicMaterial).color.set(on ? 0x39ff6a : 0x113311);
    // gelo sobe pelo tubo de sucção
    const frostK = easeOut(phase(t, T.compressorOn + 0.2, T.open));
    frostGeo.setDrawRange(0, Math.floor((frostK * frostTotal) / 6) * 6);
    frost.visible = frostK > 0;

    // porta abre e a luz de dentro acende
    const openK = easeInOut(phase(t, T.open, T.reveal + 0.35));
    lowerDoor.pivot.rotation.y = -openK * lowerOpenMax;
    const lightK = smooth(phase(t, T.open + 0.05, T.open + 0.4));
    fridgeLight.intensity = lightK * 9 + easeIn(phase(t, T.reveal, T.end)) * 30;
    liner.emissiveIntensity = lightK * 0.12 + easeIn(phase(t, T.reveal, T.end)) * 1.1;

    const look = placeCamera(t);
    lookTmp.copy(look);

    // gotas: pingam da porta enquanto está quente
    const dripping = t < T.fixed + 0.2;
    dripAcc += dripping ? dt * 5.5 : 0;
    while (dripAcc >= 1) {
      dripAcc -= 1;
      const i = freeSlot();
      if (i >= 0) spawnDrip(i);
    }
    for (let i = 0; i < MAX; i++) {
      if (!alive[i]) {
        dummy.position.set(0, -50, 0);
        dummy.scale.setScalar(0);
        dummy.updateMatrix();
        drops.setMatrixAt(i, dummy.matrix);
        continue;
      }
      const ix = i * 3;
      vel[ix + 1] -= 9.8 * dt;
      pos[ix] += vel[ix] * dt;
      pos[ix + 1] += vel[ix + 1] * dt;
      pos[ix + 2] += vel[ix + 2] * dt;
      if (pos[ix + 1] <= size[i]) {
        addRipple(pos[ix], pos[ix + 2], 0.06 + size[i] * 4);
        alive[i] = 0;
        continue;
      }
      dir.set(vel[ix], vel[ix + 1], vel[ix + 2]);
      const sp = dir.length();
      dummy.position.set(pos[ix], pos[ix + 1], pos[ix + 2]);
      if (sp > 0.001) dummy.quaternion.setFromUnitVectors(up, dir.divideScalar(sp));
      const s = size[i];
      dummy.scale.set(s, s * (1 + Math.min(sp * 0.4, 2.5)), s);
      dummy.updateMatrix();
      drops.setMatrixAt(i, dummy.matrix);
    }
    drops.instanceMatrix.needsUpdate = true;
    for (let k = 0; k < hangX.length; k++) {
      const g = dripping ? ((t * 1.3 + hangGrow[k]) % 1) : 0;
      const s = 0.006 + g * 0.012;
      dummy.position.set(hangX[k], 0.255 - s * 0.8, FRONT + 0.03);
      dummy.quaternion.identity();
      dummy.scale.set(s, s * 1.35, s);
      dummy.updateMatrix();
      hang.setMatrixAt(k, dummy.matrix);
    }
    hang.instanceMatrix.needsUpdate = true;

    for (const r of ripples) {
      if (r.life < 0) continue;
      r.life += dt;
      const k = r.life / 0.8;
      if (k >= 1) {
        r.life = -1;
        r.mesh.visible = false;
        continue;
      }
      const s = r.s * (0.3 + k * 2.4);
      r.mesh.scale.set(s, s, 1);
      (r.mesh.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.22;
    }
    const wet = 0.55 + 0.45 * clamp01(t / T.fixed);
    puddle.scale.set(0.55 * wet, 0.75 * wet, 1);
    puddle.visible = true;
    floorMat.roughness = 0.32;

    // vapor frio escorrendo pela abertura da porta
    for (const v of vapor) {
      if (v.life < 0) {
        if (t >= v.born && t < T.end) {
          v.life = 0;
          v.sprite.visible = true;
          v.sprite.position.set((rand() - 0.5) * 1.0, 0.4 + rand() * 1.9, FRONT + 0.05);
          v.v.set((rand() - 0.5) * 0.25, -0.25 - rand() * 0.2, 0.3 + rand() * 0.35);
        }
        continue;
      }
      v.life += dt;
      const k = v.life / 1.6;
      if (k >= 1) {
        v.sprite.visible = false;
        continue;
      }
      v.sprite.position.addScaledVector(v.v, dt);
      if (v.sprite.position.y < 0.15) v.sprite.position.y = 0.15;
      const sc = 0.35 + k * 0.9;
      v.sprite.scale.set(sc, sc, 1);
      (v.sprite.material as THREE.SpriteMaterial).opacity = Math.sin(k * Math.PI) * 0.22;
    }

    if (bokeh) (bokeh.uniforms as { focus: THREE.IUniform<number> }).focus.value = camera.position.distanceTo(lookTmp);
    renderer.render(scene, camera);

    // furo de revelação no centro da tela, crescendo a partir da luz da geladeira
    if (t >= T.reveal) {
      const k = easeIn(phase(t, T.reveal, T.end - 0.08));
      cb.onReveal(k * revealMax);
    } else cb.onReveal(-1);

    if (!finished && t >= T.end) {
      finished = true;
      resolveDone();
    }
  }

  let disposed = false;
  async function prepare() {
    tools.visible = true;
    updateHoses(0);
    frost.visible = true;
    placeCamera(0);
    try {
      await renderer.compileAsync(scene, camera);
    } catch {
      /* compila no primeiro quadro */
    }
    if (disposed) return;
    renderer.render(scene, camera);
    tools.visible = false;
    hoseGroup.visible = false;
    frost.visible = false;
    if (record) {
      (window as unknown as { __introRecord: unknown }).__introRecord = {
        step: () => {
          frame();
          return { t: elapsed, done: elapsed >= T.end };
        },
        end: T.end,
      };
      cb.onReady();
      return;
    }
    timer.reset();
    renderer.setAnimationLoop(frame);
    cb.onReady();
  }
  prepare();

  function dispose() {
    disposed = true;
    renderer.setAnimationLoop(null);
    window.removeEventListener('resize', layout);
    timer.dispose();
    bokeh?.dispose();
    env.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }

  return {
    done,
    skip: () => resolveDone(),
    dispose,
  };
}
