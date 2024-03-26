import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://ocgoapzvekxfyrbljacg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZ29hcHp2ZWt4ZnlyYmxqYWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExMjI2MTYsImV4cCI6MjAyNjY5ODYxNn0.hjrJqTGAq6PbRm8N3KI8heOCvPqeAAn9F14dTHCCXZs')


export async function getDeals(){
    const { data, error } = await supabase
    .from('deals')
    .select()

    return data;
}