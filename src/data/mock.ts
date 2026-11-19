import { ImageSourcePropType } from "react-native";

// Local placeholder PNGs/JPGs live in /assets. Replace the files (same names) later.
const img2 = require("../../assets/images (2).png");
const img3 = require("../../assets/images (3).png");
const img4 = require("../../assets/images (4).png");
const img5 = require("../../assets/images (5).png");
const img6 = require("../../assets/images (6).png");
const img7 = require("../../assets/images (7).jpg");
const img8 = require("../../assets/images (8).jpg");

const pool: ImageSourcePropType[] = [img2, img3, img4, img5, img6, img7, img8];

function shuffle(items: ImageSourcePropType[]): ImageSourcePropType[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createCyclingUniquePicker(items: ImageSourcePropType[]): () => ImageSourcePropType {
  if (items.length === 0) {
    throw new Error("Image pool cannot be empty.");
  }

  let deck = shuffle(items);
  let lastPicked: ImageSourcePropType | undefined;

  return () => {
    if (deck.length === 0) {
      deck = shuffle(items);
      // Avoid repeating the exact same image across a cycle boundary when possible
      if (items.length > 1 && deck[deck.length - 1] === lastPicked) {
        const swapIndex = deck.length - 2;
        [deck[deck.length - 1], deck[swapIndex]] = [deck[swapIndex], deck[deck.length - 1]];
      }
    }

    const next = deck.pop()!;
    lastPicked = next;
    return next;
  };
}

const pick = createCyclingUniquePicker(pool);

export type Post = {
  id: string;
  name: string;
  username: string;
  time: string;
  text: string;
  avatar: ImageSourcePropType;
  image?: ImageSourcePropType;
  likes: number;
  comments: number;
};

export const posts: Post[] = [
  {
    id: "1",
    name: "Maya Santos",
    username: "mayasantos",
    time: "2h",
    text: "Finally shipped the new onboarding flow. Three weeks of work, one very long code review.",
    avatar: pick(),
    image: pick(),
    likes: 42,
    comments: 8,
  },
  {
    id: "2",
    name: "kerwin Noja",
    username: "jonreyes",
    time: "5h",
    text: "Igsoon ko ni Rovelyn, Angkol ni bobet",
    avatar: pick(),
    likes: 12,
    comments: 3,
  },
  {
    id: "3",
    name: "Aira Dela Cruz",
    username: "airadc",
    time: "8h",
    text: "Sunrise at the office before anyone else got in. Best time to fix flaky tests.",
    avatar: pick(),
    image: pick(),
    likes: 87,
    comments: 15,
  },
  {
    id: "4",
    name: "Carlo Mendoza",
    username: "carlom",
    time: "1d",
    text: "Dark mode is not a feature, it is a lifestyle.",
    avatar: pick(),
    image: pick(),
    likes: 131,
    comments: 22,
  },
  {
    id: "5",
    name: "Lia Park",
    username: "liapark",
    time: "2d",
    text: "Pairing session with the backend team went great. API contract is locked in.",
    avatar: pick(),
    likes: 29,
    comments: 5,
  },
];

export const currentUser = {
  name: "Genrey Geralde",
  username: "genreyg",
  email: "genrey@example.com",
  bio: "Building things for mobile. Dark mode, always.",
  location: "Cagayan de Oro, PH",
  website: "genrey.dev",
  joined: "Joined November 2026",
  posts: 24,
  followers: 318,
  following: 142,
  avatar: pick(),
};