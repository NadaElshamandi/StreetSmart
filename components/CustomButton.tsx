import { TouchableOpacity, Text } from "react-native";
import { styled } from "nativewind";
import { ButtonProps } from "../types/type";

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-secondary-500";
    case "danger":
      return "bg-danger-500";
    case "success":
      return "bg-success-500";
    case "outline":
      return "bg-transparent border-secondary-300 border-[0.5px]";
    default:
      return "bg-primary-500";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-primary-900";
    case "secondary":
      return "text-secondary-100";
    case "danger":
      return "text-danger-100";
    case "success":
      return "text-success-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <StyledTouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full p-4 flex flex-row justify-center items-center shadow-md shadow-secondary-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <StyledText 
        style={{ color: textVariant === "default" ? "#FFFFFF" : undefined }}
        className={`text-lg font-JakartaBold ${getTextVariantStyle(textVariant)}`}
      >
        {title}
      </StyledText>
      {IconRight && <IconRight />}
    </StyledTouchableOpacity>
  );
};

export default CustomButton;