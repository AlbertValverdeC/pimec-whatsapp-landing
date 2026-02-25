export const PERKS = [
  { emoji: '🍻', title: 'Birres & Networking', desc: 'Trobades informals cada mes' },
  { emoji: '🏢', title: 'Visites a empreses', desc: 'Accés a empreses inspiradores' },
  { emoji: '🎤', title: 'Ponències top', desc: 'Empresaris que han petat' },
  { emoji: '✈️', title: 'Viatges PIMEC', desc: 'Visites a empreses per Espanya' },
  { emoji: '🤝', title: 'Xarxa real', desc: 'Contactes que es converteixen en amics' },
  { emoji: '🚀', title: 'Oportunitats', desc: 'Col·laboracions i negoci' },
]

export const TOPICS = [
  { id: 'networking', emoji: '🤝', name: 'Networking' },
  { id: 'relleu', emoji: '🔄', name: 'Relleu Generacional' },
  { id: 'financament', emoji: '💰', name: 'Finançament' },
  { id: 'innovacio', emoji: '💡', name: 'Innovació' },
  { id: 'legal', emoji: '⚖️', name: 'Legal i Fiscal' },
  { id: 'marketing', emoji: '📣', name: 'Màrqueting' },
  { id: 'lideratge', emoji: '🎯', name: 'Lideratge' },
  { id: 'sostenibilitat', emoji: '🌱', name: 'Sostenibilitat' },
  { id: 'internacionalitzacio', emoji: '🌍', name: 'Internacional' },
  { id: 'digital', emoji: '🖥️', name: 'Digital & IA' },
  { id: 'wellbeing', emoji: '🧠', name: 'Benestar' },
  { id: 'events', emoji: '📅', name: 'Esdeveniments' },
]

export const TESTIMONIALS = [
  {
    quote: 'En 3 mesos he fet més contactes útils que en 3 anys anant a fires.',
    name: 'Laura Vidal',
    role: 'Directora, Vidal & Associats',
    initials: 'LV',
  },
  {
    quote: "Vaig trobar un mentor que m'ha canviat la visió del negoci familiar.",
    name: 'Marta Puig',
    role: 'CEO, Puig Textils',
    initials: 'MP',
  },
  {
    quote: "Aquí no et sents sol. Trobes gent que t'entén de veritat.",
    name: 'Jordi Mas',
    role: 'Founder, TechBcn',
    initials: 'JM',
  },
]

export const TERRITORIES = [
  'Barcelona',
  'Catalunya Central',
  'Girona',
  'Lleida',
  'Tarragona',
  'Baix Camp',
  'Baix Llobregat - L\'Hospitalet',
  'Baix Penedès',
  'Conca de Barberà',
  'FEB-PIMEC (Badalona)',
  'Maresme - Barcelonès Nord',
  'Priorat',
  'Terres de l\'Ebre',
  'Vallès Occidental',
  'Vallès Oriental',
]

export const AGENDA_FILTER_URL =
  'https://pimec.org/ca/agenda?text=&event_type=&date_ini=&date_end=&sectorial_category_id%5B%5D=10'

export const EVENTS = [
  {
    title: 'Networking & Birres — Joves Empresaris',
    date: '13 MAR',
    time: '18:30h',
    location: 'Barcelona',
    tag: 'Networking',
    color: 'var(--pi-apricot)',
    url: 'https://pimec.org/ca/agenda',
  },
  {
    title: 'Visita a Empresa: Desigual HQ',
    date: '27 MAR',
    time: '10:00h',
    location: 'Barcelona',
    tag: 'Visita',
    color: 'var(--pi-blue)',
    url: 'https://pimec.org/ca/agenda',
  },
  {
    title: 'Ponència: Com escalar la teva pime',
    date: '03 ABR',
    time: '17:00h',
    location: 'Girona',
    tag: 'Ponència',
    color: 'var(--pi-periwinkle)',
    url: 'https://pimec.org/ca/agenda',
  },
  {
    title: 'Viatge PIMEC: Empreses de València',
    date: '10-11 ABR',
    time: 'Tot el dia',
    location: 'València',
    tag: 'Viatge',
    color: 'var(--pi-coral)',
    url: 'https://pimec.org/ca/agenda',
  },
  {
    title: 'Afterwork Relleu Generacional',
    date: '24 ABR',
    time: '19:00h',
    location: 'Tarragona',
    tag: 'Networking',
    color: 'var(--pi-gold)',
    url: 'https://pimec.org/ca/agenda',
  },
  {
    title: 'Workshop: IA per a pimes',
    date: '08 MAI',
    time: '09:30h',
    location: 'Barcelona',
    tag: 'Formació',
    color: 'var(--pi-mauve)',
    url: 'https://pimec.org/ca/agenda',
  },
]

export const STATS = [
  { value: '15', label: 'Territoris' },
  { value: '50+', label: 'Events / any' },
  { value: '500+', label: 'Empresaris' },
]
