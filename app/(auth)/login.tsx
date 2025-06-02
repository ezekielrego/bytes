import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";

export default function login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require("../../assets/images/back.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View
          style={[
            styles.innerContainer,
            {
              paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 24 : 40,
              justifyContent: "space-between",  // Push brand to top & login to bottom
              paddingBottom: 50,                 // More space at bottom for login
              flex: 1,
            },
          ]}
        >
          {/* BRAND SECTION */}
          <View
            style={[
              styles.brandSection,
              { marginBottom: 40 },  // Add space below brand section
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/bv.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.loginappName}>Bites n Vybes</Text>
            <Text style={styles.tagline}>"don’t miss anything.."</Text>
          </View>

          {/* LOGIN SECTION */}
          <View
            style={[
              styles.loginSection,
              { marginTop: 20 },   // Add some space above login section
            ]}
          >
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
              activeOpacity={0.9}
            >
              <View style={styles.googleIconContainer}>
                <Ionicons name="logo-google" size={20} color={COLORS.surface} />
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}
