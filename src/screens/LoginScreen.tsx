import { useRouter } from 'expo-router';
import { Eye, EyeOff, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { THEME } from '../constants';

// IMPORTAÇÕES NOVAS DO FIREBASE
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados novos para controlar o MVP
  const [isLogin, setIsLogin] = useState(true); // Alterna entre Entrar e Criar Conta
  const [loading, setLoading] = useState(false);

  const handleAuthenticate = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // Tenta fazer o Login
        await signInWithEmailAndPassword(auth, email, password);
        router.replace('/(tabs)/home'); 
      } else {
        // Tenta Criar a Conta
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Sucesso!', 'Conta criada com sucesso.');
        router.replace('/(tabs)/home');
      }
    } catch (error: any) {
      // Tratamento básico de erros do Firebase
      let mensagem = 'Ocorreu um erro.';
      if (error.code === 'auth/invalid-credential') mensagem = 'E-mail ou senha incorretos.';
      if (error.code === 'auth/email-already-in-use') mensagem = 'Este e-mail já está em uso.';
      if (error.code === 'auth/weak-password') mensagem = 'A senha deve ter pelo menos 6 caracteres.';
      
      Alert.alert('Ops!', mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 32 }}>
        <View className="items-center mb-10">
          <View className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center border border-gray-100 mb-4 shadow-sm">
            <User size={40} color="#374151" />
          </View>
          <Text className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </Text>
          <Text className="text-gray-500 mt-1">
            {isLogin ? 'Faça login para continuar' : 'Comece sua jornada anatômica'}
          </Text>
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
            onPress={handleAuthenticate}
            disabled={loading}
            className="w-full py-4 rounded-2xl mt-4 items-center shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: THEME.primary, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <ActivityIndicator color="white" /> : (
              <Text className="text-white font-bold text-lg">{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={() => setIsLogin(!isLogin)}
          className="mt-8 items-center"
        >
          <Text className="text-gray-500 font-medium">
            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            <Text className="font-bold text-red-800">
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}