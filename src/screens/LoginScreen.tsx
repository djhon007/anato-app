import { useRouter } from 'expo-router';
import { Eye, EyeOff, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { THEME } from '../constants';

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // router.replace apaga o histórico, impedindo que o usuário "volte" para o login apertando o botão de voltar do celular
    router.replace('/(tabs)/home'); 
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 32 }}>
        <View className="items-center mb-10">
          <View className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center border border-gray-100 mb-4 shadow-sm">
            <User size={40} color="#374151" />
          </View>
          <Text className="text-2xl font-bold text-gray-800">Bem-vindo de volta!</Text>
          <Text className="text-gray-500 mt-1">Faça login para continuar</Text>
        </View>

        <View className="space-y-4 w-full">
          <View>
            <Text className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider ml-1">E-mail</Text>
            <TextInput 
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="exemplo@ufpe.br"
              placeholderTextColor="#9ca3af"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800"
            />
          </View>

          <View>
            <Text className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider ml-1">Senha</Text>
            <View className="relative w-full">
              <TextInput 
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-800 pr-12"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                {showPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="w-full py-4 rounded-2xl mt-4 items-center shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: THEME.primary }}
          >
            <Text className="text-white font-bold text-lg">Entrar</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="px-4 text-gray-400 font-medium">Ou</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        <TouchableOpacity className="w-full flex-row items-center justify-center py-4 border border-gray-200 rounded-2xl bg-white active:bg-gray-50">
          <Text className="font-bold text-gray-700">Continuar com o Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-8 items-center">
          <Text className="text-gray-500 font-medium">Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}