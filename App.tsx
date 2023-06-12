/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function App(): JSX.Element {
  const totalTime = 1500;
  const [totalSeconds, setTotalSeconds] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [pomodoros, setPomodoros] = useState<number>(0);

  useEffect(() => {
    if (totalSeconds === 0) {
      clearInterval(intervalId);
      setIsRunning(false);
      setTotalSeconds(totalTime);
      setPomodoros(prevPomodoros => prevPomodoros + 1);
    }
  }, [totalSeconds, intervalId]);

  const formatTime = (time: String) => {
    const minutes = Math.floor(Number(time) / 60);
    const seconds = Number(time) % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    const id = setInterval(() => {
      setTotalSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
    setIntervalId(id);
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#e7626c'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 100, fontWeight: 'bold', color: '#f4eddb'}}>
          {formatTime(totalSeconds as unknown as String)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={isRunning ? pauseTimer : startTimer}
        style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        {isRunning ? (
          <Icon name="pausecircleo" size={120} color="#f4eddb" />
        ) : (
          <Icon name="playcircleo" size={120} color="#f4eddb" />
        )}
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f4eddb',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Pomodoros</Text>
        <Text style={{fontSize: 80, fontWeight: 'bold'}}>{pomodoros}</Text>
      </View>
    </View>
  );
}
