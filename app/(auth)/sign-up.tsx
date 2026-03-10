import { useAuth, useSSO, useSignUp } from "@clerk/expo";
import * as Linking from "expo-linking";
import { type Href, Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return "Unknown OAuth error";
  }
};

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useWarmUpBrowser();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const handleSubmit = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);
      const { createdSessionId, setActive, authSessionResult } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: Linking.createURL("/"),
        });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
        return;
      }

      console.error("Google sign-up did not create a session", {
        authSessionResult,
      });
    } catch (error) {
      console.error("Google sign-up failed:", getErrorMessage(error));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address")
  ) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 px-8">
        <View className="w-full gap-4">
          <Text className="text-[30px] text-center font-RobotoBold text-gray-900">
            Verify your account
          </Text>
          <TextInput
            value={code}
            placeholder="Enter your verification code"
            keyboardType="numeric"
            onChangeText={(value) => setCode(value)}
            className="px-4 py-2 text-base bg-gray-200 rounded-xl font-RobotoRegular"
          />
          {errors.fields.code && (
            <Text className="text-xs text-red-600 -mt-2">
              {errors.fields.code.message}
            </Text>
          )}
          <TouchableOpacity
            className="w-full p-4 mt-1 bg-primary rounded-2xl"
            onPress={handleVerify}
            disabled={fetchStatus === "fetching"}
          >
            <Text className="text-base text-center text-white font-RobotoBold">
              Verify
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full p-4 rounded-2xl border border-primary"
            onPress={() => signUp.verifications.sendEmailCode()}
          >
            <Text className="text-base text-center text-primary font-RobotoBold">
              I need a new code
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="items-center justify-center flex-1 px-8">
      <View className="items-center">
        <Text className="text-[60px] font-CookieRegular text-primary">
          JustGram
        </Text>
        <Text className=" text-[14px] text-gray-800 font-RobotoRegular">
          Create your account.
        </Text>
      </View>
      <View className="flex w-full gap-4 mt-6">
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={emailAddress}
          onChangeText={(value) => setEmailAddress(value)}
          className="px-4 py-2 text-base bg-gray-200 rounded-xl font-RobotoRegular"
        />
        {errors.fields.emailAddress && (
          <Text className="text-xs text-red-600 -mt-2">
            {errors.fields.emailAddress.message}
          </Text>
        )}
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
          className="px-4 py-2 text-base bg-gray-200 font-RobotoRegular rounded-xl"
        />
        {errors.fields.password && (
          <Text className="text-xs text-red-600 -mt-2">
            {errors.fields.password.message}
          </Text>
        )}
      </View>
      <TouchableOpacity
        className="w-full p-4 mt-5 bg-primary rounded-2xl"
        onPress={handleSubmit}
        disabled={!emailAddress || !password || fetchStatus === "fetching"}
      >
        <Text className="text-base text-center text-white">Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full p-4 mt-3 border border-gray-300 rounded-2xl"
        onPress={handleGoogleSignUp}
        disabled={isGoogleLoading || fetchStatus === "fetching"}
      >
        <Text className="text-base text-center text-gray-900 font-RobotoBold">
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </Text>
      </TouchableOpacity>
      <View className="flex-row items-center justify-center mt-4">
        <Text className="text-sm font-light text-gray-800">
          Already have an account?
        </Text>
        <Link href="./sign-in" className="ml-2 text-sm font-bold text-primary">
          Sign In
        </Link>
      </View>

      <View nativeID="clerk-captcha" />
    </SafeAreaView>
  );
}
