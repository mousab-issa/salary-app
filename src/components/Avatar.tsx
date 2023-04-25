import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

export const Avatar = ({
  size,
  style,
  image,
}: {
  size: number;
  style?: StyleProp<ImageStyle>;
  image: ImageSourcePropType;
}) => (
  <Image
    source={image}
    style={[{ width: size, height: size, borderRadius: size }, style]}
  />
);
