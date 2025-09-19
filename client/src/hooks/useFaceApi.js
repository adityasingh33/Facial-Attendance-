import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import api from '../services/api';

const useFaceApi = () => {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Loading models...');

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models';
            try {
                await Promise.all([
                    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                ]);
                setModelsLoaded(true);
                setLoadingMessage('Models loaded successfully.');
            } catch (error) {
                console.error("Error loading models: ", error);
                setLoadingMessage('Could not load models.');
            }
        };
        loadModels();
    }, []);

    const getFaceMatcher = async () => {
        try {
            setLoadingMessage('Fetching student face data...');
            const students = await api.getStudentsWithFaceData();
            if (students.length === 0) {
                setLoadingMessage('No registered student faces found.');
                return null;
            }

            const labeledFaceDescriptors = students.map(student => {
                const descriptors = [Float32Array.from(student.faceEmbedding)];
                return new faceapi.LabeledFaceDescriptors(student.rollNumber, descriptors);
            });
            
            setLoadingMessage('Ready to scan.');
            return new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
        } catch (error) {
            console.error("Error creating face matcher: ", error);
            setLoadingMessage('Error fetching student data.');
            return null;
        }
    };


    return { modelsLoaded, loadingMessage, getFaceMatcher };
};

export default useFaceApi;
