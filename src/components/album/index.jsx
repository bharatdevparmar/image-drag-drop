import React, {useState, useEffect} from 'react';
import {Row, Col, Container, Card} from 'react-bootstrap';
import './album.css';
import {SwapModal} from "../modals";
import * as data from '../../utils/mockData';

const ImageSwapGame = () => {
    const [images, setImages] = useState([]);
    const [srcIndex, setSrcIndex] = useState(-1);
    const [targetIndex, setTargetIndex] = useState(-1);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (data.pictures.length > 0) {
            setImages(data.pictures);
        }
    }, [data.pictures]);

    const onImageDrop = (e, idx) => {
        e.preventDefault();
        setTargetIndex(idx);
        setShowModal(!showModal);
    };

    const onImageSwap = (targetInd) => {
        const imgArr = images;
        const target = targetInd ? targetInd : targetIndex;
        let targetImg = imgArr[target];
        imgArr[target] = imgArr[srcIndex];
        imgArr[srcIndex] = targetImg;
        setImages(imgArr)
    };

    const onDragStart = (e, index) => {
        setSrcIndex(index);
    };

    const toggleConfirmModal = () => {
        setShowModal(!showModal);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Drag and Drop Images
                </Card.Title>
                <Container className='card-container'>
                    <Row>
                        {
                            images.map((image, index) => (
                                <Col md={3} className='column' key={image.id}>
                                    <div className='image-container'>
                                        <img
                                            id={image.id}
                                            src={image.url}
                                            alt={image.name}
                                            width={'100%'}
                                            height={'auto'}
                                            draggable
                                            onDrop={(e) => onImageDrop(e, index)}
                                            onDragOver={(e) => { e.preventDefault() }}
                                            onDragStart={(e) => onDragStart(e, index)}
                                        />
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                    <SwapModal
                        show={showModal}
                        hideModal={toggleConfirmModal}
                        swapImages={onImageSwap}
                    />
                </Container>
            </Card.Body>
        </Card>
    )
};

export default ImageSwapGame;