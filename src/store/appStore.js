import { observable, flow, action } from 'mobx';

class AuthData {
    constructor(parent, root) {
        this.parent = parent
        this.root = root
    }

    @observable
    success = false

    @observable
    errorCode = 0

    @action.bound
    auth = flow(function* auth(identifier, password) {
        let response
        try {
            response = yield tokenRequest({ identifier, password })
            switch (response.status) {
                case 201:
                    let data = yield response.json()
                    localStorage.setItem('secret', data.accessToken.secret)
                    localStorage.setItem('token', data.accessToken.token)
                    localStorage.setItem('_links', data.accessToken._links[1].href)
                    this.success = true
                    let adminID = getID(data.accessToken._links[1].href)
                    yield this.root.userStore.loadUser(adminID)
                    this.parent.setAdminLoaded(adminID)
                    break
                default:
                    this.success = false
                    this.errorCode = response.status
                    break
            }
        } catch (err) {
            console.log(err)
        }
    })

    @action.bound
    reset = flow(function* reset(password) {
        let response
        try {
            response = yield ownResetPassword(password, 'application/vnd.uberblik.users+json;', PREFIX + '/passwordResetRequests')
            switch (response.status) {
                case 201:
                case 200:
                    this.success = true
                    this.errorCode = 0
                    break
                default:
                    this.success = false
                    this.errorCode = response.status
                    break
            }
        } catch (err) {
            console.log(err)
        }
    })

    @action.bound
    signUp = flow(function* signUp(newUser) {
        let response
        try {
            response = yield ownRequest('POST', PREFIX + '/selfInvitations', 'application/vnd.uberblik.selfInvitation+json', {}, newUser)
            switch (response.status) {
                case 201:
                case 200:
                    this.success = true
                    this.errorCode = 0
                    break
                default:
                    this.success = false
                    this.errorCode = response.status
                    break
            }
        } catch (err) {
            console.log(err)
        }
    })

}

/**
 * Represents the service information for the application
 * @param {number} timeDifference - this is necessary for requests singning
 * @param {boolean} websocketConnected
 * @param {string} currnetUser - id of current logged user
 * @param {object} context - contains colors
 */

class AppStore {
    constructor(parent) {
        this.parent = parent
        let currentUserId = !!localStorage.getItem('_links') === undefined || localStorage.getItem('_links') === null ? '' : localStorage.getItem('_links').split('/').pop()
        this.currentUser = currentUserId
        this.authData = new AuthData(this, parent)
    }


    //socket connection

    @observable
    wsBreak = false

    @action.bound
    setWSBreak(val) {
        this.wsBreak = val
    }

    @observable
    hidden = false

    @observable
    browserOnline = true

    @observable
    responsesInTime = true

    @observable
    noCut = true

    @action.bound
    setBrowserOnline(val) {
        this.browserOnline = val
    }
    @action.bound
    setResponsesInTime(val) {
        this.responsesInTime = val
    }
    @action.bound
    setNoCut(val) {
        this.noCut = val
    }
    @action.bound
    setHidden(val) {
        this.hidden = val
    }
    @observable
    timeDifference = 0

    @observable
    timeIsSynchronized = false

    @observable
    websocketConnected = true

    @observable
    currentUser = ''

    @observable
    currentUserLoaded = false

    context = {
        theme: {
            primary: 'rgba(255, 255, 255, 1)',
            primary_dark: 'rgba(167, 187, 200, 1)',
            accent: 'rgba(225, 26, 245, 1)',
            text: 'rgba(40, 51, 61, 1)',
            text_secondary: 'rgba(40, 51, 61, .6)',
            text_half_visible: 'rgba(40, 51, 61, .3)',
            text_highlight: 'rgba(220, 0, 255, 1)',
            url: 'rgba(35, 170, 235, 1)',
            inactive_button: 'rgba(35, 170, 235, .6)',
            alert: 'rgba(254, 0, 0, 1)',
            error: 'rgba(102, 0, 204, 1)',
            url_highlight: 'rgba(51, 204, 255, 1)',

            modal_bg: 'rgba(0, 0, 0, 1)',
            modal_text: 'rgba(255, 255, 255, 1)',
            modal_accent: 'rgba(0, 255, 254, 1)',
            resize_icon: 'rgba(116, 48, 255, .8)',
            board_title: 'rgba(97, 103, 108, 1)',
            popover_background: 'rgba(36, 43, 53, .95)',
            popover_divider: 'rgba(36, 43, 53, 1)',
            popover_text: 'rgba(153, 153, 153, 1)',
            popover_url: 'rgba(51, 204, 255, 1)',
            popover_delete_color: 'rgba(51, 204, 255, .5)',
            popover_yellow: 'rgba(255, 204, 0, 1)',

            element_border: 'rgb(154, 168, 178)',
            element_outline: 'rgba(225, 231, 236, 1)',
            element_background: 'rgba(207, 213, 217, 1)',
            element_selected_overlay: 'rgba(220, 0, 255, 1)',
            element_dropped_border: 'rgba(255, 0, 0, 1)',
            element_label_bg: 'rgba(255, 255, 255, .9)',
            element_label_text: 'rgba(0, 0, 0, 1)',
            element_label_bg_text: 'rgba(242, 242, 242, 1)',
            element_overlay: 'rgba(0, 0, 0, .05)',
            avatar_border_highlight: 'rgba(11, 35, 71, 1)',
            avatar_border: 'rgba(11, 35, 71, 0.05)',
            avatar_border_self: 'rgba(220, 0, 255, 1)',
            avatar_border_owner: 'rgba(255, 153, 51, 1)',
            avatar_border_current_user: 'rgba(161, 111,193,1)',
            avatar_border_modal: 'rgba(186,196,203, .5)',

            activity_text: 'rgba(105, 114, 125, 1)',
            activity_info_text: 'rgba(0, 0, 0, 1)',
            activity_thumbnail_background: 'rgba(80, 88, 97, 1)',
            activity_verb: 'rgba(131, 70, 194, 1)',
            picker_bg: 'rgba(0, 0, 0, 0.4)',
            svg_border: 'rgb(0, 0, 0)',
            patch: 'rgb(255, 255, 255)',

            lightbox_primary: 'rgba(0, 0, 0, 1)',
            lightbox_text: 'rgba(255, 255, 255, 1)',
            lightbox_accent: 'rgba(0, 255, 254, 1)',
            lightbox_dash: 'rgba(255, 153, 51, 1)',
            lightbox_comment_avatar_highlight: 'rgba(255, 255, 255, .8)',
            invite_focus: 'rgba(51, 204, 255, .3)',
            invite_error: 'rgba(128, 0, 128, .5)',

            overlay_resize: 'rgba(207, 213, 217, 1)',
            overlay_resize_border: 'rgba(53, 153, 255, 1)'
        }
    }

    @action.bound
    clean() {
        this.currentUser = ''
        this.currentUserLoaded = false
        this.authData = new AuthData(this, this.parent)
        this.websocketConnected = true
    }

    @action.bound
    setAdminLoaded(adminID) {
        this.currentUser = adminID
        this.currentUserLoaded = true
    }

    @action.bound
    setWSConnection(bool) {
        this.websocketConnected = bool
    }
    @action.bound
    updateTime(newTime) {
        this.timeDifference = (new Date()).getTime() - newTime
    }
    /**
     * Check the server's time and then updates timeDifference
     */
    @action.bound
    checkTime = flow(function* checkTime() {
        try {
            let response = yield ownGetTime()
            if (response.status === 200) {
                let data = yield response.json()
                this.updateTime(data.time)
                this.timeIsSynchronized = true
            }
        } catch (err) {
            console.log(err)
        }
    })
}
export default AppStore
