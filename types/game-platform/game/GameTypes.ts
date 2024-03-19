interface GameSummaryDefinition {
  title: string;
  gameIdentifier: string;
  summary: string;
  categories: string[];
  image: string;
  thumbnail: string;
  comingSoon: Boolean;
}

interface GameDefinition extends GameSummaryDefinition {
  blockchains: string[];
  developer: string;
  gameStatus: string;
  platforms: string[];
  description: string;
}

export type { GameDefinition, GameSummaryDefinition };
