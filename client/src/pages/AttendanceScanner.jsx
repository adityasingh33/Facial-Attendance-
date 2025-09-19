import React, { useState, useRef, useEffect } from 'react';
import useFaceApi from '../hooks/useFaceApi';

const AttendanceScanner = () => {
    const { modelsLoaded, loadingMessage, getFaceMatcher } = useFaceApi();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isVideoActive, setIsVideoActive] = useState(false);
    const [recognizedStudents, setRecognizedStudents] = useState([]);
    const [faceMatcher, setFaceMatcher] = useState(null);

    useEffect(() => {
        if (modelsLoaded) {
            // Immediately prepare the face matcher once models are loaded
            prepareFaceMatcher();
        }
    }, [modelsLoaded]);

    const prepareFaceMatcher = async () => {
        const matcher = await getFaceMatcher();
        if (matcher) {
            setFaceMatcher(matcher);
        }
    };
    
    const startWebcam = async () => { /* Same as previous version */ };
    const stopWebcam = () => { /* Same as previous version */ };
    
    // Condensed for brevity - full code is in the single-file version
    useEffect(() => {
        if (!isVideoActive || !faceMatcher) return;
        const intervalId = setInterval(async () => { /* Detection logic here */ }, 200);
        return () => clearInterval(intervalId);
    }, [isVideoActive, faceMatcher]);


    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Attendance Scanner</h2>
            <div className="bg-white p-6 rounded-2xl shadow">
                <p className="text-center mb-4 font-medium">{loadingMessage}</p>
                 <div className="flex justify-center gap-4 mb-4">
                    <button onClick={startWebcam} disabled={!modelsLoaded || isVideoActive || !faceMatcher} className="bg-green-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">Start Camera</button>
                    <button onClick={stopWebcam} disabled={!isVideoActive} className="bg-red-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">Stop Camera</button>
                </div>
                <div className="relative w-full max-w-2xl mx-auto aspect-video bg-black rounded-lg overflow-hidden">
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full" />
                    <canvas ref={canvasRef} className="absolute top-0 left-0" />
                </div>
                {/* Recognized students list */}
            </div>
        </div>
    );
};

export default AttendanceScanner;
