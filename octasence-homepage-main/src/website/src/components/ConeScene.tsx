'use client';

import { Montserrat } from 'next/font/google';
import React, { useEffect, useId, useRef } from 'react';
import * as THREE from 'three';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

// ── Hybrid geometry builder ───────────────────────────────────────────────────
// Top half  (v 0→0.5) : cylinder,  radius R, height H,  y = H → 0
// Bottom half (v 0.5→1): sphere,   radius R, lower hemisphere, y = 0 → −R
function createHybridGeometry(
  R: number,
  H: number,
  wSeg: number,
  hSeg: number,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // ── Cylinder rings: y from H (top) down to 0 (equator) ───────────────────
  for (let j = 0; j <= hSeg; j++) {
    const t = j / hSeg; // 0 at top, 1 at equator
    const y = H * (1 - t);
    const v = t * 0.4; // UV v: 0 → 0.4
    for (let i = 0; i <= wSeg; i++) {
      const theta = (i / wSeg) * Math.PI * 2;
      positions.push(R * Math.cos(theta), y, R * Math.sin(theta));
      uvs.push(i / wSeg, v);
    }
  }

  // ── Sphere rings: phi from π/2 (equator, y=0) → π (south pole, y=−R) ────
  // Skip j=0 (duplicate of cylinder equator ring)
  for (let j = 1; j <= hSeg; j++) {
    const t = j / hSeg; // 0 at equator, 1 at south pole
    const phi = Math.PI / 2 + t * (Math.PI / 2);
    const y = R * Math.cos(phi); // 0 → −R
    const sinPhi = Math.sin(phi);
    const v = 0.4 + t * 0.6; // UV v: 0.4 → 1
    for (let i = 0; i <= wSeg; i++) {
      const theta = (i / wSeg) * Math.PI * 2;
      positions.push(
        R * sinPhi * Math.cos(theta),
        y,
        R * sinPhi * Math.sin(theta),
      );
      uvs.push(i / wSeg, v);
    }
  }

  // ── Faces ──────────────────────────────────────────────────────────────────
  // (a,b,d) winding → normal = (b-a)×(d-a) points INWARD toward centre.
  // Combined with FrontSide material the camera inside sees every face,
  // exactly mirroring the original sphere's scale(-1,1,1) + FrontSide trick.
  const totalRings = 2 * hSeg + 1;
  for (let ring = 0; ring < totalRings - 1; ring++) {
    for (let seg = 0; seg < wSeg; seg++) {
      const a = ring * (wSeg + 1) + seg;
      const b = a + (wSeg + 1);
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d); // inward normal
      indices.push(b, c, d); // inward normal
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

// ─────────────────────────────────────────────────────────────────────────────

const ConeScene = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const instanceId = `cone-scene-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    function updateTexture() {
        currentImageIndex = (currentImageIndex + 1) % imagePaths.length;

        const newTexture = textureLoader.load(imagePaths[currentImageIndex]);

        newTexture.colorSpace = THREE.SRGBColorSpace;
        newTexture.center.set(0.5, 0.5);
        newTexture.rotation = Math.PI;

        hybridMaterial.map = newTexture;
        hybridMaterial.needsUpdate = true;

        // dispose old texture to avoid memory leak
        texture.dispose();
        texture = newTexture;
      }

      // ⏱️ Rotate every hour (3600000 ms)
      const interval = setInterval(updateTexture, 3600000);
    const root = rootRef.current;
    if (!root) return;

    const sceneCanvas = root.querySelector('[data-cone-scene-canvas="scene"]');
    const overlayCanvas = root.querySelector(
      '[data-cone-scene-canvas="overlay"]',
    );
    const scrollHint = root.querySelector('[data-cone-scene-scroll-hint]');
    const stage = root.querySelector('[data-cone-scene-stage]');

    if (
      !(sceneCanvas instanceof HTMLCanvasElement) ||
      !(overlayCanvas instanceof HTMLCanvasElement) ||
      !(stage instanceof HTMLElement)
    ) {
      return;
    }

    const stageEl = stage;
    const rootEl = root;
    const overlayCanvasEl = overlayCanvas;

    document.fonts.load(`700 1em ${montserrat.style.fontFamily}`);

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas: sceneCanvas,
      antialias: true,
      alpha: false,
    });
    const MAX_PIXEL_RATIO = 1.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      72,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const textureLoader = new THREE.TextureLoader();

    const imagePaths = [
      '/assets/models/little-planet-pano1.jpg',
      '/assets/models/little-planet-pano3.jpg',
      '/assets/models/little-planet-pano4.jpg',
      '/assets/models/little-planet-pano7.jpg',
    ];

    let currentImageIndex = 0;

    let texture = textureLoader.load(imagePaths[currentImageIndex]);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.center.set(0.5, 0.5);
    texture.rotation = Math.PI;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.center.set(0.5, 0.5);
    texture.rotation = Math.PI;

    // ── Hybrid geometry ───────────────────────────────────────────────────────
    const HYBRID_RADIUS = 78; // sphere bottom-half radius & cylinder radius
    const CYLINDER_HEIGHT = 600; // cylinder height above equator

    const hybridGeometry = createHybridGeometry(
      HYBRID_RADIUS,
      CYLINDER_HEIGHT,
      96, // width segments
      48, // height segments per section
    );

    const hybridMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide, // inward normals → FrontSide visible from inside
    });

    const hybridMesh = new THREE.Mesh(hybridGeometry, hybridMaterial);
    hybridMesh.rotation.y = -Math.PI / 2;
    scene.add(hybridMesh);

    // ── Camera state ──────────────────────────────────────────────────────────
    const viewTarget = new THREE.Vector3();
    const downDir = new THREE.Vector3(0, -1, 0);
    const forwardDir = new THREE.Vector3(0, 0, -1);
    const yawAxis = new THREE.Vector3(0, 1, 0);
    const horizontalDir = new THREE.Vector3();
    const lookDir = new THREE.Vector3();

    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let lastFov = camera.fov;
    let lastOverlayProgress = Number.NaN;

    //  Camera falls from near the top of the cylinder …
    const CAMERA_START_Y = CYLINDER_HEIGHT * 0.9;
    //  … down to slightly below sphere centre
    const CAMERA_END_Y = -HYBRID_RADIUS * 0.4;

    const DESCENT_END_T = 0.42;
    const PAN_UP_END_T = 0.68;
    const OUTRO_START_T = PAN_UP_END_T + (1 - PAN_UP_END_T) * 0.5;
    const INTRO_END_T = 0.03;

    // ── Overlay canvas ────────────────────────────────────────────────────────
    const overlayCtx = overlayCanvasEl.getContext('2d')!;

    const textMaskCanvas = document.createElement('canvas');
    const textMaskCtx = textMaskCanvas.getContext('2d')!;

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
      const width = stageEl.clientWidth || window.innerWidth;
      const height = stageEl.clientHeight || window.innerHeight;
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO),
      );
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      overlayCanvasEl.width = width;
      overlayCanvasEl.height = height;
      textMaskCanvas.width = width;
      textMaskCanvas.height = height;
    }

    // ── Stage pinning ─────────────────────────────────────────────────────────
    function updateStagePin() {
      const rect = rootEl.getBoundingClientRect();

      if (rect.top > 0) {
        stageEl.style.position = 'absolute';
        stageEl.style.top = '0';
        stageEl.style.left = '0';
        stageEl.style.width = '100%';
        stageEl.style.height = '100vh';
        return;
      }

      if (rect.bottom < window.innerHeight) {
        stageEl.style.position = 'absolute';
        stageEl.style.bottom = '0';
        stageEl.style.left = '0';
        stageEl.style.width = '100%';
        stageEl.style.height = '100vh';
        return;
      }

      stageEl.style.position = 'fixed';
      stageEl.style.top = '0';
      stageEl.style.left = '0';
      stageEl.style.width = '100vw';
      stageEl.style.height = '100vh';
    }

    function clamp01(value: number) {
      return Math.min(Math.max(value, 0), 1);
    }

    // ── Scroll handler ────────────────────────────────────────────────────────
    function onScroll() {
      const rect = rootEl.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      const raw = clamp01(-rect.top / travel);
      targetScrollProgress =
        raw >= 0.82 ? 1 : THREE.MathUtils.smootherstep(raw, 0, 0.82);
      updateStagePin();
    }

    // ── Camera update ─────────────────────────────────────────────────────────
    function updateCamera(raw: number) {
      // Phase 1: fall (0 → DESCENT_END_T)
      const fallT = THREE.MathUtils.clamp(raw / DESCENT_END_T, 0, 1);

      // Phase 2: tilt up (DESCENT_END_T → PAN_UP_END_T)
      const panUpT =
        raw <= DESCENT_END_T
          ? 0
          : THREE.MathUtils.smootherstep(
              (Math.min(raw, PAN_UP_END_T) - DESCENT_END_T) /
                (PAN_UP_END_T - DESCENT_END_T),
              0,
              1,
            );

      // Phase 3: pan 120° right after the fall (PAN_UP_END_T → 1)
      const turnT =
        raw <= PAN_UP_END_T
          ? 0
          : THREE.MathUtils.smootherstep(
              (raw - PAN_UP_END_T) / (1 - PAN_UP_END_T),
              0,
              1,
            );

      // ── Camera position: falls straight down ────────────────────────────
      camera.position.set(
        0,
        THREE.MathUtils.lerp(CAMERA_START_Y, CAMERA_END_Y, fallT),
        0,
      );

      // ── Look direction ───────────────────────────────────────────────────
      // Phase 1 → look straight down  (-Y)
      // Phase 2 → tilt forward to horizontal  (-Z)
      // Phase 3 → pan right from -Z toward +Z by 180°
      // During fall: look down
      // After fall: blend toward forward, then continue a 120° yaw
      horizontalDir
        .copy(forwardDir)
        .applyAxisAngle(yawAxis, -Math.PI * turnT)
        .normalize();

      lookDir
        .set(0, 0, 0)
        .addScaledVector(downDir, 1 - panUpT)
        .addScaledVector(horizontalDir, panUpT)
        .normalize();

      camera.up.set(0, 1, 0);
      viewTarget.copy(camera.position).add(lookDir);
      camera.lookAt(viewTarget);

      // ── FOV ──────────────────────────────────────────────────────────────
      // Widens slightly during descent, then narrows back for the pan
      const nextFov =
        raw < DESCENT_END_T
          ? THREE.MathUtils.lerp(68, 82, raw / DESCENT_END_T)
          : raw < PAN_UP_END_T
            ? THREE.MathUtils.lerp(
                82,
                72,
                (raw - DESCENT_END_T) / (PAN_UP_END_T - DESCENT_END_T),
              )
            : 72;

      if (Math.abs(nextFov - lastFov) > 0.01) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
        lastFov = nextFov;
      }

      // ── Scroll hint ───────────────────────────────────────────────────────
      if (scrollHint instanceof HTMLElement) {
        scrollHint.style.opacity = raw < 0.08 ? String(1 - raw / 0.08) : '0';
      }
    }

    // ── drawCutoutText ────────────────────────────────────────────────────────
    function getZoomAnchorOffset(
      ctx: CanvasRenderingContext2D,
      centerX: number,
      text: string,
      index: number,
    ) {
      const safeIndex = THREE.MathUtils.clamp(index, 0, text.length - 1);
      const totalWidth = ctx.measureText(text).width;
      const prefix = text.slice(0, safeIndex);
      const glyph = text[safeIndex] ?? '';
      const left = centerX - totalWidth / 2;
      const prefixWidth = ctx.measureText(prefix).width;
      const glyphWidth = ctx.measureText(glyph).width;
      const anchorX = left + prefixWidth + glyphWidth / 2;
      return centerX - anchorX;
    }

    function drawCutoutText(
      alpha: number,
      zoom: number,
      small: string,
      big: string,
      w: number,
      h: number,
      zoomAnchor: { line: string; index: number } | null = null,
    ) {
      const o = textMaskCtx;
      o.clearRect(0, 0, w, h);

      const isMobile = w < 768;

      // ── Mobile layout: one word per line, left-aligned, uniform large size ──
      if (isMobile) {
        const words = [...small.split(' '), ...big.split(' ')].filter(Boolean);
        const padding = w * 0.07;
        const availableWidth = w - padding;

        // Outro zooms OUT (9.8 → 2.0): text must fit at zoom=2.
        // Intro zooms IN  (1.0 → 9.5): text must fit at zoom=1.
        const isOutro = big === 'AI';
        const minZoom = isOutro ? 2.0 : 1.0;

        // Fit the word at the *final* display size (baseFontSize × minZoom),
        // then back-calculate baseFontSize so zoom animation lands correctly.
        const SCALE_X = 0.92;
        let displayFontSize = w * 0.26;
        o.font = `700 ${displayFontSize}px ${montserrat.style.fontFamily}`;
        for (const word of words) {
          const measured = o.measureText(word).width * SCALE_X;
          if (measured > availableWidth) {
            displayFontSize *= availableWidth / measured;
          }
        }
        const baseFontSize = displayFontSize / minZoom;

        const fs = baseFontSize * zoom;
        const lineHeight = fs * 1.13;
        const totalHeight = words.length * lineHeight;
        const startY = (h - totalHeight) / 2 + fs * 0.88;

        o.fillStyle = 'rgba(0,0,0,1)';
        o.fillRect(0, 0, w, h);
        o.globalCompositeOperation = 'destination-out';
        o.fillStyle = 'rgba(255,255,255,1)';
        o.textAlign = 'left';
        o.textBaseline = 'alphabetic';
        o.font = `700 ${fs}px ${montserrat.style.fontFamily}`;

        words.forEach((word, i) => {
          o.save();
          o.translate(padding, startY + i * lineHeight);
          o.scale(SCALE_X, 1);
          o.fillText(word, 0, 0);
          o.restore();
        });

        o.globalCompositeOperation = 'source-over';
        overlayCtx.globalAlpha = alpha;
        overlayCtx.drawImage(textMaskCanvas, 0, 0);
        overlayCtx.globalAlpha = 1;
        return;
      }

      // ── Desktop layout: original small-line + big-line ──────────────────────
      const isAiOutro = big === 'AI';
      const isIntroTitle = big === 'Power of';
      const isIntroOverlay = small === 'Witness the' && big === 'Power of';
      const bigScaleBoost = isAiOutro ? 1.14 : isIntroTitle ? 0.88 : 1;
      const bs =
        Math.min(w * (isAiOutro ? 0.16 : 0.19), isAiOutro ? 250 : 300) *
        zoom *
        bigScaleBoost;
      const ss =
        Math.min(
          w * (isIntroTitle ? 0.056 : isIntroOverlay ? 0.058 : 0.05),
          isIntroTitle ? 72 : isIntroOverlay ? 74 : 64,
        ) *
        zoom;
      const cx = w / 2;
      const cy = h / 2;
      const gap = ss * 0.08;
      const textScaleX = isAiOutro ? 0.86 : isIntroTitle ? 0.84 : 0.96;
      const topY =
        cy - (ss + gap + bs * 0.82) / 2 + h * (isAiOutro ? 0.04 : -0.015);
      const sy = topY + ss * 0.84;
      const by = sy + gap + bs * (isAiOutro ? 0.52 : 0.5);
      let offsetX = 0;

      o.fillStyle = 'rgba(0,0,0,1)';
      o.fillRect(0, 0, w, h);
      o.globalCompositeOperation = 'destination-out';
      o.fillStyle = 'rgba(255,255,255,1)';
      o.textAlign = 'center';

      if (zoomAnchor?.line === 'big') {
        o.font = `700 ${bs}px ${montserrat.style.fontFamily}`;
        offsetX = getZoomAnchorOffset(o, cx, big, zoomAnchor.index);
      } else if (zoomAnchor?.line === 'small') {
        o.font = `700 ${ss}px ${montserrat.style.fontFamily}`;
        offsetX = getZoomAnchorOffset(o, cx, small, zoomAnchor.index);
      }

      o.font = `700 ${ss}px ${montserrat.style.fontFamily}`;
      o.textBaseline = 'alphabetic';
      o.save();
      o.translate(cx + offsetX, 0);
      o.scale(textScaleX, 1);
      o.fillText(small, 0, sy);
      o.restore();

      o.font = `700 ${bs}px ${montserrat.style.fontFamily}`;
      o.textBaseline = 'middle';
      o.save();
      o.translate(cx + offsetX, 0);
      o.scale(textScaleX, 1);
      o.fillText(big, 0, by);
      o.restore();

      o.globalCompositeOperation = 'source-over';

      overlayCtx.globalAlpha = alpha;
      overlayCtx.drawImage(textMaskCanvas, 0, 0);
      overlayCtx.globalAlpha = 1;
    }

    // ── drawOverlay ───────────────────────────────────────────────────────────
    function drawOverlay(progress: number) {
      const t = progress;
      const w = overlayCanvasEl.width;
      const h = overlayCanvasEl.height;
      overlayCtx.clearRect(0, 0, w, h);

      if (t < INTRO_END_T) {
        const lt = THREE.MathUtils.clamp(t / INTRO_END_T, 0, 1);
        const introZoomT = THREE.MathUtils.smootherstep(lt, 0, 1);
        const fadeStart = 0.78;
        const alpha =
          lt < fadeStart
            ? 1
            : 1 -
              THREE.MathUtils.smootherstep(
                (lt - fadeStart) / (1 - fadeStart),
                0,
                1,
              );
        const zoom = THREE.MathUtils.lerp(1, 9.5, introZoomT);
        drawCutoutText(alpha, zoom, 'Witness the', 'Power of', w, h);
      }

      if (t > OUTRO_START_T) {
        const lt = (t - OUTRO_START_T) / (1 - OUTRO_START_T);
        const alpha = Math.min(lt * 4, 1);
        const clampedLt = Math.min(lt, 1);
        const zoomT = clampedLt * (2 - clampedLt);
        const zoom = 9.8 - zoomT * 7.8;
        drawCutoutText(alpha, zoom, 'Breakthrough', 'AI', w, h, {
          line: 'big',
          index: 0,
        });
      }
    }

    function shouldRedrawOverlay(progress: number) {
      const inIntroWindow = progress < INTRO_END_T;
      const inOutroWindow = progress > OUTRO_START_T;

      return (
        inIntroWindow ||
        inOutroWindow ||
        Math.abs(progress - lastOverlayProgress) > 0.0005
      );
    }

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId = 0;
    let stopped = false;

    function animate() {
      if (stopped) return;
      rafId = requestAnimationFrame(animate);
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.18;
      if (Math.abs(scrollProgress - targetScrollProgress) < 0.0001) {
        scrollProgress = targetScrollProgress;
      }
      updateCamera(scrollProgress);
      renderer.render(scene, camera);
      if (shouldRedrawOverlay(scrollProgress)) {
        drawOverlay(scrollProgress);
        lastOverlayProgress = scrollProgress;
      }
    }

    resize();
    updateStagePin();
    onScroll();
    updateCamera(0);
    drawOverlay(0);
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      clearInterval(interval); // ✅ add this
      hybridGeometry.dispose();
      hybridMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [instanceId]);

  return (
    <>
      {/* 🔥 CONE SCENE ANIMATION */}
      <div
        id={instanceId}
        ref={rootRef}
        className="relative h-[550vh] w-full bg-black text-white"
      >
        <div
          data-cone-scene-stage
          className="absolute top-0 h-screen w-full overflow-hidden bg-black will-change-transform"
        >
          <canvas
            data-cone-scene-canvas="scene"
            className="absolute inset-0 h-full w-full"
          />
          <canvas
            data-cone-scene-canvas="overlay"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          <div
            data-cone-scene-scroll-hint
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.8rem] uppercase tracking-[0.2em] text-white/40"
          >
            scroll
          </div>
        </div>
      </div>

      <div
        className="relative z-20 flex flex-col items-center justify-center py-20 text-center -mt-[100px] bg-black text-white"
        style={{ overflow: 'clip' }}
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute left-1/3 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/8 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-baseline justify-center gap-4">
            <span className="text-[8vw] md:text-[6vw] font-semibold tracking-[-0.02em] leading-none">
              Agentic.
            </span>
            <span className="text-[3.5vw] md:text-[2.6vw] font-medium tracking-wide text-white/80">
              Autonomous.
            </span>
          </div>

          <h2 className="mt-6 text-[10vw] md:text-[6vw] font-semibold tracking-[-0.02em] bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent leading-none">
            Infrastructure.
          </h2>
        </div>
      </div>
    </>
  );
};

export default ConeScene;