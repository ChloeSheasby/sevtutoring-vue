
<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>this.message</v-toolbar-title>
      </v-toolbar>
      <br>
    <v-form
      ref="form" 
      v-model="valid"
      lazy validation
    >
      <v-text-field
        v-model="topic.name"
        id="name"
        :counter="50"
        label="Name"
        hint="Name"
        persistent-hint
        required
      ></v-text-field>
      
      <v-text-field
        v-model="topic.abbr"
        id="abbr"
        :counter="25"
        label="Abbreviation"
        hint="Abbreviation"
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
        v-model="topic.groupId"
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
        @click="addTopic"
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
import TopicServices from "@/services/topicServices.js";
import GroupServices from "@/services/groupServices.js";

export default {
  components: {
  },
  data() {
    return {
      valid: true,
      topic: {},
      group: {},
      user: {},
      roles: [
        'admin'
      ],
      message : 'Add Topic - enter data and click Save'
    };
  },
  created() {
    // this.getAllGroups();
    this.user = Utils.getStore('user');
    this.getGroup(this.user.selectedGroup.replace(/%20/g, " "));
  },
  methods: {
    getGroup(name) {
      GroupServices.getGroupByName(name)
      .then((response) => {
        this.group = response.data[0];
      })
      .catch((error) => {
        this.message = error.response.data.message
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
    addTopic() {
      this.topic.groupId = this.group.id;
      TopicServices.addTopic(this.topic)
        .then(() => {
          this.$router.push({ name: "topicList" });
        })
        .catch((error) => {
          this.message = error.response.data.message
          console.log(error);

        });
    },
    cancel() {
      this.$router.push({ name: "topicList" });
    }
  },
};
</script>
