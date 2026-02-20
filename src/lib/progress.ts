import { MILESTONES, type Milestone } from "./milestones";

const STORAGE_KEY = "fh_progress";

interface ProgressData {
  completedSongs: string[];
  shownMilestones: string[];
}

function read(): ProgressData {
  if (typeof window === "undefined") return { completedSongs: [], shownMilestones: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedSongs: [], shownMilestones: [] };
    return JSON.parse(raw) as ProgressData;
  } catch {
    return { completedSongs: [], shownMilestones: [] };
  }
}

function write(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.)
  }
}

export function getSongsCompleted(): number {
  return read().completedSongs.length;
}

export function getCompletedSongIds(): string[] {
  return read().completedSongs;
}

export function markSongCompleted(songId: string): void {
  const data = read();
  if (!data.completedSongs.includes(songId)) {
    data.completedSongs.push(songId);
    write(data);
  }
}

export function getUnlockedMilestones(): Milestone[] {
  const count = getSongsCompleted();
  return MILESTONES.filter((m) => count >= m.threshold);
}

/** Returns the newest milestone that hasn't been shown yet, or null. */
export function getNewMilestone(): Milestone | null {
  const data = read();
  const count = data.completedSongs.length;
  const unlocked = MILESTONES.filter((m) => count >= m.threshold);
  const unshown = unlocked.filter((m) => !data.shownMilestones.includes(m.id));
  if (unshown.length === 0) return null;
  return unshown[unshown.length - 1];
}

export function markMilestoneShown(id: string): void {
  const data = read();
  if (!data.shownMilestones.includes(id)) {
    data.shownMilestones.push(id);
    write(data);
  }
}
