import './Loader.scss'
import { Oval } from 'react-loader-spinner'

function Loader() {
  return (
    <div className='loader'>
      <Oval
        height={80}
        width={80}
        color="#5271FF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#5271Ff"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
  </div>
  )
}

export default Loader