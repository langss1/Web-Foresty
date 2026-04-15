import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Utility function to log an admin action in the database
 * @param {string} action - Descriptive action like "DELETE_PROJECT" or "LOGIN"
 * @param {object} details - Any additional data to store in JSON
 * @param {object} user - User object from auth
 */
export const logAdminAction = async (action, details = {}, user) => {
    if (!user) return;
    try {
        const deviceInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screen: `${window.screen.width}x${window.screen.height}`,
            memory: navigator.deviceMemory || 'unknown',
            hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
            timestamp: new Date().toISOString()
        };

        await supabase.from('admin_logs').insert([{
            user_id: user.id,
            user_email: user.email,
            action: action,
            details: { ...details, device: deviceInfo }
        }]);
    } catch (error) {
        console.error('Failed to log admin action:', error);
    }
}
