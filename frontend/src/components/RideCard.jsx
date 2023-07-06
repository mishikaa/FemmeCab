export const RideCard = ({carName, imgSrc, price}) => {
  return (
    <div className='flex-1 flex flex-col items-center justify-around bg-[#E0E2F0] h-[210px] rounded-t-2xl shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.2)] mx-3 hover:scale-105 cursor-pointer transition'>
        <img className="p-0.5 h-[100px] md:h-[10rem] w-[18rem]" src={imgSrc} alt="image" />
        
        <div className='flex flex-col justify-center items-center w-full  pt-1.5 px-3 mb-4'>
          <span className='font-bold text-lg'>
            {carName}
          </span>
          <span>
          ₹{price}
          </span>
        </div>
    </div>
  )
}
