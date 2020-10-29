import React from 'react';
import { Row, Col, Card, Divider } from 'antd';
import './style.css';
import Avatar1 from './avatar1.svg';

const styles = { background: '', padding: '8px 0' };
const cardStyle = { width: '100%', height: 'auto', padding: '10px', display: 'flex', justifyContent: 'center' }

const Layout = ({ civicData }) => {

    const address = civicData && civicData.address.line1
    const city = civicData && civicData.address.city
    const state = civicData && civicData.address.state
    const zip = civicData && civicData.address.zip

    const usSenRepOneName = civicData && civicData.usSenatorOne.name
    const usSenRepTwoName = civicData && civicData.usSenatorTwo.name
    const usSenRepsTitle = civicData && civicData.upperRepTitle.name

    const usSenRepOnePhoto = civicData && civicData.usSenatorOne.photoUrl
    const usSenRepTwoPhoto = civicData && civicData.usSenatorTwo.photoUrl
    const usSenRepOneWebLink = civicData && civicData.usSenatorOne.urls
    const usSenRepTwoWebLink = civicData && civicData.usSenatorTwo.urls
    const usSenArea = civicData && civicData.usSenatorsArea.name

    const usHouseRepsTitle = civicData && civicData.lowerRepTitle.name
    const usHouseArea = civicData && civicData.usHouseArea.name
    const usHouseRepName = civicData && civicData.usHouseRep.name
    const usHouseRepPhoto = civicData && civicData.usHouseRep.photoUrl
    const usHouseRepWebLink = civicData && civicData.usHouseRep.urls

    //Handles Missing CA Senators Photo - *Special code as most users will be from California
    const AltCaSenPhoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Kamala_Harris_official_photo_%28cropped2%29.jpg/899px-Kamala_Harris_official_photo_%28cropped2%29.jpg'
    const photFixer = usSenArea === 'California' ? AltCaSenPhoto : usSenRepOnePhoto ? usSenRepOnePhoto : Avatar1

    return (
        <>
            <Divider />
            <Row justify={'center'}>
                <Col>
                    <h3>Representatives For:</h3>
                    <div>{address}</div>
                    <div>{city}, {state} {zip}</div>
                </Col>
            </Row>
            <Divider />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                <Col className="gutter-row" lg={6} md={9} sm={24} xs={24} >
                    <div style={styles}>
                        <Card style={cardStyle}>
                            <div className="rep-photo" style={{ backgroundImage: `url(${photFixer})` }} ></div>
                            <h3>{usSenRepOneName}</h3>
                            {usSenRepsTitle} of {usSenArea}
                            <div><a href={usSenRepOneWebLink} target="_blank" rel="noreferrer">Website</a></div>
                        </Card>
                    </div>
                </Col>
                <Col className="gutter-row" lg={6} md={9} sm={24} xs={24} >
                    <div style={styles}>
                        <Card style={cardStyle}>
                            <div className="rep-photo" style={{ backgroundImage: `url(${usSenRepTwoPhoto || Avatar1})` }} ></div>
                            <h3>{usSenRepTwoName}</h3>
                            {usSenRepsTitle} of {usSenArea}
                            <div><a href={usSenRepTwoWebLink} target="_blank" rel="noreferrer">Website</a></div>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Divider />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                <Col className="gutter-row" lg={6} md={9} sm={24} xs={24} >
                    <div style={styles}>
                        <Card style={cardStyle}>
                            <div className="rep-photo" style={{ backgroundImage: `url(${usHouseRepPhoto || Avatar1})` }} ></div>
                            <h3>{usHouseRepName}</h3>
                            <div >{usHouseRepsTitle}</div>
                            <div className="rep-title">{usHouseArea}</div>
                            <div><a href={usHouseRepWebLink} target="_blank" rel="noreferrer">Website</a></div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Layout;