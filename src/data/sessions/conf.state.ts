import { Location } from '../../models/Location';
import { Speaker } from '../../models/Speaker';
import { Schedule, Session } from '../../models/Schedule';
import { Task } from '../../models/Task';
export interface ConfState {
  tasks: Task[];
  schedule: Schedule;
  sessions: Session[];
  speakers: Speaker[];
  favorites: number[];
  locations: Location[];
  filteredTracks: string[];
  searchText?: string;
  mapCenterId?: number;
  loading?: boolean;
  allTracks: string[];
  menuEnabled: boolean;
}
