import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { useSelector } from "react-redux";
import { RootState } from "../stores";
import { Agent } from "../models/Agent";

// Renk kontrastını hesaplamak için yardımcı fonksiyonlar
function getContrast(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const luminance1 = getLuminance(rgb1);
  const luminance2 = getLuminance(rgb2);

  const [lum1, lum2] =
    luminance1 > luminance2
      ? [luminance1, luminance2]
      : [luminance2, luminance1];

  return (lum1 + 0.05) / (lum2 + 0.05);
}

function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function getLuminance([r, g, b]: [number, number, number]): number {
  const [r2, g2, b2] = [r, g, b].map((v) => {
    const sRGB = v / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
}

function formatColor(color: string): string {
  return `#${color.slice(0, 6)}`; // İlk 6 karakteri al ve # ile birleştir
}

type AgentDetailScreenRouteProp = RouteProp<RootStackParamList, "AgentDetail">;
type AgentDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AgentDetail"
>;

interface Props {
  route: AgentDetailScreenRouteProp;
  navigation: AgentDetailScreenNavigationProp;
}

const AgentDetailScreen: React.FC<Props> = ({ route }) => {
  const { agentId } = route.params;
  const agent = useSelector((state: RootState) =>
    state.agent.agents.find((a) => a.uuid === agentId)
  );

  if (!agent) {
    return (
      <View style={styles.container}>
        <Text>Agent not found</Text>
      </View>
    );
  }

  // Beyaz yazının en iyi okunacağı arka plan rengini seç
  const textColor = "#FFFFFF"; // Beyaz yazı rengi
  const gradientColors = agent.backgroundGradientColors || ["#FFFFFF"]; // Varsayılan bir renk ekleyin

  let bestBackgroundColor = "#000000"; // Varsayılan bir arka plan rengi
  let highestContrast = 0;

  gradientColors.forEach((color) => {
    const formattedColor = formatColor(color);
    const contrast = getContrast(formattedColor, textColor);
    if (contrast > highestContrast) {
      highestContrast = contrast;
      bestBackgroundColor = formattedColor;
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: agent.background }} style={styles.background} />
      <Image source={{ uri: agent.fullPortrait }} style={styles.image} />
      <View
        style={[
          styles.info_container,
          { backgroundColor: bestBackgroundColor },
        ]}
      >
        <Text style={styles.title}>{agent.displayName}</Text>
        <Text style={styles.description}>{agent.description}</Text>
        <Text style={styles.subtitle}>Yetenekler</Text>
        <View style={styles.abilities}>
          {agent.abilities.map(
            (ability) =>
              ability.displayIcon !== null && (
                <Image
                  key={ability.slot}
                  source={{ uri: ability.displayIcon }}
                  style={styles.icon}
                />
              )
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff",
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    right: 50,
    width: "100%",
    aspectRatio: 1,
  },
  info_container: {
    flex: 1,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
  },
  image: {
    width: "50%",
    height: 300,
    marginLeft: "auto",
    marginBottom: -40,
    zIndex: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "montserrat-black",
    marginBottom: 4,
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "montserrat-medium",
    lineHeight: 28,
    letterSpacing: 0.4,
    marginTop: 24,
    marginBottom: 12,
    color: "#fff",
  },
  description: {
    fontSize: 16,
    fontFamily: "montserrat-regular",
    lineHeight: 20,
    letterSpacing: 0.4,
    color: "#fff",
  },
  abilities: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    width: "20%",
    aspectRatio: 1,
  },
});

export default AgentDetailScreen;
