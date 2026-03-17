// hooks/useSEO.js
import { useEffect } from 'react'
import { buildSEO } from '../seo/seoConfig.js'

export function useSEO({ title, description, image, url, type } = {}) {
  const seo = buildSEO({ title, description, image, url, type })
  return seo
}
