import Navbar from "@/components/Navbar"
import Loader from "@/components/Loader"
const community = () => {
  return (
    <>
    <Navbar />
    <div>
      <p className='flex text-2xl text-white'>Community</p>
      <Loader />
    </div>
    </>
  )
}

export default community

