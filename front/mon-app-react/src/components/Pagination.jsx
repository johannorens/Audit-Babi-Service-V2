function Pagination({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null

  const { current_page, last_page, total, per_page } = meta

  const start = total === 0 ? 0 : (current_page - 1) * per_page + 1
  const end = Math.min(current_page * per_page, total)

  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
      <p className="text-xs text-gray-500">
        {start}–{end} sur {total}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page <= 1}
          className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-babi-dark disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-300 transition-colors"
        >
          Précédent
        </button>
        <span className="text-xs text-gray-500">
          Page {current_page} / {last_page}
        </span>
        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page >= last_page}
          className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-babi-dark disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-300 transition-colors"
        >
          Suivant
        </button>
      </div>
    </div>
  )
}

export default Pagination