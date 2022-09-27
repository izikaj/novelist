// import { useData, setData, useKeyData } from '../../signal/user/settings'
import FontSize from './parts/FontSize'
import LineSpacing from './parts/LineSpacing'

function TextOptions() {
  return (
    <>
      <div className="flex flex-col gap-2 mt-4">
        <div className="form-control">
          <FontSize />
        </div>
        <div className="form-control">
          <LineSpacing />
        </div>
      </div>
    </>
  )
}

export default TextOptions
