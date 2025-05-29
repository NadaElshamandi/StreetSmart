import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "@/components/Map";
import { icons } from "@/constants";

const DirectionsLayout = ({
  title,
  snapPoints,
  children,
}: {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Header - Hidden */}
      {/* 
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        zIndex: 10,
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: '#f0f0f0',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{ width: 24, height: 24 }}
            />
          </View>
        </TouchableOpacity>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 20,
          color: '#000000',
        }}>
          {title || "Go Back"}
        </Text>
      </View>
      */}

      {/* Full Screen Map Background */}
      <View style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }}>
        <Map />
      </View>

      
      <KeyboardAvoidingView 
        style={{
          flex: 1,
          zIndex: 5,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        pointerEvents="box-none"
      >
        <View 
          style={{
            backgroundColor: 'rgba(248, 248, 248, 0.85)', // Semi-transparent background
            margin: 20,
            marginTop: 30,
            padding: 20,
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          pointerEvents="auto"
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DirectionsLayout;