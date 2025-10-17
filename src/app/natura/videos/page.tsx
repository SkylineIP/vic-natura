'use client'
import Videos from "@/app/components/Video"

const VideoPage = () => {
    return (
        <div className="col-span-18 row-span-24">
            <Videos
                thumb="/video/thumb.png"
                videoSrc="https://skylineip.s3.sa-east-1.amazonaws.com/Programa%C3%A7%C3%A3o/vic-engenharia/vic-natura/VIDEO+TOUR+NATURA_+1.mp4"
            />
        </div>
    )
}

export default VideoPage
