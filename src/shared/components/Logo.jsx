import "../css/logo.css"

export const Logo = ({ height = 80, width = 80 }) => {
  return (
    <img
    className="logo"
    src="/assets/ImagenesOptimizadas/Pedicuria-la-plata.webp"
    alt="Pedicuría La Plata"
    width={width}
    height={height}
  />
  )
}
