import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ArrowLongLeftIcon } from "react-native-heroicons/outline";
import useAuthStore from "../store/useAuthStore";

const UserProfileDetailsComponent = ({ navigation }) => {
  const { userInfo } = useAuthStore((state) => ({
    userInfo: state.userInfo,
  }));

  return (
    <SafeAreaView>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.iconContainer}>
              <ArrowLongLeftIcon style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={
              userInfo.image
                ? { uri: userInfo.image }
                : require("../assets/images/signup-img.png")
            }
            style={styles.image}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{userInfo.fullname}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{userInfo.username}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userInfo.email}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: "80%",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
  },
  infoRow: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "green",
    height: 24,
    width: 80,
  },
});

export default UserProfileDetailsComponent;