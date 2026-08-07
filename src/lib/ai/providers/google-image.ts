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

export class GoogleImageProvider implements ImageGeneratorProvider {
  async generate(
    input: GenerateAdvertisementInput,
  ): Promise<GeneratedAdvertisement> {
    const prompt = buildAdvertisementPrompt(input);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const image = response.candidates
      ?.flatMap((candidate) => candidate.content?.parts ?? [])
      .find((part) => part.inlineData);

    if (!image?.inlineData) {
      throw new Error("Gemini did not generate an image.");
    }

    const bytes = Buffer.from(image.inlineData.data ?? "", "base64");

    return {
      provider: "google",
      prompt,
      imageUrl: `data:${image.inlineData.mimeType};base64,${bytes.toString(
        "base64",
      )}`,
    };
  }
}
