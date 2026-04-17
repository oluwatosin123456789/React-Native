
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

  // ============================================================
  // STEP 4: THE JSX (what gets rendered on screen)
  // ============================================================
  // In React/Next.js you return HTML tags: <div>, <h1>, <input>
  // In React Native you return RN components: <View>, <Text>, <TextInput>
  // That's the ONLY difference. The structure is identical.

  return (
    // --- THE OUTERMOST WRAPPER ---
    // LinearGradient = a View with a gradient background.
    // colors = array of colors for the gradient (top to bottom)
    // style={styles.container} = we apply styles. Explained below.
    <LinearGradient
      colors={["#0a0a1a", "#1a0a2e", "#0a0a1a"]}
      style={styles.container}
    >
      {/* Make the status bar (time, battery) white text */}
      <StatusBar barStyle="light-content" />

      {/* 
        KeyboardAvoidingView: 
        Remember — when the keyboard pops up, it pushes everything up.
        behavior="padding" on iOS = adds padding below content
        behavior="height" on Android = resizes the view
      */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/*
          ScrollView: makes the whole page scrollable.
          WHY? On small phones, your login form might be taller than the screen.
          Without ScrollView, the bottom gets cut off and the user is stuck.
          
          contentContainerStyle = styles for the CONTENT INSIDE the scroll.
          (not the scroll container itself, but what's inside it)
          
          keyboardShouldPersistTaps="handled" = 
          "if I tap a button while the keyboard is open, 
           register the tap AND close the keyboard"
          Without this, the first tap just closes the keyboard and does nothing.
        */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ========================================== */}
          {/* SECTION 1: THE LOGO / BRANDING AREA       */}
          {/* ========================================== */}
          <View style={styles.headerSection}>
            {/* 
              This is just a purple circle with an icon inside.
              In web CSS you'd do: border-radius: 50%; 
              In RN: borderRadius must be half of width/height.
              width: 80, height: 80, borderRadius: 40 = circle
            */}
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={["#7c3aed", "#a855f7"]}
                style={styles.logoGradient}
              >
                <Ionicons name="flash" size={36} color="#fff" />
              </LinearGradient>
            </View>

            {/* 
              <Text> = Remember, ALL text must be in <Text>.
              style={styles.title} = apply our styles.
              
              In React/Next.js: <h1 className="title">Welcome Back</h1>
              In React Native:  <Text style={styles.title}>Welcome Back</Text>
              
              There's no <h1>, <h2>, <p>. It's ALL <Text>.
              You control size/weight with styles, not tags.
            */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          {/* ========================================== */}
          {/* SECTION 2: THE FORM                       */}
          {/* ========================================== */}
          <View style={styles.formSection}>
            {/* --- EMAIL INPUT --- */}
            {/* 
              We wrap each input in a View to add labels and styling.
              
              The "focused" state: when you tap the input, we add a 
              glowing purple border. This is done by checking emailFocused
              and conditionally adding a style.
              
              In CSS: input:focus { border-color: purple; }
              In RN: There's no :focus pseudo-class.
              You manually track focus with onFocus/onBlur + useState.
            */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View
                style={[
                  styles.inputWrapper,
                  // ↓ This is like a conditional className.
                  // In React: className={`input ${focused ? "focused" : ""}`}
                  // In RN: style={[styles.base, condition && styles.extra]}
                  // It merges the styles. If emailFocused is true,
                  // it adds the purple border style on top.
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
                  // ↑ onChangeText = onChange in React, but simpler.
                  // In React: onChange={(e) => setEmail(e.target.value)}
                  // In RN:    onChangeText={setEmail}
                  // It gives you the string directly. No e.target.value BS.

                  keyboardType="email-address"
                  // ↑ This is a MOBILE-ONLY thing.
                  // It tells the phone "show the email keyboard"
                  // (the one with @ and .com buttons).
                  // On web, you'd use <input type="email">

                  autoCapitalize="none"
                  // ↑ Phones auto-capitalize the first letter.
                  // Emails shouldn't be capitalized, so we turn it off.

                  autoCorrect={false}
                  // ↑ Turn off autocorrect for email. 
                  // You don't want the phone "correcting" an email address.

                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  // ↑ Manually track focus state.
                  // onFocus = user tapped the input
                  // onBlur = user tapped away from the input
                />
              </View>
            </View>

            {/* --- PASSWORD INPUT --- */}
            {/* Same pattern as email, but with a show/hide toggle */}
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
                  // ↑ secureTextEntry = type="password" in HTML.
                  // It shows dots (•••••) instead of text.
                  // We toggle it with showPassword state.

                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                {/* 
                  The eye icon to show/hide password.
                  TouchableOpacity = a pressable area that fades on press.
                */}
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  // ↑ onPress = onClick in React.
                  // That's it. onClick → onPress. Done.
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

            {/* --- FORGOT PASSWORD LINK --- */}
            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* --- SIGN IN BUTTON --- */}
            {/* 
              In React/Next.js: <button className="btn">Sign In</button>
              In React Native: There IS a <Button> but it's ugly and basic.
              Everyone uses TouchableOpacity instead for custom buttons.
            */}
            <TouchableOpacity
              style={styles.signInButton}
              activeOpacity={0.8}
              // ↑ activeOpacity = how faded the button gets when pressed.
              // 0.8 = slight fade. 0.2 = very faded. 1 = no fade at all.
            >
              <LinearGradient
                colors={["#7c3aed", "#a855f7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                // ↑ start/end = direction of the gradient.
                // {x:0, y:0} → {x:1, y:0} = left to right
                // Default is top to bottom.
                style={styles.signInGradient}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* --- DIVIDER ("or continue with") --- */}
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

// ============================================================
// STEP 5: STYLES (this is the "CSS" of React Native)
// ============================================================
//
// KEY DIFFERENCES FROM CSS:
//
// 1. camelCase, not kebab-case:
//    CSS:  background-color, font-size, border-radius
//    RN:   backgroundColor, fontSize, borderRadius
//
// 2. No units. Everything is "density-independent pixels" (dp):
//    CSS:  font-size: 16px; padding: 20px;
//    RN:   fontSize: 16,    padding: 20
//    (no "px", "rem", "em", "%"... mostly. Some things accept %)
//
// 3. Flexbox is the ONLY layout system:
//    No CSS Grid. No float. No position: absolute (well, rarely).
//    Flexbox, flexbox, flexbox. That's all you get.
//
// 4. Default flexDirection is "column" (opposite of web!):
//    CSS:  flex items go LEFT → RIGHT by default
//    RN:   flex items go TOP → BOTTOM by default
//    If you want horizontal, add: flexDirection: "row"
//
// 5. Styles DON'T cascade/inherit:
//    In CSS, a child inherits font-size from its parent.
//    In RN, NOPE. Every component styles itself independently.
//    Exception: <Text> inside <Text> does inherit.
//

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
