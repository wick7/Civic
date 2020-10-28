import React, { useReducer, useState, useEffect } from 'react';
import { Modal, Button, Input, Divider, Row, Col } from 'antd';
import axios from 'axios';
import './style.css'
import 'dotenv'

const { Search } = Input;

const Landing = () => {

    const [inputAddress, setInputAddress] = useState('');
    const [modalData, setModalData] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            ModalText: 'OR',
            visible: false,
            confirmLoading: false,
            lat: 0,
            long: 0
        })

    const handleOk = () => {

        let lat;
        let long;

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            lat = position.coords.latitude
            long = position.coords.longitude
        })
        console.log(inputAddress)

        const fetchData = async () => {
            const result = await axios(`https://www.googleapis.com/civicinfo/v2/representatives?address=${inputAddress ? inputAddress : modalData.lat + ',' + modalData.long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
            console.log(result)
        };

        setModalData({
            ModalText: 'Retrieving Data...',
            confirmLoading: true,
        });
        fetchData()
        setTimeout(() => {
            setModalData({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    const onSearch = (e) => {
        setInputAddress(e.target.value)
    }

    useEffect(() => {
        console.log('API: ' + process.env.REACT_APP_GOOGLE_API_KEY)
        navigator.geolocation.getCurrentPosition((position) => {
            setModalData({ visible: true, lat: position.coords.latitude, long: position.coords.longitude })
        })
    }, [])

    return (
        <>
            <Modal
                visible={modalData.visible}
                onOk={handleOk}
                confirmLoading={modalData.confirmLoading}
                footer={[]}
            >
                <Row justify={'center'}>
                    <Col>
                        <div className="modal-kickoff">
                            <Button type="primary" onClick={handleOk} disabled={inputAddress ? true : false} >Click for Location Services</Button>
                            <div className="modal-text">{modalData.ModalText}</div>
                            <Search
                                placeholder="Enter an Address"
                                onChange={onSearch}
                                onSearch={handleOk}
                                enterButton="Search"
                            />
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default Landing;