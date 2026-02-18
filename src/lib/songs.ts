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
  {
    id: "yankee-doodle",
    title: "Yankee Doodle",
    artist: "Traditional",
    difficulty: "Beginner",
    genre: "Patriotic",
    description:
      "An iconic American patriotic song that makes a great beginner exercise with its simple stepwise melody.",
    bpm: 120,
    tabs: [
      { hole: 4, action: "blow", lyric: "Yan-" },
      { hole: 4, action: "draw", lyric: "kee" },
      { hole: 5, action: "blow", lyric: "Doo-" },
      { hole: 5, action: "draw", lyric: "dle" },
      { hole: 5, action: "blow", lyric: "went" },
      { hole: 4, action: "draw", lyric: "to" },
      { hole: 4, action: "blow", lyric: "town" },
      { hole: 3, action: "draw", lyric: "" },
      { hole: 4, action: "blow", lyric: "Ri-" },
      { hole: 4, action: "draw", lyric: "ding" },
      { hole: 5, action: "blow", lyric: "on" },
      { hole: 4, action: "draw", lyric: "a" },
      { hole: 4, action: "blow", lyric: "po-", duration: 2 },
      { hole: 4, action: "draw", lyric: "ny" },
      { hole: 4, action: "draw", lyric: "Stuck" },
      { hole: 5, action: "blow", lyric: "a" },
      { hole: 5, action: "draw", lyric: "fea-" },
      { hole: 5, action: "blow", lyric: "ther" },
      { hole: 4, action: "draw", lyric: "in" },
      { hole: 4, action: "blow", lyric: "his" },
      { hole: 4, action: "draw", lyric: "cap" },
      { hole: 3, action: "draw", lyric: "And" },
      { hole: 4, action: "blow", lyric: "called" },
      { hole: 4, action: "draw", lyric: "it" },
      { hole: 4, action: "blow", lyric: "mac-" },
      { hole: 3, action: "draw", lyric: "a-" },
      { hole: 4, action: "blow", lyric: "ro-", duration: 2 },
      { hole: 3, action: "draw", lyric: "ni" },
    ],
    tabSheet: [
      {
        label: "Verse",
        lines: [
          {
            tabs: "4 -4 5 -5 5 -4 4 -3",
            lyric: "Yankee Doodle went to town",
          },
          { tabs: "4 -4 5 -4 4", lyric: "Riding on a pony" },
          {
            tabs: "-4 -4 5 -5 5 -4 4 -4",
            lyric: "Stuck a feather in his cap",
          },
          { tabs: "-3 4 -4 4", lyric: "And called it macaroni" },
        ],
      },
    ],
  },
  {
    id: "camptown-races",
    title: "Camptown Races",
    artist: "Stephen Foster",
    difficulty: "Beginner",
    genre: "Folk",
    description:
      "A fun, upbeat Stephen Foster classic. Great for practicing quick transitions between blow and draw.",
    bpm: 120,
    tabs: [
      { hole: 5, action: "blow", lyric: "Camp-" },
      { hole: 5, action: "blow", lyric: "town" },
      { hole: 5, action: "blow", lyric: "la-" },
      { hole: 4, action: "draw", lyric: "dies" },
      { hole: 5, action: "blow", lyric: "sing" },
      { hole: 5, action: "draw", lyric: "this" },
      { hole: 4, action: "draw", lyric: "song" },
      { hole: 4, action: "blow", lyric: "Doo-" },
      { hole: 4, action: "draw", lyric: "dah" },
      { hole: 5, action: "blow", lyric: "doo-" },
      { hole: 4, action: "draw", lyric: "dah", duration: 2 },
      { hole: 5, action: "blow", lyric: "Camp-" },
      { hole: 5, action: "blow", lyric: "town" },
      { hole: 5, action: "blow", lyric: "race-" },
      { hole: 4, action: "draw", lyric: "track" },
      { hole: 5, action: "blow", lyric: "five" },
      { hole: 5, action: "draw", lyric: "miles" },
      { hole: 4, action: "draw", lyric: "long" },
      { hole: 4, action: "blow", lyric: "Oh" },
      { hole: 4, action: "draw", lyric: "doo-" },
      { hole: 4, action: "blow", lyric: "dah", duration: 2 },
      { hole: 4, action: "draw", lyric: "day" },
    ],
    tabSheet: [
      {
        label: "Verse",
        lines: [
          {
            tabs: "5 5 5 -4 5 -5 -4",
            lyric: "Camptown ladies sing this song",
          },
          { tabs: "4 -4 5 -4", lyric: "Doo-dah, doo-dah" },
          {
            tabs: "5 5 5 -4 5 -5 -4",
            lyric: "Camptown racetrack five miles long",
          },
          { tabs: "4 -4 4", lyric: "Oh doo-dah day" },
        ],
      },
    ],
  },
  {
    id: "auld-lang-syne",
    title: "Auld Lang Syne",
    artist: "Traditional",
    difficulty: "Beginner",
    genre: "Folk",
    description:
      "The classic New Year's Eve anthem. A beautiful, slow melody that's perfect for harmonica.",
    bpm: 90,
    tabs: [
      { hole: 4, action: "blow", lyric: "Should" },
      { hole: 6, action: "blow", lyric: "auld" },
      { hole: 6, action: "blow", lyric: "ac-" },
      { hole: 6, action: "draw", lyric: "quain-" },
      { hole: 6, action: "blow", lyric: "tance" },
      { hole: 6, action: "blow", lyric: "be" },
      { hole: 6, action: "draw", lyric: "for-" },
      { hole: 7, action: "blow", lyric: "got" },
      { hole: 6, action: "blow", lyric: "And" },
      { hole: 6, action: "blow", lyric: "ne-" },
      { hole: 6, action: "draw", lyric: "ver" },
      { hole: 7, action: "blow", lyric: "brought" },
      { hole: 7, action: "draw", lyric: "to" },
      { hole: 7, action: "draw", lyric: "mind", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse",
        lines: [
          {
            tabs: "4 6 6 -6 6 6 -6 7",
            lyric: "Should auld acquaintance be forgot",
          },
          {
            tabs: "6 6 -6 7 -7 -7",
            lyric: "And never brought to mind",
          },
        ],
      },
      {
        label: "Chorus",
        lines: [
          {
            tabs: "-7 7 -6 6 6 -6 6 -6",
            lyric: "For auld lang syne my dear",
          },
          {
            tabs: "-7 7 -6 7 -7",
            lyric: "For auld lang syne",
          },
        ],
      },
    ],
  },
  {
    id: "silent-night",
    title: "Silent Night",
    artist: "Franz Gruber",
    difficulty: "Beginner",
    genre: "Holiday",
    description:
      "The beloved Christmas carol with a gentle melody. Perfect for quiet, expressive harmonica playing.",
    bpm: 72,
    tabs: [
      { hole: 6, action: "blow", lyric: "Si-" },
      { hole: 6, action: "draw", lyric: "lent" },
      { hole: 6, action: "blow", lyric: "night" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 6, action: "blow", lyric: "Ho-" },
      { hole: 6, action: "draw", lyric: "ly" },
      { hole: 6, action: "blow", lyric: "night" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 7, action: "draw", lyric: "All" },
      { hole: 7, action: "draw", lyric: "is" },
      { hole: 7, action: "blow", lyric: "calm" },
      { hole: 7, action: "blow", lyric: "All" },
      { hole: 7, action: "blow", lyric: "is" },
      { hole: 6, action: "blow", lyric: "bright" },
    ],
    tabSheet: [
      {
        label: "Verse 1",
        lines: [
          { tabs: "6 -6 6 5", lyric: "Silent night" },
          { tabs: "6 -6 6 5", lyric: "Holy night" },
          { tabs: "-7 -7 7", lyric: "All is calm" },
          { tabs: "7 7 6", lyric: "All is bright" },
        ],
      },
      {
        label: "Verse 2",
        lines: [
          { tabs: "-6 -6 -7 7 -6 6 -6 6 5", lyric: "Round yon virgin mother and child" },
          { tabs: "-6 -6 -7 7 -6 6 -6 6 5", lyric: "Holy infant so tender and mild" },
          { tabs: "-7 -7 8 -7 7", lyric: "Sleep in heavenly" },
          { tabs: "-6 7 6 5 4", lyric: "Peace, sleep in heavenly peace" },
        ],
      },
    ],
  },
  {
    id: "red-river-valley",
    title: "Red River Valley",
    artist: "Traditional",
    difficulty: "Beginner",
    genre: "Folk / Country",
    description:
      "A beloved American folk song with a smooth, flowing melody. Great for developing breath control.",
    bpm: 100,
    tabs: [
      { hole: 4, action: "blow", lyric: "From" },
      { hole: 5, action: "blow", lyric: "this" },
      { hole: 5, action: "draw", lyric: "val-" },
      { hole: 5, action: "blow", lyric: "ley" },
      { hole: 4, action: "draw", lyric: "they" },
      { hole: 4, action: "blow", lyric: "say" },
      { hole: 4, action: "draw", lyric: "you" },
      { hole: 4, action: "blow", lyric: "are" },
      { hole: 4, action: "blow", lyric: "go-" },
      { hole: 5, action: "blow", lyric: "ing" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 4, action: "draw", lyric: "We" },
      { hole: 4, action: "draw", lyric: "will" },
      { hole: 5, action: "blow", lyric: "miss" },
      { hole: 4, action: "draw", lyric: "your" },
      { hole: 4, action: "blow", lyric: "bright" },
      { hole: 4, action: "draw", lyric: "eyes" },
      { hole: 4, action: "blow", lyric: "and" },
      { hole: 5, action: "blow", lyric: "sweet" },
      { hole: 4, action: "draw", lyric: "smile", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse",
        lines: [
          {
            tabs: "4 5 -5 5 -4 4 -4 4",
            lyric: "From this valley they say you are going",
          },
          {
            tabs: "4 5 -5 5 -4 -4",
            lyric: "We will miss your bright eyes and sweet smile",
          },
        ],
      },
      {
        label: "Chorus",
        lines: [
          {
            tabs: "4 5 -5 5 -5 5 -4",
            lyric: "Come and sit by my side if you love me",
          },
          {
            tabs: "4 -4 5 -4 4",
            lyric: "Do not hasten to bid me adieu",
          },
        ],
      },
    ],
  },
  {
    id: "home-on-the-range",
    title: "Home on the Range",
    artist: "Traditional",
    difficulty: "Beginner",
    genre: "Folk / Country",
    description:
      "The official state song of Kansas and a cowboy classic. Its gentle melody sounds beautiful on harmonica.",
    bpm: 90,
    tabs: [
      { hole: 4, action: "blow", lyric: "Oh" },
      { hole: 4, action: "draw", lyric: "give" },
      { hole: 5, action: "blow", lyric: "me" },
      { hole: 5, action: "blow", lyric: "a" },
      { hole: 5, action: "draw", lyric: "home" },
      { hole: 5, action: "blow", lyric: "where" },
      { hole: 4, action: "draw", lyric: "the" },
      { hole: 4, action: "blow", lyric: "buf-" },
      { hole: 4, action: "draw", lyric: "fa-" },
      { hole: 5, action: "blow", lyric: "lo" },
      { hole: 6, action: "blow", lyric: "roam" },
      { hole: 6, action: "draw", lyric: "Where" },
      { hole: 6, action: "blow", lyric: "the" },
      { hole: 5, action: "draw", lyric: "deer" },
      { hole: 5, action: "blow", lyric: "and" },
      { hole: 5, action: "draw", lyric: "the" },
      { hole: 5, action: "blow", lyric: "an-" },
      { hole: 4, action: "draw", lyric: "te-" },
      { hole: 5, action: "blow", lyric: "lope" },
      { hole: 4, action: "draw", lyric: "play", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse",
        lines: [
          {
            tabs: "4 -4 5 5 -5 5 -4",
            lyric: "Oh give me a home where the",
          },
          {
            tabs: "4 -4 5 6 -6 6 -5",
            lyric: "Buffalo roam, where the deer",
          },
          {
            tabs: "5 -5 5 -4 5 -4",
            lyric: "And the antelope play",
          },
        ],
      },
      {
        label: "Chorus",
        lines: [
          {
            tabs: "6 6 -6 6 -5 5 -4",
            lyric: "Home, home on the range",
          },
          {
            tabs: "-6 6 -5 5 -5 5 -4 5 -4",
            lyric: "Where the deer and the antelope play",
          },
        ],
      },
    ],
  },
  {
    id: "swing-low",
    title: "Swing Low, Sweet Chariot",
    artist: "Traditional",
    difficulty: "Beginner",
    genre: "Spiritual",
    description:
      "A powerful African-American spiritual. The slow tempo and simple notes make it ideal for beginners.",
    bpm: 76,
    tabs: [
      { hole: 5, action: "draw", lyric: "Swing" },
      { hole: 5, action: "blow", lyric: "low" },
      { hole: 4, action: "draw", lyric: "sweet" },
      { hole: 4, action: "blow", lyric: "cha-" },
      { hole: 4, action: "draw", lyric: "ri-" },
      { hole: 5, action: "blow", lyric: "ot" },
      { hole: 6, action: "blow", lyric: "Co-" },
      { hole: 5, action: "draw", lyric: "ming" },
      { hole: 5, action: "blow", lyric: "for" },
      { hole: 4, action: "draw", lyric: "to" },
      { hole: 4, action: "blow", lyric: "car-" },
      { hole: 4, action: "draw", lyric: "ry" },
      { hole: 4, action: "blow", lyric: "me" },
      { hole: 5, action: "blow", lyric: "home", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Chorus",
        lines: [
          {
            tabs: "-5 5 -4 4 -4 5",
            lyric: "Swing low, sweet chariot",
          },
          {
            tabs: "6 -5 5 -4 4 -4 4 5",
            lyric: "Coming for to carry me home",
          },
        ],
      },
      {
        label: "Verse",
        lines: [
          {
            tabs: "6 6 -5 5 5 -4 5",
            lyric: "I looked over Jordan and what did I see",
          },
          {
            tabs: "6 -5 5 -4 4 -4 4 5",
            lyric: "Coming for to carry me home",
          },
        ],
      },
    ],
  },
  {
    id: "danny-boy",
    title: "Danny Boy",
    artist: "Traditional Irish",
    difficulty: "Intermediate",
    genre: "Folk / Irish",
    description:
      "One of the most beautiful melodies ever written. Requires good breath control and a feel for dynamics.",
    bpm: 72,
    tabs: [
      { hole: 4, action: "blow", lyric: "Oh" },
      { hole: 4, action: "draw", lyric: "Dan-" },
      { hole: 5, action: "blow", lyric: "ny" },
      { hole: 6, action: "blow", lyric: "boy" },
      { hole: 6, action: "draw", lyric: "the" },
      { hole: 7, action: "blow", lyric: "pipes" },
      { hole: 7, action: "draw", lyric: "the" },
      { hole: 7, action: "blow", lyric: "pipes" },
      { hole: 6, action: "draw", lyric: "are" },
      { hole: 6, action: "blow", lyric: "call-" },
      { hole: 5, action: "draw", lyric: "ing" },
      { hole: 5, action: "blow", lyric: "" },
      { hole: 6, action: "blow", lyric: "From" },
      { hole: 6, action: "blow", lyric: "glen" },
      { hole: 5, action: "draw", lyric: "to" },
      { hole: 5, action: "blow", lyric: "glen" },
      { hole: 4, action: "draw", lyric: "and" },
      { hole: 5, action: "blow", lyric: "down" },
      { hole: 4, action: "draw", lyric: "the" },
      { hole: 5, action: "blow", lyric: "moun-" },
      { hole: 4, action: "draw", lyric: "tain" },
      { hole: 4, action: "blow", lyric: "side", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse 1",
        lines: [
          {
            tabs: "4 -4 5 6 -6 7 -7 7 -6 6 -5 5",
            lyric: "Oh Danny boy the pipes the pipes are calling",
          },
          {
            tabs: "6 6 -5 5 -4 5 -4 5 -4 4",
            lyric: "From glen to glen and down the mountain side",
          },
        ],
      },
      {
        label: "Verse 2",
        lines: [
          {
            tabs: "4 -4 5 6 -6 7 -7 7 -6 6 -5 5",
            lyric: "The summer's gone and all the roses falling",
          },
          {
            tabs: "6 6 -5 5 -4 5 -4 4",
            lyric: "'Tis you 'tis you must go and I must bide",
          },
        ],
      },
      {
        label: "Bridge",
        lines: [
          {
            tabs: "7 8 -8 8 7 -6 6 -5 5",
            lyric: "But come ye back when summer's in the meadow",
          },
          {
            tabs: "7 8 -8 8 7 -7 7",
            lyric: "Or when the valley's hushed and white with snow",
          },
        ],
      },
    ],
  },
  {
    id: "scarborough-fair",
    title: "Scarborough Fair",
    artist: "Traditional English",
    difficulty: "Intermediate",
    genre: "Folk",
    description:
      "A haunting medieval English ballad popularized by Simon & Garfunkel. Its minor tonality creates a beautiful mood.",
    bpm: 84,
    tabs: [
      { hole: 6, action: "blow", lyric: "Are" },
      { hole: 6, action: "blow", lyric: "you" },
      { hole: 6, action: "blow", lyric: "go-" },
      { hole: 7, action: "blow", lyric: "ing" },
      { hole: 7, action: "draw", lyric: "to" },
      { hole: 8, action: "blow", lyric: "Scar-" },
      { hole: 7, action: "draw", lyric: "bo-" },
      { hole: 7, action: "blow", lyric: "rough" },
      { hole: 7, action: "draw", lyric: "Fair" },
      { hole: 7, action: "blow", lyric: "" },
      { hole: 6, action: "draw", lyric: "Pars-" },
      { hole: 6, action: "blow", lyric: "ley" },
      { hole: 6, action: "draw", lyric: "sage" },
      { hole: 7, action: "blow", lyric: "rose-" },
      { hole: 6, action: "draw", lyric: "ma-" },
      { hole: 6, action: "blow", lyric: "ry" },
      { hole: 5, action: "draw", lyric: "and" },
      { hole: 6, action: "blow", lyric: "thyme", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse",
        lines: [
          {
            tabs: "6 6 6 7 -7 8 -7 7 -7 7",
            lyric: "Are you going to Scarborough Fair",
          },
          {
            tabs: "-6 6 -6 7 -6 6 -5 6",
            lyric: "Parsley sage rosemary and thyme",
          },
        ],
      },
      {
        lines: [
          {
            tabs: "6 6 7 -7 8 8 -8 8 -7 7",
            lyric: "Remember me to one who lives there",
          },
          {
            tabs: "7 -6 6 -5 5 -5 6",
            lyric: "She once was a true love of mine",
          },
        ],
      },
    ],
  },
  {
    id: "blowin-in-the-wind",
    title: "Blowin' in the Wind",
    artist: "Bob Dylan",
    difficulty: "Intermediate",
    genre: "Folk / Rock",
    description:
      "Bob Dylan's timeless anthem. One of the most famous harmonica songs ever recorded.",
    bpm: 100,
    tabs: [
      { hole: 5, action: "blow", lyric: "How" },
      { hole: 5, action: "draw", lyric: "ma-" },
      { hole: 6, action: "blow", lyric: "ny" },
      { hole: 6, action: "blow", lyric: "roads" },
      { hole: 6, action: "blow", lyric: "must" },
      { hole: 6, action: "draw", lyric: "a" },
      { hole: 7, action: "blow", lyric: "man" },
      { hole: 6, action: "draw", lyric: "walk" },
      { hole: 6, action: "blow", lyric: "down" },
      { hole: 5, action: "draw", lyric: "" },
      { hole: 5, action: "blow", lyric: "Be-" },
      { hole: 5, action: "draw", lyric: "fore" },
      { hole: 6, action: "blow", lyric: "you" },
      { hole: 6, action: "blow", lyric: "call" },
      { hole: 6, action: "draw", lyric: "him" },
      { hole: 6, action: "blow", lyric: "a" },
      { hole: 5, action: "draw", lyric: "man", duration: 2 },
    ],
    tabSheet: [
      {
        label: "Verse",
        lines: [
          {
            tabs: "5 -5 6 6 6 -6 7 -6 6 -5",
            lyric: "How many roads must a man walk down",
          },
          {
            tabs: "5 -5 6 6 -6 6 -5",
            lyric: "Before you call him a man",
          },
        ],
      },
      {
        label: "Chorus",
        lines: [
          {
            tabs: "6 -6 7 -6 6 -5 5 -4",
            lyric: "The answer my friend is blowin' in the wind",
          },
          {
            tabs: "5 -5 6 -6 6 -5",
            lyric: "The answer is blowin' in the wind",
          },
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
