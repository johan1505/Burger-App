import { Theme, themeProps, useTheme } from "@/constants/theme";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type Variant = "primary" | "secondary";

interface ThemedButtonProps extends PressableProps {
  variant?: Variant;
  text: React.ReactNode;
}

export const ThemedButton = ({
  variant = "primary",
  text,
  ...props
}: ThemedButtonProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const buttonStyles: Record<Variant, StyleSheet.NamedStyles<{}>> = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
  };

  const buttonTextStyles: Record<Variant, StyleSheet.NamedStyles<{}>> = {
    primary: styles.primaryButtonText,
    secondary: styles.secondaryButtonText,
  };

  return (
    <Pressable
      {...props}
      style={{
        ...Object(props.style?.valueOf()),
        ...styles.baseButton,
        ...buttonStyles[variant],
      }}
    >
      <Text style={{ ...styles.baseButtonText, ...buttonTextStyles[variant] }}>
        {text}
      </Text>
    </Pressable>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    baseButton: {
      padding: 15,
      justifyContent: "center",
    },
    baseButtonText: {
      fontSize: 15,
      textAlign: "center",
    },

    secondaryButton: {
      backgroundColor: "#ec003f",
    },
    secondaryButtonText: {
      color: "#ffff",
    },
    primaryButton: {
      backgroundColor: themeProps[theme].button.background,
    },
    primaryButtonText: {
      color: themeProps[theme].button.color,
    },
  });
}
