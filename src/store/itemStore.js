import { observable, action, flow } from 'mobx'


class Item {

    id = null
    price = null
    name = null
    link = null
    image = null
    description = null
    weight = null

    @observable
    thumbnail = ''


    @observable


    set(id, price, name, link, image, description, weight) {
        this.id = id
        this.description = description
        this.name = name
        this.price = price
        this.link = link
        this.weight = weight
    }

    @action
    loadThumbnail = flow(function* () {
        try {
            let response = yield ownRequest('GET', `${PREFIX}/users/${this.id}/profileThumbnail`, 'image/jpeg')
            if (response.status === 200) {
                let blob = yield response.blob()
                let urlCreator = window.URL || window.webkitURL
                let thumb = urlCreator.createObjectURL(blob)
                this.thumbnail = thumb
            }
        } catch (err) {
            console.log(err)
        }
    })

    @action
    loadTasks = flow(function* () {

        try {


        } catch (err) {
            console.log(err)
        }
    })

}


class ItemStore {

    items = []

    has(itemID) {
        return this.items.some(item => { return item.id === Number(itemID) })
    }

    getItem(itemID) {
        return this.items.find(item => { return item.id === Number(itemID) })
    }

    getItemByName(name) {
        return this.items.find(item => {
            return item.name.indexOf(name) !== -1
        })
    }

    loadItems = flow(function* () {
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
            console.log(err)
        }
    })

}




export default ItemStore
