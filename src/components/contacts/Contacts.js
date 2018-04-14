import React, {PureComponent} from 'react'
import './style.css'
import Fb from "../../assets/Fb";

let scrollTimeout;

class Contacts extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth,
            fadeIn: '',
            fadeInAll: 0,
            scrolled: 0,
            isScrolling: false
        };
        this.onScroll = this.onScroll.bind(this)
    }

    onScroll = (e) => {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        this.setState({
            isScrolling: true,
            scrolled: scrolled
        });
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            this.setState({
                isScrolling: false
            })
        }, 1000)
    };


    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        setTimeout(function () {
            this.setState({
                fadeInAll: 1
            });
        }.bind(this), 200);
        setTimeout(function () {
            this.setState({
                fadeIn: 'fadeIn'
            })
        }.bind(this), 700)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll)
    }

    render() {
        let fadeIn = this.state.fadeIn.length > 0 ? this.state.fadeIn : '';
        let scroll = this.state.scrolled * 0.8;
        let transform = this.state.isScrolling ? `translate3d(0, ${scroll}px, 0)` : `matrix(1, 0, 0, 1, 0, ${scroll})`;
        return (
            <section className='contacts_page' >
                <figure className='contacts_img'>
                    <div className={'bg'} style={{transform: transform, opacity: this.state.fadeInAll}}/>
                </figure>
                <div className={'contacts_details ' + fadeIn}>
                    <div className={'row'}>


                    </div>

                </div>
                <div className={'soc_info'}>
                    <div className="actual_info">Актуальные новости смотрите на нашей странице в Facebook</div>
                    <div className={'fb_icon'}>
                        <Fb/>
                    </div>
                </div>
                {/*<div className='contacts_header' style={{backgroundImage: `url(${video_bg})`}}/>*/}
            </section>
        )
    }
}

export default Contacts

const contact_info = () => {
    return {
        id: 1,
        head: 'Как добраться',
        address: 'Москва, ул. Раменки, 3 стр.1',
        tel: '+7 (495) 2950380',
        tel2: '+7 (926) 8089260',
        time: 'Кафе работает круглосуточно',

    }
}
