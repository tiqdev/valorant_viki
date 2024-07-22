import axios from "axios";
import { Agent } from "../models/Agent";

const BASE_URL = "https://valorant-api.com/v1";

export const fetchAgents = async (): Promise<Agent[]> => {
  const response = await axios.get(
    `${BASE_URL}/agents?isPlayableCharacter=true&language=tr-TR`
  );
  return response.data.data as Agent[];
};
