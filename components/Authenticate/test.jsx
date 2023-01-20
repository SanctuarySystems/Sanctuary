can you please style this code:

<KeyboardAvoidingView style={styles.container}>
<Text style={styles.header}>Sanctuary</Text>
<View style={styles.inputContainer}>
  <TextInput
    style={styles.inputBox}
    placeholder="Email"
    onChangeText={(text) => setEmail(text)}
  />
</View>
{errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
<View style={styles.buttonContainer}>
  <TouchableOpacity
    style={styles.button}
    onPress={handleSubmit}
  >
    <Text style={styles.buttonText}>Submit</Text>
  </TouchableOpacity>
</View>
</KeyboardAvoidingView>
);

similar to this code:

<TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.inputContainer} behavior='padding' keyboardVerticalOffset={150}>
          <Text style={styles.header}>Sanctuary</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Username"
            onChangeText={(text) => setNewUsername(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="confirmPassword"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableOpacity>

so that they keyboard does not block the text input