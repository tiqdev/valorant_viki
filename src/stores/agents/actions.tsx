import { _fetchAgents } from ".";
import store from "..";

export const fetchAgents = () => {
  store.dispatch(_fetchAgents());
};
