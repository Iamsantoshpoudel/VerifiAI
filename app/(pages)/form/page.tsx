// import Form from "@/components/Form"
import Image from "next/image";
import design from "@/assets/design/Untitled10.png"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
const page = () => {
  return (
    <>
      <Navbar />
      <section className="flex justify-center items-center min-h-screen md:justify-start md:items-start ">
        <Image
          src={design}
          alt="Placeholder image"
          width={800}
          height={800}
          className="w-full h-auto max-w-full max-h-screen object-contain md:w-auto md:h-auto md:max-w-none"
        />
      </section>
      <Footer />
    </>
  )
}

export default page
