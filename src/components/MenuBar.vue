<template>
    <div>
        <v-app-bar
            app
            color="primary"
            dark
        >
        <router-link :to="_link">
            <v-img
                class="mr-4"
                src="../assets/oc_logo_social.png"
                max-height="50"
                max-width="50"
                contain
            ></v-img>
        </router-link>
            <v-toolbar-title class="title">
                <div>{{ this.title }}</div>    
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items
                v-for="item in activeMenus"
                :key="item.link"
                class="hidden-md-and-down"
            >
                <v-btn
                    exact                    
                    :ref="item.link"
                    link
                    :to="{ name: item.name, params: { id: currentPersonRoleID } }"
                    :color="item.color"
                    text
                >
                    {{ item.text }}
                </v-btn>
            </v-toolbar-items>
            <v-menu v-if="this.user != null && selectedGroup != ''" offset-y
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="accent"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="mr-4 ml-4"
                    >
                    {{ selectedGroup }}
                    </v-btn>
                </template>
                <v-list>
                    <!--<v-list-item
                        v-for="group in groups"
                        :key="group"
                        @click="(selectedGroup = group); resetMenu()"
                    >
                        <v-list-item-title>{{ group }}</v-list-item-title>
                    </v-list-item> -->
                        <v-list-group
                            v-for="(group,i) in user.access"
                            :key="i"
                            no-action
                            sub-group
                                            @click.stop.prevent

                        >
                            <template v-slot:activator>
                                <v-list-item-title v-text="group.name"></v-list-item-title>
                            </template>

                            <v-list-item
                            v-for="(role,j) in group.roles"
                            :key="j"
                            @click="selectedRoles = role; selectedGroup = group.name; resetMenu()"
                            >
                            <v-list-item-content>
                                <v-list-item-title v-text="role"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                </v-list>
            </v-menu>
            <v-menu
                bottom
                min-width="200px"
                rounded
                offset-y
                v-if="user != null"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        x-large
                        v-on="on"
                        v-bind="attrs"
                    >
                        <v-avatar 
                            v-if="user != null"
                            color="secondary"
                        >
                            <span class="accent--text font-weight-bold">{{ initials }}</span>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-list-item-content class="justify-center">
                        <div class="mx-auto text-center">
                            <v-avatar
                                color="secondary"
                                class="mt-2 mb-2"
                            >
                                <span class="accent--text font-weight-bold">{{ initials }}</span>
                            </v-avatar>
                            <h3>{{ name }}</h3>
                            <p class="text-caption mt-1">
                                {{ user.email }}
                            </p>
                            <v-divider class="my-3"></v-divider>
                            <v-btn
                                depressed
                                rounded
                                text
                                @click="goToRightInfo()"
                            >
                                Edit Account
                            </v-btn>
                            <v-divider class="my-3" v-if="!selectedRoles.includes('Admin')"></v-divider>
                            <v-btn
                                depressed
                                rounded
                                text
                                :to="{ name: 'apply' }"
                                v-if="!selectedRoles.includes('Admin')"
                            >
                                Apply
                            </v-btn>
                            <v-divider class="my-3" v-if="!selectedRoles.includes('Admin')"></v-divider>
                            <v-btn
                                depressed
                                rounded
                                text
                                :to="{ name: 'help' }"
                                v-if="!selectedRoles.includes('Admin')"
                            >
                                Help
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn
                                depressed
                                rounded
                                text
                                @click="logout()"
                            >
                                Logout
                            </v-btn>
                        </div>
                    </v-list-item-content>
                </v-card>
            </v-menu>
            <v-app-bar-nav-icon
                dark
                class="hidden-lg-and-up"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
        </v-app-bar>

        <!-- <v-app-bar color="primary" dark class="hidden-lg-and-up">
            <v-img
                class="mx-2"
                src="../assets/oc_logo_social.png"
                max-height="40"
                max-width="40"
                contain
            ></v-img>
            <v-toolbar-title class="title">
                <div>{{ this.title }}</div>    
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon
                dark
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
        </v-app-bar> -->
        <v-navigation-drawer
            v-if="drawer"
            class="hidden-lg-and-up"
            v-model="drawer"
            app            
            right
            :mini-variant.sync="$vuetify.breakpoint.smAndDown"
            color="primary"
        >
            <v-list>
                <v-list-item
                    exact
                    v-for="item in activeMenus"
                    :to="{ name: item.name, params: { id: currentPersonRoleID } }"
                    :color="item.color"
                    :key="item.text"
                >
                    <v-list-item-action>
                        <v-icon color="white" v-if="item.icon">{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ item.text }} </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import Utils from '@/config/utils.js';
import AuthServices from '@/services/authServices.js'
import GroupServices from '@/services/groupServices.js'
import PersonRoleServices from '@/services/personRoleServices.js'

export default {
    name: 'App',
    data: () => ({
        user: {},
        drawer: false,
        title: '',
        initials: '',
        name: '',
        roles: [],
        groups: [],
        incompleteGroups: [],
        hasTopics: true,
        selectedGroup: '',
        selectedRoles: '',
        activeMenus: [],
        currentPersonRoleID: 0,
        menus: [
            {
                link: 'tutorHome',
                name: 'tutorHome',
                color: 'white',
                text: 'Home',
                icon: 'mdi-home',
                roles: 'Tutor'
            },
            {
                link: 'studentHome',
                name: 'studentHome',
                color: 'white',
                text: 'Home',
                icon: 'mdi-home',
                roles: 'Student'
            },
            {
                link: 'adminHome',
                name: 'adminHome',
                color: 'white',
                text: 'Home',
                icon: 'mdi-home',
                roles: 'HeadAdmin,Admin,Supervisor'
            },
            {
                link: 'mainCalendar',
                name: 'mainCalendar',
                color: 'white',
                text: 'Calendar',
                icon: 'mdi-calendar',
                roles: 'HeadAdmin,Admin,Supervisor,Tutor,Student'
            },
            {
                link: 'requestList',
                name: 'requestList',
                color: 'white',
                text: 'Requests',
                icon: 'mdi-alert',
                roles: 'HeadAdmin,Admin,Supervisor'
            },
            {
                link: 'personList',
                name: 'personList',
                color: 'white',
                text: 'People',
                icon: 'mdi-account-multiple',
                roles: 'HeadAdmin,Admin,Supervisor'
            },
            {
                link: 'pendingList',
                name: 'pendingList',
                color: 'white',
                text: 'Applications',
                icon: 'mdi-text-account',
                roles: 'HeadAdmin,Admin,Supervisor'
            },
            {
                link: 'topicList',
                name: 'topicList',
                color: 'white',
                text: 'Topics',
                icon: 'mdi-bookshelf',
                roles: 'HeadAdmin,Admin,Supervisor'
            },
            {
                link: 'roleList',
                name: 'roleList',
                color: 'white',
                text: 'Roles',
                icon: 'mdi-folder-account',
                roles: 'HeadAdmin,Admin,Supervisor'
            },
            {
                link: 'locationList',
                name: 'locationList',
                color: 'white',
                text: 'Locations',
                icon: 'mdi-map-marker',
                roles: 'HeadAdmin,Admin,Supervisor'
            },
            {
                link: 'reportList',
                name: 'reportList',
                color: 'white',
                text: 'Reports',
                icon: 'mdi-chart-line',
                roles: 'HeadAdmin,Admin,Supervisor'
            },
            {
                link: 'groupList',
                name: 'groupList',
                color: 'white',
                text: 'Groups',
                roles: 'Headdmin'
            },
            {
                link: 'availabilityAdd',
                name: 'availabilityAdd',
                color: 'white',
                text: 'Availability',
                icon: 'mdi-clipboard-text-clock',
                roles: 'Tutor'
            },
            {
                link: 'requestAdd',
                name: 'requestAdd',
                color: 'white',
                text: 'Request',
                icon: 'mdi-alert',
                roles: 'Student'
            },
        ],
    }),
    async created() {
        // ensures that their name gets set properly from store
        this.user = Utils.getStore('user');
        console.log(this.user)
        if (this.user != null) {
            this.title = 'OC Tutoring';
            //console.log(this.initials)
            this.initials = this.user.fName[0] + this.user.lName[0];
            //console.log(this.initials)
            this.name = this.user.fName + ' ' + this.user.lName;
        }
    },
    async mounted() {
        console.log("in mounted")
        await this.resetMenu();
        console.log("done with mounted")
    },
    computed: {
        _link() {
            return "/" + this.selectedRoles.toLowerCase() + "Home/" + this.currentPersonRoleID;
        }
    },
    methods: {
        menuAction(route) {
            //console.log(this.currentPersonRoleID);
            this.$router.push({ name: route, params: { id: this.currentPersonRoleID }  });
        },
        async setGroupsAndRoles() {
            this.user = Utils.getStore('user');
            if (this.user != null) {
                this.title = 'OC Tutoring';
                //console.log(this.initials)
                this.initials = this.user.fName[0] + this.user.lName[0];
                //console.log(this.initials)
                this.name = this.user.fName + ' ' + this.user.lName;
                this.groups = [];
                this.user.access.forEach(element => {
                    this.groups.push(element.name);
                });
                for (let i = 0; i < this.user.access.length; i++) {
                    if (this.selectedGroup === '' || this.selectedGroup === undefined || this.selectedGroup === null) {
                            this.selectedGroup = this.user.access[0].name
                            this.user.selectedGroup = this.selectedGroup
                            Utils.setStore("user", this.user);
                    } else
                    {
                      this.user.selectedGroup = this.selectedGroup
                      Utils.setStore("user", this.user);
                    }
                    if (this.selectedRoles === '' || this.selectedRoles === undefined || this.selectedRoles === null) {
                        this.selectedRoles = this.user.access[0].roles[0]
                    }
                    this.user.selectedRoles = this.selectedRoles
                    Utils.setStore("user", this.user);
                    await this.getPersonRoles();
                }
            }
            else this.title = '';
        },
        async resetMenu() {
            this.user = Utils.getStore('user');
            if (this.user !== null) {
                await this.getIncompletePersonRoles()
                .then(async () => {
                    if(this.incompleteGroups.length === 0) {
                        await this.getIncompleteTopics()
                        .then(async () => {
                            if (this.hasTopics) {
                                await this.setGroupsAndRoles()
                                .then(() => {
                                    
                                    if (this.selectedGroup === '' && this.user.selectedGroup === undefined)
                                    {
                                        this.selectedGroup = this.groups[0];
                                        this.user.selectedGroup = this.selectedGroup
                                        Utils.setStore("user", this.user);
                                    }
                                    else if (this.selectedGroup === '')
                                        this.selectedGroup = this.user.selectedGroup;

                                    if (this.user != null) {
                                        this.activeMenus = this.menus;
                                        this.activeMenus = this.menus.filter(menu =>
                                            menu.roles.includes(this.selectedRoles),
                                        );
                                        //console.log(this.selectedRoles);
                                        //console.log(this.activeMenus);
                                        if (this.selectedRoles.includes("Student"))
                                            this.limitStudentMenu();
                                        else if (this.selectedRoles.includes("Tutor"))
                                            this.limitTutorMenu();
                                        else if (this.selectedRoles.includes("Admin"))
                                            this.limitAdminMenu();
                                    } 
                                    else {
                                        this.activeMenus = this.menus.filter(menu =>
                                            menu.roles.includes('None'),
                                        );
                                    } 
                                    this.menuAction(this.activeMenus[0].name);
                                })
                            }
                            else {
                                if (this.user != null) {
                                    this.title = 'OC Tutoring';
                                    //console.log(this.initials)
                                    this.initials = this.user.fName[0] + this.user.lName[0];
                                    //console.log(this.initials)
                                    this.name = this.user.fName + ' ' + this.user.lName;
                                }
                                this.$router.push({ name: "tutorTopics" });
                            }
                        })
                    }
                    else if(this.incompleteGroups.length !== 0) {
                        if (this.user != null) {
                            this.title = 'OC Tutoring';
                            //console.log(this.initials)
                            this.initials = this.user.fName[0] + this.user.lName[0];
                            //console.log(this.initials)
                            this.name = this.user.fName + ' ' + this.user.lName;
                        }
                        this.$router.push({ name: "contract" });
                    }
                })
            }
        },
        async getIncompletePersonRoles() {
            await GroupServices.getIncompleteGroupsForPerson(this.user.userID)
            .then((response) => {
                this.incompleteGroups = [];
                //console.log(response)
                for (let i = 0; i < response.data.length; i++) {
                    let group = response.data[i];
                    //console.log(group);
                    this.incompleteGroups.push(group);
                }
            })
            .catch((error) => {
                console.log("There was an error:", error.response);
            });
        },
        async getIncompleteTopics() {
            await GroupServices.getGroupTopicsForTutor(this.user.userID)
            .then(response => {
                this.hasTopics = true;
                //console.log(response)
                for (let i = 0; i < response.data.length && this.hasTopics; i++) {
                    let group = response.data[i];
                    //console.log(group.topic)
                    if (group.topic.length === 0) {
                        this.hasTopics = false;
                    }
                }
            })
            .catch(error => {
                console.log("There was an error:", error.response)
            });
        },
        async getPersonRoles() {
            await GroupServices.getGroupsForPerson(this.user.userID)
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    let group = response.data[i];
                    if (this.selectedGroup.includes(group.name)) {
                        for (let j = 0; j < group.role.length; j++) {
                            let role = group.role[j];
                            if(this.selectedRoles.includes(role.type)) {
                                this.currentPersonRoleID = role.personrole[0].id;
                            }
                        }
                    }
                }
            })
            .catch((error) => {
                console.log("There was an error:", error.response);
            });
        },
        goToRightInfo() {
            if (this.selectedRoles.includes("Student"))
                this.$router.push({ name: "studentInfo"});
            else if (this.selectedRoles.includes("Tutor"))
                this.$router.push({ name: "tutorInfo"});
            else if (this.selectedRoles.includes("Admin"))
                this.$router.push({ name: "adminInfo"});
        },
        logout() {
            console.log("in logout function")
            AuthServices.logoutUser(this.user)
            .then(response => {
                console.log(response);
                Utils.removeItem('user')
                this.$router.go();
                this.$router.push({ name: "login"})
            })
            .catch(error => {
                console.log('error', error);
            })
        },
        async limitTutorMenu() {
            if(this.selectedRoles.includes('tutor') || this.selectedRoles.includes('Tutor')) {
                let approved = false;
                await PersonRoleServices.getPersonRole(this.currentPersonRoleID)
                .then((response) => {
                    if(response.data.status.includes("approved") || response.data.status.includes("Approved"))
                    {
                        approved = true;
                    }
                })
                .catch((error) => {
                    console.log("There was an error:", error.response);
                });

                if(!approved) {
                    // makes only tutor home page show up on menu bar
                    this.activeMenus = this.activeMenus.filter(menu =>
                        menu.name.includes("tutorHome"));
                    //console.log(this.activeMenus)
                }
            }
        },
        async limitStudentMenu() {
            if(this.selectedRoles.includes('student') || this.selectedRoles.includes('Student')) {
                let approved = false;
                await PersonRoleServices.getPersonRole(this.currentPersonRoleID)
                .then((response) => {
                    if(response.data.status.includes("approved") || response.data.status.includes("Approved"))
                    {
                        approved = true;
                    }
                })
                .catch((error) => {
                    console.log("There was an error:", error.response);
                });

                if(!approved) {
                    // makes only tutor home page show up on menu bar
                    this.activeMenus = this.activeMenus.filter(menu =>
                        menu.name.includes("studentHome"));
                    console.log(this.activeMenus)
                }
            }
        },
        async limitAdminMenu() {
            if(this.selectedRoles.includes('admin') || this.selectedRoles.includes('Admin')) {
                let approved = false;
                await PersonRoleServices.getPersonRole(this.currentPersonRoleID)
                .then((response) => {
                    if(response.data.status.includes("approved") || response.data.status.includes("Approved"))
                    {
                        approved = true;
                    }
                })
                .catch((error) => {
                    console.log("There was an error:", error.response);
                });

                if(!approved) {
                    // makes only tutor home page show up on menu bar
                    this.activeMenus = this.activeMenus.filter(menu =>
                        menu.name.includes("adminHome"));
                    console.log(this.activeMenus)
                }
            }
        }
    },
};
</script>
