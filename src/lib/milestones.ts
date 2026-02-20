export interface Milestone {
  id: string;
  threshold: number;
  title: string;
  message: string;
  emoji: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: "three-songs",
    threshold: 3,
    title: "Getting the Hang of It!",
    message: "3 songs down — your lips are getting stronger and your ear is sharpening.",
    emoji: "\u{1F525}",
  },
  {
    id: "five-songs",
    threshold: 5,
    title: "High Five!",
    message: "5 songs completed! You're building a real repertoire.",
    emoji: "\u{1F64C}",
  },
  {
    id: "ten-songs",
    threshold: 10,
    title: "Rising Star!",
    message: "10 songs — you're officially hooked. Keep that harmonica close!",
    emoji: "\u{2B50}",
  },
  {
    id: "fifteen-songs",
    threshold: 15,
    title: "Harmonica Hero!",
    message: "15 songs! You can entertain a whole campfire now.",
    emoji: "\u{1F3B8}",
  },
  {
    id: "twenty-songs",
    threshold: 20,
    title: "Master Player!",
    message: "20 songs completed — you've mastered the library!",
    emoji: "\u{1F3C6}",
  },
  {
    id: "thirty-songs",
    threshold: 30,
    title: "Harmonica Legend!",
    message: "30 songs completed — you've become a true harmonica legend!",
    emoji: "\u{1F3B8}",
  },
];
