import { createSelector } from "reselect";
import { Schedule, Session, ScheduleGroup } from "../models/Schedule";
import { AppState } from "./state";

export const getSchedule = (state: AppState) => {
  return state.data.schedule;
};
export const getSpeakers = (state: AppState) => state.data.speakers;
const getSessions = (state: AppState) => state.data.sessions;
const getFilteredTracks = (state: AppState) => state.data.filteredTracks;
const getSearchText = (state: AppState) => state.data.searchText;

export const getFilteredSchedule = createSelector(
  getSchedule,
  getFilteredTracks,
  (schedule, filteredTracks) => {
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach((group) => {
      const sessions: Session[] = [];
      group.sessions.forEach((session) => {
        session.tracks.forEach((track) => {
          if (filteredTracks.indexOf(track) > -1) {
            sessions.push(session);
          }
        });
      });
      if (sessions.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions,
        };
        groups.push(groupToAdd);
      }
    });

    return {
      date: schedule.date,
      groups,
    } as Schedule;
  }
);

export const getSearchedSchedule = createSelector(
  getFilteredSchedule,
  getSearchText,
  (schedule, searchText) => {
    if (!searchText) {
      return schedule;
    }
    const groups: ScheduleGroup[] = [];
    schedule.groups.forEach((group) => {
      const sessions = group.sessions.filter(
        (s) => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
      if (sessions.length) {
        const groupToAdd: ScheduleGroup = {
          time: group.time,
          sessions,
        };
        groups.push(groupToAdd);
      }
    });
    return {
      date: schedule.date,
      groups,
    } as Schedule;
  }
);

export const getIdParam = (_state: AppState, props: any): any => {
  return props.match.params["id"];
};

export const getSpeaker = createSelector(
  getSpeakers,
  getIdParam,
  (speakers, id) => speakers.find((x) => x.id === id)
);

export const getSpeakerSessions = createSelector(getSessions, (sessions) => {
  const speakerSessions: { [key: string]: Session[] } = {};

  sessions.forEach((session) => {
    session.speakerNames &&
      session.speakerNames.forEach((name) => {
        if (speakerSessions[name]) {
          speakerSessions[name].push(session);
        } else {
          speakerSessions[name] = [session];
        }
      });
  });
  return speakerSessions;
});

export const getTasks = (state: AppState) => state.data.tasks;

export const getTask = createSelector(getTasks, getIdParam, (tasks, id) =>
  tasks.find((t) => t.id == id)
);

export const getTopics = (state: AppState) => state.data.topics;

export const getTopic = createSelector(getTopics, getIdParam, (topics, id) =>
  topics.find((t) => t.id == id)
);

export const getRelaxActivities = (state: AppState) =>
  state.data.relaxActivities;

export const getRelaxActivity = createSelector(
  getRelaxActivities,
  getIdParam,
  (getRelaxActivities, id) => getRelaxActivities.find((t) => t.id == id)
);

export const getInspirations = (state: AppState) => state.data.inspirations;

export const getInspiration = createSelector(
  getInspirations,
  getIdParam,
  (inspirations, id) =>
    inspirations
      .flatMap((cat) => cat.items)
      .find((inspiration) => inspiration.id == id)
);
export const getCategoryIdParam = (_state: AppState, props: any): any => {
  console.log(props.match);
  return props.match.params["categoryId"];
};
export const getInspirationCategory = createSelector(
  getInspirations,
  getCategoryIdParam,
  (inspirations, id) => inspirations.find((cat) => cat.id == id)
);
