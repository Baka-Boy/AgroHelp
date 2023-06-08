import LinkedIn from "../assets/linkedin.png"
import GitHub from "../assets/github.png"
import Gmail from "../assets/gmail-logo.png"

const Contributor = ({ photo, name, info, linkedin, github, gmail }) => {
  return (
    <div className="transition duration-200 ease-in-out md:w-[40rem] w-[100%] h-[10rem] md:text-[16px] text-[11px] flex bg-slate-100 rounded-xl shadow-md hover:shadow-2xl">
        <img className="max-w-[50%] h-auto rounded-xl object-cover" src={photo} alt="image"/>
        <div className="flex flex-col justify-between px-6 py-3 text-left">
            <figcaption>
                <div className="text-left font-semibold">
                    {name}
                </div>
                <div className="">
                    {info}
                </div>
            </figcaption>
            <div className="flex gap-2 items-center">
                <p className="lg:block hidden">Contact me</p> 
                <a href={linkedin}>
                    <img className="w-[20px] hover:ring-grey" src={LinkedIn} />
                </a> 
                <a href={github}>
                    <img className="w-[20px]" src={GitHub} />
                </a> 
                <a href={gmail}>
                    <img className="w-[20px]" src={Gmail} />
                </a> 
            </div>
        </div>
    </div>
  )
}

export default Contributor