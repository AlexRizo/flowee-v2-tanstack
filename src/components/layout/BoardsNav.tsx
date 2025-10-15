export const BoardsNav = () => {
  return (
    <div className="border rounded-full p-1 flex gap-1 absolute left-1/2 -translate-x-1/2">
      <button
        className="text-xs text-white font-medium size-6 rounded-full flex items-center justify-center"
        style={{ background: 'green' }}
      >
        LM
      </button>
      <button
        className="text-xs text-white font-medium size-6 rounded-full flex items-center justify-center"
        style={{ background: 'brown' }}
      >
        BD
      </button>
      <button
        className="text-xs text-white font-medium size-6 rounded-full flex items-center justify-center"
        style={{ background: 'red' }}
      >
        PG
      </button>
      <button
        className="text-xs text-white font-medium size-6 rounded-full flex items-center justify-center"
        style={{ background: 'blue' }}
      >
        B
      </button>
    </div>
  )
}
