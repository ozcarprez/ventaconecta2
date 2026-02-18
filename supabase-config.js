// supabase.js - Configuración compartida
const SUPABASE_URL = 'https://miiitegvpxoplanszido.supabase.co'
const SUPABASE_KEY = 'sb_publishable_uONmieVhZiope7XWhMnFHA_gQbIHF2w'

const { createClient } = supabase
const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

// Obtener usuario actual
async function getUser() {
  const { data: { user } } = await sb.auth.getUser()
  return user
}

// Obtener perfil del usuario
async function getUserProfile(userId) {
  const { data, error } = await sb.from('users').select('*').eq('id', userId).single()
  if (error) return null
  return data
}

// Redirigir si no está autenticado
async function requireAuth() {
  const user = await getUser()
  if (!user) {
    window.location.href = 'login.html'
    return null
  }
  return user
}

// Redirigir si ya está autenticado
async function requireGuest() {
  const user = await getUser()
  if (user) {
    const profile = await getUserProfile(user.id)
    if (profile?.user_type === 'comercio') {
      window.location.href = 'dashboard-comercio.html'
    } else {
      window.location.href = 'dashboard-vendedor.html'
    }
  }
}
