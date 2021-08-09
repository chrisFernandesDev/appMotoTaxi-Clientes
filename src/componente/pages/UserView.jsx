import React, { useContext } from "react";
import { TouchableOpacity, View, Text} from "react-native";
import firebase from "../../../firebase";
import { UserContext } from "./userContext";
import { styles } from "../styles/style";

export default function UserView() {
  const { deslogar } = useContext(UserContext);

  const logout = async () => {
    const auth = firebase.auth;
    await auth.signOut();
    deslogar();
  };

  return (
    <View style={{alignItems:'center'}}>
      <TouchableOpacity style={styles.loginTouch}
            onPress={logout}>
        <Text style={styles.loginText1}>Sair</Text>
        </TouchableOpacity>
    </View>
  );
}