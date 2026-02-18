export interface SongNote {
  hole: number;
  action: "blow" | "draw";
  duration?: number;
  lyric?: string;
}

export interface TabLine {
  tabs?: string;
  lyric?: string;
}

export interface TabSection {
  label?: string;
  timestamp?: string;
  lines: TabLine[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  genre: string;
  description: string;
  bpm: number;
  tabs: SongNote[];
  tabSheet?: TabSection[];
}

export const SONGS: Song[] = [
  {
    id: "twinkle-twinkle",
    title: "Twinkle Twinkle Little Star",
    artist: "Traditional",
    difficulty: "Beginner",
    genre: "Children's",
    description:
      "The perfect first song for any harmonica beginner. Simple blow notes to get you started.",
    bpm: 100,
    tabs: [
      { hole: 4, action: "blow", lyric: "Twin-" },
      { hole: 4, action: "blow", lyric: "kle" },
      { hole: 6, action: "blow", lyric: "twin-" },
      { hole: 6, action: "blow", lyric: "kle" },
      { hole: 6, action: "draw", lyric: "lit-" },
      { hole: 6, action: "draw", lyric: "tle" },
      { hole: 6, action: "blow", lyric: "star", duration: 2 },
      { hole: 5, action: "draw", lyric: "How" },
      { hole: 5, action: "draw", lyric: "I" },
      { hole: 5, action: "blow", lyric: "won-" },
      { hole: 5, action: "blow", lyric: "der" },
      { hole: 4, action: "draw", lyric: "what" },
      { hole: 4, action: "draw", lyric: "you" },
      { hole: 4, action: "blow", lyric: "are", duration: 2 },
      { hole: 6, action: "blow", lyric: "Up" },
      { hole: 6, action: "blow", lyric: "a-" },
      { hole: 5, action: "draw", lyric: "bove" },
      { hole: 5, action: "draw", lyric: "the" },
      { hole: 5, action: "blow", lyric: "world" },
      { hole: 5, action: "blow", lyric: "so" },
      { hole: 4, action: "draw", lyric: "high", duration: 2 },
      { hole: 6, action: "blow", lyric: "Like" },
      { hole: 6, action: "blow", lyric: "a" },
      { hole: 5, action: "draw", lyric: "dia-" },
      { hole: 5, action: "draw", lyric: "mond" },
      { hole: 5, action: "blow", lyric: "in" },
      { hole: 5, action: "blow", lyric: "the" },
      { hole: 4, action: "draw", lyric: "sky", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse 1",
        lines: [
          { tabs: "4 4 6 6 -6 -6 6", lyric: "Twinkle twinkle little star" },
          { tabs: "-5 -5 5 5 -4 -4 4", lyric: "How I wonder what you are" },
        ],
      },
      {
        label: "Verse 2",
        lines: [
          { tabs: "6 6 -5 -5 5 5 -4", lyric: "Up above the world so high" },
          { tabs: "6 6 -5 -5 5 5 -4", lyric: "Like a diamond in the sky" },
        ],
      },
      {
        label: "Verse 1 (Repeat)",
        lines: [
          { tabs: "4 4 6 6 -6 -6 6", lyric: "Twinkle twinkle little star" },
          { tabs: "-5 -5 5 5 -4 -4 4", lyric: "How I wonder what you are" },
        ],
      },
    ],
  },
  {
    id: "mary-had-a-little-lamb",
    title: "Mary Had a Little Lamb",
    artist: "Traditional",
    difficulty: "Beginner",
    genre: "Children's",
    description:
      "Another excellent beginner song using simple blow and draw patterns.",
    bpm: 110,
    tabs: [
      { hole: 5, action: "blow", lyric: "Ma-" },
      { hole: 4, action: "draw", lyric: "ry" },
      { hole: 4, action: "blow", lyric: "had" },
      { hole: 4, action: "draw", lyric: "a" },
      { hole: 5, action: "blow", lyric: "lit-" },
      { hole: 5, action: "blow", lyric: "tle" },
      { hole: 5, action: "blow", lyric: "lamb", duration: 2 },
      { hole: 4, action: "draw", lyric: "Lit-" },
      { hole: 4, action: "draw", lyric: "tle" },
      { hole: 4, action: "draw", lyric: "lamb", duration: 2 },
      { hole: 5, action: "blow", lyric: "Lit-" },
      { hole: 6, action: "blow", lyric: "tle" },
      { hole: 6, action: "blow", lyric: "lamb", duration: 2 },
      { hole: 5, action: "blow", lyric: "Ma-" },
      { hole: 4, action: "draw", lyric: "ry" },
      { hole: 4, action: "blow", lyric: "had" },
      { hole: 4, action: "draw", lyric: "a" },
      { hole: 5, action: "blow", lyric: "lit-" },
      { hole: 5, action: "blow", lyric: "tle" },
      { hole: 5, action: "blow", lyric: "lamb", duration: 1 },
      { hole: 5, action: "blow", lyric: "its" },
      { hole: 4, action: "draw", lyric: "fleece" },
      { hole: 4, action: "draw", lyric: "was" },
      { hole: 5, action: "blow", lyric: "white" },
      { hole: 4, action: "draw", lyric: "as" },
      { hole: 4, action: "blow", lyric: "snow", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse 1",
        lines: [
          { tabs: "5 -4 4 -4 5 5 5", lyric: "Mary had a little lamb" },
          { tabs: "-4 -4 -4", lyric: "Little lamb" },
          { tabs: "5 6 6", lyric: "Little lamb" },
        ],
      },
      {
        label: "Verse 2",
        lines: [
          { tabs: "5 -4 4 -4 5 5 5", lyric: "Mary had a little lamb" },
          { tabs: "5 -4 -4 5 -4 4", lyric: "Its fleece was white as snow" },
        ],
      },
    ],
  },
  {
    id: "oh-susanna",
    title: "Oh! Susanna",
    artist: "Stephen Foster",
    difficulty: "Beginner",
    genre: "Folk",
    description:
      "A classic American folk song that's a favorite for harmonica players worldwide.",
    bpm: 120,
    tabs: [
      { hole: 4, action: "blow", lyric: "Oh" },
      { hole: 4, action: "draw", lyric: "I" },
      { hole: 5, action: "blow", lyric: "come" },
      { hole: 6, action: "blow", lyric: "from" },
      { hole: 6, action: "blow", lyric: "Al-" },
      { hole: 6, action: "draw", lyric: "a-" },
      { hole: 6, action: "blow", lyric: "ba-" },
      { hole: 5, action: "blow", lyric: "ma" },
      { hole: 4, action: "blow", lyric: "with" },
      { hole: 4, action: "draw", lyric: "a" },
      { hole: 5, action: "blow", lyric: "ban-" },
      { hole: 5, action: "blow", lyric: "jo" },
      { hole: 4, action: "draw", lyric: "on" },
      { hole: 4, action: "blow", lyric: "my" },
      { hole: 4, action: "draw", lyric: "knee", duration: 2 },
      { hole: 5, action: "draw", lyric: "Oh" },
      { hole: 5, action: "draw", lyric: "Su-" },
      { hole: 6, action: "draw", lyric: "san-" },
      { hole: 6, action: "draw", lyric: "na" },
      { hole: 6, action: "draw", lyric: "don't" },
      { hole: 6, action: "blow", lyric: "you" },
      { hole: 6, action: "blow", lyric: "cry" },
      { hole: 5, action: "blow", lyric: "for" },
      { hole: 4, action: "blow", lyric: "me" },
      { hole: 4, action: "draw", lyric: "", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse",
        lines: [
          { tabs: "4 -4 5 6 6 -6 6 5", lyric: "Oh I come from Alabama" },
          { tabs: "4 -4 5 5 -4 4 -4", lyric: "With a banjo on my knee" },
        ],
      },
      {
        label: "Chorus",
        lines: [
          {
            tabs: "-5 -5 -6 -6 -6 6 6",
            lyric: "Oh Susanna don't you cry",
          },
          { tabs: "5 4 -4", lyric: "For me" },
        ],
      },
    ],
  },
  {
    id: "happy-birthday",
    title: "Happy Birthday",
    artist: "Traditional",
    difficulty: "Beginner",
    genre: "Celebration",
    description:
      "Play happy birthday on harmonica at every party! A must-know song.",
    bpm: 100,
    tabs: [
      { hole: 6, action: "blow", lyric: "Hap-" },
      { hole: 6, action: "blow", lyric: "py" },
      { hole: 6, action: "draw", lyric: "birth-" },
      { hole: 6, action: "blow", lyric: "day" },
      { hole: 7, action: "blow", lyric: "to" },
      { hole: 7, action: "draw", lyric: "you", duration: 2 },
      { hole: 6, action: "blow", lyric: "Hap-" },
      { hole: 6, action: "blow", lyric: "py" },
      { hole: 6, action: "draw", lyric: "birth-" },
      { hole: 6, action: "blow", lyric: "day" },
      { hole: 8, action: "draw", lyric: "to" },
      { hole: 7, action: "blow", lyric: "you", duration: 2 },
      { hole: 6, action: "blow", lyric: "Hap-" },
      { hole: 6, action: "blow", lyric: "py" },
      { hole: 9, action: "blow", lyric: "birth-" },
      { hole: 8, action: "blow", lyric: "day" },
      { hole: 7, action: "blow", lyric: "dear" },
      { hole: 7, action: "draw", lyric: "friend" },
      { hole: 6, action: "draw", lyric: "", duration: 2 },
      { hole: 9, action: "draw", lyric: "Hap-" },
      { hole: 9, action: "draw", lyric: "py" },
      { hole: 8, action: "blow", lyric: "birth-" },
      { hole: 7, action: "blow", lyric: "day" },
      { hole: 8, action: "draw", lyric: "to" },
      { hole: 7, action: "blow", lyric: "you", duration: 2 },
    ],
    tabSheet: [
      {
        lines: [
          { tabs: "6 6 -6 6 7 -7", lyric: "Happy birthday to you" },
          { tabs: "6 6 -6 6 -8 7", lyric: "Happy birthday to you" },
          {
            tabs: "6 6 9 8 7 -7 -6",
            lyric: "Happy birthday dear friend",
          },
          { tabs: "-9 -9 8 7 -8 7", lyric: "Happy birthday to you" },
        ],
      },
    ],
  },
  {
    id: "when-the-saints",
    title: "When the Saints Go Marching In",
    artist: "Traditional",
    difficulty: "Beginner",
    genre: "Gospel / Jazz",
    description:
      "A lively gospel classic that sounds amazing on harmonica. Great for building confidence.",
    bpm: 120,
    tabs: [
      { hole: 4, action: "blow", lyric: "Oh" },
      { hole: 5, action: "blow", lyric: "when" },
      { hole: 5, action: "draw", lyric: "the" },
      { hole: 6, action: "blow", lyric: "saints" },
      { hole: 4, action: "blow", lyric: "oh" },
      { hole: 5, action: "blow", lyric: "when" },
      { hole: 5, action: "draw", lyric: "the" },
      { hole: 6, action: "blow", lyric: "saints", duration: 2 },
      { hole: 4, action: "blow", lyric: "Oh" },
      { hole: 5, action: "blow", lyric: "when" },
      { hole: 5, action: "draw", lyric: "the" },
      { hole: 6, action: "blow", lyric: "saints" },
      { hole: 5, action: "blow", lyric: "go" },
      { hole: 4, action: "blow", lyric: "march-" },
      { hole: 5, action: "blow", lyric: "ing" },
      { hole: 4, action: "draw", lyric: "in", duration: 2 },
      { hole: 5, action: "blow", lyric: "How" },
      { hole: 4, action: "draw", lyric: "I" },
      { hole: 4, action: "blow", lyric: "want" },
      { hole: 4, action: "blow", lyric: "to" },
      { hole: 5, action: "blow", lyric: "be" },
      { hole: 6, action: "blow", lyric: "in" },
      { hole: 6, action: "blow", lyric: "that" },
      { hole: 6, action: "blow", lyric: "num-" },
      { hole: 5, action: "draw", lyric: "ber" },
      { hole: 5, action: "blow", lyric: "when" },
      { hole: 5, action: "draw", lyric: "the" },
      { hole: 6, action: "blow", lyric: "saints" },
      { hole: 5, action: "blow", lyric: "go" },
      { hole: 4, action: "blow", lyric: "march-" },
      { hole: 4, action: "draw", lyric: "ing" },
      { hole: 4, action: "blow", lyric: "in", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse",
        lines: [
          { tabs: "4 5 -5 6", lyric: "Oh when the saints" },
          { tabs: "4 5 -5 6", lyric: "Oh when the saints" },
          {
            tabs: "4 5 -5 6 5 4 5 -4",
            lyric: "Oh when the saints go marching in",
          },
        ],
      },
      {
        label: "Bridge",
        lines: [
          { tabs: "5 -4 4 4 5 6 6 6", lyric: "How I want to be in that num-" },
          {
            tabs: "-5 5 -5 6 5 4 -4 4",
            lyric: "ber when the saints go marching in",
          },
        ],
      },
    ],
  },
  {
    id: "ode-to-joy",
    title: "Ode to Joy",
    artist: "Beethoven",
    difficulty: "Intermediate",
    genre: "Classical",
    description:
      "Beethoven's masterpiece adapted for harmonica. A rewarding intermediate challenge.",
    bpm: 108,
    tabs: [
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 6, action: "blow", lyric: "" },
      { hole: 6, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 4, action: "draw", lyric: "" },
      { hole: 4, action: "blow", lyric: "" },
      { hole: 4, action: "blow", lyric: "" },
      { hole: 4, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "blow", lyric: "", duration: 1.5 },
      { hole: 4, action: "draw", lyric: "" },
      { hole: 4, action: "draw", lyric: "", duration: 2 },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 6, action: "blow", lyric: "" },
      { hole: 6, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 4, action: "draw", lyric: "" },
      { hole: 4, action: "blow", lyric: "" },
      { hole: 4, action: "blow", lyric: "" },
      { hole: 4, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 4, action: "draw", lyric: "", duration: 1.5 },
      { hole: 4, action: "blow", lyric: "" },
      { hole: 4, action: "blow", lyric: "", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Part A",
        lines: [
          {
            tabs: "5 5 -5 6 6 -5 5 -4",
            lyric: "Joyful joyful we adore thee",
          },
          {
            tabs: "4 4 -4 5 5 -4 -4",
            lyric: "God of glory Lord of love",
          },
        ],
      },
      {
        label: "Part A (Repeat)",
        lines: [
          {
            tabs: "5 5 -5 6 6 -5 5 -4",
            lyric: "Hearts unfold like flowers before thee",
          },
          {
            tabs: "4 4 -4 5 -4 4 4",
            lyric: "Opening to the sun above",
          },
        ],
      },
    ],
  },
  {
    id: "amazing-grace",
    title: "Amazing Grace",
    artist: "John Newton",
    difficulty: "Intermediate",
    genre: "Hymn",
    description:
      "One of the most beloved hymns ever written. Beautiful slow melody perfect for harmonica.",
    bpm: 80,
    tabs: [
      { hole: 4, action: "blow", lyric: "A-" },
      { hole: 4, action: "draw", lyric: "maz-" },
      { hole: 5, action: "blow", lyric: "ing", duration: 1 },
      { hole: 4, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "grace" },
      { hole: 5, action: "draw", lyric: "how", duration: 2 },
      { hole: 5, action: "blow", lyric: "sweet" },
      { hole: 4, action: "draw", lyric: "the", duration: 2 },
      { hole: 4, action: "blow", lyric: "sound" },
      { hole: 4, action: "draw", lyric: "that", duration: 2 },
      { hole: 3, action: "draw", lyric: "saved" },
      { hole: 4, action: "blow", lyric: "a", duration: 2 },
      { hole: 4, action: "draw", lyric: "wretch" },
      { hole: 4, action: "blow", lyric: "like", duration: 2 },
      { hole: 4, action: "draw", lyric: "me", duration: 3 },
    ],
    tabSheet: [
      {
        label: "Verse 1",
        lines: [
          {
            tabs: "4 -4 5 -4 5 -5",
            lyric: "Amazing grace how sweet",
          },
          { tabs: "5 -4 4", lyric: "The sound" },
          { tabs: "-4 -3 4", lyric: "That saved a" },
          { tabs: "-4 4 -4", lyric: "Wretch like me" },
        ],
      },
      {
        label: "Verse 2",
        lines: [
          {
            tabs: "4 -4 5 -4 5 -5",
            lyric: "I once was lost",
          },
          { tabs: "5 -4 4", lyric: "But now" },
          { tabs: "-4 -3 4", lyric: "Am found was" },
          { tabs: "-4 4 -4", lyric: "Blind but now I see" },
        ],
      },
    ],
  },
  {
    id: "jingle-bells",
    title: "Jingle Bells",
    artist: "James Lord Pierpont",
    difficulty: "Beginner",
    genre: "Holiday",
    description:
      "A festive classic! Learn this to spread holiday cheer with your harmonica.",
    bpm: 130,
    tabs: [
      { hole: 5, action: "blow", lyric: "Jin-" },
      { hole: 5, action: "blow", lyric: "gle" },
      { hole: 5, action: "blow", lyric: "bells", duration: 2 },
      { hole: 5, action: "blow", lyric: "Jin-" },
      { hole: 5, action: "blow", lyric: "gle" },
      { hole: 5, action: "blow", lyric: "bells", duration: 2 },
      { hole: 5, action: "blow", lyric: "Jin-" },
      { hole: 6, action: "blow", lyric: "gle" },
      { hole: 4, action: "blow", lyric: "all" },
      { hole: 4, action: "draw", lyric: "the" },
      { hole: 5, action: "blow", lyric: "way", duration: 2 },
      { hole: 5, action: "draw", lyric: "Oh" },
      { hole: 5, action: "draw", lyric: "what" },
      { hole: 5, action: "draw", lyric: "fun" },
      { hole: 5, action: "blow", lyric: "it" },
      { hole: 5, action: "blow", lyric: "is" },
      { hole: 5, action: "blow", lyric: "to" },
      { hole: 4, action: "draw", lyric: "ride" },
      { hole: 4, action: "draw", lyric: "in" },
      { hole: 4, action: "blow", lyric: "a" },
      { hole: 4, action: "draw", lyric: "one" },
      { hole: 5, action: "blow", lyric: "horse" },
      { hole: 6, action: "blow", lyric: "o-" },
      { hole: 6, action: "draw", lyric: "pen" },
      { hole: 5, action: "draw", lyric: "sleigh", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Chorus",
        lines: [
          { tabs: "5 5 5", lyric: "Jingle bells" },
          { tabs: "5 5 5", lyric: "Jingle bells" },
          { tabs: "5 6 4 -4 5", lyric: "Jingle all the way" },
          {
            tabs: "-5 -5 -5 5 5 5",
            lyric: "Oh what fun it is to",
          },
          {
            tabs: "-4 -4 4 -4 5 6 -6 -5",
            lyric: "Ride in a one horse open sleigh",
          },
        ],
      },
      {
        label: "Chorus (Repeat)",
        lines: [
          { tabs: "5 5 5", lyric: "Jingle bells" },
          { tabs: "5 5 5", lyric: "Jingle bells" },
          { tabs: "5 6 4 -4 5", lyric: "Jingle all the way" },
          {
            tabs: "-5 -5 -5 5 5 5",
            lyric: "Oh what fun it is to",
          },
          {
            tabs: "-4 -4 4 -4 5 6 -6 -5",
            lyric: "Ride in a one horse open sleigh",
          },
        ],
      },
    ],
  },
  {
    id: "love-me-do",
    title: "Love Me Do",
    artist: "The Beatles",
    difficulty: "Intermediate",
    genre: "Rock",
    description:
      "The Beatles' classic featuring one of the most iconic harmonica riffs in rock history.",
    bpm: 148,
    tabs: [
      { hole: 5, action: "draw", lyric: "Love" },
      { hole: 5, action: "blow", lyric: "me" },
      { hole: 4, action: "draw", lyric: "do" },
      { hole: 2, action: "draw", lyric: "", duration: 1.5 },
      { hole: 2, action: "draw", lyric: "" },
      { hole: 2, action: "draw", lyric: "" },
      { hole: 2, action: "draw", lyric: "", duration: 2 },
      { hole: 5, action: "draw", lyric: "Love" },
      { hole: 5, action: "draw", lyric: "me" },
      { hole: 5, action: "draw", lyric: "do" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 4, action: "draw", lyric: "" },
      { hole: 2, action: "draw", lyric: "", duration: 2 },
      { hole: 2, action: "draw", lyric: "" },
      { hole: 2, action: "draw", lyric: "" },
      { hole: 2, action: "draw", lyric: "" },
      { hole: 2, action: "draw", lyric: "" },
      { hole: 4, action: "blow", lyric: "Love" },
      { hole: 3, action: "draw", lyric: "me" },
      { hole: 2, action: "draw", lyric: "do", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Intro Riff",
        lines: [
          { tabs: "-5 5 -4", lyric: "Love me do" },
          { tabs: "-2 -2 -2 -2", lyric: "(harmonica riff)" },
        ],
      },
      {
        label: "Verse",
        lines: [
          { tabs: "-5 -5 -5 5 5 5 -4", lyric: "Love me do" },
          { tabs: "-2 -2 -2 -2 -2", lyric: "(harmonica riff)" },
        ],
      },
      {
        label: "Ending",
        lines: [{ tabs: "4 -3 -2", lyric: "Love me do" }],
      },
    ],
  },
  {
    id: "piano-man",
    title: "Piano Man",
    artist: "Billy Joel",
    difficulty: "Advanced",
    genre: "Rock / Pop",
    description:
      "Billy Joel's signature song with its haunting harmonica intro. A rewarding challenge for advanced players.",
    bpm: 90,
    tabs: [
      { hole: 6, action: "blow", lyric: "" },
      { hole: 6, action: "draw", lyric: "" },
      { hole: 6, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 4, action: "blow", lyric: "", duration: 1.5 },
      { hole: 4, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 4, action: "draw", lyric: "", duration: 2 },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 6, action: "blow", lyric: "" },
      { hole: 6, action: "draw", lyric: "" },
      { hole: 6, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 4, action: "blow", lyric: "", duration: 1.5 },
      { hole: 4, action: "blow", lyric: "" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 4, action: "draw", lyric: "" },
      { hole: 4, action: "blow", lyric: "", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Intro / Main Riff",
        timestamp: "0:08",
        lines: [
          { tabs: "6 -6 6 -5 5 -5 5" },
          { tabs: "4 -4 5 -4" },
          { tabs: "5 -5 6 -6 6 -5 5 -5 5" },
          { tabs: "4 -5 5 -4 4" },
        ],
      },
      {
        label: "Verse 1",
        timestamp: "0:47",
        lines: [
          { tabs: "5 -5 6 -6 6 -5 5 -5 5" },
          { tabs: "4 -5 5 -4 5" },
          {
            lyric: "Making love to his tonic and gin",
          },
        ],
      },
      {
        label: "Bridge",
        timestamp: "1:23",
        lines: [{ tabs: "-4 5 -5" }],
      },
      {
        label: "Chorus",
        timestamp: "1:42",
        lines: [
          { tabs: "5 -5 6 -6 6 -5 5 -5 5" },
          { tabs: "4 -5 5 -4 5" },
          { lyric: "You've got us feeling alright" },
        ],
      },
      {
        label: "Verse 2",
        timestamp: "3:08",
        lines: [
          { tabs: "5 -5 6 -6 6 -5 5 -5 5" },
          { tabs: "4 -5 5 -4 5" },
          { lyric: "And probably will be for life" },
        ],
      },
      {
        label: "(Piano Solo)",
        timestamp: "3:39",
        lines: [{ tabs: "-4 5 -5" }],
      },
      {
        label: "Chorus (Repeat)",
        timestamp: "3:57",
        lines: [
          { tabs: "5 -5 6 -6 6 -5 5 -5 5" },
          { tabs: "4 -5 5 -4 5" },
          { lyric: "You've got us feeling alright" },
        ],
      },
      {
        timestamp: "4:55",
        lines: [{ tabs: "-4 5 -5" }],
      },
      {
        label: "Outro",
        timestamp: "5:13",
        lines: [
          { tabs: "5 -5 6 -6 6 -5 5 -5 5" },
          { tabs: "4 -5 5 -4 5" },
          { lyric: "You've got us feeling alright" },
        ],
      },
    ],
  },
];

export function getSongById(id: string): Song | undefined {
  return SONGS.find((s) => s.id === id);
}

export function getSongsByDifficulty(difficulty: Song["difficulty"]): Song[] {
  return SONGS.filter((s) => s.difficulty === difficulty);
}
