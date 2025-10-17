'use client'
import Videos from "@/app/components/Video"

const VideoPage = () => {
    return (
        <div className="col-span-18 row-span-24">
            <Videos
                thumb="/video/thumb.png"
                videoSrc="/video/video.mp4"
            />
        </div>
    )
}

export default VideoPage