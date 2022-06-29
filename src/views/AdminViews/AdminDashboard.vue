<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Hello, {{ this.user.fName }}!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>Admin</v-toolbar-title>
      </v-toolbar>
      <v-row justify="center">
        <v-col md="4">
          <v-card
            :to="{ name: 'requestList' }"
            class="mx-auto my-10 d-flex justify-center"
            max-width="400"
            height="200"
            elevation="10"
            color="accent"
          >
            <v-card-title class="justify-left white--text">
              STUDENT REQUESTS
              <br />
              {{ receivedrequests }} Received <br />{{
                inprogressrequests
              }}
              In-Progress <br />{{ completerequests }} Complete <br />{{
                requestnum
              }}
              Total
            </v-card-title>
          </v-card>
        </v-col>
        <v-col md="4">
          <v-card
            :to="{ name: 'requestList' }"
            class="mx-auto my-10 d-flex justify-center"
            max-width="400"
            height="200"
            elevation="10"
            color="accent"
          >
            <v-card-title class="justify-center white--text">
              TUTOR APPLICATIONS
              <br />
              {{ unapprovednum }} Unapproved
              <br />
              <br />
              <br />
              <br />
              <br />
            </v-card-title>
          </v-card>
        </v-col>
        <br />
        <br />
      </v-row>
      <div id="chart">
        <apexchart
          type="donut"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <v-row>
        <v-col md="4">
          <v-card
            class="mx-auto my-10 d-flex justify-center"
            elevation="10"
            color="accent"
          >
            <v-card-title class="justify-left white--text">
              View Appointment Info
            </v-card-title>
          </v-card> </v-col
        ><v-col md="4">
          <v-card
            class="mx-auto my-10 d-flex justify-center"
            elevation="10"
            color="accent"
          >
            <v-card-title class="justify-left white--text">
              View Tutor Info
            </v-card-title>
          </v-card> </v-col
        ><v-col md="4">
          <v-card
            class="mx-auto my-10 d-flex justify-center"
            elevation="10"
            color="accent"
          >
            <v-card-title class="justify-left white--text">
              View Topic Info
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-card class="tutor">
        <v-card-title>
          Upcoming Appointment Info
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="appointmentTable"
          :search="search"
          :items="weeks"
          :items-per-page="50"
        ></v-data-table>
      </v-card>
      <br />
      <v-card class="tutor">
        <v-card-title>
          Tutor Info
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="tutorTable"
          :search="search"
          :items="tutors"
          :items-per-page="50"
        ></v-data-table>
      </v-card>
      <br />

      <v-card class="tutor">
        <v-card-title>
          Topic Info
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="topicTable"
          :search="search"
          :items="topics"
          :items-per-page="50"
        ></v-data-table>
      </v-card>

      <br /><br />
      <v-card>
        <v-card-title>
          Upcoming Appointments for {{ this.user.selectedGroup }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :search="search"
          :items="appointments"
          :items-per-page="50"
        ></v-data-table>
      </v-card>
      <div id="app">
        <section class="container">
          <div class="columns">
            <div class="column">
              <chartjs-bar
                :labels="labels"
                :data="dataset"
                :bind="true"
              ></chartjs-bar>
            </div>
          </div>
        </section>
      </div>
    </v-container>
  </div>
</template>

<script src='//cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js'></script>
<script src='//unpkg.com/vue-chartjs@2.6.0/dist/vue-chartjs.full.min.js'></script>
<script src='//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.js'></script>
<script src='//unpkg.com/hchs-vue-charts@1.2.8'></script>
    <script >
"use strict";

Vue.use(VueCharts);
var app = new Vue({
  el: "#app",
  components: {
    apexchart: VueApexCharts,
  },
  data: function data() {
    return {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      dataentry: null,
      datalabel: null,
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      dataset: [5, 10, 15, 25, 45, 70, 115, 185, 70, 75, 70, 60],
    };
  },

  methods: {
    addData: function addData() {
      this.dataset.push(this.dataentry);
      this.labels.push(this.datalabel);
      this.datalabel = "";
      this.dataentry = "";
    },
  },
});
</script>
<script>
import Utils from "@/config/utils.js";
import AppointmentServices from "@/services/appointmentServices.js";
import AvailabilityServices from "@/services/availabilityServices.js";
import GroupServices from "@/services/groupServices.js";
import RequestServices from "@/services/requestServices.js";
import TopicServices from "@/services/topicServices.js";
import PersonServices from "@/services/personServices.js";

export default {
  props: ["id"],
  name: "App",
  watch: {
    id: function () {
      //console.log(this.id);
    },
  },
  components: {},
  data() {
    return {
      search: "",

      // user and group info
      user: {},
      group: {},

      // current requests and availability
      requests: {},
      availability: {},

      // current numbers
      receivedrequests: 0,
      completerequests: 0,
      inprogressrequests: 0,
      unapprovednum: 0,
      requestnum: 0,

      // table info
      weeklist: [],
      weeks: [],
      tutors: [],
      topics: [],
      topicsToShow: [],
      appointments: [],
      appt_count: [],
      hour_count: [],
      complete_count: [],
      booked_count: [],
      week: [],

      // table headers
      appointmentTable: [
        { text: "Week starting", value: "week" },
        { text: "# Appointments", value: "appointmentNum" },
        { text: "# Hours", value: "hours" },
        { text: "# Scheduled", value: "scheduledAppointments" },
        { text: "# Completed", value: "completedAppointments" },
      ],
      tutorTable: [
        { text: "First Name", value: "fName" },
        { text: "Last Name", value: "lName" },
        { text: "# Appts", value: "date" },
        { text: "# Open Hours", value: "name" },
        { text: "# Hours Paying", value: "name" },
      ],
      topicTable: [
        { text: "Week starting", value: "week" },
        { text: "Topic Name", value: "name" },
        { text: "# Hours available", value: "hours" },
      ],
      headers: [
        { text: "Date", value: "date" },
        { text: "Start Time", value: "startTime" },
        { text: "End Time", value: "endTime" },
        { text: "Topic", value: "topic.name" },
      ],
    };
  },
  async created() {
    this.user = Utils.getStore("user");
    await this.getGroup(this.user.selectedGroup.replace(/%20/g, " ")).then(
      () => {
        this.getAppointmentsForGroup();
        this.getRequests();
        this.getAvailabilities();
        this.getTutors();
        this.getTopics();
        this.setWeeks();
      }
    );
  },
  methods: {
    async setWeeks() {
      await this.setWeekList();

      for (let index = 0; index < this.weeklist.length; ++index) {
        let element = this.weeklist[index];
        await AppointmentServices.getAppointmentHourCount(
          this.group.id,
          element
        )
          .then((responseHour) => {
            this.week = element.slice(0, 10);
            this.appt_count = responseHour.data[0].count;
            this.hour_count = responseHour.data[0].diff;
            this.booked_count = responseHour.data[0].booked;
            this.complete_count = responseHour.data[0].complete;
          })
          .catch((error) => {
            console.log(
              "There was an error getting hour count:",
              error.responseHour
            );
          });
        this.weeks.push(
          JSON.parse(
            '{"week":"' +
              this.week +
              '", "appointmentNum": "' +
              (await this.checkNum(this.appt_count)) +
              '", "hours":"' +
              (await this.checkHours(this.hour_count)) +
              '", "completedAppointments":"' +
              (await this.checkHours(this.complete_count)) +
              '", "scheduledAppointments":"' +
              (await this.checkHours(this.booked_count)) +
              '"}'
          )
        );
        console.log(this.weeks);
      }
    },
    async getGroup(name) {
      await GroupServices.getGroupByName(name)
        .then((response) => {
          this.group = response.data[0];
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    async setWeekList() {
      var currentDate = new Date();
      var prev = await this.getPrevWeek(currentDate);
      var current = await this.toSQLDate(currentDate);
      var next = await this.getNextWeek(currentDate);
      this.weeklist = [prev, current, next];
    },
    async getNextWeek(week) {
      var date = new Date(week.getTime() + 7 * 24 * 60 * 60 * 1000);
      var next = await this.toSQLDate(date);
      return next;
    },
    async getPrevWeek(week) {
      var date = new Date(week.getTime() - 7 * 24 * 60 * 60 * 1000);
      var prev = await this.toSQLDate(date);
      return prev;
    },
    async toSQLDate(day) {
      var date = day.toISOString().slice(0, 19).replace("T", " ").slice(0, 10);
      return date;
    },
    async checkNum(num) {
      if (!num) {
        return 0 + " total";
      }
      return num + " total";
    },
    async checkHours(hours) {
      if (!hours) {
        return 0;
      }
      var total = await this.toHoursAndMinutes(hours);
      return total;
    },
    async toHoursAndMinutes(totalMinutes) {
      var minutes = parseInt(totalMinutes) % 60;
      var hours = Math.floor(parseInt(totalMinutes) / 60);

      return hours + " hr " + minutes + " min";
    },
    async getAppointmentsForGroup() {
      await AppointmentServices.getUpcomingAppointmentForGroup(this.group.id)
        .then((response) => {
          this.appointments = response.data;
          for (let index = 0; index < this.appointments.length; ++index) {
            let element = this.appointments[index];
            // set unapproved number to display
            if (element.status === "applied") {
              this.unapprovednum = this.unapprovednum + 1;
            }
            //format date
            let formattedDate =
              element.date.toString().substring(5, 10) +
              "-" +
              element.date.toString().substring(0, 4);
            this.appointments[index].date = formattedDate;
            // format start time
            let modST = element.startTime.toString().substring(0, 2) % 12;
            let formattedST =
              modST + ":" + element.startTime.toString().substring(3, 5);
            if (element.startTime.toString().substring(0, 2) > 12) {
              formattedST = formattedST + " P.M.";
            } else if (
              modST == 0 &&
              element.startTime.toString().substring(0, 2) == "12"
            ) {
              formattedST =
                "12:" + element.startTime.toString().substring(3, 5) + " P.M.";
            } else if (modST == 0) {
              formattedST =
                "12:" + element.startTime.toString().substring(3, 5) + " A.M.";
            } else {
              formattedST = formattedST + " A.M.";
            }
            this.appointments[index].startTime = formattedST;
            // format end time
            let modET = element.endTime.toString().substring(0, 2) % 12;
            let formattedET =
              modET + ":" + element.endTime.toString().substring(3, 5);
            if (element.endTime.toString().substring(0, 2) > 12) {
              formattedET = formattedET + " P.M.";
            } else if (
              modET == 0 &&
              element.endTime.toString().substring(0, 2) == "12"
            ) {
              formattedET =
                "12:" + element.endTime.toString().substring(3, 5) + " P.M.";
            } else if (modET == 0) {
              formattedET =
                "12:" + element.endTime.toString().substring(3, 5) + " A.M.";
            } else {
              formattedET = formattedET + " A.M.";
            }
            this.appointments[index].endTime = formattedET;
          }
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },

    async getTopics() {
      await this.setWeekList();

      for (let index = 0; index < this.weeklist.length; ++index) {
        let element = this.weeklist[index];
        await TopicServices.getHoursPerTopic(this.group.id, element)
          .then((response) => {
            this.topics = response.data;
            for (let index = 0; index < this.topics.length; ++index) {
              let element = this.appointments[index];
              var topics = 0;
              TopicServices.getHoursPerTopic(element.id)
                .then((result) => {
                  topics = result.data;
                })
                .catch((error) => {
                  console.log("There was an error:", error.response);
                });
              this.topic.push(
                JSON.parse(
                '{"week":"' + this.week +
                  '", "name": "' + topics[0].name +
                  '", "hours":"' + topics[0].hours + '"}'
                  ))
            }
            
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
      }
    },
    
    async getTutors() {
      await PersonServices.getApprovedTutorsForGroup(this.group.id)
        .then((response) => {
          this.tutors = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    async getAvailabilities() {
      await AvailabilityServices.getAllAvailabilities()
        .then((response) => {
          this.availabilities = response.data;
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    
    
    async getRequests() {
      await RequestServices.getAllForGroup(this.group.id)
        .then((response) => {
          this.requests = response.data;
          for (let index = 0; index < this.requests.length; ++index) {
            let request = this.requests.length;
            this.requestnum = this.requestnum + 1;
            if (request.status === "in-progress") {
              this.inprogressrequests = this.inprogressrequests + 1;
            } else if (request.status === "received") {
              this.receivedrequests = this.receivedrequests + 1;
            } else if (request.status === "complete") {
              this.completerequests = this.completerequests + 1;
            }
          }
          console.log("requests: " + JSON.stringify(response.data))
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
  },
};
</script>