import { useSSO, useSignIn } from "@clerk/expo";
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
  const { signIn, errors, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  useWarmUpBrowser();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const handleSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
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
    } else if (signIn.status === "needs_second_factor") {
      // Optional: handle other second factors here.
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
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
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleGoogleSignIn = async () => {
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

      console.error("Google sign-in did not create a session", {
        authSessionResult,
      });
    } catch (error) {
      console.error("Google sign-in failed:", getErrorMessage(error));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (signIn.status === "needs_client_trust") {
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
            onPress={() => signIn.mfa.sendEmailCode()}
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
          Welcome Back.
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
        {errors.fields.identifier && (
          <Text className="text-xs text-red-600 -mt-2">
            {errors.fields.identifier.message}
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
        <Text className="text-base text-center text-white">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full p-4 mt-3 border border-gray-300 rounded-2xl"
        onPress={handleGoogleSignIn}
        disabled={isGoogleLoading || fetchStatus === "fetching"}
      >
        <Text className="text-base text-center text-gray-900 font-RobotoBold">
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </Text>
      </TouchableOpacity>
      <View className="flex-row items-center justify-center mt-4">
        <Text className="text-sm font-light text-gray-800">
          Don&apos;t have an account?
        </Text>
        <Link href="./sign-up" className="ml-2 text-sm font-bold text-primary">
          Sign Up
        </Link>
      </View>
    </SafeAreaView>
  );
}
