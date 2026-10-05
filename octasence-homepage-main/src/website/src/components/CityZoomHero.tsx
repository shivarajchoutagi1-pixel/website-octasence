'use client';

import React, { useEffect, useId, useRef } from 'react';

const CityZoomHero = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const instanceId = `city-zoom-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let importMapScript: HTMLScriptElement | null = document.querySelector(
      'script[data-city-zoom-importmap]',
    );

    if (!importMapScript) {
      importMapScript = document.createElement('script');
      importMapScript.type = 'importmap';
      importMapScript.dataset.cityZoomImportmap = 'true';
      importMapScript.textContent = JSON.stringify({
        imports: {
          three:
            'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js',
          'three/addons/':
            'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/',
        },
      });
      document.head.appendChild(importMapScript);
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.dataset.rootId = instanceId;
    script.textContent = `
      import * as THREE from "three";
      import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

      async function init() {
      const root = document.getElementById(${JSON.stringify(instanceId)});
      if (!root) return;

      const sceneCanvas = root.querySelector('[data-city-zoom-canvas="scene"]');
      const overlayCanvas = root.querySelector('[data-city-zoom-canvas="overlay"]');
      const scrollHint = root.querySelector('[data-city-zoom-scroll-hint]');
      const stage = root.querySelector('[data-city-zoom-stage]');

      if (!(sceneCanvas instanceof HTMLCanvasElement) || !(overlayCanvas instanceof HTMLCanvasElement) || !(stage instanceof HTMLElement)) {
        return;
      }

      await document.fonts.load("800 1em 'Plus Jakarta Sans'");

      const renderer = new THREE.WebGLRenderer({
        canvas: sceneCanvas,
        antialias: true,
        alpha: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      scene.fog = new THREE.FogExp2(0x000000, 0.01);

      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 300);

      const MX = -1.58;
      const MZ = 1.07;
      const GROUND_Y = -3.8;
      const GLOBE_WRAP_RADIUS = 16;
      const PLANET_CORE_Y = GROUND_Y - GLOBE_WRAP_RADIUS;
      const CX = MX + 0.9;
      const CZ = MZ + 3.2;
      const CENTER_TARGET = new THREE.Vector3(MX, 0.2, MZ);
      const lookTarget = new THREE.Vector3();
      const FALL_START = new THREE.Vector3(CX, 72.0, CZ);
      const FALL_MID = new THREE.Vector3(CX, 40.0, CZ);
      const FALL_NEAR = new THREE.Vector3(CX, 8.0, CZ);
      const FALL_END = new THREE.Vector3(CX, 1.0, CZ);
      const ORBIT_RADIUS = Math.hypot(CX - MX, CZ - MZ);
      const ORBIT_START_ANGLE = Math.atan2(CZ - MZ, CX - MX);

      const fallPath = new THREE.CatmullRomCurve3([
        FALL_START.clone(),
        FALL_MID.clone(),
        FALL_NEAR.clone(),
        FALL_END.clone(),
      ]);

      camera.position.copy(fallPath.getPoint(0));
      camera.lookAt(CENTER_TARGET);
      camera.updateProjectionMatrix();

      const skyCanvas = document.createElement("canvas");
      skyCanvas.width = 2048;
      skyCanvas.height = 1024;
      const skyCtx = skyCanvas.getContext("2d");

      if (!skyCtx) {
        renderer.dispose();
        return;
      }

      const skyGradient = skyCtx.createLinearGradient(0, 0, 0, skyCanvas.height);
      skyGradient.addColorStop(0.0, "#12367d");
      skyGradient.addColorStop(0.55, "#2f67c4");
      skyGradient.addColorStop(1.0, "#7ec7ff");
      skyCtx.fillStyle = skyGradient;
      skyCtx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);

      const sunGlow = skyCtx.createRadialGradient(
        skyCanvas.width * 0.72, skyCanvas.height * 0.24, 18,
        skyCanvas.width * 0.72, skyCanvas.height * 0.24, 220
      );
      sunGlow.addColorStop(0.0, "rgba(255,255,255,0.95)");
      sunGlow.addColorStop(0.18, "rgba(255,248,210,0.95)");
      sunGlow.addColorStop(0.45, "rgba(255,239,186,0.55)");
      sunGlow.addColorStop(1.0, "rgba(255,239,186,0)");
      skyCtx.fillStyle = sunGlow;
      skyCtx.beginPath();
      skyCtx.arc(skyCanvas.width * 0.72, skyCanvas.height * 0.24, 220, 0, Math.PI * 2);
      skyCtx.fill();

      function drawCloud(cx, cy, scaleX, scaleY, alpha) {
        skyCtx.save();
        skyCtx.translate(cx, cy);
        skyCtx.scale(scaleX, scaleY);
        skyCtx.fillStyle = \`rgba(255,255,255,\${alpha})\`;
        skyCtx.beginPath();
        skyCtx.arc(-130, 20, 82, 0, Math.PI * 2);
        skyCtx.arc(-45, -18, 108, 0, Math.PI * 2);
        skyCtx.arc(70, -2, 88, 0, Math.PI * 2);
        skyCtx.arc(165, 28, 62, 0, Math.PI * 2);
        skyCtx.closePath();
        skyCtx.fill();
        skyCtx.restore();
      }

      function drawCloudStreak(cx, cy, radius, count, rotation, alpha) {
        skyCtx.save();
        skyCtx.translate(cx, cy);
        skyCtx.rotate(rotation);
        for (let i = 0; i < count; i++) {
          const t = i / (count - 1);
          const angle = -1.15 + t * 2.3;
          const len = radius * (0.82 + 0.33 * Math.sin(i * 1.4));
          const width = 22 + 18 * Math.cos(i * 1.1);
          skyCtx.save();
          skyCtx.rotate(angle);
          const grad = skyCtx.createLinearGradient(0, 0, len, 0);
          grad.addColorStop(0, \`rgba(255,255,255,\${alpha})\`);
          grad.addColorStop(0.45, \`rgba(255,255,255,\${alpha * 0.78})\`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          skyCtx.fillStyle = grad;
          skyCtx.beginPath();
          skyCtx.moveTo(0, 0);
          skyCtx.quadraticCurveTo(len * 0.33, -width, len, 0);
          skyCtx.quadraticCurveTo(len * 0.33, width, 0, 0);
          skyCtx.closePath();
          skyCtx.fill();
          skyCtx.restore();
        }
        skyCtx.restore();
      }

      drawCloud(360, 250, 1.6, 0.86, 0.86);
      drawCloud(1500, 210, 2.15, 1.0, 0.95);
      drawCloud(1270, 470, 1.5, 0.8, 0.82);
      drawCloud(630, 560, 1.1, 0.62, 0.72);
      drawCloud(1710, 660, 1.25, 0.7, 0.68);
      drawCloud(1010, 820, 0.95, 0.56, 0.46);
      drawCloud(820, 180, 0.85, 0.5, 0.66);
      drawCloud(1810, 360, 1.55, 0.82, 0.74);
      drawCloud(260, 720, 1.6, 0.75, 0.60);
      drawCloud(1080, 120, 1.2, 0.65, 0.70);
      drawCloud(1380, 760, 1.7, 0.8, 0.58);
      drawCloudStreak(1170, 390, 560, 15, -0.1, 0.62);
      drawCloudStreak(980, 370, 390, 10, 0.5, 0.34);
      drawCloudStreak(1560, 555, 320, 8, 0.9, 0.28);
      drawCloudStreak(620, 300, 300, 8, -0.55, 0.26);
      drawCloudStreak(1420, 250, 420, 10, 0.08, 0.36);
      drawCloudStreak(420, 500, 340, 8, -0.9, 0.22);

      const skyTexture = new THREE.CanvasTexture(skyCanvas);
      skyTexture.needsUpdate = true;
      scene.background = skyTexture;
      scene.fog.color = new THREE.Color(0x5c93df);

      const sky = new THREE.Mesh(
        new THREE.SphereGeometry(260, 48, 24),
        new THREE.MeshBasicMaterial({
          map: skyTexture,
          side: THREE.BackSide,
        })
      );
      scene.add(sky);

      const wrapCanvas = document.createElement("canvas");
      wrapCanvas.width = 1024;
      wrapCanvas.height = 1024;
      const wrapCtx = wrapCanvas.getContext("2d");

      if (!wrapCtx) {
        skyTexture.dispose();
        sky.geometry.dispose();
        sky.material.dispose();
        renderer.dispose();
        return;
      }

      const wrapGrad = wrapCtx.createLinearGradient(0, 0, 0, wrapCanvas.height);
      wrapGrad.addColorStop(0.0, "rgba(39,112,208,0)");
      wrapGrad.addColorStop(0.10, "rgba(73,150,232,0.28)");
      wrapGrad.addColorStop(0.48, "rgba(120,186,246,0.50)");
      wrapGrad.addColorStop(0.85, "rgba(88,160,235,0.24)");
      wrapGrad.addColorStop(1.0, "rgba(39,112,208,0)");
      wrapCtx.fillStyle = wrapGrad;
      wrapCtx.fillRect(0, 0, wrapCanvas.width, wrapCanvas.height);

      function paintWrapCloud(cx, cy, scaleX, scaleY, alpha, rotation = 0) {
        wrapCtx.save();
        wrapCtx.translate(cx, cy);
        wrapCtx.rotate(rotation);
        wrapCtx.scale(scaleX, scaleY);
        wrapCtx.fillStyle = \`rgba(255,255,255,\${alpha})\`;
        wrapCtx.beginPath();
        wrapCtx.arc(-140, 15, 80, 0, Math.PI * 2);
        wrapCtx.arc(-40, -20, 110, 0, Math.PI * 2);
        wrapCtx.arc(80, -5, 92, 0, Math.PI * 2);
        wrapCtx.arc(185, 22, 66, 0, Math.PI * 2);
        wrapCtx.closePath();
        wrapCtx.fill();
        wrapCtx.restore();
      }

      function paintWrapMist(y, amp, alpha) {
        wrapCtx.beginPath();
        wrapCtx.moveTo(0, y);
        for (let x = 0; x <= wrapCanvas.width; x += 50) {
          const wave = Math.sin(x / 120) * amp + Math.cos(x / 70) * amp * 0.35;
          wrapCtx.lineTo(x, y + wave);
        }
        wrapCtx.lineTo(wrapCanvas.width, y + 120);
        wrapCtx.lineTo(0, y + 120);
        wrapCtx.closePath();
        wrapCtx.fillStyle = \`rgba(255,255,255,\${alpha})\`;
        wrapCtx.fill();
      }

      paintWrapMist(120, 18, 0.08);
      paintWrapMist(420, 24, 0.06);
      paintWrapMist(760, 16, 0.05);
      paintWrapCloud(260, 170, 1.35, 0.62, 0.34, -0.12);
      paintWrapCloud(760, 210, 1.7, 0.72, 0.42, 0.06);
      paintWrapCloud(540, 480, 1.5, 0.64, 0.24, -0.18);
      paintWrapCloud(860, 700, 1.3, 0.56, 0.18, 0.14);

      const contrail = wrapCtx.createLinearGradient(620, 480, 1040, 430);
      contrail.addColorStop(0.0, "rgba(255,255,255,0)");
      contrail.addColorStop(0.3, "rgba(255,255,255,0.8)");
      contrail.addColorStop(0.7, "rgba(255,255,255,0.85)");
      contrail.addColorStop(1.0, "rgba(255,255,255,0)");
      wrapCtx.strokeStyle = contrail;
      wrapCtx.lineWidth = 8;
      wrapCtx.lineCap = "round";
      wrapCtx.beginPath();
      wrapCtx.moveTo(610, 500);
      wrapCtx.lineTo(1040, 435);
      wrapCtx.stroke();

      const wrapTexture = new THREE.TextureLoader().load("/assets/models/wrap-sky.jpg");
      wrapTexture.wrapS = THREE.RepeatWrapping;
      wrapTexture.wrapT = THREE.ClampToEdgeWrapping;
      wrapTexture.colorSpace = THREE.SRGBColorSpace;

      const wrapCone = new THREE.Mesh(
        new THREE.CylinderGeometry(62, 18, 118, 96, 1, true),
        new THREE.MeshBasicMaterial({
          map: wrapTexture,
          transparent: true,
          opacity: 0.92,
          side: THREE.BackSide,
          depthWrite: false,
          blending: THREE.NormalBlending,
        })
      );
      wrapCone.position.set(MX, PLANET_CORE_Y + 34, MZ);
      scene.add(wrapCone);

      const cloudCanvas = document.createElement("canvas");
      cloudCanvas.width = 512;
      cloudCanvas.height = 256;
      const cloudCtx = cloudCanvas.getContext("2d");

      if (!cloudCtx) {
        wrapTexture.dispose();
        wrapCone.geometry.dispose();
        wrapCone.material.dispose();
        skyTexture.dispose();
        sky.geometry.dispose();
        sky.material.dispose();
        renderer.dispose();
        return;
      }

      const cloudGrad = cloudCtx.createRadialGradient(256, 128, 30, 256, 128, 180);
      cloudGrad.addColorStop(0.0, "rgba(255,255,255,0.98)");
      cloudGrad.addColorStop(0.35, "rgba(255,255,255,0.9)");
      cloudGrad.addColorStop(0.7, "rgba(255,255,255,0.45)");
      cloudGrad.addColorStop(1.0, "rgba(255,255,255,0)");
      cloudCtx.fillStyle = cloudGrad;
      cloudCtx.beginPath();
      cloudCtx.ellipse(256, 128, 210, 92, 0, 0, Math.PI * 2);
      cloudCtx.fill();

      const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
      const cloudGroup = new THREE.Group();
      const cloudSpecs = [
        { x: -28, y: 18, z: -8, sx: 30, sy: 12 },
        { x: 24, y: 20, z: -16, sx: 36, sy: 14 },
        { x: 32, y: 9, z: 8, sx: 26, sy: 10 },
        { x: -18, y: 7, z: 22, sx: 22, sy: 9 },
        { x: 10, y: 24, z: 26, sx: 28, sy: 11 },
        { x: -34, y: 12, z: 16, sx: 24, sy: 10 },
      ];

      for (const spec of cloudSpecs) {
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
          })
        );
        sprite.position.set(MX + spec.x, spec.y, MZ + spec.z);
        sprite.scale.set(spec.sx, spec.sy, 1);
        cloudGroup.add(sprite);
      }
      scene.add(cloudGroup);

      scene.add(new THREE.AmbientLight(0xffffff, 1.5));
      scene.add(new THREE.HemisphereLight(0xd7ecff, 0x2b4e7a, 1.6));

      const sun = new THREE.DirectionalLight(0xfff4e0, 5);
      sun.position.set(20, 40, 20);
      scene.add(sun);

      const fill = new THREE.DirectionalLight(0xaad4ff, 1.2);
      fill.position.set(-20, 15, -15);
      scene.add(fill);

      const bounce = new THREE.DirectionalLight(0x334466, 0.5);
      bounce.position.set(0, -10, 0);
      scene.add(bounce);

      function bendCityToGlobe(rootNode) {
        rootNode.traverse((obj) => {
          if (!obj.isMesh || !obj.geometry?.attributes?.position) return;

          const geometry = obj.geometry.clone();
          const pos = geometry.attributes.position;

          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);

            const dx = x - MX;
            const dz = z - MZ;
            const localHeight = y - GROUND_Y;
            const radius = GLOBE_WRAP_RADIUS + localHeight;
            const angleX = dx / GLOBE_WRAP_RADIUS;
            const angleZ = dz / GLOBE_WRAP_RADIUS;

            pos.setXYZ(
              i,
              MX + Math.sin(angleX) * radius,
              GROUND_Y - GLOBE_WRAP_RADIUS + Math.cos(angleX) * Math.cos(angleZ) * radius,
              MZ + Math.sin(angleZ) * radius
            );
          }

          pos.needsUpdate = true;
          geometry.computeVertexNormals();
          geometry.computeBoundingSphere();
          geometry.computeBoundingBox();
          obj.geometry = geometry;
          obj.frustumCulled = false;
        });
      }

      let cityScene = null;
      let cityDisposed = false;

      const loader = new GLTFLoader();
      loader.load(
        "https://k8yyguwidv0v3xnn.public.blob.vercel-storage.com/london_financial_district.glb",
        (gltf) => {
          if (cityDisposed) return;
          bendCityToGlobe(gltf.scene);
          gltf.scene.rotation.y = Math.PI / 3;
          cityScene = gltf.scene;
          scene.add(gltf.scene);
        },
        undefined,
        (err) => {
          console.warn("CityZoomHero: optional GLB not found or failed to load.", err);
        }
      );

      const overlayCtx = overlayCanvas.getContext("2d");
      if (!overlayCtx) {
        renderer.dispose();
        return;
      }

      const textMaskCanvas = document.createElement("canvas");
      const textMaskCtx = textMaskCanvas.getContext("2d");
      if (!textMaskCtx) {
        renderer.dispose();
        return;
      }

      let lastFov = camera.fov;

      function resize() {
        const width = stage.clientWidth || window.innerWidth;
        const height = stage.clientHeight || window.innerHeight;
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        overlayCanvas.width = width;
        overlayCanvas.height = height;
        textMaskCanvas.width = width;
        textMaskCanvas.height = height;
      }

      function updateStagePin() {
        const rect = root.getBoundingClientRect();

        if (rect.top > 0) {
          stage.style.position = "absolute";
          stage.style.top = "0";
          stage.style.left = "0";
          stage.style.width = "100%";
          stage.style.height = "100vh";
          return;
        }

        if (rect.bottom < window.innerHeight) {
          stage.style.position = "absolute";
          stage.style.bottom = "0";
          stage.style.left = "0";
          stage.style.width = "100%";
          stage.style.height = "100vh";
          return;
        }

        // ✅ FIXED (no rect.left / width)
        stage.style.position = "fixed";
        stage.style.top = "0";
        stage.style.left = "0";
        stage.style.width = "100vw";
        stage.style.height = "100vh";
      }

      let scrollProgress = 0;
      let targetScrollProgress = 0;

      function clamp01(value) {
        return Math.min(Math.max(value, 0), 1);
      }

      function drawOverlay() {
        const t = scrollProgress;
        const w = overlayCanvas.width;
        const h = overlayCanvas.height;
        overlayCtx.clearRect(0, 0, w, h);

        if (t < 0.22) {
          const lt = t / 0.22;
          const zoom = 1 + Math.pow(lt, 2) * 15;
          const alpha = lt < 0.65 ? 1 : 1 - ((lt - 0.65) / 0.35);
          drawCutoutText(alpha, zoom, "Witness the", "Power of", w, h);
        }

        if (t > 0.74) {
          const lt = (t - 0.74) / 0.20;
          const alpha = Math.min(lt * 4, 1);
          const clampedLt = Math.min(lt, 1);
          const zoomT = clampedLt * (2 - clampedLt);
          const zoom = 9.8 - zoomT * 7.8;
          drawCutoutText(alpha, zoom, "Breakthrough", "AI", w, h, {
            line: "big",
            index: 0,
          });
        }
      }

      function getZoomAnchorOffset(ctx2d, centerX, text, index) {
        const safeIndex = THREE.MathUtils.clamp(index, 0, text.length - 1);
        const totalWidth = ctx2d.measureText(text).width;
        const prefix = text.slice(0, safeIndex);
        const glyph = text[safeIndex] ?? "";
        const left = centerX - totalWidth / 2;
        const prefixWidth = ctx2d.measureText(prefix).width;
        const glyphWidth = ctx2d.measureText(glyph).width;
        const anchorX = left + prefixWidth + glyphWidth / 2;
        return centerX - anchorX;
      }

      function drawCutoutText(alpha, zoom, small, big, w, h, zoomAnchor = null) {
        const o = textMaskCtx;
        o.clearRect(0, 0, w, h);

        const isAiOutro = big === "AI";
        const bigScaleBoost = isAiOutro ? 1.04 : 1;
        const bs = Math.min(w * (isAiOutro ? 0.145 : 0.19), isAiOutro ? 220 : 300) * zoom * bigScaleBoost;
        const ss = Math.min(w * 0.042, 52) * zoom;
        const cx = w / 2;
        const cy = h / 2;
        const gap = ss * (isAiOutro ? 0.28 : 0.08);
        const textScaleX = isAiOutro ? 0.86 : 0.92;
        const topY = cy - (ss + gap + bs * 0.82) / 2 + h * 0.04;
        const sy = topY + ss * 0.84;
        const by = sy + gap + bs * (isAiOutro ? 0.64 : 0.5);
        let offsetX = 0;

        o.fillStyle = "rgba(0,0,0,1)";
        o.fillRect(0, 0, w, h);
        o.globalCompositeOperation = "destination-out";
        o.fillStyle = "rgba(255,255,255,1)";
        o.textAlign = "center";

        if (zoomAnchor?.line === "big") {
          o.font = \`700 \${bs}px "Plus Jakarta Sans", sans-serif\`;
          offsetX = getZoomAnchorOffset(o, cx, big, zoomAnchor.index);
        } else if (zoomAnchor?.line === "small") {
          o.font = \`700 \${ss}px "Plus Jakarta Sans", sans-serif\`;
          offsetX = getZoomAnchorOffset(o, cx, small, zoomAnchor.index);
        }

        o.font = \`700 \${ss}px "Plus Jakarta Sans", sans-serif\`;
        o.textBaseline = "alphabetic";
        o.save();
        o.translate(cx + offsetX, 0);
        o.scale(textScaleX, 1);
        o.fillText(small, 0, sy);
        o.restore();

        o.font = \`700 \${bs}px "Plus Jakarta Sans", sans-serif\`;
        o.textBaseline = "middle";
        o.save();
        o.translate(cx + offsetX, 0);
        o.scale(textScaleX, 1);
        o.fillText(big, 0, by);
        o.restore();
        o.globalCompositeOperation = "source-over";

        overlayCtx.globalAlpha = alpha;
        overlayCtx.drawImage(textMaskCanvas, 0, 0);
        overlayCtx.globalAlpha = 1;
      }

      function easeFall(raw) {
        if (raw < 0.22) {
          const t = raw / 0.22;
          return 0.22 * (t * t);
        }
        if (raw < 0.50) {
          const t = (raw - 0.22) / 0.28;
          return 0.22 + 0.28 * (1 - Math.pow(1 - t, 3));
        }
        if (raw < 0.88) {
          return 0.50 + 0.38 * ((raw - 0.50) / 0.38);
        }
        const t = (raw - 0.88) / 0.12;
        const s = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        return 0.88 + 0.12 * s;
      }

      function easeOrbit(raw) {
        return THREE.MathUtils.smootherstep(raw, 0, 1);
      }

      function updateCamera(raw) {
        if (raw < 0.50) {
          const t = easeFall(Math.min(raw / 0.50, 0.9999));
          camera.position.copy(fallPath.getPoint(t));
        } else {
          const t = easeOrbit(Math.min((raw - 0.50) / 0.50, 0.9999));
          const angle = ORBIT_START_ANGLE + (Math.PI / 2) * t;
          const lift = THREE.MathUtils.lerp(FALL_END.y, FALL_END.y + 1.6, t);
          camera.position.set(
            MX + Math.cos(angle) * ORBIT_RADIUS,
            lift,
            MZ + Math.sin(angle) * ORBIT_RADIUS
          );
        }

        lookTarget.copy(CENTER_TARGET);
        camera.lookAt(lookTarget);

        const nextFov = raw < 0.22
          ? THREE.MathUtils.lerp(75, 85, raw / 0.22)
          : THREE.MathUtils.lerp(85, 55, (raw - 0.22) / 0.78);
        if (Math.abs(nextFov - lastFov) > 0.01) {
          camera.fov = nextFov;
          camera.updateProjectionMatrix();
          lastFov = nextFov;
        }

        scene.fog.density = THREE.MathUtils.lerp(0.010, 0.028, Math.max(0, (raw - 0.22) / 0.78));
        if (scrollHint instanceof HTMLElement) {
          scrollHint.style.opacity = raw < 0.08 ? String(1 - (raw / 0.08)) : "0";
        }
      }

      function onScroll() {
        const rect = root.getBoundingClientRect();
        const travel = Math.max(rect.height - window.innerHeight, 1);
        const raw = clamp01(-rect.top / travel);
        targetScrollProgress =
          raw >= 0.82 ? 1 : THREE.MathUtils.smootherstep(raw, 0.04, 0.82);
        updateStagePin();
      }

      resize();
      updateStagePin();
      onScroll();

      let rafId = 0;
      let stopped = false;

      function animate() {
        if (stopped) return;
        rafId = requestAnimationFrame(animate);
        scrollProgress = THREE.MathUtils.lerp(scrollProgress, targetScrollProgress, 0.12);
        if (Math.abs(scrollProgress - targetScrollProgress) < 0.0001) {
          scrollProgress = targetScrollProgress;
        }
        updateCamera(scrollProgress);
        renderer.render(scene, camera);
        drawOverlay();
      }

      animate();

      window.addEventListener("resize", resize);
      window.addEventListener("scroll", onScroll, { passive: true });

      root.__cityZoomCleanup = () => {
        stopped = true;
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);

        if (cityScene) {
          scene.remove(cityScene);
          cityScene.traverse((obj) => {
            if (obj.geometry?.dispose) obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((material) => material?.dispose?.());
            } else if (obj.material?.dispose) {
              obj.material.dispose();
            }
          });
        }
        cityDisposed = true;

        cloudGroup.children.forEach((child) => {
          if (child.material?.dispose) child.material.dispose();
        });
        cloudTexture.dispose();
        wrapTexture.dispose();
        skyTexture.dispose();
        wrapCone.geometry.dispose();
        wrapCone.material.dispose();
        sky.geometry.dispose();
        sky.material.dispose();
        renderer.dispose();
      };
      }

      init().catch((error) => {
        console.error("CityZoomHero failed to initialize.", error);
      });
    `;

    document.body.appendChild(script);

    return () => {
      const currentRoot = rootRef.current as
        | (HTMLDivElement & { __cityZoomCleanup?: () => void })
        | null;
      currentRoot?.__cityZoomCleanup?.();
      script.remove();
    };
  }, [instanceId]);

  return (
    <>
  {/* 🔥 HERO ANIMATION */}
  <div
    id={instanceId}
    ref={rootRef}
    className="relative h-[420vh] w-full bg-black text-white"
  >
    <div
      data-city-zoom-stage
      className="absolute top-0 h-screen w-full overflow-hidden bg-black will-change-transform"
    >
      <canvas data-city-zoom-canvas="scene" className="absolute inset-0 h-full w-full" />
      <canvas data-city-zoom-canvas="overlay" className="pointer-events-none absolute inset-0 h-full w-full" />

      <div
        data-city-zoom-scroll-hint
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.8rem] uppercase tracking-[0.2em] text-white/40"
      >
        scroll
      </div>
    </div>
  </div>


<div className="relative z-20 flex flex-col items-center justify-center py-20 text-center -mt-[100px] bg-black text-white" style={{ overflow: 'clip' }}>

  {/* Background glow — contained */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl" />
    <div className="absolute left-1/3 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/8 blur-3xl" />
  </div>

  {/* Content */}
  <div className="relative z-10">

    {/* Top line */}
    <div className="flex items-baseline justify-center gap-4">
      <span className="text-[8vw] md:text-[6vw] font-semibold tracking-[-0.02em] leading-none">
        Agentic.
      </span>

      <span className="text-[3.5vw] md:text-[2.6vw] font-medium tracking-wide text-white/80">
        Autonomous.
      </span>
    </div>

    {/* Bottom line */}
    <h2 className="mt-6 text-[10vw] md:text-[6vw] font-semibold tracking-[-0.02em] bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent leading-none">
      Infrastructure.
    </h2>

  </div>
</div>
</>
  );
};

export default CityZoomHero;

