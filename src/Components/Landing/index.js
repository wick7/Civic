import React, { useReducer, useState, useEffect } from 'react';
import { Modal, Button, Input, Row, Col, Tooltip } from 'antd';
import axios from 'axios';
import './style.css'
import 'dotenv'

const { Search } = Input;

const Landing = ({ setCivicData }) => {

    const [inputAddress, setInputAddress] = useState('');
    const [modalData, setModalData] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            ModalText: 'Or for more accurate results enter an address below.',
            visible: true,
            confirmLoading: false,
            lat: 0,
            long: 0
        })

    const handleOk = () => {
        const fetchData = async () => {
            setModalData({
                ModalText: 'Retrieving Data...',
                confirmLoading: true,
            });

            await axios(`https://www.googleapis.com/civicinfo/v2/representatives?address=${inputAddress ? inputAddress : modalData.lat + ',' + modalData.long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`).then((res) => {

                let usSenInfo = res.data.offices[2].divisionId
                let usHouseInfo = res.data.offices[3].divisionId

                let civicResults = {
                    address: res.data.normalizedInput,
                    upperRepTitle: res.data.offices[2],
                    lowerRepTitle: res.data.offices[3],
                    usSenatorOne: res.data.officials[res.data.offices[2].officialIndices[0]],
                    usSenatorTwo: res.data.officials[res.data.offices[2].officialIndices[1]],
                    usSenatorsArea: res.data.divisions[usSenInfo],
                    usHouseRep: res.data.officials[res.data.offices[3].officialIndices[0]],
                    usHouseArea: res.data.divisions[usHouseInfo],
                }

                setTimeout(() => {
                    setModalData({
                        visible: false,
                        confirmLoading: false,
                    });
                    setCivicData(civicResults)
                }, 475);

            }).catch((err) => {
                console.log(err)
                setModalData({
                    ModalText: 'Sorry, please try again. Ensure location services is activated on your device for the button option above. For more accurate results please provide a complete address in the input field below.',
                    confirmLoading: false,
                });
            })
        };
        fetchData()
    };

    const onSearch = (e) => {
        setInputAddress(e.target.value)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude)
            setModalData({ lat: position.coords.latitude, long: position.coords.longitude })
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
                            <h4>Find out who are your Senators and House Representative!</h4>
                            <Tooltip title="Location is based on ISP provider"><Button type="primary" onClick={handleOk} disabled={inputAddress ? true : false} >Click for Location Services</Button></Tooltip>
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