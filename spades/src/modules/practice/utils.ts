export const deepScroll = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  setTimeout(
    () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
    400
  )
}
  