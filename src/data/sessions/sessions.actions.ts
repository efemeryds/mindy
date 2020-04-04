import { getConfData } from "../dataApi";
import { ActionType } from "../../util/types";
import { ConfState } from "./conf.state";
import { Task } from "../../models/Task";
import { Topic } from "../../models/Topic";
import { RelaxActivity } from "../../models/RelaxActivity";

export const loadConfData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getConfData();
  dispatch(setData(data));
  dispatch(setLoading(false));
};

export const setLoading = (isLoading: boolean) =>
  ({
    type: "set-conf-loading",
    isLoading,
  } as const);

export const setData = (data: Partial<ConfState>) =>
  ({
    type: "set-conf-data",
    data,
  } as const);

export const addFavorite = (sessionId: number) =>
  ({
    type: "add-favorite",
    sessionId,
  } as const);

export const removeFavorite = (sessionId: number) =>
  ({
    type: "remove-favorite",
    sessionId,
  } as const);

export const updateFilteredTracks = (filteredTracks: string[]) =>
  ({
    type: "update-filtered-tracks",
    filteredTracks,
  } as const);

export const setSearchText = (searchText?: string) =>
  ({
    type: "set-search-text",
    searchText,
  } as const);
export const removeTask = (taskId: string) =>
  ({
    type: "remove-task",
    taskId,
  } as const);
export const addTask = (task: Task) =>
  ({
    type: "add-task",
    task,
  } as const);
export const updateTask = (task: Task) =>
  ({
    type: "update-task",
    task,
  } as const);

export const removeTopic = (topicId: string) =>
  ({
    type: "remove-topic",
    topicId,
  } as const);
export const addTopic = (topic: Topic) =>
  ({
    type: "add-topic",
    topic,
  } as const);
export const updateTopic = (topic: Topic) =>
  ({
    type: "update-topic",
    topic,
  } as const);
export const removeRelaxActivity = (relaxActivityId: string) =>
  ({
    type: "remove-relaxActivity",
    relaxActivityId,
  } as const);
export const addRelaxActivity = (relaxActivity: RelaxActivity) =>
  ({
    type: "add-relaxActivity",
    relaxActivity,
  } as const);
export const updateRelaxActivity = (relaxActivity: RelaxActivity) =>
  ({
    type: "update-relaxActivity",
    relaxActivity,
  } as const);

export const setMenuEnabled = (menuEnabled: boolean) =>
  ({
    type: "set-menu-enabled",
    menuEnabled,
  } as const);

export type SessionsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof addFavorite>
  | ActionType<typeof removeFavorite>
  | ActionType<typeof removeTask>
  | ActionType<typeof addTask>
  | ActionType<typeof updateTask>
  | ActionType<typeof removeRelaxActivity>
  | ActionType<typeof addRelaxActivity>
  | ActionType<typeof updateRelaxActivity>
  | ActionType<typeof removeTopic>
  | ActionType<typeof addTopic>
  | ActionType<typeof updateTopic>
  | ActionType<typeof updateFilteredTracks>
  | ActionType<typeof setSearchText>
  | ActionType<typeof setMenuEnabled>;
