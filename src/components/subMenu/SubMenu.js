import React, { Component } from 'react';
import './style.css';
import data from '../../data';
import pizza from '../../assets/pizza.jpg';

class SubMenu extends Component {
  state = {
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
    data: [],
    activeMenu: 0,
    activeSubmenu: null,
  };

  onResize = () => this.setState({
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    },
  );

  onSetMenu = activeMenu => this.setState({ activeMenu });

  addToBusket = itemId => console.log(itemId)

  componentDidMount() {
    const items = data.menu_sections.reduce(
      (previous, section) => {
        if (section.items) {
          section.items.forEach(item => previous.push(item));
        } else {
          if (section.subsections !== null) {
            section.subsections.forEach(subsection => {
              if (subsection.items) {
                subsection.items.forEach(item => previous.push(item));
              }
            });
          }
        }
        return previous;
      }, [],
    );

    this.setState({ data: items });
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }


  render() {
    console.log(this.state.data);
    return (
      <div className="menu">
        <nav className="menu_navigation">
          <ul className="menu_items">
            {data.menu_sections.map(({ title, id, subsections }) =>
              navItem(title, id, subsections, this.state.activeMenu, this.onSetMenu))}
          </ul>
        </nav>
        <ul className='menu_list'>
          {this.state.data.length !== 0 &&
          this.state.data
            .filter((item) => item.section_id === this.state.activeMenu
            && item.subsection_id ? item.subsection_id === this.state.subsection_id : true)
            .map((item, index) => menu_item(item, index, this.addToBusket))
          }
        </ul>
      </div>
    );
  }
}

export default SubMenu;

const menu_item = (item, i, onClick) => (
  <li
    className={'' + setTimeout(() => 'rendered', 70 * i)}
    style={{
      height: window.innerWidth / 4 + 'px',
      animationDelay: 70 * i + 'ms',
    }}
    key={item.id}
  >
    <div className="shop-item-hidden">
      <button
        type="button"
        className="btn btn-block btn-dark"
        onClick={() => onClick(item.id)}
      >В корзину</button>
    </div>
    <span className="curtain"></span>
    <figure className={'menu_item_figure'}><img src={item.image} alt={item.text} /></figure>
    <div className="title">
      <div className="table">

      </div>
    </div>

  </li>
);


const navItem = (str, id, subsections, active, onClick) => (
  <li
    key={id}
    className={active === id ? 'active' : ''}
  >
    <button
      type="button"
      className="menu_button"
      onClick={() => onClick(id)}
    >
      <span>{str}</span>
      <i className="line" />
    </button>
  </li>
);

const arr = [{ href: '/', thumb: pizza, text: 'as' },
  { href: '/', thumb: pizza, text: 'as' },
  { href: '/', thumb: pizza, text: 'as' },
  { href: '/', thumb: pizza, text: 'as' },
  { href: '/', thumb: pizza, text: 'as' },
  { href: '/', thumb: pizza, text: 'as' },
  { href: '/', thumb: pizza, text: 'as' },
  { href: '/', thumb: pizza, text: 'as' },
];
