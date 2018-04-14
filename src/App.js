import React, {Component} from 'react';
import Main from './components/main/Main'
import './App.css';
import Logo from './assets/Logo'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Contacts from "./components/addresses/Contacts";


class App extends Component {
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
            <div className="App" style={{
                height: this.state.height,
                width: this.state.width
            }}>
                <header className="App-header">
                    <a href='/' className={'logo'}>
                        <Logo/>
                    </a>
                    <nav>
                        <ul>
                            {menuItem('Меню')}
                            {menuItem('Акции')}
                            {menuItem('Новости')}
                            {menuItem('Доставка', 'https://www.delivery-club.ru/srv/Smak_ram/#Ulica_Ramjenki/', true)}
                            {menuItem('Контакты', '/contacts')}
                        </ul>
                    </nav>
                    {/*<h1 className="App-title">Smak</h1>*/}
                    {/*<section className="pageLinks">*/}
                    {/*<a href="/main">About</a>*/}
                    {/*</section>*/}
                </header>


                <Router>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                        <Route exact path="/contacts" component={Contacts}/>
                    </Switch>
                </Router>


            </div>
        );
    }
}

export default App;

const menuItem = (str, link, blank) => {
    return (<li>
        <a href={link ? link : '/'} target={blank ? '_blank' : '_self'}>
            <span>{str}</span>
            <i className="line"/>
        </a>
    </li>)
};
