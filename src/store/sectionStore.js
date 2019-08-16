import { ItemStore, Item } from './itemStore';

import { observable, action, flow } from 'mobx';


class Section {

  id = null;
  price = null;
  name = null;
  link = null;
  image = null;
  description = null;
  weight = null;

  @observable
  thumbnail = '';


  @observable


  set(id, price, name, link, image, description, weight) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.price = price;
    this.link = link;
    this.weight = weight;
  }

  @action
  loadThumbnail = flow(function* () {
    try {
      let response = yield ownRequest('GET', `${PREFIX}/users/${this.id}/profileThumbnail`, 'image/jpeg');
      if (response.status === 200) {
        let blob = yield response.blob();
        let urlCreator = window.URL || window.webkitURL;
        this.thumbnail = urlCreator.createObjectURL(blob);
      }
    } catch (err) {
      console.log(err);
    }
  });

  @action
  loadTasks = flow(function* () {

    try {


    } catch (err) {
      console.log(err);
    }
  });

}


class SectionStore {

  @observable
  sections = [];

  has(sectionID) {
    return this.sections.some(section => {
      return section.id === sectionID;
    });
  }

  getSection(sectionID) {
    return this.sections.find(section => {
      return section.id === sectionID;
    });
  }

  getSectionByName(name) {
    return this.sections.find(section => {
      return section.name.indexOf(name) !== -1;
    });
  }

  loadSections = flow(function* () {
    try {
      // let response = yield ownRequest('GET', `${PREFIX}/agentdata`, 'application/vnd.uberblik.agentsData+json')
      // if (response.status === 200) {
      //     let data = yield response.json()
      //     for (let agent of data.agentsData) {
      //         if (!this.has(agent.agentsUser.id)) {
      //             this.add(agent)
      //         }
      //     }
      // }
    } catch (err) {
      console.log(err);
    }
  });

}


export default ItemStore;
