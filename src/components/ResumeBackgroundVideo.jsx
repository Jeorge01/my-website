import { useEffect } from "react";

const useVideoFocusControl = (videoRef) => {
    useEffect(() => {
        // Initial play setup
        videoRef.current?.play();
        
        const handleVisibilityChange = () => {
            if (document.hidden) {
                videoRef.current?.pause();
            } else {
                videoRef.current?.play();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        // Also listen for focus events for faster response
        window.addEventListener("focus", () => videoRef.current?.play());

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("focus", () => videoRef.current?.play());
        };
    }, [videoRef]);
};

export default useVideoFocusControl;