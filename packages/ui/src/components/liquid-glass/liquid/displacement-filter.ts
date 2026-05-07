export type DisplacementOptions = {
  height: number;
  width: number;
  radius: number;
  depth: number;
  strength?: number;
  chromaticAberration?: number;
};

/**
 * Creating the displacement map that is used by feDisplacementMap filter.
 * Gradients take into account the radius of the element.
 * This is why they start and end in the middle of the angle curve.
 */

const SIZE = 128;
const SIZE_BORDER = 128;

// client cache map
const mapCache = new Map<string, string>();

function rasterizeSvgToPng(svgUrl: string, w: number, h: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = svgUrl;
  });
}

export const getDisplacementMap = async ({
  height,
  width,
  radius,
  depth,
}: Omit<DisplacementOptions, 'chromaticAberration' | 'strength'>): Promise<string> => {
  const cacheKey = `${width}:${height}:${radius}:${depth}`;
  if (mapCache.has(cacheKey)) {
    return mapCache.get(cacheKey)!;
  }

  const aspect = width / height;

  // Cap by longest side, derive the other to preserve aspect ratio
  let w: number, h: number;
  if (aspect >= 1) {
    w = Math.min(SIZE, width);
    h = Math.round(w / aspect);
  } else {
    h = Math.min(SIZE, height);
    w = Math.round(h * aspect);
  }

  const scaleX = w / width;
  const scaleY = h / height;
  const scaledRadius = Math.min(radius * Math.min(scaleX, scaleY), Math.min(w, h) / 2);
  const scaledDepth = depth * Math.min(scaleX, scaleY);

  const svgUrl = getDisplacementMapSvgUrl({
    height: h,
    width: w,
    radius: scaledRadius,
    depth: scaledDepth,
  });
  const png = await rasterizeSvgToPng(svgUrl, w, h);

  // Cache it — this is the last time any of this runs for these params
  mapCache.set(cacheKey, png);
  return png;
};

export const getBorderSpecularMap = ({
  height,
  width,
  radius,
  borderWidth = 8,
}: {
  height: number;
  width: number;
  radius: number;
  borderWidth?: number;
}): Promise<string> => {
  const cacheKey = `spec:${width}:${height}:${radius}:${borderWidth}`;
  if (mapCache.has(cacheKey)) {
    return Promise.resolve(mapCache.get(cacheKey)!);
  }

  const aspect = width / height;

  let w: number, h: number;
  if (aspect >= 1) {
    w = Math.min(SIZE_BORDER, width);
    h = Math.round(w / aspect);
  } else {
    h = Math.min(SIZE_BORDER, height);
    w = Math.round(h * aspect);
  }

  const scaleMin = Math.min(w / width, h / height);
  const scaledRadius = Math.min(radius * scaleMin, Math.min(w, h) / 2);
  const scaledBorder = Math.min(borderWidth * scaleMin, Math.min(w, h) / 2);
  const { x1, y1, x2, y2 } = { x1: '0%', y1: '0%', x2: '100%', y2: '100%' };

  const svg = `<svg height="${h}" width="${w}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="SPEC" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
      <stop offset="0%"   stop-color="#ffffff" stop-opacity="1" />
      <stop offset="50%"  stop-color="#00000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="1" />
      </linearGradient>
      <mask id="edgeMask">
        <rect x="0" y="0" width="${w}" height="${h}"
          rx="${scaledRadius}" ry="${scaledRadius}" fill="white" />
        <rect
          x="${scaledBorder}" y="${scaledBorder}"
          width="${w - scaledBorder * 2}" height="${h - scaledBorder * 2}"
          rx="${Math.max(0, scaledRadius - scaledBorder)}"
          ry="${Math.max(0, scaledRadius - scaledBorder)}"
          fill="black" />
      </mask>
    </defs>
    <rect x="0" y="0" width="${w}" height="${h}" fill="transparent" />
    <rect x="0" y="0" width="${w}" height="${h}"
      fill="url(#SPEC)"
      mask="url(#edgeMask)" />
  </svg>`;

  const svgUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = svgUrl;
  });
};
export const getDisplacementMapSvgUrl = ({
  height,
  width,
  radius,
  depth,
}: Omit<DisplacementOptions, 'chromaticAberration' | 'strength'>) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
          .mix { mix-blend-mode: screen; }
      </style>
      <defs>
          <linearGradient 
            id="Y" 
            x1="0" 
            x2="0" 
            y1="${Math.ceil((radius / height) * 15)}%" 
            y2="${Math.floor(100 - (radius / height) * 15)}%">
              <stop offset="0%" stop-color="#0F0" />
              <stop offset="100%" stop-color="#000" />
          </linearGradient>
          <linearGradient 
            id="X" 
            x1="${Math.ceil((radius / width) * 15)}%" 
            x2="${Math.floor(100 - (radius / width) * 15)}%"
            y1="0" 
            y2="0">
              <stop offset="0%" stop-color="#F00" />
              <stop offset="100%" stop-color="#000" />
          </linearGradient>
      </defs>
  
      <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
      <g filter="blur(2px)">
        <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
        <rect
            x="0"
            y="0"
            height="${height}"
            width="${width}"
            fill="url(#Y)"
            class="mix"
        />
        <rect
            x="0"
            y="0"
            height="${height}"
            width="${width}"
            fill="url(#X)"
            class="mix"
        />
        <rect
            x="${depth}"
            y="${depth}"
            height="${height - 2 * depth}"
            width="${width - 2 * depth}"
            fill="#808080"
            rx="${radius}"
            ry="${radius}"
            filter="blur(${depth}px)"
        />
      </g>
  </svg>`);
