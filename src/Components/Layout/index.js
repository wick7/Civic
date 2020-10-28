import React from 'react';
import { Row, Col, Card } from 'antd';
import './style.css';
import Avatar1 from './avatar1.svg';

const styles = { background: '#0092ff', padding: '8px 0' };

const Layout = ({ civicData }) => {

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


    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                <Col className="gutter-row" lg={6} md={9} sm={24} xs={24} >
                    <div style={styles}>
                        <Card
                            style={{ width: '100%' }}
                            cover={<img alt="example" src={usSenRepOnePhoto || Avatar1} />}
                        >
                            <h3>{usSenRepOneName}</h3>
                            {usSenRepsTitle} of {usSenArea}

                            <a href={usSenRepOneWebLink}>Website</a>
                        </Card>
                    </div>
                </Col>
                <Col className="gutter-row" lg={6} md={9} sm={24} xs={24} >
                    <div style={styles}>
                        <Card
                            style={{ width: '100%' }}
                            cover={<img alt="example" src={usSenRepTwoPhoto || Avatar1} />}
                        >
                            <h3>{usSenRepTwoName}</h3>
                            {usSenRepsTitle} of {usSenArea}

                            <a href={usSenRepTwoWebLink}>Website</a>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                <Col className="gutter-row" lg={6} md={9} sm={24} xs={24} >
                    <div style={styles}>
                        <Card
                            style={{ width: '100%' }}
                            cover={<img alt="example" src={usHouseRepPhoto || Avatar1} />}
                        >
                            <h3>{usHouseRepName}</h3>
                            {usHouseRepsTitle} of {usHouseArea}

                            <a href={usHouseRepWebLink}>Website</a>
                        </Card>
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default Layout;