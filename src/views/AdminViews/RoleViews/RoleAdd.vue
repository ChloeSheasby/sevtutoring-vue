
<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>{{this.message}}</v-toolbar-title>
      </v-toolbar>
      <br>
    <v-form
      ref="form" 
      v-model="valid"
      lazy validation
    >
      <v-text-field
        v-model="role.type"
        id="type"
        :counter="50"
        label="Type"
        hint="Type"
        persistent-hint
        required
      ></v-text-field>

      <!-- group should be readonly -->
      <v-text-field
        v-model="this.user.selectedGroup"
        id="this.group.id"
        label="Group"
        readonly
      ></v-text-field>
      
      <!-- <v-select
        v-model="role.groupId"
        :items="groups"
        item-text="name"
        item-value="id"
        label="Group"
        required
      >
      </v-select> -->

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="addRole"
      >
        Save
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="cancel"
      >
        Cancel
      </v-btn>
    </v-form>
    </v-container>
  </div>
</template>

<script>
import Utils from '@/config/utils.js'
import RoleServices from "@/services/roleServices.js";
import GroupServices from "@/services/groupServices.js";

export default {
  components: {
  },
  data() {
    return {
      valid: true,
      role: {},
      group: {},
      user: {},
      roles: [
        'admin'
      ],
      message : 'Add Role - enter data and click Save'
    };
  },
  created() {
    this.user = Utils.getStore('user');
    this.getGroup(this.user.selectedGroup.replace(/%20/g, " "));
    //this.getAllGroups();
  },
  methods: {
    getGroup(name) {
      GroupServices.getGroupByName(name)
      .then((response) => {
        this.group = response.data[0];
      })
      .catch((error) => {
   
        console.log("There was an error:", error.response);
      });
    },
    // getAllGroups() {
    //   GroupServices.getAllGroups()
    //     .then((response) => {
    //       this.groups = response.data;
    //     })
    //     .catch((error) => {
    //       console.log("There was an error:", error.response);
    //     });
    // },
    addRole() {
      console.log(this.group);
      this.role.groupId = this.group.id;
      RoleServices.addRole(this.role)
        .then(() => {
          this.$router.push({ name: "roleList" });
        })
        .catch((error) => {
          this.message = error.response.data.message
          console.log(error);
        });
    },
    cancel() {
      this.$router.push({ name: "roleList" });
    }
  },
};
</script>
