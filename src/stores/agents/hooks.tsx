import { useSelector } from "react-redux";
import { RootState } from "..";

export const useAgents = () => {
  return useSelector((state: RootState) => state.agent.agents);
};

export const useAgentsStatus = () => {
  return useSelector((state: RootState) => state.agent.status);
};

export const useAgentsError = () => {
  return useSelector((state: RootState) => state.agent.error);
};
