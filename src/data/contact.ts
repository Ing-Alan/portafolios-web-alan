import type { ContactInfo } from './types'

const WHATSAPP_NUMBER = '595982283750'
const WHATSAPP_MESSAGE = 'Hola Alan, vi tu portafolio y quería consultarte por...'
const EMAIL = 'alvarengaojedaa03@gmail.com'

export const contact: ContactInfo = {
  whatsapp: {
    display: '+595 982 283750',
    number: WHATSAPP_NUMBER,
    message: WHATSAPP_MESSAGE,
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  },
  email: {
    address: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  linkedin: {
    label: 'alan-alvarenga-ojeda',
    href: 'https://www.linkedin.com/in/alan-alvarenga-ojeda',
  },
  github: {
    label: 'Ing-Alan',
    href: 'https://github.com/Ing-Alan',
  },
  inquiryTypes: ['Proyecto o sistema', 'Oportunidad laboral', 'Colaboración social', 'Otro'],
}
