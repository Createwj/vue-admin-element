import defaultSettings from '@/settings'

const title = defaultSettings.title || '寰宇单车俱乐部'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
