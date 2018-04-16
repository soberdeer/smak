import React, {PureComponent} from 'react'
import './style.css'

class Menu extends PureComponent {
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
            <div className="menu">
                <ul className='menu_list'>

                </ul>
            </div>
        )
    }
}

export default Menu

const menu_item = ({href, img, alt, opacity, transform}) => {
    return (<li>
        <a href={href} className="move" style={`opacity: ${opacity}, transform: ${transform}`}>
            <span className="curtain"></span>
            <figure><img src={img} alt={alt}/></figure>
            <div className="title">
                <div className="table">
                    <div className="cell">
                        <div className="btn-wrap">
                            <div className="arrow-link">
                                 <span className="arrow-wrap v1">
                                     <span className="arrow">
                                         <span className="line">
                                         </span>
                                        </span>
                                     </span>
                                <span className="text"><i>VIEW ALL</i></span>
                                <span className="arrow-wrap v2">
                                    <span className="arrow">
                                        <span className="line">
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </li>)
};
