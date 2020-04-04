import { SessionsActions } from "./sessions.actions";
import { ConfState } from "./conf.state";

export const sessionsReducer = (
  state: ConfState,
  action: SessionsActions
): ConfState => {
  switch (action.type) {
    case "set-conf-loading": {
      return { ...state, loading: action.isLoading };
    }
    case "set-conf-data": {
      return { ...state, ...action.data };
    }
    case "add-favorite": {
      return { ...state, favorites: [...state.favorites, action.sessionId] };
    }
    case "remove-favorite": {
      return {
        ...state,
        favorites: [...state.favorites.filter((x) => x !== action.sessionId)],
      };
    }
    case "remove-task": {
      console.log("reducer.remove-task");
      return {
        ...state,
        tasks: [...state.tasks.filter((x) => x.id !== action.taskId)],
      };
    }
    case "add-task": {
      return { ...state, tasks: [...state.tasks, action.task] };
    }
    case "update-task": {
      return {
        ...state,
        tasks: [
          ...state.tasks.filter((x) => x.id !== action.task.id),
          action.task,
        ],
      };
    }
    case "remove-topic": {
      console.log("reducer.remove-topic");
      return {
        ...state,
        topics: [...state.topics.filter((x) => x.id !== action.topicId)],
      };
    }
    case "add-topic": {
      return { ...state, topics: [...state.topics, action.topic] };
    }
    case "update-topic": {
      return {
        ...state,
        topics: [
          ...state.topics.filter((x) => x.id !== action.topic.id),
          action.topic,
        ],
      };
    }
    case "remove-relaxActivity": {
      console.log("reducer.remove-relaxActivity");
      return {
        ...state,
        relaxActivities: [
          ...state.relaxActivities.filter(
            (x) => x.id !== action.relaxActivityId
          ),
        ],
      };
    }
    case "add-relaxActivity": {
      return {
        ...state,
        relaxActivities: [...state.relaxActivities, action.relaxActivity],
      };
    }
    case "update-relaxActivity": {
      return {
        ...state,
        relaxActivities: [
          ...state.relaxActivities.filter(
            (x) => x.id !== action.relaxActivity.id
          ),
          action.relaxActivity,
        ],
      };
    }
    case "update-filtered-tracks": {
      return { ...state, filteredTracks: action.filteredTracks };
    }
    case "set-search-text": {
      return { ...state, searchText: action.searchText };
    }
    case "set-menu-enabled": {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
};
