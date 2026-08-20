import type { GenerateAdvertisementInput } from "../providers/image-generator";

export function buildAdvertisementPrompt(
  input: GenerateAdvertisementInput,
): string {
  return `
Create a premium commercial advertisement for the following product.

Project:
${input.projectName}

Product:
${input.productName}

Description:
${input.description}

Requirements:

- Preserve the product's identity, shape, proportions, packaging, and visual characteristics.
- Do not redesign or replace the product.
- If a model image is provided, preserve the model's realistic appearance.
- Create a polished commercial advertising composition.
- Use professional studio-quality lighting.
- Use realistic materials, shadows, reflections, and depth.
- Premium advertising photography.
- Strong visual hierarchy.
- Clean and professional composition.
- No watermark.
- No unnecessary text.
- No distorted objects.
- No malformed hands, faces, products, or packaging.
- Aspect ratio: ${input.orientation}.
`;
}
