<template>
  <div id="chart">
      <div id="calendar">
        <v-sheet height="50">
          <v-calendar
            ref="calendar"
            v-model="start"
            :now="start"
            :type="type"
            color="primary"
          >
            <template v-slot:day="{ present, past, date }">
              <v-layout fill-height>
                <template>
                  <v-sheet
                    v-for="(percent, i) in tracked[date]"
                    :key="i"
                    :title="category[i]"
                    :color="colors[i]"
                    :width="`${percent}%`"
                    height="100%"
                    tile
                  ></v-sheet>
                </template>
              </v-layout>
            </template>
          </v-calendar>
        </v-sheet>
      </div>
      <div id="cal-btn">
        <div id="prev-btn">
          <v-btn @click="$refs.calendar.prev()">
            <v-icon
              dark
              left
            >
              keyboard_arrow_left
            </v-icon>
            Prev
          </v-btn>
        </div>
        <div id="next-btn">
          <v-btn @click="$refs.calendar.next()">
            Next
            <v-icon
              right
              dark
            >
              keyboard_arrow_right
            </v-icon>
          </v-btn>
        </div>
      </div>
  </div>

</template>
<script>
// vuex 를 위한 import
import {mapState, mapActions, mapGetters} from 'vuex';

export default{
    data() {
      return {
        type: 'month',
        start: new Date().toISOString().slice(0, 10),
        tracked: {
          '2019-03-09': [23, 45, 10],
          '2019-03-08': [10],
          '2019-03-07': [0, 78, 5],
          '2019-03-06': [0, 0, 50],
          '2019-03-05': [0, 10, 23],
          '2019-03-04': [2, 90],
          '2019-03-03': [10, 32],
          '2019-03-02': [80, 10, 10],
          '2019-03-01': [20, 25, 10]
        },
        colors: ['#1867c0', '#fb8c00', '#000000'],
        category: ['Development', 'Meetings', 'Slacking']
      }
    },
    computed: {
        ...mapGetters('todos',{
            todos: 'currentTodo',
            completedTodos: 'completedTodo',
            todoRates: 'todoRates',
        })
    },
    methods: {

    }
}
</script>
<style>
#chart{
  display:flex;
  flex-direction: column;
}
#calendar{
  height: 550px;
}
#cal-btn{
  display: flex;
  flex-direction: row;
}
#prev-btn{
  padding-left: 0px;
}
#next-btn{
  padding: 0 0 0 0;
}
</style>