import { Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { images, icons } from '../../constants';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import OAuth from '../../components/OAuth';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledLink = styled(Link);

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();
    const [form, setForm] = useState<FormData>({
        email: '',
        password: ''
    });

    const onSignInPress = async () => {
        if (!isLoaded) return;

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/');
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <StyledScrollView className="flex-1 bg-white">
            <StyledView className="flex-1 bg-white">
                <StyledView className="relative w-full h-[250px]">
                    <StyledImage source={images.BG} className="z-0 w-full h-[250px]" />
                    <StyledText className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                       Welcome!
                    </StyledText>
                </StyledView>
                <StyledView className="p-5">
                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={icons.email}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value: string) => setForm({ ...form, email: value })}
                    />
                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value: string) => setForm({ ...form, password: value })}
                    />
                    <CustomButton
                        title="Sign In"
                        onPress={onSignInPress}
                        className="mt-6"
                    />
                    <OAuth />
                    <StyledLink
                        href="/sign-up"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        Don&apos;t Have an Account?{" "}
                        <StyledText className="text-primary-500">Sign Up</StyledText>
                    </StyledLink>
                </StyledView>
            </StyledView>
        </StyledScrollView>
    );
};

export default SignIn;
    