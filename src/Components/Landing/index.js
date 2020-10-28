import React, { useReducer, useState, useEffect } from 'react';
import { Modal, Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import './style.css'
import 'dotenv'

const { Search } = Input;

const Landing = ({ setCivicData }) => {

    const [inputAddress, setInputAddress] = useState('');
    const [modalData, setModalData] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            ModalText: 'OR',
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
                setTimeout(() => {
                    setModalData({
                        visible: false,
                        confirmLoading: false,
                    });
                }, 2000);

                let usSenInfo = res.data.offices[2].divisionId
                let usHouseInfo = res.data.offices[3].divisionId

                console.log(res.data)
                console.log(res.data.offices[2])
                console.log(res.data.offices[3])




                console.log(res.data.divisions[usSenInfo])
                console.log(res.data.divisions[usHouseInfo])

                console.log(res.data.officials[res.data.offices[2].officialIndices[0]])
                console.log(res.data.officials[res.data.offices[2].officialIndices[1]])
                console.log(res.data.officials[res.data.offices[3].officialIndices[0]])

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
                console.log(civicResults)
                setCivicData(civicResults)
            }).catch((err) => {
                setModalData({
                    ModalText: 'Sorry, please try either option again. For accurate results please provide a complete address in the input field below.',
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
        console.log('API: ' + process.env.REACT_APP_GOOGLE_API_KEY)
        navigator.geolocation.getCurrentPosition((position) => {
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