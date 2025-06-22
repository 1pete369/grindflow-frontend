import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import analytics from '../../assets/analytics.png';
import wins from '../../assets/confetti.png';
import streak from '../../assets/fire.png';
import goal from '../../assets/goal.png';
import task from '../../assets/task.png';

const images = [goal, task, analytics, streak, wins];

export default function CircularImageSpread() {
  const center = 125;

  // Declare shared values for all 9 images
  const tx0 = useSharedValue(0),
    ty0 = useSharedValue(0),
    op0 = useSharedValue(0);
  const tx1 = useSharedValue(0),
    ty1 = useSharedValue(0),
    op1 = useSharedValue(0);
  const tx2 = useSharedValue(0),
    ty2 = useSharedValue(0),
    op2 = useSharedValue(0);
  const tx3 = useSharedValue(0),
    ty3 = useSharedValue(0),
    op3 = useSharedValue(0);
  const tx4 = useSharedValue(0),
    ty4 = useSharedValue(0),
    op4 = useSharedValue(0);
  const tx5 = useSharedValue(0),
    ty5 = useSharedValue(0),
    op5 = useSharedValue(0);
  const tx6 = useSharedValue(0),
    ty6 = useSharedValue(0),
    op6 = useSharedValue(0);
  const tx7 = useSharedValue(0),
    ty7 = useSharedValue(0),
    op7 = useSharedValue(0);
  const tx8 = useSharedValue(0),
    ty8 = useSharedValue(0),
    op8 = useSharedValue(0);

  const txList = [tx0, tx1, tx2, tx3, tx4, tx5, tx6, tx7, tx8];
  const tyList = [ty0, ty1, ty2, ty3, ty4, ty5, ty6, ty7, ty8];
  const opList = [op0, op1, op2, op3, op4, op5, op6, op7, op8];

  useEffect(() => {
    const radius = 120; // consistent radius for all

    images.forEach((_, i) => {
      const angle = (i / images.length) * 2 * Math.PI;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      txList[i].value = withDelay(
        i * 100,
        withTiming(x, {
          duration: 600,
          easing: Easing.out(Easing.exp),
        })
      );
      tyList[i].value = withDelay(
        i * 100,
        withTiming(y, {
          duration: 600,
          easing: Easing.out(Easing.exp),
        })
      );
      opList[i].value = withDelay(i * 100, withTiming(1, { duration: 400 }));
    });
  }, []);

  // Animated styles
  const styles = [
    useAnimatedStyle(() => ({
      transform: [{ translateX: tx0.value }, { translateY: ty0.value }],
      opacity: op0.value,
      position: 'absolute',
      left: center - 30,
      top: center - 30,
    })),
    useAnimatedStyle(() => ({
      transform: [{ translateX: tx1.value }, { translateY: ty1.value }],
      opacity: op1.value,
      position: 'absolute',
      left: center - 30,
      top: center - 30,
    })),
    useAnimatedStyle(() => ({
      transform: [{ translateX: tx2.value }, { translateY: ty2.value }],
      opacity: op2.value,
      position: 'absolute',
      left: center - 30,
      top: center - 30,
    })),
    useAnimatedStyle(() => ({
      transform: [{ translateX: tx3.value }, { translateY: ty3.value }],
      opacity: op3.value,
      position: 'absolute',
      left: center - 30,
      top: center - 30,
    })),
    useAnimatedStyle(() => ({
      transform: [{ translateX: tx4.value }, { translateY: ty4.value }],
      opacity: op4.value,
      position: 'absolute',
      left: center - 30,
      top: center - 30,
    })),
  ];

  return (
    <View className=" mt-10 w-full items-center justify-center">
      <View className=" relative mt-10 h-[250px] w-[250px]">
        {images.map((img, i) => (
          <Animated.Image key={i} source={img} style={[styles[i], { width: 70, height: 70 }]} />
        ))}
      </View>
    </View>
  );
}
