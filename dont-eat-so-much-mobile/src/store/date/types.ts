import { DateTime } from "luxon";

export interface Week {
  days: Day[];
}

export interface Day {
  name: string;
  date: DateTime;
}
