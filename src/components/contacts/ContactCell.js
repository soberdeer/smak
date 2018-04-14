import React, {PureComponent} from 'react'


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

    render() {

        return (
            <div className='contact' >

            </div>
        )
    }
}

export default Contacts

