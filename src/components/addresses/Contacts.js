import React, {PureComponent} from 'react'
import './style.css'
import Fb from "../../assets/Fb";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const initCenter = {
    lat: 55.693180,
    lng: 37.496776
};

class Contacts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: 0,
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth
        };
        this.onResize = this.onResize.bind(this)
    }


    onResize(e) {
        this.setState({
                height: document.documentElement.clientHeight,
                width: document.documentElement.clientWidth
            }
        )
    }


    componentDidMount(){
        window.addEventListener('resize', this.onResize);
        setTimeout(function () {
            this.setState({
                fadeIn: 1
            });
        }.bind(this), 500);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }


    render() {


        let marker = <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'Смак'}
            position={initCenter} />;
        return (
            <section className='contacts_page' style={{height: this.state.height, width: this.state.width}}>
                <div className='header-back'/>
                <div className='contacts_img map'>
                    <Map google={this.props.google}
                         style={{
                             width: '100%',
                             height: '100%'
                         }}
                         initialCenter={initCenter}
                         zoom={16}>
                        {marker}
                    </Map>
                </div>
                <div className={'contacts_details'} style={{opacity: this.state.fadeIn}}>
                    <div className={'row'}>
                        <div className={'col'}>
                        <div className={'address'}>
                            {contact_info().address}
                        </div>
                        <div className={'address'}>
                            {contact_info().tel}
                        </div>
                        <div className={'address'}>
                            {contact_info().time}
                        </div>
                        </div>
                    </div>
                </div>
                <div className={'soc_info'} style={{opacity: this.state.fadeIn}}>
                    <div className="actual_info">Актуальные новости смотрите на нашей странице в Facebook</div>
                    <div className={'fb_icon'}>
                        <Fb/>
                    </div>
                </div>

            </section>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDVvxv7-TjQ7wFLvC2NpcfdZ5l5MTYn7Dk'),
    language: 'ru',
})(Contacts)

const contact_info = () => {
    return {
        id: 1,
        head: 'Как добраться',
        address: 'Москва, ул. Раменки, 3 стр.1',
        tel: '+7 (495) 2950380',
        tel2: '+7 (926) 8089260',
        time: 'Кафе работает круглосуточно',
    }
};
