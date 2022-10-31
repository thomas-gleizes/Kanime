import classnames from 'classnames'

interface Props {
  value: number
  max: number
  actions: any
}

const Pagination: Component<Props> = ({ value, max, actions }) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={actions.previous}
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        <li>
          <button
            aria-current="page"
            className={classnames(
              'py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
              max === value ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'
            )}
          >
            {1}
          </button>
        </li>
        <li>
          <button
            aria-current="page"
            className={classnames(
              'py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
              max === value ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'
            )}
          >
            ...
          </button>
        </li>

        {Array.from({ length: Math.min(max, 3) }, (_, index) => (
          <li key={index}>
            <button
              aria-current="page"
              className={classnames(
                'py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
                value - 1 + index === value
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 bg-white'
              )}
            >
              {value - 1 + index}
            </button>
          </li>
        ))}
        <li>
          <button
            aria-current="page"
            className={classnames(
              'py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
              max - 1 === value ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'
            )}
          >
            ...
          </button>
        </li>
        {value < max && (
          <li>
            <button
              aria-current="page"
              className={classnames(
                'py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700',
                max === value ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'
              )}
            >
              {max}
            </button>
          </li>
        )}

        <li>
          <button
            className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={actions.next}
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
