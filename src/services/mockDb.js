// Base de dades en memòria per a demo/mockup
// Les dades es resetegen al refrescar el navegador.
// Quan es connecti a un backend real, substituir aquest fitxer.

import { TERRITORIES } from '../data/content'

// --- Territories ---

let territories = TERRITORIES.map((name, i) => ({
  id: `ter-${i + 1}`,
  name,
  whatsapp_link: i === 0 ? 'https://chat.whatsapp.com/DIV3azgeD8X0DNg2fc195T' : null,
  created_at: new Date().toISOString(),
}))

// --- Registrations (dades fake per a demo) ---

const NOW = Date.now()
const DAY = 86400000

let registrations = [
  { id: 'reg-1', name: 'Laura Vidal', company: 'Vidal & Associats', territory_id: 'ter-1', phone: '+34612345001', email: 'laura@vidal.cat', topics: ['networking', 'lideratge'], consent: true, created_at: new Date(NOW - 1 * DAY).toISOString() },
  { id: 'reg-2', name: 'Marta Puig', company: 'Puig Textils', territory_id: 'ter-1', phone: '+34612345002', email: 'marta@puigtextils.com', topics: ['relleu', 'financament'], consent: true, created_at: new Date(NOW - 2 * DAY).toISOString() },
  { id: 'reg-3', name: 'Jordi Mas', company: 'TechBcn', territory_id: 'ter-3', phone: '+34612345003', email: 'jordi@techbcn.io', topics: ['digital', 'innovacio'], consent: true, created_at: new Date(NOW - 3 * DAY).toISOString() },
  { id: 'reg-4', name: 'Anna Serra', company: 'Serra Construccions', territory_id: 'ter-5', phone: '+34612345004', email: 'anna@serraconst.cat', topics: ['sostenibilitat'], consent: true, created_at: new Date(NOW - 5 * DAY).toISOString() },
  { id: 'reg-5', name: 'Pol Ferrer', company: 'Ferrer Digital', territory_id: 'ter-3', phone: '+34612345005', email: 'pol@ferrerdigital.com', topics: ['marketing', 'digital'], consent: true, created_at: new Date(NOW - 8 * DAY).toISOString() },
  { id: 'reg-6', name: 'Núria Bosch', company: 'Bosch Advocats', territory_id: 'ter-1', phone: '+34612345006', email: 'nuria@boschadvocats.cat', topics: ['legal', 'networking'], consent: true, created_at: new Date(NOW - 12 * DAY).toISOString() },
  { id: 'reg-7', name: 'Marc Roca', company: 'Roca Imports', territory_id: 'ter-4', phone: '+34612345007', email: 'marc@rocaimports.es', topics: ['internacionalitzacio'], consent: true, created_at: new Date(NOW - 20 * DAY).toISOString() },
  { id: 'reg-8', name: 'Laia Font', company: 'Font Ecològic', territory_id: 'ter-5', phone: '+34612345008', email: 'laia@fontecologic.cat', topics: ['sostenibilitat', 'events'], consent: true, created_at: new Date(NOW - 35 * DAY).toISOString() },
]

let nextRegId = 9

// --- Admin users ---

let adminUsers = [
  {
    id: 'usr-1',
    email: 'admin@pimec.org',
    password: 'admin',
    full_name: 'Super Admin',
    role: 'superadmin',
    territory_id: null,
    created_at: new Date(NOW - 90 * DAY).toISOString(),
  },
  {
    id: 'usr-2',
    email: 'barcelona@pimec.org',
    password: 'demo',
    full_name: 'Pere Sala',
    role: 'president',
    territory_id: 'ter-1',
    created_at: new Date(NOW - 60 * DAY).toISOString(),
  },
  {
    id: 'usr-3',
    email: 'girona@pimec.org',
    password: 'demo',
    full_name: 'Marta Coll',
    role: 'president',
    territory_id: 'ter-3',
    created_at: new Date(NOW - 45 * DAY).toISOString(),
  },
  {
    id: 'usr-4',
    email: 'tarragona@pimec.org',
    password: 'demo',
    full_name: 'Joan Prats',
    role: 'president',
    territory_id: 'ter-5',
    created_at: new Date(NOW - 30 * DAY).toISOString(),
  },
]

let nextUsrId = 5

// --- Session (persisteix a sessionStorage per sobreviure navegació) ---

const SESSION_KEY = 'pimec_mock_session'

function getStoredSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setStoredSession(profile) {
  if (profile) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(profile))
  } else {
    sessionStorage.removeItem(SESSION_KEY)
  }
}

function toProfile(user) {
  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    territory_id: user.territory_id,
  }
}

// --- API pública (mateixa interfície que tindria un backend real) ---

export const db = {
  // Auth
  auth: {
    async signIn(email, password) {
      await delay(400)
      const user = adminUsers.find((u) => u.email === email && u.password === password)
      if (!user) throw new Error('Email o contrasenya incorrectes')
      setStoredSession(toProfile(user))
      return { profile: toProfile(user) }
    },

    getSession() {
      return getStoredSession()
    },

    signOut() {
      setStoredSession(null)
    },
  },

  // Territories
  territories: {
    async getAll() {
      await delay(300)
      return [...territories].sort((a, b) => a.name.localeCompare(b.name))
    },

    async getByName(name) {
      await delay(100)
      return territories.find((t) => t.name === name) || null
    },

    async updateLink(id, whatsappLink) {
      await delay(300)
      const t = territories.find((t) => t.id === id)
      if (!t) throw new Error('Territori no trobat')
      t.whatsapp_link = whatsappLink || null
      return { ...t }
    },
  },

  // Registrations
  registrations: {
    async getAll() {
      await delay(300)
      return [...registrations].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    },

    async insert({ name, company, territory_id, phone, email, topics, consent }) {
      await delay(200)
      const reg = {
        id: `reg-${nextRegId++}`,
        name,
        company,
        territory_id,
        phone,
        email,
        topics: topics || [],
        consent: consent ?? true,
        created_at: new Date().toISOString(),
      }
      registrations.push(reg)
      return { ...reg }
    },
  },

  // Presidents (gestió d'admins)
  presidents: {
    async getAll() {
      await delay(300)
      return adminUsers
        .filter((u) => u.role === 'president')
        .map((u) => ({ ...toProfile(u), created_at: u.created_at }))
    },

    async create({ email, full_name, territory_id }) {
      await delay(400)
      if (adminUsers.find((u) => u.email === email)) {
        throw new Error('Ja existeix un usuari amb aquest email')
      }
      if (adminUsers.find((u) => u.role === 'president' && u.territory_id === territory_id)) {
        throw new Error('Aquest territori ja té un president assignat')
      }
      const user = {
        id: `usr-${nextUsrId++}`,
        email,
        password: 'demo',
        full_name,
        role: 'president',
        territory_id,
        created_at: new Date().toISOString(),
      }
      adminUsers.push(user)
      return { ...toProfile(user), created_at: user.created_at }
    },

    async update(id, { full_name, email, territory_id }) {
      await delay(300)
      const user = adminUsers.find((u) => u.id === id && u.role === 'president')
      if (!user) throw new Error('President no trobat')
      if (email && email !== user.email && adminUsers.find((u) => u.email === email)) {
        throw new Error('Ja existeix un usuari amb aquest email')
      }
      if (territory_id && territory_id !== user.territory_id &&
          adminUsers.find((u) => u.role === 'president' && u.territory_id === territory_id)) {
        throw new Error('Aquest territori ja té un president assignat')
      }
      if (full_name !== undefined) user.full_name = full_name
      if (email !== undefined) user.email = email
      if (territory_id !== undefined) user.territory_id = territory_id
      return { ...toProfile(user), created_at: user.created_at }
    },

    async remove(id) {
      await delay(300)
      const idx = adminUsers.findIndex((u) => u.id === id && u.role === 'president')
      if (idx === -1) throw new Error('President no trobat')
      adminUsers.splice(idx, 1)
    },
  },
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
