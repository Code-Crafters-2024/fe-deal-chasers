import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ocgoapzvekxfyrbljacg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZ29hcHp2ZWt4ZnlyYmxqYWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExMjI2MTYsImV4cCI6MjAyNjY5ODYxNn0.hjrJqTGAq6PbRm8N3KI8heOCvPqeAAn9F14dTHCCXZs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})