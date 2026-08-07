import type { GenerateAdvertisementInput } from "../providers/image-generator";

export function buildAdvertisementPrompt(input: GenerateAdvertisementInput) {
  return `
Create a premium commercial advertisement.

Project:
${input.projectName}

Product:
${input.productName}

Description:
${input.description}

Requirements:

- Keep the product unchanged
- Keep the model realistic
- High quality
- Studio lighting
- Advertising photography
- Premium branding
- No watermark
- No text
- Aspect ratio:
${input.orientation}
`;
}
