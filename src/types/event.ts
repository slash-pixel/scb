export type DisplayMode = "AGENDA" | "TICKER" | "BOTH";

export interface SchoolEvent {
  id: string;
  title: string;
  description: string | null;
  eventDate: string; // ISO
  displayMode: DisplayMode;
  createdAt: string;
  updatedAt: string;
}