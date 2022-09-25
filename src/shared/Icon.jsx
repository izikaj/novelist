function Icon({ className = "w-6", raw = undefined } = {}) {
  if (!raw) return;

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: raw }}>
    </div>
  )
}

export default Icon;
