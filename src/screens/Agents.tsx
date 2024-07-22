import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAgents } from "../stores/agents/actions";
import {
  useAgents,
  useAgentsStatus,
  useAgentsError,
} from "../stores/agents/hooks";
import AgentsList from "../components/agents/AgentList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { ActivityIndicator, Text } from "react-native";

type AgentsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Agents"
>;

interface Props {
  navigation: AgentsScreenNavigationProp;
}

const AgentsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const agents = useAgents();
  const status = useAgentsStatus();
  const error = useAgentsError();

  useEffect(() => {
    if (status === "idle") {
      fetchAgents();
    }
  }, [status, dispatch]);

  const handlePress = (agentId: string) => {
    navigation.navigate("AgentDetail", { agentId });
  };

  if (status === "loading") {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (status === "failed") {
    return <Text>Error loading agents: {error}</Text>;
  }

  return (
    <AgentsList agents={agents} onPress={handlePress} navigation={navigation} />
  );
};

export default AgentsScreen;
