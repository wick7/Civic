import React from 'react';
import { Row, Col } from 'antd';
import './style.css';

const styles = { background: '#0092ff', padding: '8px 0' };

const Layout = ({ isTwo = false }) => {
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
            <Col className="gutter-row" lg={6} md={9} sm={24} xs={24} >
                <div style={styles}>col-6</div>
            </Col>
            {isTwo ?
                (<Col className="gutter-row" lg={6} md={9} sm={24} xs={24} >
                    <div style={styles}>col-6</div>
                </Col>)
                : ''
            }
        </Row>
    )
}

export default Layout;