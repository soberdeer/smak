import { flow } from 'mobx'
import ItemStore from './itemStore'
import AppStore from './appStore'

/**
 * Represents store for the app
 */
const StoreModel = types.model('StoreModel', {
    //appStore: types.optional(AppStore, AppStore.create({})),

    activityStore: types.optional(ActivityStore, ActivityStore.create({ activities: [] })),
    userStore: types.optional(UserStore, UserStore.create({ users: {} })),
    inviteStore: types.optional(InviteStore, InviteStore.create({})),
    organizationStore: types.optional(OrganizationStore, OrganizationStore.create({}))
}).volatile(() => {
    return {
        itemStore: null,
        styleStore: null,
        languageStore: null,
        subscriptionStore: null,
        appStore: null,
        notificationStore: null
    }
}).views(self => {
    return {
        logState() {
            console.log(getSnapshot(store))
        },
        get boardsLoaded() {
            return self.boardStore.boardsLoaded
        },
        elementsLoaded(boardID) {
            try {
                return self.boardStore.get(boardID).elements.elementsLoaded
            } catch (err) {
                console.log(err)
                return false
            }
        },
        filesLoaded(boardID, elementID) {
            try {
                return self.boardStore.get(boardID).elements.get(elementID).files.filesLoaded
            } catch (err) {
                console.log(err)
                return false
            }
        },
        getBoard(boardID) {
            return self.boardStore.get(boardID)
        },
        getElement(boardID, elementID) {
            try {
                return self.boardStore.get(boardID).elements.get(elementID)
            }
            catch (err) {
                return undefined
            }
        },
        getLanguage() {
            return self.languageStore.language
        },
        getElements(boardID) {
            try {
                return self.boardStore.get(boardID).elements.elements
            } catch (err) {
                console.log(err)
                return undefined
            }
        },
        getFile(boardID, elementID, fileID) {
            try {
                return self.boardStore.get(boardID).elements.get(elementID).files.get(fileID)
            } catch (err) {
                return undefined
            }
        },
        getFileByIndex(boardID, elementID, index) {
            try {
                return self.boardStore.get(boardID).elements.get(elementID).files.getByIndex(index)
            } catch (err) {
                return undefined
            }
        },
        getFiles(boardID, elementID) {
            try {
                return self.boardStore.get(boardID).elements.get(elementID).files.getFiles()
            } catch (err) {
                return undefined
            }
        },
        getComment(boardID, elementID, fileID, commentID) {
            try {
                self.boardStore.get(boardID)
                    .elements.get(elementID)
                    .files.get(fileID)
                    .comments.get(commentID)
            } catch (err) {
                return undefined
            }
        },
        getUser(userID) {
            return self.userStore.get(userID)
        },
        getInvitation(inviteID) {
            return self.inviteStore.get(inviteID)
        },
        getActivity(boardID, activityID) {
            try {
                return self.boardStore.get(boardID).activities.get(activityID)
            }
            catch (err) {
                return undefined
            }
        },
        getOrganization(organizationID) {
            return self.organizationStore.getById(organizationID)
        },
        strings() {
            return self.languageStore.strings
        }
    }
}).actions(self => {
    return {
        afterCreate() {
            self.agentStore = new AgentStore()
            self.styleStore = new StyleStore()
            self.languageStore = new LanguageStore()
            self.subscriptionStore = new SubscriptionStore()
            self.appStore = new AppStore(self)
            self.notificationStore = new NotificationStore()
        },
        clean() {
            self.boardStore = BoardStore.create({ boards: [] })
            self.activityStore = ActivityStore.create({ activities: [] })
            self.userStore = UserStore.create({ users: {} })
            self.inviteStore = InviteStore.create({})
            self.organizationStore = OrganizationStore.create({})
            self.agentStore = new AgentStore()
            self.subscriptionStore = new SubscriptionStore()
            self.appStore.clean()

        },
        decreaseFilesCount(boardID, elementID) {
            try {
                self.getElement(boardID, elementID).filesCount -= 1
                return true
            } catch (err) {
                console.log(err)
                return false
            }
        },
        setLanguage(locale) {
            self.languageStore.setLanguage(locale)
        },
        addLink: flow(function* addLink(boardID, elementID, link) {
            try {
                yield self.boardStore.get(boardID).elements.get(elementID).files.addLink(link)
                return true
            } catch (err) {
                console.log(err)
                return false
            }
        }),
        addFile: flow(function* addFile(boardID, elementID, file) {
            try {
                yield self.boardStore.get(boardID).elements.get(elementID).files.addFile(file)
                return true
            } catch (err) {
                console.log(err)
                return false
            }
        }),
        removeFile: flow(function* removeFile(boardID, elementID, fileID) {
            try {
                yield self.boardStore.get(boardID).elements.get(elementID).files.remove(fileID)
                return true
            } catch (err) {
                console.log(err)
            }
            return false
        })
    }
})
/**
 * Instance of the store
 * @constant
 */
const store = StoreModel.create({})
unprotect(store)
export default store
