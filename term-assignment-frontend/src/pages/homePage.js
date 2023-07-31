import React, {useEffect, useState} from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/homePageStyle.css';
import axios from "axios";


import AudioPlayerSpanish from "../components/spanishMP3";
import AudioPlayerEnglish from "../components/englishMP3";




const HomePage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [detectedTextEnglish, setDetectedTextEnglish] = useState('');
    const [detectedTextSpanish, setDetectedTextSpanish] = useState('');

    const [spanishMP3, setSpanishMP3] = useState('')
    const [englishMP3, setEnglishMP3] = useState('')


    const apigatewayurl = process.env.REACT_APP_API_GATEWAY_URL+'/process-image';


    useEffect(() => {
        console.log('englishMP3 updated:', englishMP3);
        console.log('spanishMP3 updated:', spanishMP3);

    }, [englishMP3, spanishMP3]);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
            if (reader.result) {

                 const imageAsBase64 = reader.result.split(',')[1]; // Get the base64 part of the Data URL
                 const requestData = {
                     image: imageAsBase64,
                 };
                 axios.post(apigatewayurl, requestData).then((response) => {
                         console.log(response.data);
                         setDetectedTextEnglish(response.data.translated_text_english)
                         setDetectedTextSpanish(response.data.translated_text_spanish)
                         setEnglishMP3(response.data.english_sound_url)
                         setSpanishMP3(response.data.spanish_sound_url)
                     })
                     .catch((error) => {
                         console.error('Error calling Lambda function:', error);
                     });
             }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center container" >
            <Row style={{ height: '100vh', paddingTop: '20px', paddingBottom: '20px' }}>
                <Col xs={12} md={6} className="mb-3">
                    <Card className="card-w-img">
                        <Card.Body>
                            <Card.Title className='card-title'>MY STUDY NOTES IMAGE</Card.Title>
                            <p></p>
                            {selectedImage && (
                                <div className="text-center">
                                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', marginBottom: '10px' }} />
                                </div>
                            )}
                            <Form.Group>
                                <Form.Label>Upload an Image</Form.Label>
                                <Form.Control type="file" onChange={handleImageSelect} />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>


                <Col xs={12} md={6}>
                    <Card className="card-w-notes">
                        <Card.Body>
                            <Form.Group>
                                <Card.Title>MY STUDY NOTES 2 SPEECH</Card.Title>
                                <p></p>
                                <Form.Label>Notes transcribed in english</Form.Label>
                                <Form.Control as="textarea" rows={6} value={detectedTextEnglish} readOnly />
                                <p></p>
                                {englishMP3 && <AudioPlayerEnglish mp3Url={englishMP3} />}
                            </Form.Group>
                            <p></p>
                            <Form.Group>
                                <Form.Label>Notes transcribed in spanish</Form.Label>
                                <Form.Control as="textarea" rows={6} value={detectedTextSpanish} readOnly />
                                <p></p>
                                {spanishMP3 && <AudioPlayerSpanish mp3Url={spanishMP3} />}
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
