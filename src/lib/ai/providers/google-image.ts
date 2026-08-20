import "server-only";

import { GoogleGenAI } from "@google/genai";

import { env } from "@/config/env";
import { buildAdvertisementPrompt } from "../prompts/advertisement";
import type {
  GenerateAdvertisementInput,
  GeneratedAdvertisement,
  ImageGeneratorProvider,
} from "./image-generator";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const MAX_SOURCE_IMAGE_BYTES = 10 * 1024 * 1024;

async function fetchImageAsBase64(url: string): Promise<{
  data: string;
  mimeType: string;
}> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Unable to fetch source image. HTTP ${response.status}.`);
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.startsWith("image/")) {
    throw new Error("Cloudinary asset is not a supported image.");
  }

  const arrayBuffer = await response.arrayBuffer();

  if (arrayBuffer.byteLength > MAX_SOURCE_IMAGE_BYTES) {
    throw new Error("Source image is too large.");
  }

  return {
    data: Buffer.from(arrayBuffer).toString("base64"),
    mimeType: contentType,
  };
}

export class GoogleImageProvider implements ImageGeneratorProvider {
  async generate(
    input: GenerateAdvertisementInput,
  ): Promise<GeneratedAdvertisement> {
    const prompt = buildAdvertisementPrompt(input);

    const productImage = await fetchImageAsBase64(input.productImage.secureUrl);

    const contents: Array<{
      inlineData?: {
        data: string;
        mimeType: string;
      };
      text?: string;
    }> = [
      {
        inlineData: productImage,
      },
    ];

    if (input.modelImage) {
      const modelImage = await fetchImageAsBase64(input.modelImage.secureUrl);

      contents.push({
        inlineData: modelImage,
      });
    }

    contents.push({
      text: prompt,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents,
      config: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: input.orientation === "portrait" ? "9:16" : "16:9",
        },
      },
    });

    const imagePart = response.candidates
      ?.flatMap((candidate) => candidate.content?.parts ?? [])
      .find((part) => part.inlineData?.data);

    if (!imagePart?.inlineData?.data) {
      throw new Error("Gemini did not generate an image.");
    }

    const mimeType = imagePart.inlineData.mimeType ?? "image/png";

    return {
      provider: "google",
      prompt,
      mimeType,
      imageBuffer: Buffer.from(imagePart.inlineData.data, "base64"),
    };
  }
}
