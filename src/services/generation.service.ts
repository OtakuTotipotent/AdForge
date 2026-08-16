import "server-only";

import { GoogleImageProvider } from "@/lib/ai";

import type { GenerateAdvertisementInput } from "@/lib/ai";

export class GenerationService {
  private static provider = new GoogleImageProvider();

  static async generate(input: GenerateAdvertisementInput) {
    return this.provider.generate(input);
  }
}
