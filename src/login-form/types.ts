export interface ReactionItem {
  id: string;
  emoji: string;
  x: number;
  y: number;
}

export interface StoryProfile {
  name: string;
  handle: string;
  avatarUrl: string;
  timeAgo: string;
  isCloseFriend: boolean;
}

export interface FloatingReaction {
  id: number;
  emoji: string;
  offset: number;
}
