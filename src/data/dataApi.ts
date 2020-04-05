import { Plugins } from "@capacitor/core";
import { Schedule, Session } from "../models/Schedule";
import { Speaker } from "../models/Speaker";
import { Location } from "../models/Location";
import { Task } from "../models/Task";
import { Topic } from "../models/Topic";
import { RelaxActivity } from "../models/RelaxActivity";
import { InspirationCategory } from "../models/Inspirations";

const { Storage } = Plugins;

const dataUrl = "/assets/data/data.json";
const locationsUrl = "/assets/data/locations.json";
const tasksUrl = "/assets/data/tasks.json";
const topicsUrl = "/assets/data/topics.json";
const relaxActivitiesUrl = "/assets/data/relax.json";
const inspirationsUrl = "/assets/data/inspirations.json";

const HAS_LOGGED_IN = "hasLoggedIn";
const HAS_SEEN_TUTORIAL = "hasSeenTutorial";
const USERNAME = "username";

export const getConfData = async () => {
  console.log("state.reload reloading from file");
  const response = await Promise.all([
    fetch(tasksUrl),
    fetch(topicsUrl),
    fetch(relaxActivitiesUrl),
    fetch(inspirationsUrl)
  ]);

  const tasks = (await response[0].json()) as Task[];
  const topics = (await response[1].json()) as Topic[];
  const relaxActivities = (await response[2].json()) as RelaxActivity[];
  const inspirations = (await response[3].json()) as InspirationCategory[];


  const data = {
    tasks,
    topics,
    relaxActivities,
    inspirations
  };
  return data;
};

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME }),
  ]);
  const isLoggedin = (await response[0].value) === "true";
  const hasSeenTutorial = (await response[1].value) === "true";
  const username = (await response[2].value) || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username,
  };
  return data;
};

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
};

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({
    key: HAS_SEEN_TUTORIAL,
    value: JSON.stringify(hasSeenTutorial),
  });
};

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
};

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = [];
  schedule.groups.forEach((g) => {
    g.sessions.forEach((s) => sessions.push(s));
  });
  return sessions;
}
