
import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (

    <LinearGradient
      colors={["#0a0a1a", "#1a0a2e", "#0a0a1a"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.headerSection}>
            
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={["#7c3aed", "#a855f7"]}
                style={styles.logoGradient}
              >
                <Ionicons name="flash" size={36} color="#fff" />
              </LinearGradient>
            </View>

            
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          
          <View style={styles.formSection}>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View
                style={[
                  styles.inputWrapper,
                  emailFocused && styles.inputFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={emailFocused ? "#a855f7" : "#666"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor="#555"
                  value={email}
                  onChangeText={setEmail}
                  

                  keyboardType="email-address"

                  autoCapitalize="none"

                  autoCorrect={false}

                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  
                />
              </View>
            </View>

            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputWrapper,
                  passwordFocused && styles.inputFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={passwordFocused ? "#a855f7" : "#666"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#555"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}

                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            
            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

           
            <TouchableOpacity
              style={styles.signInButton}
              activeOpacity={0.8} >

              
              <LinearGradient
                colors={["#7c3aed", "#a855f7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signInGradient}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* --- SOCIAL LOGIN BUTTONS --- */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-github" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ========================================== */}
          {/* SECTION 3: BOTTOM SIGN-UP LINK            */}
          {/* ========================================== */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  // --- LAYOUT ---
  container: {
    flex: 1,
    // flex: 1 = "take up ALL available space"
    // This is the most important RN concept.
    // Without flex: 1, a View has ZERO height (it collapses).
    // On the web, a div grows to fit its content.
    // In RN, a View with no flex or height = invisible.
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    // flexGrow: 1 = "grow to fill space, but also be scrollable"
    // flex: 1 on ScrollView's content would break scrolling.
    // flexGrow: 1 is the correct one to use here.
    justifyContent: "center",
    // justifyContent: "center" = center everything vertically.
    // Remember, flexDirection defaults to "column" in RN.
    // So justifyContent works on the VERTICAL axis.
    // (Opposite of web where it works on horizontal axis by default)
    paddingHorizontal: 28,
    // paddingHorizontal = paddingLeft + paddingRight combined.
    // RN shorthand. CSS doesn't have this. Nice, right?
    paddingVertical: 40,
    // paddingVertical = paddingTop + paddingBottom combined.
  },

  // --- HEADER / LOGO ---
  headerSection: {
    alignItems: "center",
    // alignItems: "center" = center children horizontally.
    // (cross-axis of our column flexDirection)
    marginBottom: 40,
  },

  logoContainer: {
    marginBottom: 24,
  },

  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    // borderRadius: 40 = half of width/height = perfect circle.
    // In CSS: border-radius: 50%;
    // In RN: you need the exact pixel value, not percentages.
    // (well, % works sometimes, but pixels are more reliable)
    justifyContent: "center",
    alignItems: "center",
    // center the icon inside the circle

    // Shadow on iOS:
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    // ↑ Shadows in RN are DIFFERENT on iOS vs Android.
    // iOS uses shadow* properties (like above).
    // Android uses "elevation":
    elevation: 12,
    // elevation = Android shadow. Higher number = bigger shadow.
    // You usually need BOTH shadow* AND elevation for cross-platform.
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    // fontWeight in RN is always a STRING: "400", "600", "bold", etc.
    // In CSS you can use numbers: font-weight: 800;
    // In RN: fontWeight: "800" (with quotes)
    color: "#ffffff",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#888",
    letterSpacing: 0.5,
  },

  // --- FORM ---
  formSection: {
    marginBottom: 32,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ccc",
    marginBottom: 8,
    marginLeft: 4,
  },

  inputWrapper: {
    flexDirection: "row",
    // flexDirection: "row" = lay children out LEFT → RIGHT.
    // Default is "column" (top → bottom).
    // We want: [icon] [input] [eye icon] in a row.
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    // rgba works just like CSS. Semi-transparent white = subtle glass look.
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 16,
    height: 56,
    // In RN, setting explicit height is common.
    // On the web, you'd avoid fixing height. In RN, it's fine.
  },

  inputFocused: {
    borderColor: "#7c3aed",
    // When focused, the border turns purple.
    backgroundColor: "rgba(124, 58, 237, 0.08)",
    // And the background gets a very subtle purple tint.
    // This is the "glow" effect when you tap an input.

    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    // flex: 1 = "take up all remaining space in the row"
    // The icon takes its natural width.
    // The input takes EVERYTHING ELSE.
    color: "#fff",
    fontSize: 16,
  },

  eyeButton: {
    padding: 8,
    // Extra padding = bigger touch target.
    // On mobile, fingers are fat. Small buttons = frustration.
    // Always make touch targets at least 44x44 points.
    marginLeft: 8,
  },

  forgotButton: {
    alignSelf: "flex-end",
    // alignSelf = override the parent's alignItems for just THIS child.
    // "flex-end" = push it to the right side.
    marginBottom: 24,
    marginTop: 4,
  },

  forgotText: {
    color: "#a855f7",
    fontSize: 14,
    fontWeight: "600",
  },

  // --- SIGN IN BUTTON ---
  signInButton: {
    borderRadius: 16,
    overflow: "hidden",
    // overflow: "hidden" = clips the gradient to the button shape.
    // Without this, the gradient would show outside the rounded corners.
    marginBottom: 28,

    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },

  signInGradient: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  signInText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },

  // --- DIVIDER ---
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    // A thin line. That's it.
    // flex: 1 on both lines = they split the remaining space equally,
    // with the text in the middle.
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  dividerText: {
    color: "#666",
    fontSize: 13,
    marginHorizontal: 16,
    // marginHorizontal = marginLeft + marginRight.
    // Gives space between the lines and the text.
  },

  // --- SOCIAL BUTTONS ---
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    // justifyContent: "center" = center the buttons in the row.
    gap: 16,
    // gap = space between items. Works the same as CSS gap.
    // This was added to RN somewhat recently. Very nice.
  },

  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    // Center the icon inside the button.
  },

  // --- FOOTER ---
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },

  footerText: {
    color: "#666",
    fontSize: 15,
  },

  signUpLink: {
    color: "#a855f7",
    fontSize: 15,
    fontWeight: "700",
  },
});
