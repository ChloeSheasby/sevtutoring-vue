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

      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Upcoming Appointment info {{ this.user.selectedGroup }}
              <v-spacer></v-spacer>
            </v-card-title>
            <apexchart
              width="500"
              type="bar"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </v-card>
        </v-col>
      </v-row>
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
          Tutors For Week Starting {{ current_week }}
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
          Topics For Week Starting {{ current_week }}
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
    </v-container>
  </div>
</template>

<script src='//cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js'></script>
<script src='//unpkg.com/vue-chartjs@2.6.0/dist/vue-chartjs.full.min.js'></script>
<script src='//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.js'></script>
<script src='//unpkg.com/hchs-vue-charts@1.2.8'></script>

<script>
import Utils from "@/config/utils.js";
import AppointmentServices from "@/services/appointmentServices.js";
import AvailabilityServices from "@/services/availabilityServices.js";
import GroupServices from "@/services/groupServices.js";
import RequestServices from "@/services/requestServices.js";
import TopicServices from "@/services/topicServices.js";
import PersonServices from "@/services/personServices.js";
import "@/plugins/apexcharts";

export default {
  props: ["id"],
  name: "App",
  watch: {
    id: function () {
      //console.log(this.id);
    },
  },
  components: {
    //apexchart: VueApexCharts,
  },

  data() {
    return {
      series: [
        {
          name: "Total Hours",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "Hours Available",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "Hours Booked",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "Hours Completed",
          data: [44, 55, 41, 67, 22, 43],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
          ],
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
      loaded: false,
      dataentry: null,
      datalabel: null,
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
      current_week: [],
      weeklist: [],
      weeks: [],
      tutors: [],
      topics: [],
      appointments: [],
      appt_count: [],
      available_count: [],
      hour_count: [],
      complete_count: [],
      booked_count: [],
      week: [],
      hour_series: [],

      // table headers
      appointmentTable: [
        { text: "Week starting", value: "week" },
        { text: "# Appointments", value: "appointmentNum" },
        { text: "# Hours", value: "hours" },
        { text: "# Scheduled", value: "scheduledAppointments" },
        { text: "# Completed", value: "completedAppointments" },
      ],
      tutorTable: [
        { text: "Name", value: "name" },
        { text: "# Appts", value: "count" },
        { text: "# Total Hours", value: "hours" },
        { text: "# Hours to Pay", value: "paying" },
      ],
      topicTable: [
        { text: "Topic Name", value: "name" },
        { text: "# Hours available", value: "hours" },
      ],
    };
  },
  async created() {
    this.user = Utils.getStore("user");
    await this.getGroup(this.user.selectedGroup.replace(/%20/g, " ")).then(
      () => {
        this.setWeeks();
        this.setTutorHours();
        this.getTopics();
        this.getRequests();
        this.getAvailabilities();
      }
    );
  },
  methods: {
    async addData() {
      this.dataset.push(this.dataentry);
      this.labels.push(this.datalabel);
      this.datalabel = "";
      this.dataentry = "";
    },
    async setWeeks() {
      await this.setWeekList();
      var categories = "";

      for (let index = 0; index < this.weeklist.length; ++index) {
        var currWeek = "";
        var apptCount = "";
        var hourCount = "";
        var availableCount = "";
        var bookedCount = "";
        var completeCount = "";

        var totalHourList = '{' +
          '"name": "Total Hours",' +
          '"data": ['
          
        var totalAvailableList = '{' +
          '"name": "Total Hours",' +
          '"data": ['
          
        var totalBookedList = '{' +
          '"name": "Total Hours",' +
          '"data": ['

        var totalCompleteList = '{' +
          '"name": "Total Hours",' +
          '"data": ['

        var totalNoShowList = '{' +
          '"name": "Total Hours",' +
          '"data": ['

        let element = this.weeklist[index];
        await AppointmentServices.getAppointmentHourCount(
          this.group.id,
          element
        )
          .then((responseHour) => {
            currWeek = element.slice(0, 10);
            apptCount = responseHour.data[0].count;
            hourCount = responseHour.data[0].diff;
            availableCount = responseHour.data[0].available;
            bookedCount = responseHour.data[0].booked;
            completeCount = responseHour.data[0].complete;

            if (index == 0) {
              this.week = currWeek;
              this.appt_count = apptCount;
              this.hour_count = hourCount;
              this.available_count = availableCount;
              this.booked_count = bookedCount;
              this.complete_count = completeCount;

              this.hour_series = [
                parseInt(availableCount),
                parseInt(bookedCount),
                parseInt(completeCount),
              ];
              this.loaded = true;
            }
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
              currWeek +
              '", "appointmentNum": "' +
              (await this.checkNum(apptCount)) +
              '", "hours":"' +
              (await this.checkHours(hourCount)) +
              '", "availableAppointments":"' +
              (await this.checkHours(availableCount)) +
              '", "completedAppointments":"' +
              (await this.checkHours(completeCount)) +
              '", "scheduledAppointments":"' +
              (await this.checkHours(bookedCount)) +
              '"}'
          )
        );
        totalHourList += hourCount + ', '
        totalAvailableList += availableCount + ', '
        totalBookedList += bookedCount + ', '
        totalCompleteList += completeCount + ', '
        categories += '" Week Starting ' + currWeek + '",';

        /*
        
        console.log(categories)
        this.series.push(
          JSON.parse(
            '{' +
              '{"name": "Total Hours",' +
                '"data": [' + hourCount + '],' +
              '},' +
              '{"name": "Hours Available",' +
                '"data": [' + availableCount + '],' + 
              '},' +
              '{"name": "Hours Booked",' +
                '"data": [' + bookedCount + '],' + 
              '},' +
              '{"name": "Hours Completed",' +
                '"data": [' + completeCount + '],' +
              '}' + 
            '}'
          )
        );
        */
      }
      console.log(totalHourList)
      /*
      this.xaxis = JSON.parse(
        "{" + '"type": "datetime",' + '"categories": [' + JSON.parse(categories) + "]}"
      );
      */
    },
    async setTutorHours() {
      await this.setWeekList();
      var tutor_name = "";
      var appt_count = "";
      var open_hours = "";
      var hours_paying = "";
      var currWeek = this.current_week.slice(0, 10);
      await PersonServices.getHoursPerTutor(this.group.id, currWeek)
        .then((responseHour) => {
          tutor_name =
            responseHour.data[0].fName + " " + responseHour.data[0].lName;
          appt_count = responseHour.data[0].appointment_count;
          open_hours = responseHour.data[0].total_hours;
          hours_paying = responseHour.data[0].hours_paying;
        })
        .catch((error) => {
          console.log(
            "There was an error getting hour count:",
            error.responseHour
          );
        });
      this.tutors.push(
        JSON.parse(
          '{"name": "' +
            tutor_name +
            '", "count": "' +
            (await this.checkNum(appt_count)) +
            '", "hours":"' +
            (await this.checkHours(open_hours)) +
            '", "paying":"' +
            (await this.checkHours(hours_paying)) +
            '"}'
        )
      );
    },

    async getTopics() {
      await this.setWeekList();
      var topic_name = "";
      var topic_hours = "";
      var currWeek = this.current_week.slice(0, 10);
      await TopicServices.getHoursPerTopic(this.group.id, currWeek)
        .then((responseHour) => {
          topic_name = responseHour.data[0].name;
          topic_hours = responseHour.data[0].hours;
        })
        .catch((error) => {
          console.log(
            "There was an error getting topic hour count:",
            error.responseHour
          );
        });
      this.topics.push(
        JSON.parse(
          '{"week":"' +
            currWeek +
            '", "name": "' +
            topic_name +
            '", "hours":"' +
            (await this.checkHours(topic_hours)) +
            '"}'
        )
      );
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
      this.current_week = current;
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
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
  },
};
</script>