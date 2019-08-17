import React, {Component} from 'react';
import Main from './components/main/Main'
import './App.css';
import Logo from './assets/Logo'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Contacts from "./components/addresses/Contacts";
import SubMenu from "./components/subMenu/SubMenu";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth,
            active: window.location.pathname
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

    isBlack = () => {
        return this.state.active === '/menu' ? 'black' : 'white'
    };

    render() {


        return (
            <div className="App" style={{
                height: this.state.height,
                width: this.state.width
            }}>
                <header className="App-header">
                    <a href='/' className={'logo'}>
                        <Logo/>
                    </a>
                    <div className={'mobile-menu ' + this.isBlack()}>
                        <div className="open" ></div>
                    </div>
                    <nav className='nav'>
                        <ul className={this.isBlack()}>
                            {menuItem('Главная', '/', this.state.active)}
                            {menuItem('Меню', '/menu', this.state.active)}
                            {menuItem('Новости')}
                            {menuItem('Доставка', 'https://www.delivery-club.ru/srv/Smak_ram/#Ulica_Ramjenki/', undefined, true)}
                            {menuItem('Контакты', '/contacts', this.state.active)}
                        </ul>
                    </nav>
                </header>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                        <Route exact path="/contacts" component={Contacts}/>
                        <Route exact path="/menu" component={SubMenu}/>
                    </Switch>
                </Router>


            </div>
        );
    }
}

export default App;

const menuItem = (str, link, active, blank) => {
    const act = () => {
        return active ? active === link : '';
    };


    return (<li className={act() ? 'active' : ''} >
        <a href={link ? link : '/'} target={blank ? '_blank' : '_self'}>
            <span>{str}</span>
            <i className="line"/>
        </a>
    </li>)
};
