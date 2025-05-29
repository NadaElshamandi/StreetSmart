import { Text, View, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { ReactNativeModal } from 'react-native-modal';
import { images, icons } from '../../constants';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import OAuth from '../../components/OAuth';
import { fetchAPI } from '../../lib/fetch';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledLink = styled(Link);

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code: ''
    });

    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });

    const onSignUpPress = async () => {
        if (!isLoaded) return;

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setVerification({
                ...verification,
                state: 'pending'
            });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert('Error', err.errors[0].longMessage);
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });

            console.log('Verification status:', completeSignUp.status);

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });

                // Temporarily disable user creation API call until backend is set up
                try {
                    await fetchAPI('/(api)/user', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: form.name,
                            email: form.email,
                            clerkId: completeSignUp.createdUserId,
                        }),
                    });
                } catch (error) {
                    console.log('User creation API not available:', error);
                    // Continue with sign-up process even if user creation fails
                }
                
                // Redirect to home page instead of showing success modal
                router.replace('/(root)/tabs/home');
            } else if (completeSignUp.status === 'missing_requirements') {
                // For missing_requirements, try to complete without additional info
                try {
                    await setActive({ session: completeSignUp.createdSessionId });
                    // Redirect to home page
                    router.replace('/(root)/tabs/home');
                } catch (sessionError) {
                    console.error('Session error:', sessionError);
                    setVerification({
                        ...verification,
                        error: 'Sign-up completed but session could not be activated. Please try signing in.',
                        state: 'failed'
                    });
                }
            } else {
                setVerification({
                    ...verification,
                    error: 'Verification failed. Please try again.',
                    state: 'failed'
                });
            }
        } catch (err: any) {
            console.error('Verification error:', err);
            setVerification({
                ...verification,
                error: err.errors?.[0]?.longMessage || 'Verification failed. Please try again.',
                state: 'failed'
            });
        }
    };

    return (
        <StyledScrollView className="flex-1 bg-white">
            <StyledView className="flex-1 bg-white">
                <StyledView className="relative w-full h-[250px]">
                    <StyledImage source={images.BG} className="z-0 w-full h-[250px]" />
                    <StyledText className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Create Your Account
                    </StyledText>
                </StyledView>
                <StyledView className="p-5">
                    <InputField
                        label="Name"
                        placeholder="Enter name"
                        icon={icons.user}
                        value={form.name}
                        onChangeText={(value: string) => setForm({ ...form, name: value })}
                    />
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
                        title="Sign Up"
                        onPress={onSignUpPress}
                        className="mt-6"
                    />
                    <StyledView className="flex-row items-center justify-center my-4">
                        <StyledView className="flex-1 h-[1px] bg-gray-300" />
                        <StyledText className="mx-4 text-gray-500 font-Jakarta">or</StyledText>
                        <StyledView className="flex-1 h-[1px] bg-gray-300" />
                    </StyledView>
                    <OAuth />
                    <StyledLink
                        href="/(auth)/sign-in"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        Already have an account?{" "}
                        <StyledText className="text-primary-500">Log In</StyledText>
                    </StyledLink>
                </StyledView>

                <ReactNativeModal
                    isVisible={verification.state === 'pending'}
                    onModalHide={() => {
                        if (verification.state === 'success') {
                            setShowSuccessModal(true);
                        }
                    }}
                >
                    <StyledView className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <StyledText className="font-JakartaExtraBold text-2xl mb-2">
                            Verification
                        </StyledText>
                        <StyledText className="font-Jakarta mb-5">
                            We`&apos;ve sent a verification code to {form.email}.
                        </StyledText>
                        <InputField
                            label="Code"
                            icon={icons.lock}
                            placeholder="12345"
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) => setVerification({ ...verification, code })}
                        />
                        {verification.error && (
                            <StyledText className="text-red-500 text-sm mt-1">
                                {verification.error}
                            </StyledText>
                        )}
                        <CustomButton
                            title="Verify Email"
                            onPress={onVerifyPress}
                            className="mt-5 bg-success-500"
                        />
                    </StyledView>
                </ReactNativeModal>

                <ReactNativeModal isVisible={showSuccessModal}>
                    <StyledView className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <StyledImage
                            source={images.check}
                            className="w-[110px] h-[110px] mx-auto my-5"
                        />
                        <StyledText className="text-3xl font-JakartaBold text-center">
                            Verified
                        </StyledText>
                        <StyledText className="text-base text-gray-400 font-Jakarta text-center mt-2">
                            You have successfully verified your account.
                        </StyledText>
                        <CustomButton
                            title="Browse Home"
                            onPress={() => router.push('/(root)/tabs/home')}
                            className="mt-5"
                        />
                    </StyledView>
                </ReactNativeModal>
            </StyledView>
        </StyledScrollView>
    );
};

export default SignUp;
    