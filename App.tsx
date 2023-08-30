import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const StopwatchApp = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning) {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{(elapsedTime / 1000).toFixed(2)}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, isRunning && styles.disabledButton]}
          onPress={handleStart}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isRunning && styles.disabledButton]}
          onPress={handleStop}
          disabled={!isRunning}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  resetButton: {
    backgroundColor: '#FF5722',
  },
 buttonText:{
   color:'#fff'
 }
});

export default StopwatchApp;