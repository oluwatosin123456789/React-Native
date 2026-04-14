//import { Text, View } from "react-";

//export default function RootLayout() {
  //return (
    //<View
      //style={{
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
      //}}
    //>
      //<Text>Edit app/index.tsx to edit this screen.</Text>
    //</View>
  //);
//}
//




import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YOUR_API_KEY_HERE",
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 1024,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply = data.content[0].text;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.role === "user" ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={styles.bubbleText}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />

      {loading && <ActivityIndicator style={styles.loader} color="#6C63FF" />}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f" },
  messageList: { padding: 16, paddingBottom: 8 },
  bubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: "#6C63FF",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#1e1e1e",
    alignSelf: "flex-start",
  },
  bubbleText: { color: "#fff", fontSize: 15, lineHeight: 22 },
  loader: { marginBottom: 8 },
  inputRow: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#222",
    alignItems: "flex-end",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 120,
  },
  sendBtn: {
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  sendText: { color: "#fff", fontWeight: "bold" },
});