
<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{this.message}}</v-toolbar-title>
      </v-toolbar>
      <br><br>
    <v-card>
      <v-card-title>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
        color="accent"
        class="mr-4"
        elevation="2"
        @click="addPerson"
      >
        Add
    </v-btn>

    <v-btn
        class="mr-4"
        @click="cancel"
      >
        Back
    </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="persons"
        :items-per-page="50"
        @click:row="rowClick"
      ></v-data-table>
    </v-card>
    </v-container>
  </div>
</template>

<script>
  import Utils from '@/config/utils.js'
  import GroupServices from "@/services/groupServices.js";
  import PersonServices from '@/services/personServices.js'
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
        search: '',
        message : 'People - click person to view or edit person or click Add to add new person',
        persons: [],
        headers: [{text: 'ID', value: 'id'}, 
                  {text: 'Name', value: 'fullName'},
                  {text: 'Email Address', value: 'email'}]
      }
    },
    async created() {
      this.user = Utils.getStore('user');
      await this.getGroup(this.user.selectedGroup.replace(/%20/g, " "))
      .then(() => {
        this.getPeopleForGroup();
      })
    },
    methods: {
      async getGroup(name) {
        await GroupServices.getGroupByName(name)
        .then((response) => {
          this.group = response.data[0];
        })
        .catch((error) => {
          this.message = error.response.data.message
          console.log("There was an error:", error.response);
        });
      },
      getPeopleForGroup() {
        PersonServices.getAllForGroup(this.group.id)
        .then(response => {
          console.log(response)
          this.persons = response.data;
          for(let i = 0; i < this.persons.length; i++) {
            this.persons[i].fullName = this.persons[i].fName + " " + this.persons[i].lName;
          }
        })
        .catch(error => {
          this.message = error.response.data.message
          console.log("There was an error:", error.response)
        });
      },
      // getPersons() {
      //   PersonServices.getAllPersons()
      //   .then(response => {
      //     this.persons = response.data;
      //   })
      //   .catch(error => {
      //     console.log("There was an error:", error.response)
      //   });
      // },
      deletePerson(id, fName) {
        let confirmed = confirm(`Are you sure you want to delete ${fName}`);
        if(confirmed) {
          PersonServices.deletePerson(id)
          .then(() => {
            this.getPersons(this.start, this.length);
          })
          .catch(error => {
            this.message = error.response.data.message
            console.log("There was an error:", error.response)
          });
        }
      },
      getPrevious() {
        if(this.start >= this.length) {
          this.start -= this.length;
          this.getPersons(this.start, this.length);
        }
      },
      getNext() {
        if(this.courses.length === this.length) {
          this.start += this.length;
          this.getPersons(this.start, this.length);
        }
      },
      rowClick: function (item, row) {      
        row.select(true);
        this.$router.push({ name: 'personView', params: { id: item.id } });
      },
      addPerson() {
        this.$router.push({ name: 'personAdd'});
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  }
</script>

