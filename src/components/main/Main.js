import React, {PureComponent} from 'react'
import video_bg from '../../assets/video_bg.jpg'
import './style.css'

class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
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

    componentDidMount() {
        window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    render() {
        return (
            <div className="App-intro">
                <section className="video-wrap" style={{
                    height: this.state.height,
                    width: this.state.width
                }}>
                    <div className='main' style={{backgroundImage: `url(${video_bg})`}}>
                        <div className='main_delivery'>
                            <div className='main_delivery_text'>
                                <p className='sound'>ммммммм</p>
                                <span className='shashlik'>ГОРЯЧИЕ ШАШЛЫКИ</span>
                                <p className='and_pastry'>и свежая выпечка</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Main
