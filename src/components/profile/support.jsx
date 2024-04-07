import React from 'react'

const Support = () => {
  return (
    <main>
  <div className="flex flex-col items-center laptop:mx-[20px] tablet:mx-[40px] mobile:mx-[20px]">
    <div className="py-24 w-full flex flex-col justify-center items-center">
      <div className="p-4 flex flex-col text-center sm:w-[65%] w-full">
        <h1 className="leading-tight text-4xl font-extrabold text-gray-900">Tutorials</h1>
        <span className="text-base font-normal text-gray-500 leading-7">Explore our step-by-step guides to maximize the benefits of Deutsche Aligners. Our tutorials are designed to streamline your experience and enhance your expertise.</span>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 tablet:grid-cols-2 mobile:grid-cols-1 laptop:grid-cols-3">
        <div className="flex flex-col laptop:w-[380px] tablet:w-[380px] w-full min-h-[375px] rounded-lg overflow-hidden shadow-md">
          <div className="flex items-center justify-center w-full cursor-pointer min-h-[192px]" style={{ height: "192px", backgroundImage: "url('https://i.ibb.co/yFKxppc/image-75.png')", backgroundSize: "cover", backgroundPosition: "center center" }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/zeFRK8czeIc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="p-4 flex flex-col">
            <h1 className="text-2xl font-bold pb-2 leading-tight text-gray-900">Handling new inquiries and setting presentation dates.</h1>
            <span className="text-base font-normal text-gray-500 leading-7">Learn to effectively manage new patient inquiries and set presentation submission dates, ensuring a streamlined process within the portal.</span>
          </div>
        </div>
        <div className="flex flex-col laptop:w-[380px] tablet:w-[380px] w-full min-h-[375px] rounded-lg overflow-hidden shadow-md">
          <div className="flex items-center justify-center w-full cursor-pointer min-h-[192px]" style={{ height: "192px", backgroundImage: "url('https://i.ibb.co/yFKxppc/image-75.png')", backgroundSize: "cover", backgroundPosition: "center center" }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Ny1sKQE6vbI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="p-4 flex flex-col">
            <h1 className="text-2xl font-bold pb-2 leading-tight text-gray-900">Managing new inquiries and tasks.</h1>
            <span className="text-base font-normal text-gray-500 leading-7">This guide covers the process of submitting quotes, handling new tasks, and navigating through different inquiry stages on the portal.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>



  )
}

export default Support