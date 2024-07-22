import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Agent } from "../../models/Agent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

type AgentsListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Agents"
>;

interface Props {
  agents: Agent[];
  onPress: (agentId: string) => void;
  navigation: AgentsListNavigationProp;
}

const AgentsList: React.FC<Props> = ({ agents, onPress, navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={agents}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPress(item.uuid)}
            style={styles.item}
          >
            <Image source={{ uri: item.displayIcon }} style={styles.icon} />
            <Text style={styles.text}>{item.displayName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  icon: {
    width: 64,
    height: 64,
    marginRight: 8,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  text: {
    fontSize: 18,
  },
});

export default AgentsList;
