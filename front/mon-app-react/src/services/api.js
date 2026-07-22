export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
})

const getAuthHeaders = () => ({
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
})

const publicHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
})

// Les API Resources Laravel enveloppent automatiquement le résultat dans
// une clé "data" (que ce soit un objet unique ou une collection).
// Ce helper dépaquette si besoin, et ne change rien si la réponse est déjà brute.
const unwrap = (json) => (json && typeof json === 'object' && 'data' in json ? json.data : json)

export const apiRegister = async (data) => {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: publicHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiLogin = async (data) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: publicHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiLogout = async () => {
  const res = await fetch(`${API_URL}/api/logout`, {
    method: 'POST',
    headers: getHeaders(),
  })
  return { ok: res.ok }
}

export const apiGetMe = async () => {
  const res = await fetch(`${API_URL}/api/me`, {
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiGetServices = async () => {
  const res = await fetch(`${API_URL}/api/services`, {
    headers: { Accept: 'application/json' },
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiGetReservations = async () => {
  const res = await fetch(`${API_URL}/api/reservations`, {
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiGetService = async (id) => {
  const res = await fetch(`${API_URL}/api/services/${id}`, {
    headers: { Accept: 'application/json' },
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiCreateReservation = async (data) => {
  const res = await fetch(`${API_URL}/api/reservations`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiUpdateReservation = async (id, data) => {
  const res = await fetch(`${API_URL}/api/reservations/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiGetAdminDashboard = async (aValiderPage = 1) => {
  const res = await fetch(`${API_URL}/api/admin/dashboard?a_valider_page=${aValiderPage}`, {
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiValiderPrestataire = async (id) => {
  const res = await fetch(`${API_URL}/api/admin/prestataires/${id}/valider`, {
    method: 'PATCH',
    headers: getHeaders(),
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiRejeterPrestataire = async (id) => {
  const res = await fetch(`${API_URL}/api/admin/prestataires/${id}/rejeter`, {
    method: 'PATCH',
    headers: getHeaders(),
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiGetCategories = async () => {
  const res = await fetch(`${API_URL}/api/categories`, {
    headers: { Accept: 'application/json' },
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiGetPrestataires = async () => {
  const res = await fetch(`${API_URL}/api/prestataires`, {
    headers: { Accept: 'application/json' },
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiCreatePrestataire = async (data) => {
  const res = await fetch(`${API_URL}/api/prestataires`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiUpdatePrestataire = async (id, data) => {
  const res = await fetch(`${API_URL}/api/prestataires/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiCandidaterPrestataire = async (data) => {
  const res = await fetch(`${API_URL}/api/prestataires/candidature`, {
    method: 'POST',
    headers: publicHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiDeletePrestataire = async (id) => {
  const res = await fetch(`${API_URL}/api/prestataires/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return { ok: res.ok }
}

export const apiCreateCategorie = async (data) => {
  const res = await fetch(`${API_URL}/api/categories`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiUpdateCategorie = async (id, data) => {
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiDeleteCategorie = async (id) => {
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return { ok: res.ok }
}

export const apiCreateService = async (data) => {
  const isFormData = data instanceof FormData
  const res = await fetch(`${API_URL}/api/services`, {
    method: 'POST',
    headers: isFormData ? getAuthHeaders() : getHeaders(),
    body: isFormData ? data : JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiUpdateService = async (id, data) => {
  const isFormData = data instanceof FormData
  const res = await fetch(`${API_URL}/api/services/${id}`, {
    method: 'PUT',
    headers: isFormData ? getAuthHeaders() : getHeaders(),
    body: isFormData ? data : JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiDeleteService = async (id) => {
  const res = await fetch(`${API_URL}/api/services/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return { ok: res.ok }
}

export const apiGetServiceAvis = async (id) => {
  const res = await fetch(`${API_URL}/api/services/${id}/avis`, {
    headers: { Accept: 'application/json' },
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiCreateAvis = async (data) => {
  const res = await fetch(`${API_URL}/api/avis`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiSignalerAvis = async (id, motif) => {
  const res = await fetch(`${API_URL}/api/avis/${id}/signaler`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ motif }),
  })
  const json = await res.json()
  return { ok: res.ok, status: res.status, data: unwrap(json) }
}

export const apiGetAdminUtilisateurs = async (utilisateursPage = 1, prestatairesPage = 1) => {
  const res = await fetch(
    `${API_URL}/api/admin/utilisateurs?utilisateurs_page=${utilisateursPage}&prestataires_page=${prestatairesPage}`,
    { headers: getAuthHeaders() }
  )
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiDeleteUtilisateur = async (id) => {
  const res = await fetch(`${API_URL}/api/admin/utilisateurs/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  const json = res.status !== 204 ? await res.json() : null
  return { ok: res.ok, data: json ? unwrap(json) : null }
}

export const apiDeleteAdminPrestataire = async (id) => {
  const res = await fetch(`${API_URL}/api/admin/utilisateurs/prestataires/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  const json = res.status !== 204 ? await res.json() : null
  return { ok: res.ok, data: json ? unwrap(json) : null }
}

export const apiGetAdminMissions = async (page = 1) => {
  const res = await fetch(`${API_URL}/api/admin/missions?page=${page}`, {
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiUpdateProfil = async (data) => {
  const res = await fetch(`${API_URL}/api/profil`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiChangePassword = async (data) => {
  const res = await fetch(`${API_URL}/api/profil/password`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  return { ok: res.ok, data: unwrap(json) }
}

export const apiGetAllServices = async () => {
  const res = await fetch(`${API_URL}/api/services`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Erreur API ${res.status}`)
  const json = await res.json()
  return unwrap(json)
}

export const apiGetServiceById = async (id) => {
  const res = await fetch(`${API_URL}/api/services/${id}`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Erreur API ${res.status}`)
  const json = await res.json()
  return unwrap(json)
}