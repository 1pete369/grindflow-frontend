// File: src/screens/Onboarding4.tsx
import React, { useCallback, useRef } from 'react';
import { FlatList, Text, View, ListRenderItemInfo } from 'react-native';
import { Image } from 'expo-image';
import Animated, { SlideInRight } from 'react-native-reanimated';
import AnimatedNavButton from '~/components/buttons/AnimatedNavButton';
import ScreenLayout from '~/components/layouts/ScreenLayout';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from './navigators/AuthNavigator';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

type Feature = { title: string; desc: string; gif: any };
const CARD_HEIGHT = 140;

const features: Feature[] = [
  { title: 'Todo List', desc: 'Set daily tasks', gif: require('../assets/gifs/checklist.gif') },
  {
    title: 'Habit Tracking',
    desc: 'Track streaks daily',
    gif: require('../assets/gifs/running.gif'),
  },
  { title: 'Goal Setting', desc: 'Bite-size milestones', gif: require('../assets/gifs/goals.gif') },
  { title: 'Analytics', desc: 'Progress charts', gif: require('../assets/gifs/analytics.gif') },
  { title: 'Community', desc: 'Join challenges', gif: require('../assets/gifs/discussion.gif') },
  { title: 'Reminders', desc: 'Timely nudges', gif: require('../assets/gifs/alarm.gif') },
];

const FeatureCard = React.memo(({ item }: { item: Feature }) => (
  <View className="mx-2 flex-1 rounded-2xl bg-white p-4 shadow-md">
    <Image
      source={item.gif}
      style={{ width: '100%', height: 64, marginBottom: 8, borderRadius: 8 }}
      contentFit="contain"
    />
    <Text className="mb-1 font-semibold">{item.title}</Text>
    <Text className="text-sm text-gray-600">{item.desc}</Text>
  </View>
));

export default function Onboarding4() {
  const nav = useNavigation<NavProp>();
  const listRef = useRef<FlatList<Feature>>(null);

  const handleFinish = () => {
    nav.getParent()?.navigate('Auth', { screen: 'Signup' });
  };

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Feature>) => <FeatureCard item={item} />,
    []
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<Feature> | null | undefined, index: number) => ({
      length: CARD_HEIGHT,
      offset: CARD_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <ScreenLayout className="">
      {/* apply horizontal padding here */}
      <Animated.View
        // entering={SlideInRight.duration(400)}
        className="flex-1 justify-between px-8 pt-10">
        <Text className="mb-4 text-2xl font-bold">Here&apos;s what GrindFlow can do for you</Text>

        <FlatList
          ref={listRef}
          data={features}
          keyExtractor={(f) => f.title}
          numColumns={2}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          contentContainerStyle={{ paddingVertical: 16 }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          updateCellsBatchingPeriod={50}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={5}
        />

        <AnimatedNavButton label="Let's Go!" onPress={handleFinish} />
      </Animated.View>
    </ScreenLayout>
  );
}
