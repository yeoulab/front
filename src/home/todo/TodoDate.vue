<template>
    <div>
        <!-- <b-form-input type="date" id ="todoDate" aira-invalid="true" v-model="stdDate" @change="refreshTodo"></b-form-input> -->
        <!-- <el-date-picker v-model="stdDate" v-on:change="refreshTodo" type="date" ></el-date-picker> -->
        <!-- <v-date-picker v-model="stdDate" v-on:change="refreshTodo"  @input="menu2 = false"></v-date-picker> -->
<v-menu
        ref="startMenu"
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start"
        transition="scale-transition"
        min-width="290px"
        lazy
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="start"
            label="Start Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="start"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="primary"
            @click="startMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            color="primary"
            @click="$refs.startMenu.save(start)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>        
        <v-layout row wrap>
            <v-flex xs12 sm6 md4>
                <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="150px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="date"
                        prepend-icon="event"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>        
    </div>
</template>
<script>
    // vuex 를 위한 import
    import {mapState, mapActions} from 'vuex';

    export default {
        // todo 를 전달하기 위한 data 세팅
        data() {
            return{
                todoDate: '',
                date: new Date().toISOString().substr(0, 10),
                menu: false,
                modal: false,
                menu2: false
            }
        },
        created: () =>{
            console.log("todoDate Vue created called") 
        },
        mounted: () => {
            // var res = new Date().toISOString().slice(0,10);
            // document.getElementById("todoDate").value = res;
            // console.log("todoDate Vue mounted called")
        },
        updated: () =>{
            console.log("todoDate Vue updated called");
        },
        methods: {
            ...mapActions('todos', {refreshTodo: 'searchTodo'}),
        },
        computed: {
            // ...mapState({
            //     stdDate: state => state.todos.todoDate
            // }),
            stdDate:{
                // v-model 에서 사용하는 stdDate 는
                // todos 의 vuex 상태 todoDate에서 가져오고
                get() {
                    console.log("stdDate : get");
                    return this.$store.state.todos.todoDate;
                },
                // todos 의 SET_DATE 라는 mutation 으로 값을 변경한다.
                set( value ){                    
                    console.log("stdDate set value : " + value);
                    this.$store.commit('todos/SET_DATE', value);
                }
            }
        }
}
</script>
