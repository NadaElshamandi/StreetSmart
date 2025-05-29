import { Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { useRef, useState } from 'react';
import { styled } from 'nativewind';
import { onboarding } from '../../constants';
import CustomButton from '../../components/CustomButton';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);

const Onboarding = () => {
    const swipeRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;

    const handleNext = () => {
        if (isLastSlide) {
            router.replace("/(root)/tabs/home");
        } else {
            swipeRef.current?.scrollBy(1);
        }
    };

    return (
        <StyledSafeAreaView className="flex h-full items-center justify-between bg-primary-100">
            <StyledTouchableOpacity
                onPress={() => {
                    router.replace("/(root)/tabs/home");
                }}
                className="w-full flex justify-end items-end p-5"  
            >
                <StyledText className="text-primary-900 text-md font-JakartaBold">Skip</StyledText>
            </StyledTouchableOpacity>

            <Swiper 
                ref={swipeRef}
                loop={false}
                dot={<StyledView className="w-[32px] h-[4px] mx-1 bg-secondary-300 rounded-full" />}
                activeDot={<StyledView className="w-[32px] h-[4px] mx-1 bg-primary-500 rounded-full" />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item) => (
                    <StyledView key={item.id} className="flex-1 items-center justify-center p-4">
                        {item.image && (
                            <StyledImage 
                                source={item.image} 
                                className="w-64 h-64 mb-8"
                                resizeMode="contain"
                            />
                        )}
                        <StyledText className="text-2xl font-JakartaBold text-primary-900 text-center mb-4">{item.title}</StyledText>
                        <StyledText className="text-lg text-center text-secondary-700">{item.description}</StyledText>
                    </StyledView>
                ))}
            </Swiper>    

            <StyledView className="w-full px-6 pb-8">
                <CustomButton
                    title={isLastSlide ? "Get Started!" : "Next"}
                    onPress={handleNext}
                    bgVariant="primary"
                    textVariant="default"
                />
            </StyledView>
        </StyledSafeAreaView>
    );
}; 

export default Onboarding;