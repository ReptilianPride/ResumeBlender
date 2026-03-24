import React, { useRef, useState } from 'react'

export default function FileUploader({ label, accept, file, onFile, icon }) {
  const ref = useRef()
  const [drag, setDrag] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(false)
    const f = e.dataTransfer.files[0]
    if (f) onFile(f)
  }

  return (
    <div
      onClick={() => ref.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      style={{
        border: `1.5px dashed ${drag ? 'var(--accent)' : file ? 'var(--green)' : 'var(--border)'}`,
        borderRadius: 10,
        padding: '14px 18px',
        cursor: 'pointer',
        background: drag ? 'rgba(79,142,247,0.05)' : file ? 'rgba(62,207,142,0.04)' : 'var(--surface2)',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <input
        ref={ref} type="file" accept={accept}
        style={{ display: 'none' }}
        onChange={e => e.target.files[0] && onFile(e.target.files[0])}
      />
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 11, color: 'var(--muted)',
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3
        }}>
          {label}
        </div>
        <div style={{
          fontSize: 13,
          color: file ? 'var(--green)' : 'var(--muted)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
        }}>
          {file ? file.name : 'Click or drag to upload'}
        </div>
      </div>
      {file && <span style={{ color: 'var(--green)', fontSize: 16 }}>✓</span>}
    </div>
  )
}