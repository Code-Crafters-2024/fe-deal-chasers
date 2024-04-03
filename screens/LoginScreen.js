import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles";
import { supabase } from "../lib/supabase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [signUp, setSignUp] = useState(false);
  const disabled =
    loading ||
    username === "" ||
    name === "" ||
    email === "" ||
    password === "";

  const dismissAlert = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setName("");
    setLoading(false);
  };

  const handleLogin = () => {
    setLoading(true);
    supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then(() => {
        setLoading(false);
        navigation.navigate("Home");
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
    if (error) {
      Promise.reject(error);
    }
    return data;
  }

  const handleSignUp = () => {
    setLoading(true);
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
        navigation.navigate("Profile");
      })
      .catch((error) => {
        if (error.message === "Cannot read property 'user' of null") {
          Alert.alert(
            "error",
            "This email is already registered with an account",
            [{ text: "okay", onPress: () => dismissAlert() }]
          );
        } else {
          Alert.alert(error.message);
        }
      });
  };

  const disabledButton = disabled ? { backgroundColor: "red" } : null;

  return signUp ? (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
        style={[styles.signUpButton, disabledButton]}
        onPress={handleSignUp}
        disabled={disabled}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Already have an account? Log in below
      </Text>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => setSignUp(false)}
      >
        <Text style={styles.signUpButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
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
        onPress={() => setSignUp(true)}
      >
        <Text style={styles.signUpButtonText}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
