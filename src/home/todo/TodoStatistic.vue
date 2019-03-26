<template>
<v-layout wrap>
    <v-flex
      xs12
      class="mb-3"
    >
      <v-sheet height="450">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :end="end"
          color="primary"
        >
          <template v-slot:day="{ present, past, date }">
            <v-layout>
              <template v-if="past && tracked[date]">
                <b>{{ tracked[date] }} 건</b>
                <v-btn fab dark small color="pink">
                  <v-icon dark>search</v-icon>
                </v-btn>
              </template>
            </v-layout>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>

    <v-flex
      sm4
      xs12
      class="text-sm-left text-xs-center"
    >
      <v-btn @click="$refs.calendar.prev()">
        <v-icon
          dark
          left
        >
          keyboard_arrow_left
        </v-icon>
        Prev
      </v-btn>
    </v-flex>
    <v-flex
      sm4
      xs12
      class="text-sm-right text-xs-center"
    >
      <v-btn @click="$refs.calendar.next()">
        Next
        <v-icon
          right
          dark
        >
          keyboard_arrow_right
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>

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
          '2019-03-09': 5,
          '2019-03-08': 6,
          // '2019-03-09': [23, 45, 10],
          // '2019-03-08': [10],
          // '2019-03-07': [0, 78, 5],
          // '2019-03-06': [0, 0, 50],
          // '2019-03-05': [0, 10, 23],
          // '2019-03-04': [2, 90],
          // '2019-03-03': [10, 32],
          // '2019-03-02': [80, 10, 10],
          // '2019-03-01': [20, 25, 10]
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