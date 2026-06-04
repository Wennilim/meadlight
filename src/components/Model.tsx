import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import {
  ACESFilmicToneMapping,
  Box3,
  CanvasTexture,
  DoubleSide,
  EquirectangularReflectionMapping,
  Euler,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  PCFSoftShadowMap,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import type { Group, Texture } from "three";
import { OBJLoader } from "three-stdlib";

type ModelProps = {
  src: string;
  scrollProgress: MotionValue<number>;
};

const pathRotateY = [-0.3, Math.PI * 2.2, Math.PI * 4.3, Math.PI * 6, Math.PI * 8, Math.PI * 10];
const pathRotateZ = [-0.3, -0.3, -0.3, -0.3, -0.3, -0.3];
const stops = [0, 0.18, 0.38, 0.58, 0.78, 1];
const texturePath = "/models/bottle";
const baseModelScale = 5.3;

RectAreaLightUniformsLib.init();

function getResponsiveBottleLayout(width: number, viewportWidth: number) {
  if (width < 460) {
    return {
      scale: 2.8,
      x: viewportWidth * 0.3,
      y: -0.35,
      pathX: [1, 1, -1, 1, 1, 1],
      pathY: [-0.2, 0, 0, 0, 0, 0],
    };
  }
  if (width < 768) {
    return {
      scale: 4,
      x: viewportWidth * 0.2,
      y: -0.35,
      pathX: [1, 1, -1, 1, 1, 1],
      pathY: [0, 0, 0, 0, 0, 0],
    };
  }

  if (width < 1280) {
    return {
      scale: 4.3,
      x: viewportWidth * 0.28,
      y: -0.12,
      pathX: [1, 1, -1, 1, 1, 0.9],
      pathY: [0, 0, 0, 0, 0, 1.5],
    };
  }

  if (width < 1680) {
    return {
      scale: 5,
      x: viewportWidth * 0.25,
      y: -0.14,
      pathX: [1, 0, -1, 1, 1, 1.2],
      pathY: [0, 0, 0, 0, 0, 1.5],
    };
  }

  return {
    scale: 5,
    x: viewportWidth * 0.25,
    y: -0.16,
    pathX: [1, 0, -1, 1, 1, 0.9],
    pathY: [0, 0, 0, 0, 0, 2],
  };
}

function followPath(progress: number, output: number[]) {
  const point = MathUtils.clamp(progress, 0, 1);

  for (let index = 0; index < stops.length - 1; index += 1) {
    const start = stops[index];
    const end = stops[index + 1];

    if (point >= start && point <= end) {
      const segmentProgress = (point - start) / (end - start);

      return MathUtils.lerp(
        output[index],
        output[index + 1],
        MathUtils.smoothstep(segmentProgress, 0, 1),
      );
    }
  }

  return output[output.length - 1];
}

function createLighterYellowTexture(
  colorTexture: Texture,
  alphaTexture: Texture,
) {
  const source = colorTexture.image as CanvasImageSource & {
    height?: number;
    naturalHeight?: number;
    naturalWidth?: number;
    width?: number;
  };
  const alphaSource = alphaTexture.image as CanvasImageSource & {
    height?: number;
    naturalHeight?: number;
    naturalWidth?: number;
    width?: number;
  };
  const width = source.naturalWidth ?? source.width ?? 0;
  const height = source.naturalHeight ?? source.height ?? 0;
  const canvas = document.createElement("canvas");
  const alphaCanvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const alphaContext = alphaCanvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  alphaCanvas.width = width;
  alphaCanvas.height = height;

  if (!context || !alphaContext || width === 0 || height === 0) {
    return colorTexture.clone();
  }

  context.drawImage(source, 0, 0, width, height);
  alphaContext.drawImage(alphaSource, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);
  const alphaImageData = alphaContext.getImageData(0, 0, width, height);
  const { data } = imageData;
  const alphaData = alphaImageData.data;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const aBrightness =
      (alphaData[index] + alphaData[index + 1] + alphaData[index + 2]) / 3;

    const isYellow =
      red > 135 &&
      green > 80 &&
      red > blue * 1.35 &&
      green > blue * 1.05 &&
      red >= green * 0.85;
    const isWhiteLabel = red > 215 && green > 205 && blue > 175;
    const isLabel =
      aBrightness > 200 ||
      isWhiteLabel ||
      (red < 90 && green < 90 && blue < 90);

    if (isYellow && !isWhiteLabel) {
      if (isLabel) {
        data[index] = MathUtils.lerp(red, 180, 0.55);
        data[index + 1] = MathUtils.lerp(green, 110, 0.55);
        data[index + 2] = MathUtils.lerp(blue, 15, 0.55);
      } else {
        data[index] = MathUtils.lerp(red, 252, 0.6);
        data[index + 1] = MathUtils.lerp(green, 235, 0.6);
        data[index + 2] = MathUtils.lerp(blue, 160, 0.6);
      }
    }
  }

  context.putImageData(imageData, 0, 0);

  const adjustedTexture = new CanvasTexture(canvas);
  adjustedTexture.colorSpace = SRGBColorSpace;
  adjustedTexture.flipY = colorTexture.flipY;
  adjustedTexture.wrapS = colorTexture.wrapS;
  adjustedTexture.wrapT = colorTexture.wrapT;
  adjustedTexture.needsUpdate = true;

  return adjustedTexture;
}

function createLiquidAlphaTexture(
  alphaTexture: Texture,
  colorTexture: Texture,
) {
  const alphaSource = alphaTexture.image as CanvasImageSource & {
    height?: number;
    naturalHeight?: number;
    naturalWidth?: number;
    width?: number;
  };
  const colorSource = colorTexture.image as CanvasImageSource & {
    height?: number;
    naturalHeight?: number;
    naturalWidth?: number;
    width?: number;
  };
  const width = alphaSource.naturalWidth ?? alphaSource.width ?? 0;
  const height = alphaSource.naturalHeight ?? alphaSource.height ?? 0;
  const alphaCanvas = document.createElement("canvas");
  const colorCanvas = document.createElement("canvas");
  const alphaContext = alphaCanvas.getContext("2d");
  const colorContext = colorCanvas.getContext("2d");

  alphaCanvas.width = width;
  alphaCanvas.height = height;
  colorCanvas.width = width;
  colorCanvas.height = height;

  if (!alphaContext || !colorContext || width === 0 || height === 0) {
    return alphaTexture.clone();
  }

  alphaContext.drawImage(alphaSource, 0, 0, width, height);
  colorContext.drawImage(colorSource, 0, 0, width, height);

  const alphaImageData = alphaContext.getImageData(0, 0, width, height);
  const colorImageData = colorContext.getImageData(0, 0, width, height);
  const { data } = alphaImageData;
  const colorData = colorImageData.data;

  for (let index = 0; index < data.length; index += 4) {
    const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3;
    const red = colorData[index];
    const green = colorData[index + 1];
    const blue = colorData[index + 2];
    const isLiquid =
      red > 135 &&
      green > 75 &&
      red > blue * 1.45 &&
      green > blue * 1.1 &&
      red >= green * 0.82;
    const isLabel =
      brightness > 200 ||
      (red > 210 && green > 200 && blue > 175) ||
      (red < 90 && green < 90 && blue < 90);
    const liftedAlpha = isLabel
      ? 255
      : isLiquid
        ? MathUtils.clamp(110 + brightness * 0.16, 110, 160)
        : MathUtils.clamp(168 + brightness * 0.22, 168, 226);

    data[index] = liftedAlpha;
    data[index + 1] = liftedAlpha;
    data[index + 2] = liftedAlpha;
  }

  alphaContext.putImageData(alphaImageData, 0, 0);

  const adjustedTexture = new CanvasTexture(alphaCanvas);
  adjustedTexture.flipY = alphaTexture.flipY;
  adjustedTexture.wrapS = alphaTexture.wrapS;
  adjustedTexture.wrapT = alphaTexture.wrapT;
  adjustedTexture.needsUpdate = true;

  return adjustedTexture;
}

function createTransmissionTexture(
  alphaTexture: Texture,
  colorTexture: Texture,
) {
  const alphaSource = alphaTexture.image as CanvasImageSource & {
    height?: number;
    naturalHeight?: number;
    naturalWidth?: number;
    width?: number;
  };
  const colorSource = colorTexture.image as CanvasImageSource & {
    height?: number;
    naturalHeight?: number;
    naturalWidth?: number;
    width?: number;
  };
  const width = alphaSource.naturalWidth ?? alphaSource.width ?? 0;
  const height = alphaSource.naturalHeight ?? alphaSource.height ?? 0;
  const alphaCanvas = document.createElement("canvas");
  const colorCanvas = document.createElement("canvas");
  const transCanvas = document.createElement("canvas");
  const alphaContext = alphaCanvas.getContext("2d");
  const colorContext = colorCanvas.getContext("2d");
  const transContext = transCanvas.getContext("2d");

  alphaCanvas.width = width;
  alphaCanvas.height = height;
  colorCanvas.width = width;
  colorCanvas.height = height;
  transCanvas.width = width;
  transCanvas.height = height;

  if (
    !alphaContext ||
    !colorContext ||
    !transContext ||
    width === 0 ||
    height === 0
  ) {
    return alphaTexture.clone();
  }

  alphaContext.drawImage(alphaSource, 0, 0, width, height);
  colorContext.drawImage(colorSource, 0, 0, width, height);

  const alphaImageData = alphaContext.getImageData(0, 0, width, height);
  const colorImageData = colorContext.getImageData(0, 0, width, height);
  const transImageData = transContext.createImageData(width, height);

  const { data } = alphaImageData;
  const colorData = colorImageData.data;
  const tData = transImageData.data;

  for (let index = 0; index < data.length; index += 4) {
    const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3;
    const red = colorData[index];
    const green = colorData[index + 1];
    const blue = colorData[index + 2];

    // label area (white, text, or bright in mask)
    const isLabel =
      brightness > 200 ||
      (red > 210 && green > 200 && blue > 175) ||
      (red < 90 && green < 90 && blue < 90);
    const transmission = isLabel ? 0 : 255;

    tData[index] = transmission;
    tData[index + 1] = transmission;
    tData[index + 2] = transmission;
    tData[index + 3] = 255;
  }

  transContext.putImageData(transImageData, 0, 0);

  const adjustedTexture = new CanvasTexture(transCanvas);
  adjustedTexture.flipY = alphaTexture.flipY;
  adjustedTexture.wrapS = alphaTexture.wrapS;
  adjustedTexture.wrapT = alphaTexture.wrapT;
  adjustedTexture.needsUpdate = true;

  return adjustedTexture;
}

function SceneEnvironment() {
  const envMap = useLoader(TextureLoader, `${texturePath}/env.jpg`);
  const appliedRef = useRef(false);

  useFrame(({ scene }) => {
    if (!appliedRef.current) {
      const clonedEnvMap = envMap.clone();
      clonedEnvMap.colorSpace = SRGBColorSpace;
      clonedEnvMap.mapping = EquirectangularReflectionMapping;
      clonedEnvMap.needsUpdate = true;
      scene.environment = clonedEnvMap;
      appliedRef.current = true;
    }
  });

  return null;
}

function Scene({ src, scrollProgress }: ModelProps) {
  const { size, viewport } = useThree();
  const obj = useLoader(OBJLoader, src);
  const [colorMap, alphaMap, bumpMap, roughnessMap, envMap] = useLoader(
    TextureLoader,
    [
      `${texturePath}/color.jpg`,
      `${texturePath}/alpha.jpg`,
      `${texturePath}/bump.jpg`,
      `${texturePath}/roughness.jpg`,
      `${texturePath}/env.jpg`,
    ],
  );
  const groupRef = useRef<Group>(null);
  const material = useMemo(() => {
    const cMap = createLighterYellowTexture(colorMap, alphaMap);
    const aMap = createLiquidAlphaTexture(alphaMap, colorMap);
    const tMap = createTransmissionTexture(alphaMap, colorMap);
    const bMap = bumpMap.clone();
    const rMap = roughnessMap.clone();
    const eMap = envMap.clone();

    cMap.colorSpace = SRGBColorSpace;
    eMap.colorSpace = SRGBColorSpace;
    eMap.mapping = EquirectangularReflectionMapping;

    [cMap, aMap, tMap, bMap, rMap, eMap].forEach((texture: Texture) => {
      texture.anisotropy = 8;
      texture.needsUpdate = true;
    });

    return new MeshPhysicalMaterial({
      map: cMap,
      alphaMap: aMap,
      transmissionMap: tMap,
      roughnessMap: rMap,
      bumpMap: bMap,
      envMap: eMap,
      envMapRotation: new Euler(0, Math.PI / 5, 0.08),
      attenuationColor: "#FFF",
      attenuationDistance: 2.8,

      bumpScale: 0.008,
      clearcoat: 1,
      clearcoatRoughness: 0.035,
      color: "#fff8e1",
      envMapIntensity: 2,
      ior: 1.45,
      metalness: 0,
      opacity: 1,
      reflectivity: 0.95,
      roughness: 0.09,
      side: DoubleSide,
      specularColor: "#fff6cc",
      specularIntensity: 1,
      thickness: 1.25,
      transmission: 0.85,
      transparent: true,
    });
  }, [alphaMap, bumpMap, colorMap, envMap, roughnessMap]);
  const model = useMemo(() => {
    const clone = obj.clone(true);
    const bounds = new Box3().setFromObject(clone);
    const center = new Vector3();

    bounds.getCenter(center);
    clone.position.sub(center);
    clone.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return clone;
  }, [material, obj]);

  useFrame(() => {
    const group = groupRef.current;

    if (!group) return;

    const progress = scrollProgress.get();

    const layout = getResponsiveBottleLayout(size.width, viewport.width);
    const rotationX = -0.3; // 在这里调！(负数：上半部往后倒/下半部往前；正数：上半部往前倾)
    const rotationY = followPath(progress, pathRotateY);
    const rotationZ = followPath(progress, pathRotateZ);
    const pathX = layout.pathX;
    const targetXMultiplier = followPath(progress, pathX);
    const targetX = targetXMultiplier * layout.x;

    const pathY = layout.pathY;
    const targetYOffset = followPath(progress, pathY);
    const targetY = layout.y + targetYOffset;

    group.position.x = MathUtils.lerp(group.position.x, targetX, 0.12);
    group.position.y = MathUtils.lerp(group.position.y, targetY, 0.12);
    group.rotation.x = MathUtils.lerp(group.rotation.x, rotationX, 0.12);
    group.rotation.y = MathUtils.lerp(group.rotation.y, rotationY, 0.12);
    group.rotation.z = MathUtils.lerp(group.rotation.z, rotationZ, 0.12);
    group.scale.setScalar(MathUtils.lerp(group.scale.x, layout.scale, 0.12));
  });

  return (
    <group ref={groupRef} scale={baseModelScale}>
      <primitive object={model} />
    </group>
  );
}

export const Model = ({ src, scrollProgress }: ModelProps) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <Canvas
        className="pointer-events-none h-full w-full"
        style={{ pointerEvents: "none" }}
        camera={{ position: [0, 2, 5.8], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = PCFSoftShadowMap;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
        shadows
      >
        <Suspense fallback={null}>
          <SceneEnvironment />
          <ambientLight intensity={0.58} />
          <directionalLight
            castShadow
            intensity={2.85}
            position={[3.8, 5.4, 5.8]}
            shadow-bias={-0.0001}
            shadow-mapSize-height={2048}
            shadow-mapSize-width={2048}
          />
          <rectAreaLight
            height={4.8}
            intensity={8.5}
            position={[-1.55, 0.45, 3.45]}
            rotation={[0, 0.18, 0]}
            width={0.16}
          />
          <rectAreaLight
            height={4.2}
            intensity={5.4}
            position={[0.85, 0.15, 3.25]}
            rotation={[0, -0.24, 0]}
            width={0.12}
          />
          <rectAreaLight
            height={3.4}
            intensity={2.2}
            position={[2.6, 0.25, 3.1]}
            rotation={[0, -0.45, 0]}
            width={0.42}
          />
          <directionalLight
            intensity={2.8}
            position={[0.2, 2.2, -4.8]}
            color="#ffffff"
          />
          <pointLight position={[-3.5, -2, 4]} intensity={0.45} />
          <Scene src={src} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
