import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createUser } from "../../lib/appwrite";
const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    userName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.userName  || !form.email  || !form.password  ) {
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setIsSubmitting(true)
    try {
      const result = await createUser(form.email, form.password, form.userName)
      // set it to global state
      router.replace('/home')
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false)
    }
    
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar style='light' backgroundColor='#161622'/>
      <ScrollView>
        <View className="w-full justify-center  px-4 my-5 min-h-[87vh]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px]
            h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to Aura
          </Text>
          <FormField
            title="Username"
            value={form.userName}
            handleChangeText={(e) => {
              setForm({ ...form, userName: e });
            }}
            otherStyles="mt-3"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            otherStyles=""
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            otherStyles=""
          />
          <CustomButton
            title={"Sign Up"}
            handlePress={submit}
            containerStyles={"mt-7"}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;