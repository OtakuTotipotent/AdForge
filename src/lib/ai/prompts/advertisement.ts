import type { GenerateAdvertisementInput } from "../providers/image-generator";

export function buildAdvertisementPrompt(
  input: GenerateAdvertisementInput,
): string {
  const aspectRatio = input.orientation === "portrait" ? "9:16" : "16:9";

  return `
Create a premium commercial advertisement for the provided product image.

PROJECT:
${input.projectName}

PRODUCT:
${input.productName}

DESCRIPTION:
${input.description}

CREATIVE DIRECTION:
- Create a polished commercial advertisement suitable for a modern SaaS advertising platform.
- Preserve the identity, shape, proportions, colors, packaging, branding, and important visual characteristics of the product.
- Do not redesign or replace the product.
- Integrate the product naturally into a premium advertising scene.
- Use realistic professional advertising photography.
- Use cinematic studio lighting.
- Use realistic shadows and reflections.
- Use premium composition and visual hierarchy.
- Keep the result commercially polished and visually convincing.
- If a model image is provided, preserve the person's identity and realistic appearance.
- Do not add watermarks.
- Do not add unnecessary text.
- Do not create fake logos.
- Do not distort the product.

OUTPUT:
- Aspect ratio: ${aspectRatio}
- High visual quality.
- Production-ready advertising composition.
`;
}
