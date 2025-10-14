export const sanitizePath = (path: string) => {
  const trimmedPath = path.trim()
  const capitalizedPath = trimmedPath.charAt(0).toUpperCase() + trimmedPath.slice(1)
  return capitalizedPath.replace(/-/g, ' ')
}