import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles";
import { supabase } from "../lib/supabase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    console.log("Logging in with email:", email, "and password:", password);
    setLoading(true);
    supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  async function signUpUser({ created_at, user_metadata, id }) {
    const { name, username } = user_metadata;
    const { data, error } = await supabase
      .from("users")
      .insert({ name, username, created_at, user_id: id });
    if (error) Promise.reject(error);
    return data;
  }

  const handleSignUp = () => {
    console.log("Navigating to sign-up screen...");
    supabase.auth
      .signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            name: name,
          },
        },
      })
      .then(({ data: { session } }) => {
        return signUpUser(session.user);
      })
      .then((user) => {
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Name"
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Username"
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't have an account yet? Sign up below
      </Text>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
